import { beforeAll, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PdTable from '../src/index.vue'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('pagination config', () => {
  test('new paginationConfig has higher priority than legacy tableConfig', () => {
    const wrapper = mount(PdTable, {
      props: {
        data: [],
        columns: [],
        tableConfig: {
          pagination: true,
          pageOpt: {
            pageSize: 20
          }
        },
        paginationConfig: false
      }
    })

    expect(wrapper.find('.vpandora-pagination').exists()).toBe(false)
  })

  test('legacy tableConfig still renders pagination when new prop is absent', () => {
    const wrapper = mount(PdTable, {
      props: {
        data: [],
        columns: [],
        tableConfig: {
          pagination: true,
          pageOpt: {
            currentPage: 2,
            pageSize: 20,
            total: 30
          }
        }
      }
    })

    expect(wrapper.find('.vpandora-pagination').exists()).toBe(true)
  })

  test('warns once when legacy tableConfig is used', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    mount(PdTable, {
      props: {
        data: [],
        columns: [],
        tableConfig: {
          pagination: true
        }
      }
    })

    const deprecationCalls = warnSpy.mock.calls.filter((call) =>
      String(call[0]).includes('tableConfig')
    )

    expect(deprecationCalls).toHaveLength(1)
    expect(String(deprecationCalls[0][0])).toContain('tableConfig')

    warnSpy.mockRestore()
  })
})
