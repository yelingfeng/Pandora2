<script lang="jsx">
import { createNamespace } from '@pandora/shared/_utils/create/index'
import { ElTable } from 'element-plus'
import { merge } from 'lodash-es'
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  unref,
  watch
} from 'vue'
import { tableProps } from './props'
import { useTableProps } from './props/useTableProps'
import { useColumnRender } from './render/column'
import { usePagerRender } from './render/pager'
// types are omitted to improve dts parsing compatibility

const [name] = createNamespace('Table')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: tableProps,
  emits: ['register', 'handleSizePageChange', 'handleCurrentPageChange'],
  setup(props, { attrs, emit }) {
    const propsRef = ref({})

    const innerProps = reactive({ ...props })

    // update innerProps when props or propsRef changes
    watch(
      [() => props, () => propsRef.value],
      () => {
        const merged = merge({}, unref(props), unref(propsRef))
        if ('data' in merged) innerProps.data = merged.data
        if ('columns' in merged)
          innerProps.columns = merged.columns
        if ('tableConfig' in merged)
          innerProps.tableConfig = merged.tableConfig
        if ('sortConfig' in merged) {
          const nextSortConfig = merged.sortConfig || {}
          const currentSortConfig = innerProps.sortConfig
          if (currentSortConfig && typeof currentSortConfig === 'object') {
            Object.keys(currentSortConfig).forEach((k) => {
              delete currentSortConfig[k]
            })
            Object.assign(currentSortConfig, nextSortConfig)
          } else {
            innerProps.sortConfig = nextSortConfig
          }
        }
      },
      { deep: true, immediate: true }
    )

    const {
      tableInstance,
      currentData,
      columnsProps,
      $sortService,
      handleHeaderClick
    } = useTableProps(innerProps)

    const getConfig = () => innerProps.tableConfig || {}
    const pagination = computed(() => getConfig().pagination)
    const pageOpt = computed(() => getConfig().pageOpt)
    const selectionMode = computed(() => {
      const selection = getConfig().selection
      if (!selection || typeof selection !== 'object') return ''
      return selection.selectionMode || ''
    })
    const tableKey = computed(() => {
      const cols = columnsProps.value || []
      return cols
        .map((c) => c.type || c.prop || c.value || c.label || c.name || '')
        .join('|')
    })

    const unRefProps = computed(() => {
      const {
        pagination: h,
        pageOpt: h2,
        selection: h3,
        ...otherProps
      } = getConfig()

      let obj = {}
      const objKeys = Object.keys(otherProps)
      objKeys.map((prop) => {
        obj[prop] = unref(otherProps[prop])
      })
      return obj
    })

    const internalSelecting = ref(false)
    const handleSelectionChange = (val) => {
      const userHandler = attrs.onSelectionChange
      if (internalSelecting.value) {
        if (userHandler) userHandler(val)
        return
      }

      if (
        unref(selectionMode) === 'single' &&
        Array.isArray(val) &&
        val.length > 1
      ) {
        const last = val[val.length - 1]
        internalSelecting.value = true
        nextTick(() => {
          const inst = tableInstance.value
          if (inst && inst.clearSelection && inst.toggleRowSelection) {
            inst.clearSelection()
            inst.toggleRowSelection(last, true)
          }
          internalSelecting.value = false
        })
        if (userHandler) userHandler([last])
        return
      }

      if (userHandler) userHandler(val)
    }

    const tableAction = {
      setProps: async (props) => {
        propsRef.value = merge({}, unref(propsRef) || {}, props)
        await nextTick()
      },
      setColumns: async (columns) => {
        const update = { columns }
        propsRef.value = {
          ...unref(propsRef),
          ...update,
        }
        await nextTick()
      },
      setData: async (data) => {
        const update = { data }
        console.log('setData', update)
        // propsRef.value = merge({}, unref(propsRef) || {}, update)
        propsRef.value = {
          ...unref(propsRef),
          ...update,
        }
        await nextTick()
      },
      reload: async (_opt) => {
        // TODO reload logic
      },
      getSelectRows: () => {
        const inst = tableInstance.value
        if (inst && inst.getSelectionRows) return inst.getSelectionRows() || []
        return []
      },
      clearSelection: () => {
        const inst = tableInstance.value
        if (inst && inst.clearSelection) inst.clearSelection()
      }
    }

    onMounted(() => {
      nextTick(() => {
        $sortService.init()
      })
      emit('register', tableAction)
    })

    // 分页事件回调
    const handleSizeChange = (val) => {
      emit('handleSizePageChange', val)
    }
    // 分页事件回调
    const handleCurrentChange = (val) => {
      emit('handleCurrentPageChange', val)
    }

    return () => {
      const tableProps = Object.assign(
        {
          ref: tableInstance,
          key: unref(tableKey),
          onHeaderClick: handleHeaderClick,
          onSelectionChange: handleSelectionChange,
          data: currentData.value,
          ...attrs
        },
        unRefProps.value
      )
      // 创建column
      const columnsVNode = useColumnRender(columnsProps.value, $sortService)
      let pageVNode = null
      if (unref(pagination)) {
        pageVNode = usePagerRender(
          unref(pageOpt),
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
