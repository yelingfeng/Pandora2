import { describe, expect, test, vi } from 'vitest'
import { useColumnRender } from '../src/render/column'

function findVNodesByType(vnode: any, type: any, acc: any[] = []) {
  if (!vnode) return acc
  if (Array.isArray(vnode)) {
    vnode.forEach((n) => findVNodesByType(n, type, acc))
    return acc
  }
  if (vnode.type === type) acc.push(vnode)
  const children = vnode.children
  if (Array.isArray(children)) {
    children.forEach((n) => findVNodesByType(n, type, acc))
  } else if (children && typeof children === 'object') {
    Object.values(children).forEach((n) => findVNodesByType(n as any, type, acc))
  }
  return acc
}

describe('column render', () => {
  test('sortable column provides header slot with clickable icons', () => {
    const sortService: any = { sortIconClick: vi.fn() }
    const vnodes: any = useColumnRender(
      [{ value: 'id', name: 'ID', sortable: true }] as any,
      sortService
    )
    const col = vnodes[0]
    expect(col.type).toBeDefined()

    const headerSlot = col.children && col.children.header
    expect(typeof headerSlot).toBe('function')

    const headerVNode: any = headerSlot({ column: { property: 'id', label: 'ID' } })
    const icons = findVNodesByType(headerVNode, 'i')
    expect(icons.length).toBe(2)

    icons[0].props.onClick({ target: headerVNode })
    icons[1].props.onClick({ target: headerVNode })
    expect(sortService.sortIconClick).toHaveBeenCalled()
  })

  test('custom render uses default slot', () => {
    const sortService: any = { sortIconClick: vi.fn() }
    const render = vi.fn(() => null)
    const vnodes: any = useColumnRender(
      [{ value: 'id', name: 'ID', sortable: true, render }] as any,
      sortService
    )
    const col = vnodes[0]
    expect(typeof col.children.default).toBe('function')
    col.children.default({ row: { id: 1 }, column: {}, $index: 0 })
    expect(render).toHaveBeenCalled()
  })

  test('nested columns render children and key is generated', () => {
    const sortService: any = { sortIconClick: vi.fn() }
    const vnodes: any = useColumnRender(
      [
        {
          value: 'group',
          name: '组',
          columns: [{ value: 'id', name: 'ID' }]
        }
      ] as any,
      sortService
    )
    const group = vnodes[0]
    expect(group.props.key).toBeTruthy()
  })
})
