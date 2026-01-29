<template>
  <el-row type="flex">
    <el-col :span="24">
      <el-button @click="setProps({ labelWidth: 130 })" class="mr-2"> 更改labelWidth </el-button>
      <el-button @click="setProps({ labelWidth: 150 })" class="mr-2"> 还原labelWidth </el-button>
      <el-button @click="setProps({ labelPosition: 'left' })" class="mr-2"> label居左 </el-button>
      <el-button @click="setProps({ labelPosition: 'right' })" class="mr-2"> label居右 </el-button>
      <el-button @click="setProps({ labelPosition: 'top' })" class="mr-2"> label居上 </el-button>
      <el-button @click="setProps({ size: 'large' })" class="mr-2"> 更改Size </el-button>
      <el-button @click="setProps({ size: 'default' })" class="mr-2"> 还原Size </el-button>
      <el-button @click="setProps({ disabled: true })" class="mr-2"> 禁用表单 </el-button>
      <el-button @click="setProps({ disabled: false })" class="mr-2"> 解除禁用 </el-button>
      <el-button @click="setProps({ inline: true })" class="mr-2"> 内联true </el-button>
      <el-button @click="setProps({ inline: false })" class="mr-2"> 内联false </el-button>
      <el-button @click="setProps({ actionColOptions: { span: 8 } })" class="mr-2">
        操作按钮位置
      </el-button>
      <el-button @click="setProps({ actionColOptions: { span: 24 } })" class="mr-2">
        操作按钮还原
      </el-button>
      <el-button @click="setProps({ showAdvancedButton: true })" class="mr-2">
        展开按钮显示
      </el-button>
      <el-button @click="setProps({ showAdvancedButton: false })" class="mr-2">
        展开按钮隐藏
      </el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <PdForm @register="register" :schemas="schemas" @submit="handleSubmit" />
    </el-col>
  </el-row>
</template>

<script setup lang="tsx">
import { IFormSchema, useForm } from '@pandora/components/PdForm/index';

import { optionsListApi } from '@/api/demo/select';
// import type { FormRules } from 'element-plus'

const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1',
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2',
  },
];
const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1',
    },
    {
      label: '深圳市',
      value: '2',
      key: '2',
    },
    {
      label: '广州市',
      value: '3',
      key: '3',
    },
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1',
    },
    {
      label: '无锡市',
      value: '2',
      key: '2',
    },
    {
      label: '苏州市',
      value: '3',
      key: '3',
    },
  ],
};


const colProps = {
  span: 8
}

// form Schema 配置
const schemas: IFormSchema[] = [
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '基础字段',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps,
    // rules: {field1:[{required: true, message: '请输入活动名称', trigger: 'blur' }]},
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
    label: '自定义Props属性',
    colProps,
    componentProps: () => {
      return {
        placeholder: '字段2placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },
    renderComponentContent: () => {
      return {
        prefix: () => 'pSlot',
        suffix: () => 'sSlot',
      };
    },
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '日期选择',
    colProps,
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    }
  },
  {
    field: 'fieldTime',
    component: 'DatePicker',
    label: '时间段字段',
    componentProps: {
      type: 'daterange'
    },
    colProps,
  },
  {
    field: 'field4',
    component: 'Select',
    label: '下拉框',
    colProps,
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
    colProps,
    defaultValue: [],
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
    field: 'field9',
    component: 'Switch',
    label: 'Switch',
    colProps,
  },
  {
    field: 'weights',
    component: 'InputNumber',
    label: '权重',
    colProps,
    subLabel: '( 选填 )',
    componentProps: {
      'controls-position': 'right',
      placeholder: '请输入',
    },
  },
  {
    field: 'disclosure',
    component: 'RadioGroup',
    label: '目标公开',
    colProps,
    componentProps: {
      options: [
        {
          label: '公开',
          value: '1',
        },
        {
          label: '部分公开',
          value: '2',
        },
        {
          label: '不公开',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'fieldSlider',
    component: 'Slider',
    label: 'Slider',
    componentProps: {
      min: 0,
      max: 100,
      range: true,
      marks: {
        20: '20°C',
        60: '60°C',
      },
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'fieldRate',
    component: 'Rate',
    label: 'Rate',
    defaultValue: 3,
    colProps: {
      span: 8,
    },
    componentProps: {
      disabled: false,
      allowHalf: true,
    },
  },
  {
    field: 'field11',
    component: 'Input',
    label: '备注',
    colProps: {
      span: 12
    },
    componentProps: {
      type: 'textarea',
      rows: 5
    }
  },
  {
    field: 'divider-api',
    component: 'Divider',
    label: '远程API',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'fieldApi',
    component: 'ApiSelect',
    label: 'API下拉',
    colProps,
    helpMessage: 'API远程请求默认只会加载一次',
    componentProps: {
      api: optionsListApi,
      params: {
        id: 1,
      },
      resultField: 'list',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: false,
      onChange: (e: any) => {
        console.log('selected:', e);
      },
      // atfer request callback
      onOptionsChange: (options: any) => {
        console.log('get options', options.length, options);
      },
    }
  },
  {
    field: 'divider-cacade',
    component: 'Divider',
    label: '二级联动',
    helpMessage: 'this is demo message test!',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'province',
    component: 'Select',
    label: '省份',
    colProps,
    componentProps: ({ formModel, formActionType }: any) => {
      return {
        options: provincesOptions,
        placeholder: '省份与城市联动',
        onChange: (e: any) => {
          // console.log(e)
          let citiesOptions =
            e == 1
              ? (citiesOptionsData as any)[provincesOptions[0].id]
              : (citiesOptionsData as any)[provincesOptions[1].id];
          // console.log(citiesOptions)
          if (e === undefined) {
            citiesOptions = [];
          }
          formModel.city = undefined; //  reset city value
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'city',
            componentProps: {
              options: citiesOptions,
            },
          });
        },
      };
    },
  },
  {
    field: 'city',
    component: 'Select',
    label: '城市',
    colProps,
    componentProps: {
      options: [], // defalut []
      placeholder: '省份与城市联动',
    },
  },

];


const [register, { setProps }] = useForm({
  schemas,
  actionColOptions: {
    span: 24
  },
  // model: formModelXXX,
  labelWidth: '150px',
  labelPosition: 'right',
  // 回车提交
  autoSubmitOnEnter: true,
  showActionButtonGroup: true,

  showAdvancedButton: false,
  fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
  // rules: {
  //   field1: [
  //     { required: true, message: '请输入活动名称', trigger: 'blur' },
  //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  //   ]
  // } as FormRules
})


const handleSubmit = (res: Recordable) => {
  console.log(res)
}

</script>
<style lang="less">
.mr-2 {
  margin-right: 2px;
}

.el-row {
  margin-top: 5px;
}
</style>
