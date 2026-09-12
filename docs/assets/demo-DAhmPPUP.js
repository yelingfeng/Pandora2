var e=`<template>
  <div style="height: 500px; position: relative; border: 1px solid #eee;">
    <PdPageLayout
      :table-loading="loading"
      height="100%"
      :base-table-height="300"
      :button-config="actionButtons"
      @search="handleQuery"
      @reset="handleReset"
    >
      <template #form>
        <PdForm
          :schemas="searchSchemas as any"
          label-width="80px"
          :show-action-button-group="false"
          @register="registerForm"
        />
      </template>

      <template #toolbar>
        <el-button type="primary" @click="handleExport">新增</el-button>
        <div class="pd-io-group">
          <button type="button" class="pd-io-group__btn" title="导出" @click="handleExport">
            ↓
          </button>
        </div>
      </template>

      <template #table="{ height }">
        <PdTable
          @register="registerTable"
          :height="Math.max(height - 50, 240)"
          style="width: 100%"
        />
      </template>
    </PdPageLayout>
  </div>
</template>

<script lang="ts" setup>
import { PdForm, useForm } from '@pandora/components/PdForm'
import { PdPageLayout, type PageLayoutButton } from '@pandora/components/PdPageLayout'
import { PdTable } from '@pandora/components/PdTable'
import { useTable } from '@pandora/hooks'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const loading = ref(false)

const actionButtons: PageLayoutButton[] = [
  { key: 'search', label: '查询', type: 'primary' },
  { key: 'reset', label: '重置', type: 'default' },
]

const searchSchemas = [
  { field: 'name', label: '姓名', component: 'Input', colProps: { span: 6 } },
  { field: 'age', label: '年龄', component: 'InputNumber', colProps: { span: 6 } },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  { field: 'phone', label: '手机号', component: 'Input', colProps: { span: 6 } },
  { field: 'email', label: '邮箱', component: 'Input', colProps: { span: 6 } },
  { field: 'address', label: '地址', component: 'Input', colProps: { span: 6 } },
]

const [registerForm] = useForm({ schemas: searchSchemas as any })

const [registerTable, { setData }] = useTable({
  columns: [
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄' },
    { prop: 'status', label: '状态' },
    { prop: 'phone', label: '手机号' },
  ],
  data: [
    { name: '张三', age: 18, status: 1, phone: '13800138000' },
    { name: '李四', age: 20, status: 0, phone: '13900139000' },
  ],
})

const handleQuery = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('查询成功')
    setData([{ name: '查询结果1', age: 99, status: 1, phone: '110' }])
  }, 600)
}

const handleReset = () => {
  ElMessage.info('重置')
  setData([
    { name: '张三', age: 18, status: 1, phone: '13800138000' },
    { name: '李四', age: 20, status: 0, phone: '13900139000' },
  ])
}

const handleExport = () => {
  ElMessage.success('操作成功')
}
<\/script>
`;export{e as default};