<script lang="tsx">
import {
  defineComponent,
  PropType,
  toRaw,
  ref,
  toRefs,
  onMounted,
  watch,
  withCtx,
  createVNode
} from 'vue'
import { createNamespace } from '../../_utils/create'
import { ElTable, ElTableColumn } from 'element-plus'
import type { Table } from 'element-plus/packages/table/src/table/defaults'
import type {
  IPandoraTableProps,
  IPandoraTableColumn,
  IPandoraTableSort,
  IPandoraTableOption,
  ISortChangeCb
} from './types'
import { useSortService } from './sort'
import Pagination from './pagination/index.vue'

interface AnyObject {
  [key: string]: any
}

// const useSort = (
//   sortConfig: IPandoraTableSort<ISortChangeCb>,
//   columns: IPandoraTableColumn<unknown>[],
//   tableInstance?: Ref<Table<unknown>> | any
// ) => {
//   /**
//    * 获取默认配置sortable = true的列 对应的order属性
//    * （ 列里定义的sortable=true ）
//    * return {object}
//    */
//   const initDefaultOrderColumn = () => {
//     const obj = Object.create([])
//     columns.map((item: any) => {
//       // 配置了开启排序模式
//       if (item.sortable && item.sortable !== undefined) {
//         obj[item.value] = ''
//       }
//     })
//     return obj
//   }
//   sortConfig.userColumnOrder = initDefaultOrderColumn()
//   sortConfig.tableInstance = tableInstance
//   const sortService = new SortService(sortConfig)
//   return sortService
// }

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

const [name] = createNamespace('VTable')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    options: {
      type: Object as PropType<IPandoraTableProps<AnyObject>>
    }
    // sortConfig: Object as PropType<IPandoraTableSort<any>>,
    // tableConfig: Object as PropType<IPandoraTableOption<any>>,
    // data: Array,
    // columns: Array as PropType<Partial<IPandoraTableColumn<any>>>
  },
  components: {
    Pagination,
    ElTable,
    ElTableColumn
  },
  setup(props, { emit }) {
    const tableInstance = ref<Table<unknown>>()

    const { columns, data, sortConfig, tableConfig } = toRefs<
      IPandoraTableProps<AnyObject> | any
    >(props.options)
    const columnProps = toRaw(columns.value) as IPandoraTableColumn<any>[]
    const sortRawConfig = toRaw(
      sortConfig.value
    ) as IPandoraTableSort<ISortChangeCb>
    const $sortService = useSortService<AnyObject>(
      sortRawConfig,
      columnProps,
      tableInstance
    )

    const { pageOpt, pagination, stripe } = toRefs<
      IPandoraTableOption<AnyObject>
    >(tableConfig.value)

    onMounted(() => {
      $sortService.init()
    })

    // watch(
    //   () => props.data,
    //   (newVal) => {
    //     currentData.value = unref(newVal)
    //     $sortService.initIconSort()
    //   },
    //   {
    //     deep: true
    //   }
    // )
    // Header点击事件回调
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

    const columnsVNode = columnProps.map((item) => {
      const { columnProps, slots } = renderColumnProp(item, $sortService)
      if (slots && slots.header) {
        return <ElTableColumn {...columnProps}>{slots}</ElTableColumn>
      } else {
        return <ElTableColumn {...columnProps}></ElTableColumn>
      }
    })

    // const tablePropsConfig = {
    //   ref: tableInstance,
    //   onHeaderClick: handleHeaderClick,
    //   props: {
    //     stripe: stripe.value,
    //     ...othersConfig
    //   }

    //   // v-model={[currentData.value, "color"]}
    // }

    const pageRef = ref(null)
    const PagerProps = {
      ref: pageRef,
      option: pageOpt,
      onHandleSizeChange: handleSizeChange,
      onHandleCurrentChange: handleCurrentChange
    }
    let PageDom: any = null
    if (pagination) {
      PageDom = <Pagination {...PagerProps}></Pagination>
    }

    // watch(
    //   () => tableConfig,
    //   (newVal) => {
    //     const tableOption = unref<IPandoraTableOption<unknown>>(newVal)
    //     // pageOpt.value = unref(tableOption.pageOpt)
    //     stripe.value = unref(tableOption.stripe)
    //   },
    //   {
    //     deep: true
    //   }
    // )
    // const elTableVNode = console.log(elTableVNode)
    // const elTableVNode = createVNode(
    //   ElTable,
    //   {
    //     ref: tableInstance,
    //     onHeaderClick: handleHeaderClick,
    //     stripe: stripe.value,
    //     data: data.value
    //   },
    //   [columnsVNode]
    // )
    return () => {
      const Tprops = {
        ref: tableInstance,
        onHeaderClick: handleHeaderClick,
        stripe: stripe.value,
        data: data.value
      }
      const elTableVNode = <ElTable {...Tprops}>{columnsVNode}</ElTable>
      return (
        <div class="vpandora-table">
          {elTableVNode}
          {PageDom}
        </div>
      )
    }
  }
})
</script>
