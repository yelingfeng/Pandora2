// @vitest-environment node
import { afterEach, describe, expect, test, vi } from 'vitest'
import { getEnv, isDevMode, isProdMode } from '../env'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('env', () => {
  test('getEnv returns a string', () => {
    expect(typeof getEnv()).toBe('string')
  })

  test('isDevMode reflects import.meta.env.DEV', () => {
    vi.stubEnv('DEV', true)
    vi.stubEnv('PROD', false)

    expect(isDevMode()).toBe(true)
    expect(isProdMode()).toBe(false)
  })

  test('isProdMode reflects import.meta.env.PROD', () => {
    vi.stubEnv('DEV', false)
    vi.stubEnv('PROD', true)

    expect(isDevMode()).toBe(false)
    expect(isProdMode()).toBe(true)
  })
})
