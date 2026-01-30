import { describe, expect, test, vi } from 'vitest'
import { error, warn } from '../log'

describe('log', () => {
  test('warn calls console.warn', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      warn('x')
      expect(spy).toHaveBeenCalledTimes(1)
    } finally {
      spy.mockRestore()
    }
  })

  test('error throws', () => {
    expect(() => error('x')).toThrowError()
  })
})

