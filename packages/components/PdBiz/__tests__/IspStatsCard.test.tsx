import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IspStatsCard from '../src/IspStatsCard.vue'
import type { IIspStatItem } from '../src/types'

describe('IspStatsCard', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(IspStatsCard)
    expect(wrapper.find('.pd-biz-isp-stats-card').exists()).toBe(true)
  })

  it('renders ISP groups with data', () => {
    const data: IIspStatItem[] = [
      { isp: '0', count: 100, flag: '正常' },
      { isp: '0', count: 10, flag: '异常' },
      { isp: '1', count: 200, flag: '正常' },
      { isp: '3', count: 150, flag: '正常' }
    ]

    const wrapper = mount(IspStatsCard, {
      props: { data }
    })

    const groups = wrapper.findAll('.isp-group')
    expect(groups.length).toBe(3) // 3 ISPs: 0, 1, 3
  })

  it('displays ISP names correctly', () => {
    const data: IIspStatItem[] = [
      { isp: '0', count: 100, flag: '正常' }
    ]

    const wrapper = mount(IspStatsCard, {
      props: { data }
    })

    expect(wrapper.text()).toContain('移动')
  })

  it('groups data by ISP correctly', () => {
    const data: IIspStatItem[] = [
      { isp: '0', count: 100, flag: '正常' },
      { isp: '0', count: 10, flag: '异常' },
      { isp: '0', count: 5, flag: '警告' }
    ]

    const wrapper = mount(IspStatsCard, {
      props: { data }
    })

    const statusItems = wrapper.findAll('.status-item')
    expect(statusItems.length).toBe(3)
    expect(wrapper.text()).toContain('100')
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('5')
  })

  it('displays custom ISP map', () => {
    const data: IIspStatItem[] = [
      { isp: '5', count: 100, flag: '正常' }
    ]

    const wrapper = mount(IspStatsCard, {
      props: {
        data,
        ispMap: { '5': '自定义运营商' },
        ispOrder: ['5']
      }
    })

    expect(wrapper.text()).toContain('自定义运营商')
  })

  it('respects custom ISP order', () => {
    const data: IIspStatItem[] = [
      { isp: '0', count: 100, flag: '正常' },
      { isp: '1', count: 200, flag: '正常' },
      { isp: '3', count: 150, flag: '正常' }
    ]

    const wrapper = mount(IspStatsCard, {
      props: {
        data,
        ispOrder: ['3', '1', '0']
      }
    })

    const groups = wrapper.findAll('.isp-group')
    expect(groups.length).toBe(3)
  })

  it('renders status values and labels', () => {
    const data: IIspStatItem[] = [
      { isp: '0', count: 999, flag: '测试标签' }
    ]

    const wrapper = mount(IspStatsCard, {
      props: { data }
    })

    expect(wrapper.find('.status-value').text()).toBe('999')
    expect(wrapper.find('.status-label').text()).toBe('测试标签')
  })

  it('renders ISP icons as images', () => {
    const data: IIspStatItem[] = [
      { isp: '0', count: 100, flag: '正常' },
      { isp: '1', count: 200, flag: '正常' },
      { isp: '3', count: 150, flag: '正常' }
    ]

    const wrapper = mount(IspStatsCard, {
      props: { data }
    })

    const icons = wrapper.findAll('.isp-icon-img')
    expect(icons.length).toBe(3)
    icons.forEach((img) => {
      expect(img.attributes('src')).toBeTruthy()
    })
  })

  it('handles empty data gracefully', () => {
    const wrapper = mount(IspStatsCard, {
      props: { data: [] }
    })

    expect(wrapper.find('.isp-groups').exists()).toBe(true)
    expect(wrapper.findAll('.isp-group').length).toBe(0)
  })

  it('renders multiple status items per ISP', () => {
    const data: IIspStatItem[] = [
      { isp: '0', count: 100, flag: '正常' },
      { isp: '0', count: 20, flag: '警告' },
      { isp: '0', count: 5, flag: '异常' }
    ]

    const wrapper = mount(IspStatsCard, {
      props: { data }
    })

    const statusItems = wrapper.findAll('.status-item')
    expect(statusItems.length).toBe(3)
  })
})
