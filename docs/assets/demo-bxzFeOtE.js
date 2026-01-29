const n=`<template>
    <PdForm @register="register" :schemas="schemas" @submit="handleSubmit" />
</template>

<script setup lang="tsx">
import { reactive } from 'vue'
import { IFormSchema, useForm } from '@pandora/components/PdForm/index'
// import type { FormRules } from 'element-plus'
 
// form 值绑定
const formModelXXX = reactive({
  name: '',
  region: '',
  city: '',
  type: '',
})

// form Schema 配置 
const schemas: IFormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    defaultValue: '',
    componentProps: {
      placeholder: '自定义placeholder',
    }
  },
  {
    field: 'region',
    component: 'Input',
    label: '活动区域',
    defaultValue: '',
  },
  {
    field: 'city',
    component: 'Select',
    label: '活动城市',
    defaultValue: '',
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
    defaultValue: [],
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

const extraSchemas: IFormSchema[] = [];
for (let i = 14; i < 30; i++) {
  extraSchemas.push({
    field: 'field' + i,
    component: 'Input',
    label: '字段' + i,
    colProps: {
      span: 8,
    },
  });
}

const [register] = useForm({
  schemas:[
    ...schemas,
    ...extraSchemas
  ],
  baseColProps: { span: 12 },

  // baseRowStyle : {
  //   backgroundColor : 'red'
  // },
  // 自动设置placeHolder
  autoSetPlaceHolder:false,
  actionColOptions: {
    span: 24
  },
  model: formModelXXX,
  // size: 'small',
  inline: false,
  labelPosition: 'right',
  labelWidth: '120px',
  showAdvancedButton: true,
  showActionButtonGroup: true,
  alwaysShowLines:3,
  // rules: {
  //   name: [
  //     { required: true, message: '请输入活动名称', trigger: 'blur' },
  //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  //   ]
  // } as FormRules
})

const handleSubmit = (res : any)=>{
  console.log(res)
}

<\/script>
`;export{n as default};
