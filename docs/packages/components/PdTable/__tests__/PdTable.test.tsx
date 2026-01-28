import { describe, test, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import PdTable from '../src/index.vue'
import { useTable } from '../src/hooks/useTable'
import { defineComponent, nextTick } from 'vue'

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('PdTable', () => {
  test('should render table', () => {
    const wrapper = mount(PdTable, {
      props: {
        data: [],
        columns: []
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.vpandora-table').exists()).toBe(true)
  })

  test('useTable hook integration', async () => {
    const TestComp = defineComponent({
      setup() {
        const [register, { setProps, setColumns, setData, getSelectRows }] =
          useTable({
            data: [{ id: 1, name: 'test' }],
            columns: [{ prop: 'name', label: 'Name' }]
          })
        return { register, setProps, setColumns, setData, getSelectRows }
      },
      render() {
        return <PdTable onRegister={this.register} />
      }
    })

    const wrapper = mount(TestComp)
    await nextTick()

    // Test setData
    await wrapper.vm.setData([{ id: 2, name: 'new' }])
    await nextTick()

    // Test setColumns
    await wrapper.vm.setColumns([{ prop: 'id', label: 'ID' }])
    await nextTick()

    expect(wrapper.exists()).toBe(true)
  })
})
