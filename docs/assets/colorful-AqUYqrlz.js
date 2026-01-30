const n=`<template>
  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
    <el-button type="primary" link @click="toggleLoading">
      {{ loading ? '关闭 Loading' : '开启 Loading' }}
    </el-button>
    <el-button type="primary" link @click="handleScreenshot">导出截图</el-button>
    <el-tag size="small" type="info">点击汇总行指标触发 summary-click</el-tag>
    <el-tag size="small" type="info">点击排序图标触发 sort-change</el-tag>
    <el-tag size="small" type="info">点击可配置单元格触发 cell-click</el-tag>
    <el-tag size="small" type="info">点击行高亮</el-tag>
  </div>

  <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
    <el-tag size="small" type="success">
      当前排序：{{ sortState.orderFile ? \`\${sortState.orderFile} \${sortState.orderType}\` : '无' }}
    </el-tag>
    <el-tag size="small" type="warning">
      最近单元格点击：{{ lastCellClickText || '无' }}
    </el-tag>
  </div>

  <div style="height: 520px">
    <ColorfulTable :data="tableData" :columns="columns" :tableConfig="tableConfig" :summarySplitMode="true"
      :summaryClickableProps="summaryClickableProps" :loading="loading" @summary-click="onSummaryClick"
      :cellClickable="true" :cellClickableProps="cellClickableProps" @cell-click="onCellClick" @register="onRegister"
      @sort-change="onSortChange" />
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'
import mock from './mockData.js'

const loading = ref(false)
const tableActionRef = ref<any>(null)

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
    name: 'XX率(%)',
    align: 'center',
    columns: [
      { value: 'req_match_rate', name: '请求XX率', align: 'center', width: 140, sortable: true },
      { value: 'rsp_match_rate', name: '响应XX率', align: 'center', width: 140, sortable: true }
    ]
  },
  {
    name: '数量(自动单位)',
    align: 'center',
    columns: [
      { value: 'cdr_num_day', name: 'XXX数量(天)', align: 'center', width: 150, sortable: true },
      { value: 'lost_num_day', name: '丢包数(天)', align: 'center', width: 150, sortable: true },
      { value: 'user_num', name: '用户数', align: 'center', width: 150, sortable: true },
      { value: 'a_user_num', name: '活跃用户数', align: 'center', width: 150, sortable: true }
    ]
  },
  {
    name: '识别率(%)',
    align: 'center',
    columns: [
      { value: 'imsi_rate', name: 'AA识别率', align: 'center', width: 140, sortable: true },
      { value: 'imsisdn_rate', name: 'BB识别率', align: 'center', width: 160, sortable: true },
      { value: 'imei_rate', name: 'CC识别率', align: 'center', width: 140, sortable: true }
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
  ElMessage.info(\`summary-click: \${prop}\`)
}

function onSortChange(payload: any) {
  sortState.value = payload
  ElMessage.success(\`sort-change: \${payload.orderFile} \${payload.orderType}\`)
}

function onRegister(action: any) {
  tableActionRef.value = action
}

async function handleScreenshot() {
  const action = tableActionRef.value
  if (!action || typeof action.exportScreenshot !== 'function') {
    ElMessage.warning('当前表格未注册截图能力')
    return
  }
  await action.exportScreenshot({ filename: 'ColorfulTable截图', download: true })
}

async function onCellClick(payload: any) {
  const rowName = payload && payload.row ? payload.row.provName : ''
  const value = payload && typeof payload.value !== 'undefined' ? payload.value : ''
  lastCellClickText.value = \`\${rowName || '-'} / \${payload.prop} = \${value}\`
  await ElMessageBox.alert(lastCellClickText.value, 'cell-click', { type: 'info' })
}

function toggleLoading() {
  loading.value = !loading.value
}
<\/script>
`;export{n as default};
