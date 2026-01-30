import { describe, expect, test, vi } from 'vitest'
import { useSortService } from '../src/sort'
import { SortService } from '../src/sort/sortService'

function createTableEl() {
  const tableEl = document.createElement('div')
  const th = document.createElement('div')
  const wrap = document.createElement('div')
  const rel = document.createElement('div')
  rel.setAttribute('relid', 'id')
  wrap.appendChild(rel)
  th.appendChild(wrap)
  tableEl.appendChild(th)
  return { tableEl, th, rel }
}

describe('SortService', () => {
  test('useSortService initializes sortable keys', () => {
    const sortConfig: any = { sortMode: 'single' }
    const columns: any = [{ value: 'id', sortable: true }, { value: 'name' }]
    const tableInstance: any = { value: { $el: document.createElement('div') } }
    const service = useSortService(sortConfig, columns, tableInstance)
    expect(service).toBeInstanceOf(SortService)
    expect(Object.keys(sortConfig.userColumnOrder)).toEqual(['id'])
  })

  test('init applies default sort class', () => {
    const { tableEl, th } = createTableEl()
    const sortChange = vi.fn()
    const service = new SortService({
      sortMode: 'single',
      userColumnOrder: { id: '' },
      defaultSorts: [{ prop: 'id', order: 'ascending' }],
      tableInstance: { value: { $el: tableEl } },
      sortChange
    } as any)

    service.init()
    expect(th.className).toContain('ascending')
  })

  test('sortIconClick triggers sortChange', () => {
    const { tableEl, th, rel } = createTableEl()
    const sortChange = vi.fn()
    const service = new SortService({
      sortMode: 'single',
      userColumnOrder: { id: '' },
      tableInstance: { value: { $el: tableEl } },
      sortChange
    } as any)
    service.init()

    service.sortIconClick(
      {
        target: rel,
        stopPropagation: vi.fn(),
        preventDefault: vi.fn()
      } as any,
      { property: 'id' },
      'ascending'
    )

    expect(th.className).toContain('ascending')
    expect(sortChange).toHaveBeenCalledWith({ id: 'ascending' })
  })

  test('executeHeaderClick toggles order', () => {
    const { tableEl, th } = createTableEl()
    const cell = document.createElement('div')
    cell.className = 'cell'
    th.appendChild(cell)

    const sortChange = vi.fn()
    const service = new SortService({
      sortMode: 'single',
      userColumnOrder: { id: '' },
      tableInstance: { value: { $el: tableEl } },
      sortChange,
      defaultOrder: 'ascending'
    } as any)
    service.init()

    service.executeHeaderClick({ property: 'id' }, { target: cell } as any)
    expect(th.className).toContain('ascending')

    service.executeHeaderClick({ property: 'id' }, { target: cell } as any)
    expect(th.className).toContain('descending')
  })

  test('initSort clears and triggers sortChange', () => {
    const sortChange = vi.fn()
    const service = new SortService({
      sortMode: 'single',
      userColumnOrder: { id: 'ascending' },
      sortChange
    } as any)
    service.init()
    service.initSort()
    expect(sortChange).toHaveBeenCalled()
  })

  test('getTargetNode resolves caret-wrapper and icon paths', () => {
    const { tableEl } = createTableEl()
    const service = new SortService({
      sortMode: 'single',
      userColumnOrder: { id: '' },
      tableInstance: { value: { $el: tableEl } }
    } as any)
    service.init()

    const th = document.createElement('div')
    const a = document.createElement('div')
    const b = document.createElement('div')
    const header = document.createElement('div')
    const caret = document.createElement('span')
    caret.className = 'caret-wrapper'
    const icon = document.createElement('i')
    icon.nodeName
    header.appendChild(caret)
    caret.appendChild(icon)
    b.appendChild(header)
    a.appendChild(b)
    th.appendChild(a)

    const caretNode = (service as any).getTargetNode({ target: caret })
    expect(caretNode).toBe(a)

    const iconNode = (service as any).getTargetNode({ target: icon })
    expect(iconNode).toBe(a)
  })

  test('_getDefaultOrder prefers oldActiveSort when present', () => {
    const service: any = new SortService({
      sortMode: 'single',
      userColumnOrder: { id: '' },
      defaultOrder: 'descending'
    } as any)
    service._oldActiveSort = { id: 'ascending' }
    expect(service._getDefaultOrder('id')).toBe('ascending')
  })
})
