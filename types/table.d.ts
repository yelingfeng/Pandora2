import type { TableColumnCtx } from 'element-plus/packages/table/src/table-column/defaults'
import type {
  TableProps,
  Table
} from 'element-plus/packages/table/src/table/defaults'
import type { Ref } from 'vue'

export declare type Dictionary<T> = Record<string, T>
export declare interface IPageConfig {
  // 分页高度
  height?: number
  // 当前页
  currentPage?: number
  // 总数
  total?: number
  // 每页显示条数选择数组
  pageSizes?: number[]
  // 最大页码按钮数
  pageCount?: number
  // 当前显示每页条数
  pageSize?: number
  // 分页功能 默认显示完整功能 （可不传）
  layout?: string
}

/**
 * 自定义table类型
 */
export declare interface IPandoraTable {
  // 选择模式 单选还是多选
  selectionMode?: string
  // 复现框的位置 前后 top 和 end
  selectionPos?: string
  // 是否显示多选
  selection?: boolean
  // 是否可选中的回调
  selectable?: (row: any, index: number) => void
  // 排序模式
  sortMode?: string
  // 行点击事件
  rowClick?: (row: object, column: object, event: any) => void
  // 行改变事件
  rowChange?: (row: object, index: number) => void
  // 是否分页
  pagination?: boolean
  // 分页配置
  pageOpt?: IPageConfig
}

// 对外table配置类型 剔除data和column
export declare type IPandoraTableOption<T> = Omit<
  TableProps<T>,
  'data' | 'column'
> &
  IPandoraTable

// 定义列接口
export declare interface IPandoraTableColumn<T> extends TableColumnCtx<T> {
  name: string
  value: string
}

// 排序配置类型
export declare interface ISortType {
  prop: string
  order: 'ascending' | 'descending'
}
// 排序回调类型
export declare interface ISortChangeCb {
  column: object
  prop: string
  order: string | null
}
/**
 * 定义table Sort配置接口
 */
export declare interface IPandoraTableSort<T = any> {
  // 排序模式 single 独立排序 ,multi 多项排序
  sortMode: 'single' | 'multi'
  // 排序回调事件
  sortChange?: (row: T) => void
  // 排序
  defaultSorts?: ISortType[]
  // 默认升序还是降序
  defaultOrder?: 'ascending' | 'descending'
  // 用户定义的列
  userColumnOrder?: Dictionary<String>
  // elementplus table实例
  tableInstance?: Ref<Table<any>>
}
