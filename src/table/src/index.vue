<script lang="tsx">
import { defineComponent, onMounted, toRaw, unref, computed } from 'vue'
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

    const { pagination, pageOpt, ...otherProps } = tableConfig
    // console.log(pagination, stripe)
    const unRefProps = computed(() => {
      let obj: any = {}
      for (let key in otherProps) {
        obj[key] = unref(otherProps[key])
      }
      return obj
    })

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
      const tableProps = Object.assign(
        {
          ref: tableInstance,
          onHeaderClick: handleHeaderClick,
          data: currentData.value
        },
        unRefProps.value
      )
      console.log(tableProps)

      // 创建column
      const columnsVNode = useColumnRender(columnsProps.value, $sortService)
      let pageVNode: any = null
      if (unref(pagination)) {
        pageVNode = usePagerRender(
          pageOpt,
          handleSizeChange,
          handleCurrentChange
        )
      }
      return (
        <div class="vpandora-table">
          <ElTable {...tableProps}>{columnsVNode}</ElTable>
          {pageVNode}
        </div>
      )
    }
  }
})
</script>
