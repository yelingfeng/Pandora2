import { describe, expect, test, vi } from 'vitest'
import { nextTick, unref } from 'vue'
import { sizeEnum } from '../../enums/breakpointEnum'
import { createBreakpointListen, useBreakpoint } from '../event/useBreakpoint'

describe('useBreakpoint', () => {
  test('createBreakpointListen initializes and reacts to resize', async () => {
    vi.useFakeTimers()
    try {
      Object.defineProperty(document.body, 'clientWidth', {
        value: 800,
        configurable: true
      })
      const cb = vi.fn()
      createBreakpointListen(cb)
      await nextTick()
      vi.runAllTimers()
      await nextTick()

      const { screenRef, realWidthRef } = useBreakpoint()
      expect(unref(realWidthRef)).toBe(800)
      expect(unref(screenRef)).toBe(sizeEnum.LG)
      expect(cb).toHaveBeenCalled()

      const cases: Array<[number, sizeEnum]> = [
        [300, sizeEnum.XS],
        [500, sizeEnum.SM],
        [700, sizeEnum.MD],
        [1000, sizeEnum.XL],
        [1400, sizeEnum.XXL]
      ]
      for (const [w, expected] of cases) {
        Object.defineProperty(document.body, 'clientWidth', {
          value: w,
          configurable: true
        })
        window.dispatchEvent(new Event('resize'))
        vi.runAllTimers()
        await nextTick()
        expect(unref(realWidthRef)).toBe(w)
        expect(unref(screenRef)).toBe(expected)
      }
    } finally {
      vi.useRealTimers()
    }
  })
})
