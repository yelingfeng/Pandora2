import { describe, expect, test, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useEventListener } from '../event/useEventListener'

describe('useEventListener', () => {
  test('returns noop remover when el is falsy', () => {
    const { removeEvent } = useEventListener({
      el: undefined as any,
      name: 'click',
      listener: vi.fn()
    })
    expect(() => removeEvent()).not.toThrow()
  })

  test('adds and removes listener (no debounce)', async () => {
    const addEventListener = vi.fn()
    const removeEventListener = vi.fn()
    const el: any = { addEventListener, removeEventListener }
    const listener = vi.fn()
    const { removeEvent } = useEventListener({
      el,
      name: 'click',
      listener,
      wait: 0
    })

    await nextTick()
    expect(addEventListener).toHaveBeenCalledTimes(1)

    removeEvent()
    expect(removeEventListener).toHaveBeenCalledTimes(1)
  })

  test('uses throttle when isDebounce is false', async () => {
    vi.useFakeTimers()
    const addEventListener = vi.fn()
    const removeEventListener = vi.fn()
    const el: any = { addEventListener, removeEventListener }
    const listener = vi.fn()
    const { removeEvent } = useEventListener({
      el,
      name: 'resize',
      listener,
      isDebounce: false,
      wait: 16
    })

    await nextTick()
    expect(addEventListener).toHaveBeenCalledTimes(1)
    removeEvent()
    vi.runAllTimers()
    expect(removeEventListener).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  test('removes old listener when element ref changes', async () => {
    const addEventListener = vi.fn()
    const removeEventListener = vi.fn()
    const el1: any = { addEventListener, removeEventListener }
    const el2: any = { addEventListener, removeEventListener }
    const elRef = ref<any>(el1)
    const listener = vi.fn()
    useEventListener({ el: elRef as any, name: 'click', listener, wait: 0 })
    await nextTick()
    elRef.value = el2
    await nextTick()
    expect(removeEventListener).toHaveBeenCalled()
  })
})
