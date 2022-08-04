import { SortService } from './sortService'
import type { Table } from 'element-plus/packages/table/src/table/defaults'
import type { Ref } from 'vue'
import type { IPandoraTableColumn, ISortService, ISortChangeCb } from '../types'
/**
 *
 * @param sortConfig
 * @param columns
 * @param tableInstance
 * @returns
 */
export function useSortService<T>(
  sortConfig: ISortService<ISortChangeCb>,
  columns: IPandoraTableColumn<T>[],
  tableInstance?: Ref<Table<T>> | any
) {
  /**
   * 获取默认配置sortable = true的列 对应的order属性
   * （ 列里定义的sortable=true ）
   * return {object}
   */
  const initDefaultOrderColumn = () => {
    const obj = Object.create([])
    columns.map((item: any) => {
      // 配置了开启排序模式
      if (item.sortable && item.sortable !== undefined) {
        obj[item.value] = ''
      }
    })
    return obj
  }
  sortConfig.userColumnOrder = initDefaultOrderColumn()
  sortConfig.tableInstance = tableInstance
  const sortService = new SortService(sortConfig)
  return sortService
}
