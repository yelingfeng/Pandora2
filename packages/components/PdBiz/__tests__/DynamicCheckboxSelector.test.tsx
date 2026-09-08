import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DynamicCheckboxSelector from '../src/DynamicCheckboxSelector.vue'
import type { ICheckboxOption } from '../src/types'

describe('DynamicCheckboxSelector', () => {
  const options: ICheckboxOption[] = [
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
    { value: 'option3', label: '选项3' },
    { value: 'router', label: '路由器', type: '网络设备' },
    { value: 'server', label: '服务器', type: '计算设备' }
  ]

  const stubs = {
    'el-drawer': {
      template: '<div class="el-drawer"><slot /></div>',
      props: ['modelValue', 'title']
    },
    'el-checkbox-group': true,
    'el-checkbox': true,
    'el-button': true
  }

  it('renders correctly when visible', () => {
    const wrapper = mount(DynamicCheckboxSelector, {
      props: {
        visible: true,
        options
      },
      global: { stubs }
    })

    expect(wrapper.find('.pd-biz-dynamic-checkbox-selector').exists()).toBe(true)
  })

  it('emits update:visible when handleClose is called', async () => {
    const wrapper = mount(DynamicCheckboxSelector, {
      props: {
        visible: true,
        options
      },
      global: { stubs }
    })

    await wrapper.vm.handleClose()
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
  })

  it('emits confirm and update:selected on handleConfirm', async () => {
    const wrapper = mount(DynamicCheckboxSelector, {
      props: {
        visible: true,
        options,
        selected: ['option1', 'option2']
      },
      global: { stubs }
    })

    await wrapper.vm.handleConfirm()
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:selected')).toBeTruthy()
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([false])
  })

  it('resets selections when handleReset is called', async () => {
    const wrapper = mount(DynamicCheckboxSelector, {
      props: {
        visible: true,
        options,
        selected: ['option1']
      },
      global: { stubs }
    })

    await wrapper.vm.handleReset()
    expect(wrapper.vm.flatSelected).toEqual([])
    expect(wrapper.emitted('update:selected')?.[0]).toEqual([[]])
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('groups options by type', () => {
    const wrapper = mount(DynamicCheckboxSelector, {
      props: {
        visible: true,
        options: [
          { value: 'router', label: '路由器', type: '网络设备' },
          { value: 'switch', label: '交换机', type: '网络设备' },
          { value: 'server', label: '服务器', type: '计算设备' }
        ]
      },
      global: { stubs }
    })

    expect(wrapper.vm.groupedSections.length).toBe(2)
    expect(wrapper.vm.groupedSections.map((s: any) => s.type)).toContain('网络设备')
  })

  it('toggles section selections', async () => {
    const wrapper = mount(DynamicCheckboxSelector, {
      props: {
        visible: true,
        options
      },
      global: { stubs }
    })

    await wrapper.vm.toggleSection('网络设备', true)
    expect(wrapper.vm.selectedMap['网络设备']).toContain('router')

    await wrapper.vm.toggleSection('网络设备', false)
    expect(wrapper.vm.selectedMap['网络设备']).toEqual([])
  })

  it('supports flat options without type', () => {
    const flat = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' }
    ]
    const wrapper = mount(DynamicCheckboxSelector, {
      props: {
        visible: true,
        options: flat,
        selected: ['a']
      },
      global: { stubs }
    })

    expect(wrapper.vm.groupedSections.length).toBe(0)
    expect(wrapper.vm.flatSelected).toEqual(['a'])
  })

  it('initializes from selected prop', () => {
    const wrapper = mount(DynamicCheckboxSelector, {
      props: {
        visible: true,
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ],
        selected: ['b']
      },
      global: { stubs }
    })

    expect(wrapper.vm.flatSelected).toEqual(['b'])
  })
})
