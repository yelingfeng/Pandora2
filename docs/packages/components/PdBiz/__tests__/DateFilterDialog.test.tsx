import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateFilterDialog from '../src/DateFilterDialog.vue'

describe('DateFilterDialog', () => {
  it('renders correctly when visible', () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': {
            template: '<div class="el-dialog"><slot /><slot name="footer" /></div>'
          },
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.find('.date-filter-content').exists()).toBe(true)
  })

  it('renders default options correctly', () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.vm.dateRangeOptions.length).toBe(4)
    expect(wrapper.vm.dateRangeOptions[0].label).toBe('近1天')
  })

  it('renders custom options', () => {
    const customOptions = [
      { label: '自定义1', value: 1, desc: '描述1', days: 1 },
      { label: '自定义2', value: 2, desc: '描述2', days: 2 }
    ]

    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true,
        options: customOptions
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.vm.dateRangeOptions.length).toBe(2)
    expect(wrapper.vm.dateRangeOptions[0].label).toBe('自定义1')
  })

  it('emits range-change event when date range changes', async () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.handleDateRangeChange(1)
    expect(wrapper.emitted('range-change')).toBeTruthy()
  })

  it('emits confirm event with correct data', async () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    wrapper.vm.selectedDateRange = 1
    await wrapper.vm.handleDateRangeChange(1)
    await wrapper.vm.handleConfirm()

    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:visible')).toBeTruthy()
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.handleCancel()
    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('update:visible')).toBeTruthy()
  })

  it('emits close event when dialog closes', async () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.handleClose()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('resets dialog state when closed', async () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    wrapper.vm.selectedDateRange = 1
    await wrapper.vm.handleClose()

    expect(wrapper.vm.selectedDateRange).toBe('')
    expect(wrapper.vm.previewTimeRange.start).toBe('')
    expect(wrapper.vm.previewTimeRange.end).toBe('')
  })

  it('does not emit confirm when no date range is selected', async () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    wrapper.vm.selectedDateRange = ''
    await wrapper.vm.handleConfirm()

    expect(wrapper.emitted('confirm')).toBeFalsy()
  })

  it('calculates time range correctly', async () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.handleDateRangeChange(1)

    expect(wrapper.vm.previewTimeRange.start).toBeTruthy()
    expect(wrapper.vm.previewTimeRange.end).toBeTruthy()
    expect(wrapper.vm.previewTimeRange.start.length).toBeGreaterThan(0)
  })

  it('uses custom button text', () => {
    const wrapper = mount(DateFilterDialog, {
      props: {
        visible: true,
        confirmText: '自定义确认',
        cancelText: '自定义取消'
      },
      global: {
        stubs: {
          'el-dialog': true,
          'el-radio-group': true,
          'el-radio': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.props('confirmText')).toBe('自定义确认')
    expect(wrapper.props('cancelText')).toBe('自定义取消')
  })
})
