<script lang="tsx">
import {
  defineComponent,
  PropType,
  toRaw,
  ref,
  Ref,
  toRefs,
  unref,
  onMounted,
  watch
} from 'vue'
import { createNamespace } from '../../_utils/create'
import { ElTable, ElTableColumn } from 'element-plus'
import type { TableColumnCtx } from 'element-plus/packages/table/src/table-column/defaults'
import type {
  TableProps,
  Table
} from 'element-plus/packages/table/src/table/defaults'
import { IPandoraTableSort, ISortChangeCb, SortService } from './sortService'
import Pagination from './pagination.vue'

export interface IPageOpt {
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
export interface IPandoraTable {
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
  pageOpt?: IPageOpt
}

// 对外table配置类型 剔除data和column
export type IPandoraTableOption<T> = Omit<TableProps<T>, 'data' | 'column'> &
  IPandoraTable

// 定义列接口
export interface IPandoraTableColumn<T> extends TableColumnCtx<T> {
  name: string
  value: string
}

const useSort = (
  sortConfig: IPandoraTableSort<ISortChangeCb>,
  columns: IPandoraTableColumn<unknown>[],
  tableInstance?: Ref<Table<unknown>> | any
) => {
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

/**
 *
 */
const renderColumnProp = (
  item: IPandoraTableColumn<unknown>,
  $sortService: any
) => {
  const { prop, value, label, name, sortable, ...others } = item
  // 兼容处理1.0的属性
  const columnProps: any = {
    prop: prop || value,
    label: label || name,
    ...others
  }
  let slots
  if (sortable) {
    slots = {
      header: (props: any) => {
        const column = props.column
        const customHeader = (
          <div relId={column.property}>
            {column.label}
            <span class="caret-wrapper">
              <i
                class="sort-caret ascending"
                on-click={(e: any) =>
                  $sortService.sortIconClick(e, column, 'ascending')
                }
              ></i>
              <i
                class="sort-caret descending"
                on-click={(e: any) =>
                  $sortService.sortIconClick(e, column, 'descending')
                }
              ></i>
            </span>
          </div>
        )
        return customHeader
      }
    }
  }
  return { columnProps, slots }
}

const PAGE_HEIGHT = 50
const defaultOption: IPageOpt = {
  height: PAGE_HEIGHT,
  currentPage: 1,
  total: 200,
  pageCount: 7,
  pageSizes: [10, 20, 30, 40, 50],
  pageSize: 10,
  layout: 'total, sizes, prev, pager, next, jumper'
}

const [name] = createNamespace('VTable')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    sortConfig: Object as PropType<IPandoraTableSort<any>>,
    tableConfig: Object as PropType<IPandoraTableOption<any>>,
    data: Array,
    columns: Array as PropType<Partial<IPandoraTableColumn<any>>>
  },
  components: {
    Pagination,
    ElTable,
    ElTableColumn
  },
  setup(props, { emit }) {
    const tableInstance = ref<Table<unknown>>()
    const columnProps = toRaw(props.columns) as IPandoraTableColumn<any>[]
    const sortConfig = toRaw(
      props.sortConfig
    ) as IPandoraTableSort<ISortChangeCb>
    const $sortService = useSort(sortConfig, columnProps, tableInstance)

    const { pageOpt, pagination, ...othersConfig } = toRefs<
      IPandoraTableOption<any> | any
    >(props.tableConfig)
    const currentData = ref(props.data)
    onMounted(() => {
      $sortService.init()
    })

    watch(
      () => props.data,
      (newVal) => {
        currentData.value = unref(newVal)
        $sortService.initIconSort()
      },
      {
        deep: true
      }
    )

    const handleHeaderClick = (column: any, e: any) => {
      $sortService.executeHeaderClick(column, e)
    }

    // 分页事件回调
    const handleSizeChange = (val: number) => {
      emit('handleSizePageChange', val)
    }
    // 分页事件回调
    const handleCurrentChange = (val: number) => {
      emit('handleCurrentPageChange', val)
    }

    const columns = columnProps.map((item) => {
      const { columnProps, slots } = renderColumnProp(item, $sortService)
      if (slots && slots.header) {
        return <ElTableColumn {...columnProps}>{slots}</ElTableColumn>
      } else {
        return <ElTableColumn {...columnProps}></ElTableColumn>
      }
    })

    const tablePropsConfig = {
      ref: tableInstance,
      onHeaderClick: handleHeaderClick,
      // v-model={[currentData.value, "color"]}
      ...othersConfig
    }

    const pageRef = ref(null)
    const PagerProps = {
      ref: pageRef,
      option: pageOpt || defaultOption,
      onHandleSizeChange: handleSizeChange,
      onHandleCurrentChange: handleCurrentChange
    }
    let PageDom: any = null
    if (pagination) {
      PageDom = <Pagination {...PagerProps}></Pagination>
    }

    return () => {
      return (
        <div class="vpandora-table">
          <ElTable data={currentData.value} {...tablePropsConfig}>
            {columns}
          </ElTable>
          {PageDom}
        </div>
      )
    }
  }
})
</script>
