import { ExtractPropTypes, ref, watch } from 'vue'
import { useSortService } from '../sort'
import { AnyObject, IPandoraTable } from '../types'
import { Table } from '../types/element-type'
import { tableProps } from './index'
/**
 *
 * @param props table Props属性
 * @returns
 */
export const useTableProps = (props: ExtractPropTypes<typeof tableProps>) => {
  const tableInstance = ref<Table<any>>()
  const currentData = ref(props.data)
  const tableConfig = props.tableConfig as IPandoraTable<AnyObject>
  const columnsProps = ref(props.columns)

  const initColumns = () => {
    const config = (props.tableConfig || {}) as IPandoraTable<AnyObject>
    const selectionConfig = config.selection

    // 如果有 selection 配置，则过滤掉 columns 里的 selection，由配置重新生成
    // 否则保留 columns 里的 selection
    const cols = selectionConfig
      ? (props.columns || []).filter((col: any) => col.type !== 'selection')
      : [...(props.columns || [])]

    if (selectionConfig) {
      const selectionCol: any = {
        type: 'selection',
        width: 55,
        align: 'center'
      }
      if (typeof selectionConfig === 'object') {
        if (selectionConfig.selectable) {
          selectionCol.selectable = selectionConfig.selectable
        }
        const pos = selectionConfig.selectionPos || 'top'
        if (pos === 'end') {
          cols.push(selectionCol)
        } else {
          cols.unshift(selectionCol)
        }
      } else {
        cols.unshift(selectionCol)
      }
    }
    columnsProps.value = cols
  }

  watch(
    [() => props.columns, () => props.tableConfig],
    () => {
      initColumns()
    },
    { deep: true, immediate: true }
  )

  const $sortService = useSortService<AnyObject>(
    props.sortConfig as any,
    columnsProps.value as any,
    tableInstance
  )

  const rebuildSortColumns = () => {
    const cfg: any = props.sortConfig || {}
    const order = Object.create(null)
    ;(columnsProps.value || []).forEach((item: any) => {
      if (item.sortable && item.sortable !== undefined) {
        const key = item.value || item.prop
        if (key) order[key] = ''
      }
    })
    cfg.userColumnOrder = order
    cfg.tableInstance = tableInstance
    $sortService.init()
  }

  watch(() => columnsProps.value, rebuildSortColumns, { deep: true, immediate: true })
  watch(() => props.sortConfig, rebuildSortColumns, { immediate: true })

  // Header点击事件回调
  const handleHeaderClick = (column: any, e: any) => {
    $sortService.executeHeaderClick(column, e)
  }

  watch(
    () => props.data,
    () => {
      currentData.value = props.data
      $sortService.init()
    }
  )

  return {
    tableInstance,
    tableConfig,
    currentData,
    columnsProps,
    $sortService,
    handleHeaderClick
  }
}
