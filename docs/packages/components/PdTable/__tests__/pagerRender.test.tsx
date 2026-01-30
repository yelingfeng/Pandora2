import { describe, expect, test, vi } from 'vitest'
import { usePagerRender } from '../src/render/pager'

describe('pager render', () => {
  test('returns pagination vnode with handlers', () => {
    const handleSizeChange = vi.fn()
    const handleCurrentChange = vi.fn()
    const vnode: any = usePagerRender({ pageSize: 10 }, handleSizeChange, handleCurrentChange)
    expect(vnode).toBeTruthy()
    expect(vnode.props.option).toEqual({ pageSize: 10 })
    expect(vnode.props.onHandleSizeChange).toBe(handleSizeChange)
    expect(vnode.props.onHandleCurrentChange).toBe(handleCurrentChange)
  })
})

