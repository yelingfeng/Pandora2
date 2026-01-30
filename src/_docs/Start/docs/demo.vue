<template>
  <div class="demo-container">
    <h3>表单示例</h3>
    <PdForm @register="registerForm" :schemas="schemas" @submit="handleFormSubmit" />

    <div style="margin-top: 30px;">
      <h3>表格示例</h3>
      <div style="height: 400px">
        <PdTable @register="registerTable" />
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { IFormSchema, useForm } from '@pandora/components/PdForm/index'
import { useTable } from '@pandora/hooks'
import { reactive } from 'vue'


// --- 表单部分 ---
const formModel = reactive({
  name: '',
  city: '',
  type: []
})

const schemas: IFormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    componentProps: {
      placeholder: '请输入名称',
    },
    colProps: { span: 8 }
  },
  {
    field: 'city',
    component: 'Select',
    label: '城市',
    componentProps: {
      placeholder: '请选择城市',
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' }
      ]
    },
    colProps: { span: 8 }
  },
  {
    field: 'type',
    component: 'CheckboxGroup',
    label: '类型',
    componentProps: {
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ]
    },
    colProps: { span: 8 }
  }
]

const [registerForm] = useForm({
  schemas,
  labelWidth: '100px',
  model: formModel,
  actionColOptions: { span: 24 }
})

const handleFormSubmit = (values: any) => {
  console.log('Form Submit:', values)
}

// --- 表格部分 ---
const [registerTable] = useTable({
  tableConfig: {
    stripe: true,
    border: true,
    pagination: true,
    pageOpt: {
      total: 30,
      currentPage: 1,
      pageSize: 10
    }
  },
  data: [
    { id: '1', username: '张三', role: 'admin', createTime: '2023-01-01' },
    { id: '2', username: '李四', role: 'user', createTime: '2023-01-02' },
    { id: '3', username: '王五', role: 'user', createTime: '2023-01-03' },
  ],
  columns: [
    { value: 'id', name: 'ID', width: '80' },
    { value: 'username', name: '姓名', width: '120' },
    { value: 'role', name: '角色', width: '100' },
    { value: 'createTime', name: '创建时间', width: '180' },
    {
      value: 'op', name: '操作', align: 'center',
      render: (row: any) => (
        <div>
          <el-button type="primary" link size="small" onClick={() => console.log('Edit', row)}>编辑</el-button>
          <el-button type="danger" link size="small" onClick={() => console.log('Delete', row)}>删除</el-button>
        </div>
      )
    }
  ]
})
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

h3 {
  margin-bottom: 20px;
  font-weight: 600;
  color: #303133;
}
</style>
