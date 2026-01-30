import { describe, expect, test } from 'vitest'
import { addClass, hasClass, removeClass, trim } from '../helper'

describe('helper', () => {
  test('trim', () => {
    expect(trim('  a  ')).toBe('a')
    expect(trim('\uFEFF a \uFEFF')).toBe('a')
    expect(trim('')).toBe('')
  })

  test('class helpers', () => {
    const el: any = { className: 'a' }
    expect(hasClass(el, 'a')).toBe(true)
    expect(hasClass(el, 'b')).toBe(false)

    addClass(el, 'b')
    expect(hasClass(el, 'b')).toBe(true)

    addClass(el, 'b')
    expect(el.className.split(/\s+/).filter(Boolean)).toEqual(['a', 'b'])

    removeClass(el, 'a')
    expect(hasClass(el, 'a')).toBe(false)
  })
})

