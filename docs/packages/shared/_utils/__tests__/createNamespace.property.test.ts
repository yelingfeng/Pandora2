// @vitest-environment node
import { describe, expect, test } from 'vitest'
import fc from 'fast-check'
import { createNamespace } from '../create'

describe('createNamespace 属性测试（Property-Based Tests）', () => {
  test('Property 9: createNamespace 前缀不变量', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 50 }),
        (componentName) => {
          const [result] = createNamespace(componentName)

          // 不变量 1: 结果必须以 "Pd" 开头
          expect(result.startsWith('Pd')).toBe(true)

          // 不变量 2: 结果等于 "Pd" + componentName
          expect(result).toBe(`Pd${componentName}`)

          // 不变量 3: 结果长度等于 componentName 长度 + 2
          expect(result.length).toBe(componentName.length + 2)
        }
      ),
      { numRuns: 100 }
    )
  })
})
