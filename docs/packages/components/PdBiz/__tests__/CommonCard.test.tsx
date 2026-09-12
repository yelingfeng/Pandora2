// @vitest-environment jsdom
import { describe, test, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import CommonCard from '../src/CommonCard.vue'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('PdBizCommonCard', () => {
  test('renders with title', () => {
    const wrapper = mount(CommonCard, {
      props: {
        title: 'Test Card'
      }
    })

    expect(wrapper.find('.title-text').text()).toBe('Test Card')
    expect(wrapper.find('.pd-biz-common-card').exists()).toBe(true)
  })

  test('shows tooltip when showTips is true', () => {
    const wrapper = mount(CommonCard, {
      props: {
        title: 'Test Card',
        showTips: true,
        titleTip: 'Test Tooltip'
      }
    })

    expect(wrapper.find('.title-tip').exists()).toBe(true)
  })

  test('hides tooltip when showTips is false', () => {
    const wrapper = mount(CommonCard, {
      props: {
        title: 'Test Card',
        showTips: false
      }
    })

    expect(wrapper.find('.title-tip').isVisible()).toBe(false)
  })

  test('shows link icon when showIcon is true', () => {
    const wrapper = mount(CommonCard, {
      props: {
        title: 'Test Card',
        showIcon: true
      }
    })

    expect(wrapper.find('.link-icon').isVisible()).toBe(true)
  })

  test('emits clickHeader event when link icon is clicked', async () => {
    const wrapper = mount(CommonCard, {
      props: {
        title: 'Test Card',
        showIcon: true
      }
    })

    await wrapper.find('.link-icon').trigger('click')
    expect(wrapper.emitted('clickHeader')).toBeTruthy()
    expect(wrapper.emitted('clickHeader')?.length).toBe(1)
  })

  test('shows loading state', () => {
    const wrapper = mount(CommonCard, {
      props: {
        title: 'Test Card',
        loading: true
      }
    })

    expect(wrapper.find('.mask').isVisible()).toBe(true)
  })

  test('renders titleRight slot', () => {
    const wrapper = mount(CommonCard, {
      props: {
        title: 'Test Card'
      },
      slots: {
        titleRight: '<div class="test-title-right">Right Content</div>'
      }
    })

    expect(wrapper.find('.test-title-right').exists()).toBe(true)
    expect(wrapper.find('.test-title-right').text()).toBe('Right Content')
  })

  test('renders content slot', () => {
    const wrapper = mount(CommonCard, {
      props: {
        title: 'Test Card'
      },
      slots: {
        content: '<div class="test-content">Card Content</div>'
      }
    })

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Card Content')
  })
})
