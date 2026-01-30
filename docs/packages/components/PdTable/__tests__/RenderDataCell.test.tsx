import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import RenderDataCell from '../src/custom/RenderDataCell.vue'

describe('RenderDataCell', () => {
  test('formats *_num number using formatNumberValueOnly', () => {
    const row = {
      my_num_color: '#218939',
      my_num_type: '条',
      my_num_udFlag: 'up'
    }

    const wrapper = mount(RenderDataCell as any, {
      props: {
        value: 10000,
        colorField: 'my_num_color',
        typeField: 'my_num_type',
        keyField: 'my_num',
        row,
        column: { property: 'my_num' },
        index: 0
      }
    })

    expect(wrapper.find('.data-value').text()).toBe('1.00 万')
  })

  test('keeps time string as-is', () => {
    const row = {
      my_num_color: '#218939',
      my_num_type: '条',
      my_num_udFlag: 'up'
    }

    const wrapper = mount(RenderDataCell as any, {
      props: {
        value: '2025-01-01',
        colorField: 'my_num_color',
        typeField: 'my_num_type',
        keyField: 'my_num',
        row,
        column: { property: 'my_num' },
        index: 0
      }
    })

    expect(wrapper.find('.data-value').text()).toBe('2025-01-01')
  })

  test('shows arrow based on *_udFlag and uses correct icon class', () => {
    const rowUp = {
      my_num_color: '#218939',
      my_num_type: '条',
      my_num_udFlag: 'up'
    }

    const wrapperUp = mount(RenderDataCell as any, {
      props: {
        value: 1,
        colorField: 'my_num_color',
        typeField: 'my_num_type',
        keyField: 'my_num',
        row: rowUp,
        column: { property: 'my_num' },
        index: 0
      }
    })

    const upIcon = wrapperUp.find('.arrow-icon')
    expect(upIcon.exists()).toBe(true)
    expect(upIcon.classes()).toContain('el-icon-top')

    const rowDown = {
      my_num_color: '#F9170B',
      my_num_type: '条',
      my_num_udFlag: 'down'
    }

    const wrapperDown = mount(RenderDataCell as any, {
      props: {
        value: 1,
        colorField: 'my_num_color',
        typeField: 'my_num_type',
        keyField: 'my_num',
        row: rowDown,
        column: { property: 'my_num' },
        index: 0
      }
    })

    const downIcon = wrapperDown.find('.arrow-icon')
    expect(downIcon.exists()).toBe(true)
    expect(downIcon.classes()).toContain('el-icon-bottom')
    const style = wrapperDown.find('.data-value').attributes('style') || ''
    expect(style.includes('#f9170b') || /rgb\(249,\s*23,\s*11\)/.test(style)).toBe(true)
  })

  test('emits click with row/column/index', async () => {
    const row = {
      my_num_color: '#218939',
      my_num_type: '条',
      my_num_udFlag: 'up'
    }

    const column = { property: 'my_num' }

    const wrapper = mount(RenderDataCell as any, {
      props: {
        value: 1,
        colorField: 'my_num_color',
        typeField: 'my_num_type',
        keyField: 'my_num',
        row,
        column,
        index: 3
      }
    })

    await wrapper.find('.data-value').trigger('click')
    const emitted: any = wrapper.emitted('click')
    expect(emitted).toBeTruthy()
    expect(emitted[0]).toEqual([row, column, 3])
  })
})
