<script lang="tsx">
import { defineComponent, PropType, toRaw, ref, toRefs, onMounted } from 'vue'
import { createNamespace } from '../../_utils/create'
import { useColumnRender } from './render/column'
import { usePagerRender } from './render/pager'
import { ElTable } from 'element-plus'
import type { Table } from 'element-plus/packages/table/src/table/defaults'
import type {
  IPandoraTableProps,
  IPandoraTableColumn,
  IPandoraTableSort,
  IPandoraTableOption,
  ISortChangeCb
} from './types'
import { useSortService } from './sort'
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
  setup(props, { emit }) {
    const tableInstance = ref<Table<unknown>>()

    const { columns, data, sortConfig, tableConfig } = toRefs<
      IPandoraTableProps<AnyObject> | any
    >(props.options)
    const columnProps = toRaw(columns.value) as IPandoraTableColumn<any>[]
    const sortRawConfig = toRaw(
      sortConfig.value
    ) as IPandoraTableSort<ISortChangeCb>

    const { pageOpt, pagination, stripe, ...otherProps } = toRefs<
      IPandoraTableOption<AnyObject>
    >(tableConfig.value)
    // 排序service
    const $sortService = useSortService<AnyObject>(
      sortRawConfig,
      columnProps,
      tableInstance
    )

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
      const columnsVNode = useColumnRender(columnProps, $sortService)

      const elTableVNode = <ElTable {...tableProps}>{columnsVNode}</ElTable>
      let pageVNode: any = null
      if (pagination.value) {
        pageVNode = usePagerRender(
          pageOpt,
          handleSizeChange,
          handleCurrentChange
        )
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
