<template>
  <div class="vpandora-colorful-table">
    <div v-if="resolvedLoading" class="colorful-loading">
      <div class="colorful-loading-mask"></div>
      <div class="colorful-loading-indicator"></div>
    </div>
    <PdTable v-bind="$attrs" :data="displayData" :columns="enhancedColumns" :sortConfig="mergedSortConfig"
      :tableConfig="mergedTableConfig" @register="handleRegister"
      @handleSizePageChange="(v) => emit('handleSizePageChange', v)"
      @handleCurrentPageChange="(v) => emit('handleCurrentPageChange', v)" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PdTable from '../index.vue'
import { tableProps } from '../props'
import { buildDataCellMeta, buildSummaryMeta, formatValueByProp, isTimeString, renderDataCell, renderSummaryCell } from './summary'

defineOptions({
  name: 'ColorfulTable',
  inheritAttrs: false,
  extends: PdTable as any
})

const props = defineProps({
  ...tableProps,
  totalRow: { type: Object as any, default: null },
  summaryEnabled: { type: Boolean, default: true },
  summaryLabel: { type: String, default: '全国' },
  summarySplitMode: { type: Boolean, default: false },
  summaryClickable: { type: Boolean, default: true },
  summaryClickableProps: { type: Array as any, default: () => [] },
  cellClickable: { type: Boolean, default: false },
  cellClickableProps: { type: Array as any, default: () => [] },
  highlightOnRowClick: { type: Boolean, default: true },
  serverSort: { type: Boolean, default: true },
  loading: { type: Boolean as any, default: undefined }
})

const emit = defineEmits([
  'register',
  'handleSizePageChange',
  'handleCurrentPageChange',
  'summary-click',
  'cell-click',
  'sort-change'
])

const selectedRowRef = ref<any>(null)

const resolvedTotalRow = computed(() => {
  if (props.totalRow) return props.totalRow as any
  const list: any[] = Array.isArray(props.data) ? (props.data as any[]) : []
  if (props.summarySplitMode && list.length > 0) return list[0]
  return null
})

const displayData = computed(() => {
  const list: any[] = Array.isArray(props.data) ? (props.data as any[]) : []
  if (props.summarySplitMode && list.length > 0) return list.slice(1)
  return list
})

const summaryClickablePropsSet = computed(() => {
  const arr: string[] = Array.isArray(props.summaryClickableProps)
    ? (props.summaryClickableProps as any)
    : []
  const set = Object.create(null)
  arr.forEach((k) => {
    if (k) set[String(k)] = true
  })
  return set
})

const cellClickablePropsSet = computed(() => {
  const arr: string[] = Array.isArray(props.cellClickableProps)
    ? (props.cellClickableProps as any)
    : []
  const set = Object.create(null)
  arr.forEach((k) => {
    if (k) set[String(k)] = true
  })
  return set
})

const summaryMethod = (param: any) => {
  const columns: any[] = param && Array.isArray(param.columns) ? param.columns : []
  const data: any[] = param && Array.isArray(param.data) ? param.data : []
  const totalRow = resolvedTotalRow.value || (data.length > 0 ? data[0] : null)
  if (!columns.length) return []
  if (!totalRow) return new Array(columns.length).fill('')

  const labelIndexRaw = columns.findIndex((c) => !!(c && c.property))
  const labelIndex = labelIndexRaw >= 0 ? labelIndexRaw : 0
  const clickableEnabled = !!props.summaryClickable
  const clickableFilter = summaryClickablePropsSet.value
  const hasClickableFilter = Object.keys(clickableFilter).length > 0

  const sums: any[] = []

  columns.forEach((column, index) => {
    const prop = column && column.property ? String(column.property) : ''
    if (index < labelIndex) {
      sums[index] = ''
      return
    }
    if (index === labelIndex) {
      sums[index] = props.summaryLabel
      return
    }
    if (!prop) {
      sums[index] = ''
      return
    }

    const rawVal = totalRow[prop]
    const isEmptyVal = rawVal === '' || rawVal === null || typeof rawVal === 'undefined'
    if (isEmptyVal) {
      sums[index] = ''
      return
    }
    if (isTimeString(rawVal)) {
      sums[index] = '-'
      return
    }
    const valueText = formatValueByProp(prop, rawVal)

    const clickable =
      clickableEnabled && (!hasClickableFilter || !!clickableFilter[prop])

    const meta = buildSummaryMeta(totalRow, prop, valueText, clickable)
    sums[index] = renderSummaryCell(meta, (p) => emit('summary-click', p))
  })

  return sums
}

const enhancedColumns = computed(() => {
  const cols: any[] = Array.isArray(props.columns) ? (props.columns as any[]) : []
  const enhance = (list: any[]): any[] => {
    return list.map((c) => {
      if (!c || typeof c !== 'object') return c
      const next: any = { ...c }
      if (Array.isArray(next.columns) && next.columns.length) {
        next.columns = enhance(next.columns)
        return next
      }

      const prop = next.prop || next.value
      if (!prop) return next
      if (typeof next.render === 'function') return next

      next.render = (row: any) => {
        const rawVal = row ? row[prop] : ''
        const valueText = formatValueByProp(String(prop), rawVal)
        const clickableEnabled = !!props.cellClickable
        const clickableFilter = cellClickablePropsSet.value
        const hasClickableFilter = Object.keys(clickableFilter).length > 0
        const clickable = clickableEnabled && (!hasClickableFilter || !!clickableFilter[String(prop)])

        const meta: any = buildDataCellMeta(row || {}, String(prop), valueText)
        meta.clickable = clickable
        return renderDataCell(meta, () =>
          emit('cell-click', { prop: String(prop), row, value: rawVal })
        )
      }
      return next
    })
  }
  return enhance(cols)
})

const mergedTableConfig = computed(() => {
  const base: any = props.tableConfig || {}
  const cfg: any = { ...base }

  const hasTotalRow = !!resolvedTotalRow.value
  const hasData = displayData.value.length > 0
  const showSummary = !!props.summaryEnabled && (hasTotalRow || hasData)

  if (showSummary) {
    cfg.showSummary = true
    cfg.summaryMethod = summaryMethod
  }

  if (props.highlightOnRowClick) {
    const userRowClick = base.onRowClick
    cfg.onRowClick = (row: any, column: any, event: any) => {
      selectedRowRef.value = row
      if (typeof userRowClick === 'function') userRowClick(row, column, event)
    }

    const userRowClassName = base.rowClassName
    cfg.rowClassName = (ctx: any) => {
      let cls = ''
      if (typeof userRowClassName === 'function') {
        const ret = userRowClassName(ctx)
        if (ret) cls = String(ret)
      }
      if (ctx && ctx.row && ctx.row === selectedRowRef.value) {
        cls = cls ? `${cls} colorful-row-highlight` : 'colorful-row-highlight'
      }
      return cls
    }
  }

  return cfg
})

const mergedSortConfig = computed(() => {
  const base: any = props.sortConfig || {}
  const cfg: any = { ...base }
  const userSortChange = base.sortChange

  if (!props.serverSort) return cfg

  cfg.sortChange = (activeSort: any) => {
    if (typeof userSortChange === 'function') userSortChange(activeSort)
    if (!activeSort) return
    const keys = Object.keys(activeSort)
    if (!keys.length) return
    const orderFile = String(keys[0])
    const order = activeSort[orderFile]
    if (!order) return
    const orderType = order === 'ascending' ? 'asc' : 'desc'
    emit('sort-change', { orderFile, orderType })
  }

  return cfg
})

const resolvedLoading = computed(() => {
  if (typeof props.loading !== 'undefined') return !!props.loading
  return false
})

function handleRegister(action: any) {
  emit('register', action)
}
</script>

<style lang="less">
.vpandora-colorful-table {
  position: relative;
  width: 100%;
  height: 100%;
}

.vpandora-colorful-table .colorful-loading {
  position: absolute;
  inset: 0;
  z-index: 10;
}

.vpandora-colorful-table .colorful-loading-mask {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
}

.vpandora-colorful-table .colorful-loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28px;
  height: 28px;
  margin-left: -14px;
  margin-top: -14px;
  border-radius: 50%;
  border: 3px solid #dcdfe6;
  border-top-color: #409eff;
  animation: colorful-spin 1s linear infinite;
}

@keyframes colorful-spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.vpandora-colorful-table .colorful-summary-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 4px;
}

.vpandora-colorful-table .colorful-summary-cell.is-clickable {
  cursor: pointer;
}

.vpandora-colorful-table .colorful-summary-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #c0c4cc;
  font-size: 10px;
  line-height: 12px;
  color: #909399;
  flex: 0 0 auto;
}

.vpandora-colorful-table .colorful-summary-arrow {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  line-height: 1;
}

.vpandora-colorful-table .el-table__footer-wrapper td:hover .colorful-underline {
  text-decoration: underline;
}

.vpandora-colorful-table .el-table__body td:hover .colorful-underline {
  text-decoration: underline;
}

.vpandora-colorful-table .colorful-cell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 4px;
}

.vpandora-colorful-table .colorful-cell.is-clickable {
  cursor: pointer;
}

.vpandora-colorful-table .colorful-cell-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #c0c4cc;
  font-size: 10px;
  line-height: 12px;
  color: #909399;
  flex: 0 0 auto;
}

.vpandora-colorful-table .colorful-cell-arrow {
  position: absolute;
  right: -14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  line-height: 1;
}

.vpandora-colorful-table .colorful-row-highlight {
  background-color: #ecf5ff !important;
}

.vpandora-colorful-table .colorful-row-highlight:hover {
  background-color: #d9ecff !important;
}
</style>
