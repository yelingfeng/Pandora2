import { describe, expect, test, vi } from 'vitest'
import fc from 'fast-check'
import { withInstall } from '../vue'

describe('withInstall 属性测试（Property-Based Tests）', () => {
  test('Property 10: withInstall 注册不变量', () => {
    fc.assert(
      fc.property(
        fc.record({
          componentName: fc.string({ minLength: 1, maxLength: 20 }),
          extraCount: fc.integer({ min: 0, max: 3 })
        }),
        ({ componentName, extraCount }) => {
          const comp: any = { name: componentName }

          // 生成 extra 组件
          const extras: Record<string, any> = {}
          const extraNames: string[] = []
          for (let i = 0; i < extraCount; i++) {
            const extraName = `Extra${i}`
            extras[extraName] = { name: `${componentName}${extraName}` }
            extraNames.push(extraName)
          }

          const wrapped: any = extraCount > 0 ? withInstall(comp, extras) : withInstall(comp)
          const app: any = { component: vi.fn() }

          // 调用 install
          wrapped.install(app)

          // 不变量 1: install 方法存在且为函数
          expect(typeof wrapped.install).toBe('function')

          // 不变量 2: 主组件被注册
          expect(app.component).toHaveBeenCalledWith(componentName, comp)

          // 不变量 3: 所有 extra 组件都被注册
          for (const extraName of extraNames) {
            expect(wrapped[extraName]).toBe(extras[extraName])
            expect(app.component).toHaveBeenCalledWith(extras[extraName].name, extras[extraName])
          }

          // 不变量 4: 注册调用次数 = 1 (主组件) + extraCount
          expect(app.component).toHaveBeenCalledTimes(1 + extraCount)
        }
      ),
      { numRuns: 50 }
    )
  })
})
