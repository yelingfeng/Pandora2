const e=`<template>
  <div style="height: 600px; position: relative; border: 1px solid #eee;">
    <PdPageTreeLayout
      :tableLoading="loading"
      height="100%"
      :sidebarWidth="200"
      @sidebar-toggle="handleSidebarToggle"
    >
      <template #sidebar-header>
        <div style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eee;">
          部门树
        </div>
      </template>
      <template #sidebar>
        <div style="padding: 10px;">
          <!-- 模拟树形结构 -->
          <div v-for="i in 5" :key="i" style="padding: 5px; cursor: pointer; display: flex; align-items: center;">
            <el-icon style="margin-right: 5px"><Folder /></el-icon>
            部门 {{ i }}
          </div>
        </div>
      </template>
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
    </PdPageTreeLayout>
  </div>
</template>

<script lang="ts" setup>
import { PdForm, useForm } from '@pandora/components/PdForm'
import { PdPageTreeLayout } from '@pandora/components/PdPageLayout'
import { PdTable, useTable } from '@pandora/components/PdTable'
import { ElMessage, ElIcon } from 'element-plus'
import { Folder } from '@element-plus/icons-vue'
import { ref } from 'vue'

const loading = ref(false)

const handleSidebarToggle = (collapsed: boolean) => {
  console.log('Sidebar toggled:', collapsed)
}

const [registerForm] = useForm({
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
<\/script>
`;export{e as default};
