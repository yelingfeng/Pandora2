// @vitest-environment node
import { describe, expect, test } from 'vitest'
import { createNamespace } from '../create'

describe('createNamespace', () => {
  test('adds Pd prefix for standard component names', () => {
    expect(createNamespace('Table')).toEqual(['PdTable'])
  })

  test('preserves input shape for edge cases', () => {
    expect(createNamespace('')).toEqual(['Pd'])
    expect(createNamespace('PageLayout')).toEqual(['PdPageLayout'])
  })
})
