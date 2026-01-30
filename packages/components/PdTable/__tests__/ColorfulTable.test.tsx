import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, test } from 'vitest'
import { nextTick } from 'vue'
import ColorfulTable from '../src/colorful/ColorfulTable.vue'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('ColorfulTable', () => {
  test('renders summary cells as VNodes and emits summary-click', async () => {
    const data = [
      {
        provName: '综合',
        cdr_num_day: 483283078020,
        cdr_num_day_type: '总',
        cdr_num_day_color: '#218939',
        cdr_num_day_udFlag: 'up'
      }
    ]

    const columns: any[] = [
      { value: 'provName', name: '省份', width: 120 },
      { value: 'cdr_num_day', name: 'CDR数量(天)', width: 160, sortable: true }
    ]

    const wrapper = mount(ColorfulTable as any, {
      props: {
        data,
        columns,
        tableConfig: { border: true, showSummary: true },
        summarySplitMode: true,
        summaryClickableProps: ['cdr_num_day']
      },
      attachTo: document.body
    })

    await nextTick()
    await nextTick()

    expect(wrapper.find('.vpandora-colorful-table').exists()).toBe(true)
    expect(wrapper.find('tfoot').exists()).toBe(true)
    expect(wrapper.find('.colorful-summary-info').exists()).toBe(true)

    const cell = wrapper.find('[data-prop="cdr_num_day"]')
    expect(cell.exists()).toBe(true)
    await cell.trigger('click')

    const emitted: any = wrapper.emitted('summary-click')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBe('cdr_num_day')
  })

  test('emits server sort-change when clicking sort caret', async () => {
    const data = [
      {
        provName: '综合',
        req_match_rate: 85.47,
        req_match_rate_type: '均',
        req_match_rate_color: '#218939',
        req_match_rate_udFlag: 'down'
      }
    ]

    const columns: any[] = [
      { value: 'provName', name: '省份', width: 120 },
      { value: 'req_match_rate', name: '请求匹配率(%)', width: 180, sortable: true }
    ]

    const wrapper = mount(ColorfulTable as any, {
      props: {
        data,
        columns,
        tableConfig: { border: true, showSummary: true },
        summarySplitMode: true,
        serverSort: true
      },
      attachTo: document.body
    })

    await nextTick()
    await nextTick()

    const caret = wrapper.find('.sort-caret.ascending')
    expect(caret.exists()).toBe(true)
    await caret.trigger('click')
    await nextTick()

    const emitted: any = wrapper.emitted('sort-change')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toEqual({ orderFile: 'req_match_rate', orderType: 'asc' })
  })

  test('renders body cell with color, arrow and formatted unit text', async () => {
    const data = [
      {
        provName: '综合',
        cdr_num_day: 483283078020,
        cdr_num_day_type: '总',
        cdr_num_day_color: '#218939',
        cdr_num_day_udFlag: 'up'
      },
      {
        provName: '重庆',
        cdr_num_day: 16623024735,
        cdr_num_day_type: '',
        cdr_num_day_color: '#F9170B',
        cdr_num_day_udFlag: 'down'
      }
    ]

    const columns: any[] = [
      { value: 'provName', name: '省份', width: 120 },
      { value: 'cdr_num_day', name: 'CDR数量(天)', width: 160, sortable: true }
    ]

    const wrapper = mount(ColorfulTable as any, {
      props: {
        data,
        columns,
        tableConfig: { border: true, showSummary: true },
        summarySplitMode: true,
        cellClickable: true,
        cellClickableProps: ['cdr_num_day']
      },
      attachTo: document.body
    })

    await nextTick()
    await nextTick()

    const bodyCell = wrapper.find('.el-table__body [data-prop="cdr_num_day"]')
    expect(bodyCell.exists()).toBe(true)
    expect(/万|亿|万亿/.test(bodyCell.text())).toBe(true)
    expect(bodyCell.find('.colorful-cell-arrow').exists()).toBe(true)
    const style = bodyCell.find('.colorful-cell-value').attributes('style') || ''
    expect(style.length > 0).toBe(true)

    await bodyCell.trigger('click')
    const emitted: any = wrapper.emitted('cell-click')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0].prop).toBe('cdr_num_day')
  })
})
