import { describe, expect, test, vi } from 'vitest'
import { effectScope, nextTick, reactive } from 'vue'
import { useTableProps } from '../src/props/useTableProps'

describe('useTableProps', () => {
  test('rebuilds columns with selection config and sort keys', async () => {
    const scope = effectScope()
    try {
      const sortConfig: any = { sortMode: 'single', defaultOrder: 'ascending' }
      const props: any = reactive({
        data: [{ id: 1 }],
        columns: [{ value: 'id', sortable: true }, { type: 'selection' }],
        sortConfig,
        tableConfig: { selection: { selectionPos: 'end' } }
      })

      const api: any = scope.run(() => useTableProps(props))
      await nextTick()

      const types = api.columnsProps.value.map((c: any) => c.type || c.value)
      expect(types[types.length - 1]).toBe('selection')

      expect(sortConfig.userColumnOrder).toHaveProperty('id')

      api.$sortService.executeHeaderClick = vi.fn()
      api.handleHeaderClick({ property: 'id' }, { target: document.createElement('div') })
      expect(api.$sortService.executeHeaderClick).toHaveBeenCalled()
    } finally {
      scope.stop()
    }
  })

  test('selection config supports selectable and top position', async () => {
    const scope = effectScope()
    try {
      const sortConfig: any = { sortMode: 'single' }
      const selectable = vi.fn(() => true)
      const props: any = reactive({
        data: [],
        columns: [{ value: 'id', sortable: true }],
        sortConfig,
        tableConfig: { selection: { selectionPos: 'top', selectable } }
      })

      const api: any = scope.run(() => useTableProps(props))
      await nextTick()
      expect(api.columnsProps.value[0].type).toBe('selection')
      expect(api.columnsProps.value[0].selectable).toBe(selectable)
    } finally {
      scope.stop()
    }
  })

  test('boolean selection config prepends selection column', async () => {
    const scope = effectScope()
    try {
      const props: any = reactive({
        data: [],
        columns: [{ value: 'id' }, { type: 'selection', width: 10 }],
        sortConfig: { sortMode: 'single' },
        tableConfig: { selection: true }
      })

      const api: any = scope.run(() => useTableProps(props))
      await nextTick()
      expect(api.columnsProps.value[0].type).toBe('selection')
      expect(api.columnsProps.value.filter((c: any) => c.type === 'selection').length).toBe(1)
    } finally {
      scope.stop()
    }
  })
})
