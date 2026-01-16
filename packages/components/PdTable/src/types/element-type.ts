import type { CSSProperties, ComponentInternalInstance, Ref, VNode } from 'vue'

type CI<T> = { column: TableColumnCtx<T>; $index: number }

type Filters = {
  text: string
  value: string
}[]

type FilterMethods<T> = (value: any, row: T, column: TableColumnCtx<T>) => void

type ValueOf<T> = T[keyof T]

interface TableColumnCtx<T> {
  id: string
  realWidth: number
  type: string
  label: string
  className: string
  labelClassName: string
  property: string
  prop: string
  width: string | number
  minWidth: string | number
  renderHeader: (data: CI<T>) => VNode
  sortable: boolean | string
  sortMethod: (a: T, b: T) => number
  sortBy: string | ((row: T, index: number) => string) | string[]
  resizable: boolean
  columnKey: string
  rawColumnKey: string
  align: string
  headerAlign: string
  showTooltipWhenOverflow: boolean
  showOverflowTooltip: boolean
  fixed: boolean | string
  formatter: (
    row: T,
    column: TableColumnCtx<T>,
    cellValue: any,
    index: number
  ) => VNode | string
  selectable: (row: T, index: number) => boolean
  reserveSelection: boolean
  filterMethod: FilterMethods<T>
  filteredValue: string[]
  filters: Filters
  filterPlacement: string
  filterMultiple: boolean
  index: number | ((index: number) => number)
  sortOrders: ('ascending' | 'descending' | null)[]
  renderCell: (data: any) => void
  colSpan: number
  rowSpan: number
  children: TableColumnCtx<T>[]
  level: number
  filterable: boolean | FilterMethods<T> | Filters
  order: string
  isColumnGroup: boolean
  isSubColumn: boolean
  columns: TableColumnCtx<T>[]
  getColumnIndex: () => number
  no: number
  filterOpened?: boolean
}

interface TableColumn<T> extends ComponentInternalInstance {
  vnode: {
    vParent: TableColumn<T> | Table<T>
  } & VNode
  vParent: TableColumn<T> | Table<T>
  columnId: string
  columnConfig: Ref<Partial<TableColumnCtx<T>>>
}

type Nullable<T> = T | null

export type DefaultRow = any

interface TableRefs {
  tableWrapper: HTMLElement
  headerWrapper: HTMLElement
  footerWrapper: HTMLElement
  fixedBodyWrapper: HTMLElement
  rightFixedBodyWrapper: HTMLElement
  bodyWrapper: HTMLElement
  [key: string]: any
}

interface TableState {
  isGroup: Ref<boolean>
  resizeState: Ref<{
    width: any
    height: any
  }>
  doLayout: () => void
  debouncedUpdateLayout: () => void
}

type HoverState<T> = Nullable<{
  cell: HTMLElement
  column: TableColumnCtx<T>
  row: T
}>

type RIS<T> = { row: T; $index: number; store: any; expanded: boolean }

type RenderExpanded<T> = ({
  row,
  $index,
  store,
  expanded: boolean
}: RIS<T>) => VNode

type SummaryMethod<T> = (data: {
  columns: TableColumnCtx<T>[]
  data: T[]
}) => string[]

interface Table<T> extends ComponentInternalInstance {
  $ready: boolean
  hoverState?: HoverState<T>
  renderExpanded: RenderExpanded<T>
  store: any
  layout: any
  refs: TableRefs
  tableId: string
  state: TableState
  clearSelection: () => void
  getSelectionRows: () => T[]
  toggleRowSelection: (row: T, selected?: boolean) => void
  toggleAllSelection: () => void
  toggleRowExpansion: (row: T, expanded?: boolean) => void
  setCurrentRow: (row?: T) => void
  clearSort: () => void
  clearFilter: (columnKeys?: string[]) => void
  doLayout: () => void
  sort: (prop: string, order: string) => void
  scrollTo: (options: number | ScrollToOptions, yCoord?: number) => void
}

type ColumnCls<T> = string | ((data: { row: T; rowIndex: number }) => string)
type ColumnStyle<T> =
  | CSSProperties
  | ((data: { row: T; rowIndex: number }) => CSSProperties)
type CellCls<T> =
  | string
  | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => string)
type CellStyle<T> =
  | CSSProperties
  | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => CSSProperties)
type Layout = 'fixed' | 'auto'
interface TableProps<T> {
  data: T[]
  size?: string
  width?: string | number
  height?: string | number
  maxHeight?: string | number
  fit?: boolean
  stripe?: boolean
  border?: boolean
  rowKey?: string | ((row: T) => string)
  context?: Table<T>
  showHeader?: boolean
  showSummary?: boolean
  sumText?: string
  summaryMethod?: SummaryMethod<T>
  rowClassName?: ColumnCls<T>
  rowStyle?: ColumnStyle<T>
  cellClassName?: CellCls<T>
  cellStyle?: CellStyle<T>
  headerRowClassName?: ColumnCls<T>
  headerRowStyle?: ColumnStyle<T>
  headerCellClassName?: CellCls<T>
  headerCellStyle?: CellStyle<T>
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  emptyText?: string
  expandRowKeys?: any[]
  defaultExpandAll?: boolean
  defaultSort?: Sort
  tooltipEffect?: string
  spanMethod?: (data: {
    row: T
    rowIndex: number
    column: TableColumnCtx<T>
    columnIndex: number
  }) =>
    | number[]
    | {
        rowspan: number
        colspan: number
      }
  selectOnIndeterminate?: boolean
  indent?: number
  treeProps?: {
    hasChildren?: string
    children?: string
  }
  lazy?: boolean
  load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void
  className?: string
  style?: CSSProperties
  tableLayout: Layout
  flexible: boolean
}

interface Sort {
  prop: string
  order: 'ascending' | 'descending'
  init?: any
  silent?: any
}

interface Filter<T> {
  column: TableColumnCtx<T>
  values: string[]
  silent: any
}

interface TreeNode {
  expanded?: boolean
  loading?: boolean
  noLazyChildren?: boolean
  indent?: number
  level?: number
  display?: boolean
}

interface RenderRowData<T> {
  store: any
  _self: Table<T>
  column: TableColumnCtx<T>
  row: T
  $index: number
  treeNode?: TreeNode
  expanded: boolean
}

export type {
  SummaryMethod,
  Table,
  TableProps,
  TableRefs,
  ColumnCls,
  ColumnStyle,
  TreeNode,
  RenderRowData,
  Sort,
  Filter
}

export type { Filters, FilterMethods, TableColumnCtx, TableColumn, ValueOf }
