import { describe, expect, test } from 'vitest'
import { getPopupContainer } from '..'

describe('_utils index', () => {
  test('getPopupContainer returns parent when provided', () => {
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)
    expect(getPopupContainer(child)).toBe(parent)
  })

  test('getPopupContainer falls back to document.body', () => {
    expect(getPopupContainer()).toBe(document.body)
  })
})

