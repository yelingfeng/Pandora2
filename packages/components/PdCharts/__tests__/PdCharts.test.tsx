// @ts-nocheck
// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'

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
import { useCharts } from '../src/hooks'

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

describe('PdCharts', () => {
  test('mount initializes echarts instance and unmount disposes it', async () => {
    const wrapper = mount(PdCharts, {
      props: {
        autoresize: false
      }
    })

    await nextTick()

    expect(initMock).toHaveBeenCalledTimes(1)

    wrapper.unmount()
    expect(chartMock.dispose).toHaveBeenCalledTimes(1)
  })

  test('useCharts register exposes instance after mount', async () => {
    let methodsRef: any

    const TestComp = defineComponent({
      setup() {
        const [register, methods] = useCharts()
        methodsRef = methods
        return () => <PdCharts autoresize={false} onRegister={register} />
      }
    })

    mount(TestComp)
    await nextTick()

    expect(methodsRef.getInstance()).toBe(chartMock)
  })

  test('loading prop triggers echarts loading API', async () => {
    mount(PdCharts, {
      props: {
        autoresize: false,
        loading: true
      }
    })

    await nextTick()

    expect(chartMock.showLoading).toHaveBeenCalled()
  })

  test('options updates call setOption with latest options', async () => {
    const wrapper = mount(PdCharts, {
      props: {
        autoresize: false
      }
    })

    const nextOptions = {
      title: {
        text: 'updated'
      }
    }

    await wrapper.setProps({
      options: nextOptions
    })
    await nextTick()

    expect(
      chartMock.setOption.mock.calls.some(
        ([option]) => option && option.title && option.title.text === 'updated'
      )
    ).toBe(true)
  })
})
