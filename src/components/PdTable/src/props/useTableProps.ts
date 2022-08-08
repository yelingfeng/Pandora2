import { ExtractPropTypes, ref, watch } from 'vue'
import { tableProps } from './index'
import { useSortService } from '../sort'
import { AnyObject, IPandoraTable } from '../types'
import { Table } from '../types/element-type'
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
