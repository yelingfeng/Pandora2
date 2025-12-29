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
  const { sortConfig, columns } = props

  const initColumns = () => {
    // 必须深拷贝，否则修改 cols 会影响到原始 props.columns（如果是引用），或者多次执行时重复添加
    // 这里假设 props.columns 是只读的，我们需要一个新的数组
    // 但是注意：如果 props.columns 本身已经包含了 selection 列，我们需要先过滤掉，再重新根据 pos 添加
    // 否则切换 pos 时，旧的 selection 列还在原位，新的又加进去了，或者逻辑判断 hasSelectionCol 出错
    const cols = (props.columns || []).filter((col: any) => col.type !== 'selection')

    const config = props.tableConfig || {}
    const selectionConfig = config.selection

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
    sortConfig,
    columns,
    tableInstance
  )
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
