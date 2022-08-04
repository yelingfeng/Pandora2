import type { TableColumnCtx } from 'element-plus/packages/table/src/table-column/defaults'
import type {
  TableProps,
  Table
} from 'element-plus/packages/table/src/table/defaults'
import type { Ref, VNode } from 'vue'

export type Dictionary<T> = Record<string, T>

export interface AnyObject {
  [key: string]: any
}
export interface IPageConfig {
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
 * 选择列 类型 单选多选
 */
export interface ISelectionMode<T> {
  // 选择模式 单选还是多选
  selectionMode?: string
  // 复现框的位置 前后 top 和 end
  selectionPos?: string
  // 是否可选中的回调
  selectable?: (row: T, $index: number) => void
}
/**
 * 自定义table类型
 */
export interface IPandoraTable<T> extends IPandoraTableOption<T> {
  // 行点击事件
  rowClick?: (row: T, column: object, event: any) => void
  // 行改变事件
  rowChange?: (row: T, index: number) => void
  // 选择器 模式是否显示多选
  selection?: ISelectionMode<T>
  // 分页
  pagination?: IPageConfig
  // 分页属性
  pageOpt?: IPageConfig
}
/**
 *
 * table 构建属性接口
 */
export interface IPandoraTableProps<T> {
  // 数据
  data: T[]
  // 列
  columns: IPandoraTableColumn<T>[]
  // 排序配置
  sortConfig?: IPandoraTableSort<T>
  // table本身配置（element-plus属性）
  tableConfig?: IPandoraTableOption<T>
}

// 对外table配置类型 剔除data和column
/**
 *
 */
export type IPandoraTableOption<T> = Partial<
  Omit<TableProps<T>, 'data' | 'column'>
>

// 定义列接口
export interface IPandoraTableColumn<T> extends TableColumnCtx<T> {
  name?: string
  value?: string
  render?: (row: any, column: any, index: number) => VNode
}

// 排序配置类型
export interface ISortType {
  prop: string
  order: 'ascending' | 'descending'
}
// 排序回调类型
export interface ISortChangeCb {
  column: object
  prop: string
  order: string | null
}
/**
 * 定义table Sort配置接口
 */
export interface IPandoraTableSort<T = any> {
  // 排序模式 single 独立排序 ,multi 多项排序
  sortMode: 'single' | 'multi'
  // 排序回调事件
  sortChange?: (row: T) => void
  // 排序
  defaultSorts?: ISortType[]
  // 默认升序还是降序
  defaultOrder?: 'ascending' | 'descending'
}
/**
 * 排序服务类内部接口
 */
export interface ISortService<T> extends IPandoraTableSort<T> {
  // 用户定义的列
  userColumnOrder?: Dictionary<String>
  // elementplus table实例
  tableInstance?: Ref<Table<any>>
}

export type IPandoraTableKeys = keyof IPandoraTable<any>
