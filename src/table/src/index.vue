<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
import { createNamespace } from '../../_utils/create'
import { useColumnRender } from './render/column'
import { usePagerRender } from './render/pager'
import { ElTable } from 'element-plus'
import { tableProps } from './props'
import { useTableProps } from './props/useTableProps'

const [name] = createNamespace('VTable')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: tableProps,
  setup(props, { emit }) {
    const {
      tableInstance,
      tableConfig,
      currentData,
      columnsProps,
      $sortService,
      handleHeaderClick
    } = useTableProps(props)

    const { pagination, pageOpt, stripe } = tableConfig
    console.log(pagination, stripe)

    onMounted(() => {
      $sortService.init()
    })

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
        data: currentData.value
        // ...otherProps
      }
      // 创建column
      const columnsVNode = useColumnRender(columnsProps.value, $sortService)

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
