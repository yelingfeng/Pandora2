import { describe, test, beforeAll, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import fc from 'fast-check'
import PdPageLayout from '../index.vue'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('PdPageLayout 属性测试（Property-Based Tests）', () => {
  test('Property 6: buttonConfig 渲染数量与配置长度一致', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            key: fc.constantFrom('search', 'reset', 'export', 'add', 'delete', 'edit'),
            label: fc.string({ minLength: 1, maxLength: 10 }),
            type: fc.constantFrom('primary', 'success', 'warning', 'danger', 'info', 'default')
          }),
          { minLength: 0, maxLength: 6 }
        ),
        async (buttonConfig) => {
          const wrapper = mount(PdPageLayout, {
            props: {
              buttonConfig
            },
            global: {
              stubs: {
                'el-button': {
                  template: '<button class="el-button"><slot /></button>',
                  props: ['type']
                },
                'el-icon': true
              }
            }
          })

          // 渲染的按钮数量应与配置数组长度一致
          const buttons = wrapper.findAll('.pandora-button-section .el-button')
          expect(buttons.length).toBe(buttonConfig.length)

          wrapper.unmount()
        }
      ),
      { numRuns: 30 }
    )
  })
})
