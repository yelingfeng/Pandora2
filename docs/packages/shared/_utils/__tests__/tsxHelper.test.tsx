import { describe, expect, test, vi } from 'vitest'
import { h } from 'vue'
import { extendSlots, getSlot } from '../helper/tsxHelper'

describe('tsxHelper', () => {
  test('getSlot returns null for missing slot', () => {
    expect(getSlot({}, 'default')).toBeNull()
  })

  test('getSlot returns null and logs for non-function slot', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      const slots: any = { default: 'x' }
      expect(getSlot(slots, 'default')).toBeNull()
      expect(spy).toHaveBeenCalledTimes(1)
    } finally {
      spy.mockRestore()
    }
  })

  test('getSlot invokes slot function', () => {
    const slots: any = {
      default: (data: any) => {
        const v = data && data.v !== undefined && data.v !== null ? data.v : ''
        return h('div', String(v))
      }
    }
    const vnode: any = getSlot(slots, 'default', { v: 1 })
    expect(vnode.type).toBe('div')
  })

  test('extendSlots respects excludeKeys', () => {
    const slots: any = {
      a: () => h('span', 'a'),
      b: () => h('span', 'b')
    }
    const extended: any = extendSlots(slots, ['b'])
    expect(typeof extended.a).toBe('function')
    expect(extended.b).toBeUndefined()
    const vnode: any = extended.a()
    expect(vnode.type).toBe('span')
  })
})
