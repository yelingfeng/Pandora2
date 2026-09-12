import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AdvancedQuery from '../src/AdvancedQuery.vue'
import type { IQueryField } from '../src/types'

describe('AdvancedQuery', () => {
  const fields: IQueryField[] = [
    {
      fieldName: 'name',
      label: '名称',
      dataType: 'string',
      isFilterable: true,
      conditions: ['等于', '不等于', '包含', '不包含', '为空', '不为空']
    },
    {
      fieldName: 'age',
      label: '年龄',
      dataType: 'number',
      isFilterable: true,
      conditions: ['等于', '不等于', '大于', '小于', '为空', '不为空']
    },
    {
      fieldName: 'status',
      label: '状态',
      dataType: 'string',
      isFilterable: false,
      conditions: []
    }
  ]

  it('renders correctly when visible', () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': {
            template: '<div class="el-drawer"><slot /></div>'
          },
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.find('.pd-biz-advanced-query').exists()).toBe(true)
  })

  it('filters only filterable fields', () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.vm.filterableFields.length).toBe(2)
    expect(wrapper.vm.filterableFields[0].fieldName).toBe('name')
    expect(wrapper.vm.filterableFields[1].fieldName).toBe('age')
  })

  it('initializes formData from fields', async () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.formData.name).toBeDefined()
    expect(wrapper.vm.formData.name.operator).toBe('')
    expect(wrapper.vm.formData.name.value).toBe('')
    expect(wrapper.vm.formData.age).toBeDefined()
  })

  it('determines input type correctly', () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.vm.getInputType('number')).toBe('number')
    expect(wrapper.vm.getInputType('UInt32')).toBe('number')
    expect(wrapper.vm.getInputType('Float32')).toBe('number')
    expect(wrapper.vm.getInputType('string')).toBe('text')
  })

  it('identifies no-value conditions correctly', () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.vm.isConditionNoValue('为空')).toBe(true)
    expect(wrapper.vm.isConditionNoValue('不为空')).toBe(true)
    expect(wrapper.vm.isConditionNoValue('等于')).toBe(false)
    expect(wrapper.vm.isConditionNoValue('包含')).toBe(false)
  })

  it('emits update:visible when close is called', async () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.handleClose()
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
  })

  it('emits save event with query results', async () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.vm.formData.name = {
      operator: '等于',
      value: 'test',
      originData: fields[0]
    }

    wrapper.vm.queryFormRef = {
      validate: (callback: Function) => callback(true)
    }

    await wrapper.vm.handleSave()

    expect(wrapper.emitted('save')).toBeTruthy()
    const savedData = wrapper.emitted('save')?.[0]?.[0]
    expect(Array.isArray(savedData)).toBe(true)
  })

  it('resets form data when reset is called', async () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.vm.formData.name = {
      operator: '等于',
      value: 'test',
      originData: fields[0]
    }

    await wrapper.vm.handleReset()

    expect(wrapper.vm.formData.name.operator).toBe('')
    expect(wrapper.vm.formData.name.value).toBe('')
    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.emitted('save')?.[0]?.[0]).toEqual([])
  })

  it('resets form when dialog closes', async () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.vm.formData.name = {
      operator: '等于',
      value: 'test',
      originData: fields[0]
    }

    await wrapper.setProps({ visible: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.formData.name.operator).toBe('')
    expect(wrapper.vm.formData.name.value).toBe('')
  })

  it('builds query results correctly', async () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.$nextTick()

    wrapper.vm.formData.name = {
      operator: '等于',
      value: 'test',
      originData: fields[0]
    }

    wrapper.vm.formData.age = {
      operator: '大于',
      value: 18,
      originData: fields[1]
    }

    wrapper.vm.queryFormRef = {
      validate: (callback: Function) => callback(true)
    }

    await wrapper.vm.handleSave()

    const savedData = wrapper.emitted('save')?.[0]?.[0] as any[]
    expect(savedData.length).toBe(2)
    expect(savedData[0].fieldName).toBe('name')
    expect(savedData[0].condition).toBe('等于')
    expect(savedData[0].queryValue).toBe('test')
    expect(savedData[1].fieldName).toBe('age')
  })

  it('validates form rules correctly', async () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.formRules.name).toBeDefined()
    expect(wrapper.vm.formRules.age).toBeDefined()
    expect(wrapper.vm.formRules.name.length).toBe(1)
  })

  it('handles empty fields gracefully', () => {
    const wrapper = mount(AdvancedQuery, {
      props: {
        visible: true,
        fields: []
      },
      global: {
        stubs: {
          'el-drawer': true,
          'el-form': true,
          'el-form-item': true,
          'el-select': true,
          'el-option': true,
          'el-input': true,
          'el-button': true
        }
      }
    })

    expect(wrapper.vm.filterableFields.length).toBe(0)
    expect(Object.keys(wrapper.vm.formData).length).toBe(0)
  })
})
