<template>
  <PdContainer title="基础表单">
    <PdForm @register="register" :model="formModel" :schemas="schemas" :formProps="formProps" @submit="handleSubmit" />
    <el-button type="primary" @click="submitForm">保存表单</el-button>
    <el-button @click="resetFields">重置表单</el-button>
  </PdContainer>
</template>

<script setup lang="tsx">
import { reactive } from 'vue'
import { IFormSchema, IFormProps, useForm } from '../../../src/components/PdForm/index'
import type { FormRules } from 'element-plus'
import { Message } from 'element-plus'

// form 值绑定
const formModel = reactive({
  name: '',
  region: '',
  city: '',
  type: '',
})
// form 配置
const formProps: IFormProps = reactive({
  model: formModel,
  size: 'small',
  inline: false,
  labelPosition: 'right',
  labelWidth: '150px',
  showActionButtonGroup: true,
  rules: {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  } as FormRules
})

// form Schema 配置 
const schemas: IFormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    defaultValue: '张三',
    colProps: {
      span: 8
    }
  },
  {
    field: 'region',
    component: 'Input',
    label: '活动区域',
    // model: formModel,
    defaultValue: 'aaaa',
    colProps: {
      span: 8
    }
  },
  {
    field: 'city',
    component: 'Select',
    label: '活动城市',
    // model: formModel,
    defaultValue: 'beijing',
    colProps: {
      span: 8
    },
    componentProps: {
      placeholder: '请选择城市',
      clearable: true,
      options: [
        {
          label: '北京',
          value: 'beijing'
        },
        {
          label: '上海',
          value: 'shanghai'
        },
        {
          label: '沈阳',
          value: 'shenyang'
        },
        {
          label: '广州',
          value: 'guangzhou'
        }
      ]
    }
  },
  {
    field: 'type',
    component: 'CheckboxGroup',
    label: '活动形式',
    // model: formModel,
    defaultValue: ['1', '2'],
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1'
        },
        {
          label: '选项2',
          value: '2'
        },
        {
          label: '选项3',
          value: '3'
        },
        {
          label: '选项4',
          value: '4'
        }
      ]
    }
  }
]

const [register, { resetFields }] = useForm({
  schemas
})
const handleSubmit = (values: Recordable) => {
  console.log('click search,values:' + JSON.stringify(values));
}
const submitForm = () => {
}
</script>
