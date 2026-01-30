import { describe, expect, test } from 'vitest'
import {
    is,
    isArray,
    isBoolean,
    isClient,
    isDate,
    isDef,
    isElement,
    isEmpty,
    isFunction,
    isNull,
    isNullAndUnDef,
    isNullOrUnDef,
    isNumber,
    isObject,
    isPromise,
    isRegExp,
    isServer,
    isString,
    isUnDef,
    isUrl,
    isWindow
} from '../is'

describe('is', () => {
  test('basic type checks', () => {
    expect(is('a', 'String')).toBe(true)
    expect(is(1, 'Number')).toBe(true)
    expect(isDef(0)).toBe(true)
    expect(isUnDef(undefined)).toBe(true)
    expect(isObject({})).toBe(true)
    expect(isNull(null)).toBe(true)
    expect(isNullOrUnDef(undefined)).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isString('a')).toBe(true)
    expect(isFunction(() => 1)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isRegExp(/a/)).toBe(true)
    expect(isArray([1])).toBe(true)
    expect(isDate(new Date())).toBe(true)
  })

  test('isEmpty', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty(1 as any)).toBe(false)
  })

  test('isPromise', async () => {
    const p = Promise.resolve(1)
    expect(isPromise(p)).toBe(true)
    await p
  })

  test('isElement', () => {
    expect(isElement({ tagName: 'DIV' })).toBe(true)
    expect(isElement(null)).toBe(false)
  })

  test('isUrl', () => {
    expect(isUrl('https://example.com/a?b=1')).toBe(true)
    expect(isUrl('not-a-url')).toBe(false)
  })

  test('client/server flags', () => {
    expect(isServer).toBe(false)
    expect(isClient).toBe(true)
  })

  test('isNullAndUnDef is always false', () => {
    expect(isNullAndUnDef(undefined)).toBe(false)
    expect(isNullAndUnDef(null)).toBe(false)
  })

  test('isWindow', () => {
    expect(isWindow(window)).toBe(false)
  })
})
