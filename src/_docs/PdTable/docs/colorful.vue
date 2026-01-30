<template>
  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
    <el-button type="primary" link @click="toggleLoading">
      {{ loading ? '关闭 Loading' : '开启 Loading' }}
    </el-button>
    <el-tag size="small" type="info">点击汇总行指标触发 summary-click</el-tag>
    <el-tag size="small" type="info">点击排序图标触发 sort-change</el-tag>
    <el-tag size="small" type="info">点击可配置单元格触发 cell-click</el-tag>
    <el-tag size="small" type="info">点击行高亮</el-tag>
  </div>

  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
    <el-tag size="small" type="success">
      当前排序：{{ sortState.orderFile ? `${sortState.orderFile} ${sortState.orderType}` : '无' }}
    </el-tag>
    <el-tag size="small" type="warning">
      最近单元格点击：{{ lastCellClickText || '无' }}
    </el-tag>
  </div>

  <div style="height: 520px">
    <ColorfulTable :data="tableData" :columns="columns" :tableConfig="tableConfig" :summarySplitMode="true"
      :summaryClickableProps="summaryClickableProps" :loading="loading" @summary-click="onSummaryClick"
      :cellClickable="true" :cellClickableProps="cellClickableProps" @cell-click="onCellClick"
      @sort-change="onSortChange" />
  </div>
</template>

<script setup lang="ts">
import mock from '@pandora/components/PdTable/src/custom/data.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'

const loading = ref(false)

const tableData = computed(() => {
  const anyMock: any = mock as any
  const list = anyMock && anyMock.data && Array.isArray(anyMock.data.list) ? anyMock.data.list : []
  return list
})

const summaryClickableProps = [
  'req_match_rate',
  'rsp_match_rate',
  'cdr_num_day',
  'lost_num_day',
  'user_num',
  'a_user_num',
  'imsi_rate',
  'imsisdn_rate',
  'imei_rate'
]

const cellClickableProps = ['req_match_rate', 'rsp_match_rate', 'cdr_num_day', 'lost_num_day']

const sortState = ref<{ orderFile: string; orderType: 'asc' | 'desc' | '' }>({
  orderFile: '',
  orderType: ''
})

const lastCellClickText = ref('')

const columns = [
  {
    name: '基础信息',
    align: 'center',
    columns: [
      { value: 'provName', name: '省份', align: 'center', width: 120, fixed: 'left' },
      { value: 'provid', name: '省份ID', align: 'center', width: 100 }
    ]
  },
  {
    name: '匹配率(%)',
    align: 'center',
    columns: [
      { value: 'req_match_rate', name: '请求匹配率', align: 'center', width: 140, sortable: true },
      { value: 'rsp_match_rate', name: '响应匹配率', align: 'center', width: 140, sortable: true }
    ]
  },
  {
    name: '数量(自动单位)',
    align: 'center',
    columns: [
      { value: 'cdr_num_day', name: 'CDR数量(天)', align: 'center', width: 150, sortable: true },
      { value: 'lost_num_day', name: '丢包数(天)', align: 'center', width: 150, sortable: true },
      { value: 'user_num', name: '用户数', align: 'center', width: 150, sortable: true },
      { value: 'a_user_num', name: '活跃用户数', align: 'center', width: 150, sortable: true }
    ]
  },
  {
    name: '识别率(%)',
    align: 'center',
    columns: [
      { value: 'imsi_rate', name: 'IMSI识别率', align: 'center', width: 140, sortable: true },
      { value: 'imsisdn_rate', name: 'IMSISDN识别率', align: 'center', width: 160, sortable: true },
      { value: 'imei_rate', name: 'IMEI识别率', align: 'center', width: 140, sortable: true }
    ]
  },
  {
    name: '任务信息',
    align: 'center',
    columns: [
      { value: 'task_id11', name: '任务ID', align: 'center', width: 220 },
      { value: 'create_time11', name: '创建时间', align: 'center', width: 180 }
    ]
  }
]

const tableConfig = {
  border: true,
  height: 480,
  showSummary: true,
  stripe: true
}

function onSummaryClick(prop: string) {
  ElMessage.info(`summary-click: ${prop}`)
}

function onSortChange(payload: any) {
  sortState.value = payload
  ElMessage.success(`sort-change: ${payload.orderFile} ${payload.orderType}`)
}

async function onCellClick(payload: any) {
  const rowName = payload && payload.row ? payload.row.provName : ''
  const value = payload && typeof payload.value !== 'undefined' ? payload.value : ''
  lastCellClickText.value = `${rowName || '-'} / ${payload.prop} = ${value}`
  await ElMessageBox.alert(lastCellClickText.value, 'cell-click', { type: 'info' })
}

function toggleLoading() {
  loading.value = !loading.value
}
</script>
