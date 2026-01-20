<template>
  <div style="height: 600px; position: relative; border: 1px solid #eee;">
    <PdPageLayout :tableLoading="loading" height="100%">
      <template #form>
        <PdForm @register="registerForm" @submit="handleQuery" @reset="handleReset">
          <template #advanceAfter>
            <el-button type="success" @click="handleExport">
              <i class="el-icon-download"></i> 导出
            </el-button>
          </template>
        </PdForm>
      </template>
      <template #table="{ height }">
        <PdTable @register="registerTable" :height="height" style="width: 100%" />
      </template>
    </PdPageLayout>
  </div>
</template>

<script lang="ts" setup>
import { PdForm, useForm } from '@pandora/components/PdForm'
import { PdPageLayout } from '@pandora/components/PdPageLayout'
import { PdTable, useTable } from '@pandora/components/PdTable'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const loading = ref(false)

const [registerForm, { getFieldsValue }] = useForm({
  schemas: [
    { field: 'name', label: '姓名', component: 'Input', colProps: { span: 6 } },
    { field: 'age', label: '年龄', component: 'InputNumber', colProps: { span: 6 } },
    {
      field: 'status', label: '状态', component: 'Select', colProps: { span: 6 }, componentProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ]
      }
    },
    // 添加更多字段以展示折叠效果
    { field: 'phone', label: '手机号', component: 'Input', colProps: { span: 6 } },
    { field: 'email', label: '邮箱', component: 'Input', colProps: { span: 6 } },
    { field: 'address', label: '地址', component: 'Input', colProps: { span: 6 } },
  ],
  labelWidth: 80,
})

const [registerTable, { setData }] = useTable({
  columns: [
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄' },
    { prop: 'status', label: '状态' },
    { prop: 'phone', label: '手机号' }
  ],
  data: [
    { name: '张三', age: 18, status: 1, phone: '13800138000' },
    { name: '李四', age: 20, status: 0, phone: '13900139000' },
  ]
})

const handleQuery = (values: any) => {
  console.log('Query:', values)
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('查询成功')
    setData([
      { name: '查询结果1', age: 99, status: 1, phone: '110' }
    ])
  }, 1000)
}

const handleReset = () => {
  ElMessage.info('重置')
  setData([
    { name: '张三', age: 18, status: 1, phone: '13800138000' },
    { name: '李四', age: 20, status: 0, phone: '13900139000' },
  ])
}

const handleExport = () => {
  ElMessage.success('导出数据')
}
</script>
