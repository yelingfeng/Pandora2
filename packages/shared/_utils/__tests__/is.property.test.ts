import { describe, expect, test } from 'vitest'
import fc from 'fast-check'
import {
  isString,
  isNumber,
  isArray,
  isObject,
  isFunction,
  isNullOrUnDef
} from '../is'

describe('is 类型判断函数属性测试（Property-Based Tests）', () => {
  test('Property 8: isString 对所有 string 返回 true，对非 string 返回 false', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        expect(isString(value)).toBe(true)
      }),
      { numRuns: 50 }
    )

    fc.assert(
      fc.property(
        fc.oneof(
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.constant(undefined),
          fc.array(fc.anything()),
          fc.object()
        ),
        (value) => {
          expect(isString(value)).toBe(false)
        }
      ),
      { numRuns: 50 }
    )
  })

  test('Property 8: isNumber 对所有 number 返回 true，对非 number 返回 false', () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.integer(), fc.double()),
        (value) => {
          expect(isNumber(value)).toBe(true)
        }
      ),
      { numRuns: 50 }
    )

    fc.assert(
      fc.property(
        fc.oneof(
          fc.string(),
          fc.boolean(),
          fc.constant(null),
          fc.constant(undefined),
          fc.array(fc.anything())
        ),
        (value) => {
          expect(isNumber(value)).toBe(false)
        }
      ),
      { numRuns: 50 }
    )
  })

  test('Property 8: isArray 对所有 array 返回 true，对非 array 返回 falsy', () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (value) => {
        expect(isArray(value)).toBe(true)
      }),
      { numRuns: 50 }
    )

    fc.assert(
      fc.property(
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.object()
        ),
        (value) => {
          expect(isArray(value)).toBeFalsy()
        }
      ),
      { numRuns: 50 }
    )
  })

  test('Property 8: isObject 对所有 plain object 返回 true', () => {
    fc.assert(
      fc.property(fc.object(), (value) => {
        expect(isObject(value)).toBe(true)
      }),
      { numRuns: 50 }
    )

    fc.assert(
      fc.property(
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.constant(undefined),
          fc.array(fc.anything())
        ),
        (value) => {
          expect(isObject(value)).toBe(false)
        }
      ),
      { numRuns: 50 }
    )
  })

  test('Property 8: isFunction 对所有 function 返回 true，对非 function 返回 false', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(() => {}),
          fc.constant(function() {}),
          fc.constant(async () => {})
        ),
        (value) => {
          expect(isFunction(value)).toBe(true)
        }
      ),
      { numRuns: 30 }
    )

    fc.assert(
      fc.property(
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.constant(undefined),
          fc.object(),
          fc.array(fc.anything())
        ),
        (value) => {
          expect(isFunction(value)).toBe(false)
        }
      ),
      { numRuns: 50 }
    )
  })

  test('Property 8: isNullOrUnDef 对 null 和 undefined 返回 true，对其他返回 false', () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.constant(null), fc.constant(undefined)),
        (value) => {
          expect(isNullOrUnDef(value)).toBe(true)
        }
      ),
      { numRuns: 20 }
    )

    fc.assert(
      fc.property(
        fc.oneof(
          fc.string(),
          fc.integer(),
          fc.boolean(),
          fc.object(),
          fc.array(fc.anything())
        ),
        (value) => {
          expect(isNullOrUnDef(value)).toBe(false)
        }
      ),
      { numRuns: 50 }
    )
  })
})
