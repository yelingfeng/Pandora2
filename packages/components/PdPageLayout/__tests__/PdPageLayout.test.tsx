import { describe, test, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import PdPageLayout from '../index.vue'
import PdPageTreeLayout from '../tree.vue'
import { defineComponent } from 'vue'

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('PdPageLayout', () => {
  test('should render basic layout', () => {
    const wrapper = mount(PdPageLayout, {
      props: {
        height: 500,
        baseTableHeight: 300
      },
      slots: {
        form: '<div class="test-form">Form Content</div>',
        table: '<div class="test-table">Table Content</div>'
      },
      global: {
        stubs: {
          'el-button': true,
          'el-icon': true,
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.pandora-page-layout').exists()).toBe(true)
    expect(wrapper.find('.pandora-form-section').exists()).toBe(true)
    expect(wrapper.find('.pandora-table-section').exists()).toBe(true)
    expect(wrapper.find('.test-form').exists()).toBe(true)
    expect(wrapper.find('.test-table').exists()).toBe(true)
  })

  test('should apply tabs layout class', () => {
    const wrapper = mount(PdPageLayout, {
      props: { layout: 'tabs' },
      global: {
        stubs: {
          'el-button': true,
          'el-icon': true,
        }
      }
    })

    expect(wrapper.find('.pandora-page-layout--tabs').exists()).toBe(true)
  })

  test('should render toolbar slot', () => {
    const wrapper = mount(PdPageLayout, {
      slots: {
        toolbar: '<div class="test-toolbar">Toolbar</div>'
      },
      global: {
        stubs: {
          'el-button': true,
          'el-icon': true,
        }
      }
    })

    expect(wrapper.find('.pandora-table-toolbar').exists()).toBe(true)
    expect(wrapper.find('.test-toolbar').exists()).toBe(true)
  })

  test('should emit search and reset from buttonConfig', async () => {
    const wrapper = mount(PdPageLayout, {
      props: {
        buttonConfig: [
          { key: 'search', label: '查询', type: 'primary' },
          { key: 'reset', label: '重置', type: 'default' },
        ],
      },
    })

    const buttons = wrapper.findAll('.pandora-button-section .el-button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('reset')).toBeTruthy()
  })

  test('should expose refreshLayout', async () => {
    const wrapper = mount(PdPageLayout, {
      global: {
        stubs: {
          'el-button': true,
          'el-icon': true,
        }
      }
    })

    expect(typeof (wrapper.vm as any).refreshLayout).toBe('function')
    expect(typeof (wrapper.vm as any).syncCrudHeight).toBe('function')
  })

  test('should provide "isInPageLayout"', () => {
    const ChildComp = defineComponent({
      inject: ['isInPageLayout'],
      template: '<div>{{ isInPageLayout }}</div>'
    })

    const wrapper = mount(PdPageLayout, {
      slots: {
        form: ChildComp
      },
      global: {
        stubs: {
          'el-button': true,
          'el-icon': true,
        }
      }
    })

    expect(wrapper.findComponent(ChildComp).text()).toBe('true')
  })
})

describe('PdPageTreeLayout', () => {
  test('should render tree layout', () => {
    const wrapper = mount(PdPageTreeLayout, {
      props: {
        height: 600,
        sidebarWidth: 200
      },
      slots: {
        sidebar: '<div class="test-sidebar">Sidebar Content</div>',
        form: '<div class="test-form">Form Content</div>',
        table: '<div class="test-table">Table Content</div>'
      },
      global: {
        stubs: {
          'el-icon': true,
          'ArrowRight': true,
          'ArrowLeft': true,
          'el-button': true,
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.pandora-page-tree-layout').exists()).toBe(true)
    expect(wrapper.find('.pandora-sidebar').exists()).toBe(true)
    expect(wrapper.find('.pandora-content').exists()).toBe(true)
    expect(wrapper.find('.test-sidebar').exists()).toBe(true)
    
    // Check if PdPageLayout is rendered inside
    expect(wrapper.findComponent(PdPageLayout).exists()).toBe(true)
  })

  test('should toggle sidebar', async () => {
    const wrapper = mount(PdPageTreeLayout, {
      props: {
        initialCollapsed: false,
        sidebarWidth: 200,
        sidebarCollapsedWidth: 50
      },
      global: {
        stubs: {
          'el-icon': true,
          'ArrowRight': true,
          'ArrowLeft': true,
          'el-button': true,
        }
      }
    })

    const sidebar = wrapper.find('.pandora-sidebar')
    expect(sidebar.classes()).not.toContain('collapsed')
    expect(sidebar.attributes('style')).toContain('width: 200px')

    const toggleBtn = wrapper.find('.pandora-sidebar-handle')
    await toggleBtn.trigger('click')

    expect(sidebar.classes()).toContain('collapsed')
    expect(sidebar.attributes('style')).toContain('width: 50px')
    expect(wrapper.emitted('sidebar-toggle')).toBeTruthy()
    const emitted: any = wrapper.emitted('sidebar-toggle')
    expect(emitted[0]).toEqual([true])
  })
})
