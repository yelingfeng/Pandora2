import { describe, expect, test } from 'vitest'
import { getEnv, isDevMode, isProdMode } from '../env'

describe('env', () => {
  test('getEnv returns a string', () => {
    expect(typeof getEnv()).toBe('string')
  })

  test('isDevMode/isProdMode return booleans', () => {
    expect(typeof isDevMode()).toBe('boolean')
    expect(typeof isProdMode()).toBe('boolean')
  })
})

