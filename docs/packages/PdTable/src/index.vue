<script lang="tsx">
import { defineComponent, onMounted, unref, computed } from 'vue'
import { createNamespace } from '@/_utils/create/index'
import { useColumnRender } from './render/column'
import { usePagerRender } from './render/pager'
import { ElTable } from 'element-plus'
import { tableProps } from './props'
import { useTableProps } from './props/useTableProps'

const [name] = createNamespace('Table')
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
      const objKeys = Object.keys(otherProps) as Array<keyof typeof otherProps>
      for (let key in objKeys) {
        obj[key] = unref(objKeys[key])
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
<style lang="less">
.vpandora-table {
  width: 100%;
  height: 100%;
}

.vpandora-table .combo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vpandora-table .combo-wrapper .el-image {
  margin-right: 7px;
}

.vpandora-table>.active-thead .sort-caret.descending {
  border-top-color: #409eff;
}

.vpandora-table>.active-thead .sort-caret.ascending {
  border-top-color: #409eff;
}

.vpandora-table .column-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}

.vpandora-table .el-radio__label {
  display: none;
}
</style>
