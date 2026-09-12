// @vitest-environment jsdom
import { describe, test, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ButtonPicker from '../src/ButtonPicker.vue'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('PdBizButtonPicker', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
  ]

  test('renders with options', () => {
    const wrapper = mount(ButtonPicker, {
      props: {
        options
      },
      global: {
        stubs: {
          'el-segmented': {
            template: '<div class="el-segmented"><slot /></div>',
            props: ['modelValue', 'options']
          }
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.el-segmented').exists()).toBe(true)
  })

  test('sets initial value', async () => {
    const wrapper = mount(ButtonPicker, {
      props: {
        value: '2',
        options
      },
      global: {
        stubs: {
          'el-segmented': {
            template: '<div class="el-segmented"></div>',
            props: ['modelValue', 'options']
          }
        }
      }
    })

    await nextTick()

    expect(wrapper.vm.internalValue).toBe('2')
  })

  test('emits input and change events', async () => {
    const wrapper = mount(ButtonPicker, {
      props: {
        value: '1',
        options
      },
      global: {
        stubs: {
          'el-segmented': {
            template: '<div class="el-segmented"></div>',
            props: ['modelValue', 'options'],
            emits: ['change']
          }
        }
      }
    })

    await wrapper.vm.handleChange('2')
    await nextTick()

    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('input')?.[0]).toEqual(['2'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['2'])
    expect(wrapper.vm.internalValue).toBe('2')
  })

  test('converts options to segmented format', () => {
    const disabledOptions = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3' }
    ]

    const wrapper = mount(ButtonPicker, {
      props: {
        options: disabledOptions
      },
      global: {
        stubs: {
          'el-segmented': {
            template: '<div class="el-segmented"></div>',
            props: ['modelValue', 'options']
          }
        }
      }
    })

    const segmentedOptions = wrapper.vm.segmentedOptions
    expect(segmentedOptions).toHaveLength(3)
    expect(segmentedOptions[1].disabled).toBe(true)
    expect(segmentedOptions[0].label).toBe('Option 1')
    expect(segmentedOptions[0].value).toBe('1')
  })

  test('updates when value prop changes', async () => {
    const wrapper = mount(ButtonPicker, {
      props: {
        value: '1',
        options
      },
      global: {
        stubs: {
          'el-segmented': {
            template: '<div class="el-segmented"></div>',
            props: ['modelValue', 'options']
          }
        }
      }
    })

    await wrapper.setProps({ value: '3' })
    await nextTick()

    expect(wrapper.vm.internalValue).toBe('3')
  })

  test('handles disabled option in segmented format', () => {
    const disabledOptions = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true }
    ]

    const wrapper = mount(ButtonPicker, {
      props: {
        value: '1',
        options: disabledOptions
      },
      global: {
        stubs: {
          'el-segmented': {
            template: '<div class="el-segmented"></div>',
            props: ['modelValue', 'options']
          }
        }
      }
    })

    const segmentedOptions = wrapper.vm.segmentedOptions
    expect(segmentedOptions[1].disabled).toBe(true)

    // disabled 为 undefined 的选项应该默认为 false
    const normalOptions = [{ label: 'Test', value: 'test' }]
    const wrapper2 = mount(ButtonPicker, {
      props: { options: normalOptions },
      global: {
        stubs: {
          'el-segmented': {
            template: '<div class="el-segmented"></div>',
            props: ['modelValue', 'options']
          }
        }
      }
    })

    expect(wrapper2.vm.segmentedOptions[0].disabled).toBe(false)
  })
})
