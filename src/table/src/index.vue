<script lang="tsx">
import { defineComponent, PropType, toRaw, ref, toRefs, onMounted } from 'vue'
import { createNamespace } from '../../_utils/create'
import { useColumnRender } from './render/column'
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

const [name] = createNamespace('VTable')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    options: {
      type: Object as PropType<IPandoraTableProps<AnyObject>>
    }
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

    const { pageOpt, pagination, stripe, ...otherProps } = toRefs<
      IPandoraTableOption<AnyObject>
    >(tableConfig.value)

    onMounted(() => {
      $sortService.init()
    })
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

    return () => {
      const tableProps = {
        ref: tableInstance,
        onHeaderClick: handleHeaderClick,
        stripe: stripe.value,
        data: data.value,
        ...otherProps
      }
      // 创建column
      const columnsVNode = columnProps.map((item) => {
        const { columnProps, slots } = useColumnRender(item, $sortService)
        if (slots && slots.header) {
          return <ElTableColumn {...columnProps}>{slots}</ElTableColumn>
        } else {
          return <ElTableColumn {...columnProps}></ElTableColumn>
        }
      })

      const elTableVNode = <ElTable {...tableProps}>{columnsVNode}</ElTable>
      let pageVNode: any = null
      if (pagination.value) {
        const pageRef = ref(null)
        const PagerProps = {
          ref: pageRef,
          option: pageOpt,
          onHandleSizeChange: handleSizeChange,
          onHandleCurrentChange: handleCurrentChange
        }
        pageVNode = <Pagination {...PagerProps}></Pagination>
      }
      return (
        <div class="vpandora-table">
          {elTableVNode}
          {pageVNode}
        </div>
      )
    }
  }
})
</script>
