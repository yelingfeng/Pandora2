// @vitest-environment jsdom
import { describe, test, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import Stats from '../src/Stats.vue'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('PdBizStats', () => {
  const renderData = [
    { label: '总数', value: 1234, icon: 'el-icon-data-line' },
    { label: '增长', value: 5678, icon: 'el-icon-trend-charts' },
    { label: '下降', value: 91011, icon: 'el-icon-data-analysis' }
  ]

  test('renders all stats cards', () => {
    const wrapper = mount(Stats, {
      props: {
        renderData
      }
    })

    const cards = wrapper.findAll('.stats-card')
    expect(cards.length).toBe(3)
  })

  test('displays correct labels', () => {
    const wrapper = mount(Stats, {
      props: {
        renderData
      }
    })

    const labels = wrapper.findAll('.card-label')
    expect(labels[0].text()).toBe('总数')
    expect(labels[1].text()).toBe('增长')
    expect(labels[2].text()).toBe('下降')
  })

  test('formats large numbers correctly', () => {
    const largeData = [
      { label: '超大数', value: 150000000 }, // 1.5亿
      { label: '大数', value: 50000 }, // 5万
      { label: '小数', value: 999 }
    ]

    const wrapper = mount(Stats, {
      props: {
        renderData: largeData
      }
    })

    const values = wrapper.findAll('.card-value')
    expect(values[0].text()).toContain('1.50')
    expect(values[0].text()).toContain('亿')
    expect(values[1].text()).toContain('5.00')
    expect(values[1].text()).toContain('万')
    expect(values[2].text()).toBe('999')
  })

  test('applies flex layout by default', () => {
    const wrapper = mount(Stats, {
      props: {
        renderData
      }
    })

    expect(wrapper.find('.pd-biz-stats').classes()).not.toContain('auto-layout')
  })

  test('applies auto layout when specified', () => {
    const wrapper = mount(Stats, {
      props: {
        renderData: renderData.slice(0, 3),
        layout: 'auto'
      }
    })

    expect(wrapper.find('.pd-biz-stats').classes()).toContain('auto-layout')
    expect(wrapper.find('.stats-container').classes()).toContain('auto-container')
  })

  test('renders with custom suffix', () => {
    const customData = [
      { label: '温度', value: 25, suffix: '℃' }
    ]

    const wrapper = mount(Stats, {
      props: {
        renderData: customData
      }
    })

    const value = wrapper.find('.card-value')
    expect(value.text()).toContain('25℃')
  })

  test('handles empty data', () => {
    const wrapper = mount(Stats, {
      props: {
        renderData: []
      }
    })

    const cards = wrapper.findAll('.stats-card')
    expect(cards.length).toBe(0)
  })
})
