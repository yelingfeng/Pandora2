// @vitest-environment jsdom
import { describe, test, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TabSwitcher from '../src/TabSwitcher.vue'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('PdBizTabSwitcher', () => {
  const options = [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3' }
  ]

  test('renders all tabs', () => {
    const wrapper = mount(TabSwitcher, {
      props: {
        options
      }
    })

    const tabs = wrapper.findAll('.tab-item')
    expect(tabs.length).toBe(3)
    expect(tabs[0].text()).toBe('Tab 1')
    expect(tabs[1].text()).toBe('Tab 2')
    expect(tabs[2].text()).toBe('Tab 3')
  })

  test('sets active tab by modelValue', () => {
    const wrapper = mount(TabSwitcher, {
      props: {
        modelValue: 'tab2',
        options
      }
    })

    const tabs = wrapper.findAll('.tab-item')
    expect(tabs[1].classes()).toContain('active')
  })

  test('emits update:modelValue on tab click', async () => {
    const wrapper = mount(TabSwitcher, {
      props: {
        modelValue: 'tab1',
        options
      }
    })

    const tabs = wrapper.findAll('.tab-item')
    await tabs[2].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab3'])
  })

  test('emits change event with value and option', async () => {
    const wrapper = mount(TabSwitcher, {
      props: {
        modelValue: 'tab1',
        options
      }
    })

    const tabs = wrapper.findAll('.tab-item')
    await tabs[1].trigger('click')
    await nextTick()

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')?.[0][0]).toBe('tab2')
    expect(wrapper.emitted('change')?.[0][1]).toEqual(options[1])
  })

  test('updates active state when modelValue changes', async () => {
    const wrapper = mount(TabSwitcher, {
      props: {
        modelValue: 'tab1',
        options
      }
    })

    let tabs = wrapper.findAll('.tab-item')
    expect(tabs[0].classes()).toContain('active')

    await wrapper.setProps({ modelValue: 'tab3' })
    await nextTick()

    tabs = wrapper.findAll('.tab-item')
    expect(tabs[2].classes()).toContain('active')
    expect(tabs[0].classes()).not.toContain('active')
  })

  test('handles number values', async () => {
    const numberOptions = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 }
    ]

    const wrapper = mount(TabSwitcher, {
      props: {
        modelValue: 1,
        options: numberOptions
      }
    })

    const tabs = wrapper.findAll('.tab-item')
    await tabs[1].trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })
})
