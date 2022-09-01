<template>
    <el-row>
      <el-col :span="24">
        <el-button @click="setProps({ labelWidth: 150 })" class="mr-2"> 更改labelWidth </el-button>
        <el-button @click="setProps({ labelWidth: 120 })" class="mr-2"> 还原labelWidth </el-button>
        <el-button @click="setProps({ size: 'large' })" class="mr-2"> 更改Size </el-button>
        <el-button @click="setProps({ size: 'default' })" class="mr-2"> 还原Size </el-button>
        <el-button @click="setProps({ disabled: true })" class="mr-2"> 禁用表单 </el-button>
        <el-button @click="setProps({ disabled: false })" class="mr-2"> 解除禁用 </el-button>
        <el-button @click="setProps({ inline: true })" class="mr-2"> 内联true </el-button>
        <el-button @click="setProps({ inline: false })" class="mr-2"> 内联false </el-button>
        <el-button @click="setProps({ actionColOptions: { span: 8 } })" class="mr-2">
          操作按钮位置
        </el-button>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <PdForm @register="register" :schemas="schemas" @submit="handleSubmit" />
      </el-col>
    </el-row>
</template>

<script setup lang="tsx">
// import { reactive } from 'vue'
import { IFormSchema, useForm } from '../../../src/components/PdForm/index'
import type { FormRules } from 'element-plus'

// // form 值绑定
// const formModelXXX = reactive({
//   name: '',
//   region: '',
//   city: '',
//   type: '',
// })

// form Schema 配置 
const schemas: IFormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8,
      },
      componentProps:{

      }
    },
    {
      field: 'fieldTime',
      component: 'DatePicker',
      label: '时间字段',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1',
          },
          {
            label: '选项2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8,
      },
      defaultValue:[],
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    // {
    //   field: 'field8',
    //   component: 'ApiCascader',
    //   label: '联动',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     api: areaRecord,
    //     apiParamKey: 'parentCode',
    //     dataField: 'data',
    //     labelField: 'name',
    //     valueField: 'code',
    //     initFetchParams: {
    //       parentCode: '',
    //     },
    //     isLeaf: (record) => {
    //       return !(record.levelType < 3);
    //     },
    //   },
    // },
    // {
    //   field: 'field9',
    //   component: 'ApiCascader',
    //   label: '联动回显',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     api: areaRecord,
    //     apiParamKey: 'parentCode',
    //     dataField: 'data',
    //     labelField: 'name',
    //     valueField: 'code',
    //     initFetchParams: {
    //       parentCode: '',
    //     },
    //     isLeaf: (record) => {
    //       return !(record.levelType < 3);
    //     },
    //   },
    // },
  ];

const [register,{setProps, setFieldsValue, updateSchema}] = useForm({
  schemas,
  actionColOptions: {
    span: 24
  },
  // model: formModelXXX,
  labelWidth: '120px',
  labelPosition:'right',
  showAdvancedButton: true,
  showActionButtonGroup: true,
  rules: {
    field1: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  } as FormRules
})


const handleSubmit = (res : Recordable)=>{
  console.log(res)
}

</script>
<style lang="less" >
.mr-2 {
  margin-right: 2px;
}

.el-row {
  margin-top: 5px;
}
</style>