// @ts-nocheck
// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import fc from 'fast-check'

const echartsMocks = vi.hoisted(() => ({
  initMock: vi.fn(),
  registerThemeMock: vi.fn()
}))

let chartMock: any
const initMock = echartsMocks.initMock
const registerThemeMock = echartsMocks.registerThemeMock

vi.mock('echarts', () => ({
  init: echartsMocks.initMock,
  registerTheme: echartsMocks.registerThemeMock,
  throttle: (fn: any) => fn
}))

vi.mock('echarts/theme/dark', () => ({
  default: {}
}))

vi.mock('resize-detector', () => ({
  addListener: vi.fn(),
  removeListener: vi.fn()
}))

import PdCharts from '../src/index.vue'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

beforeEach(() => {
  const zrMock = {
    on: vi.fn(),
    off: vi.fn()
  }

  chartMock = {
    setOption: vi.fn(),
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    dispose: vi.fn(),
    resize: vi.fn(),
    clear: vi.fn(),
    isDisposed: vi.fn(() => false),
    on: vi.fn(),
    off: vi.fn(),
    getZr: vi.fn(() => zrMock),
    getWidth: vi.fn(),
    getHeight: vi.fn(),
    getDom: vi.fn(),
    getOption: vi.fn(),
    dispatchAction: vi.fn(),
    convertToPixel: vi.fn(),
    convertFromPixel: vi.fn(),
    containPixel: vi.fn(),
    getDataURL: vi.fn(),
    getConnectedDataURL: vi.fn(),
    appendData: vi.fn()
  }

  initMock.mockClear()
  initMock.mockImplementation(() => chartMock)
  registerThemeMock.mockClear()
})

describe('PdCharts 属性测试（Property-Based Tests）', () => {
  test('Property 7: options 更新触发 setOption', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 50 }),
          value: fc.integer({ min: 0, max: 1000 })
        }),
        async ({ title, value }) => {
          const wrapper = mount(PdCharts, {
            props: {
              autoresize: false
            }
          })

          await nextTick()

          // 清除初始化时的 setOption 调用
          chartMock.setOption.mockClear()

          // 更新 options
          const newOptions = {
            title: { text: title },
            series: [{ data: [value] }]
          }

          await wrapper.setProps({ options: newOptions })
          await nextTick()

          // setOption 应该被调用，且参数中包含新的 title
          expect(chartMock.setOption).toHaveBeenCalled()
          const calls = chartMock.setOption.mock.calls
          const hasMatchingCall = calls.some(
            ([option]) => option && option.title && option.title.text === title
          )
          expect(hasMatchingCall).toBe(true)

          wrapper.unmount()
        }
      ),
      { numRuns: 20 }
    )
  })
})
