<template>
   <el-row>
      <el-col :span="24">
        <div class="mb-4">
          <el-button @click="changeLabel3" class="mr-2"> 更改字段3label </el-button>
          <el-button @click="changeLabel34" class="mr-2"> 同时更改字段3,4label </el-button>
          <el-button @click="appendField" class="mr-2"> 往字段3后面插入字段10 </el-button>
          <el-button @click="deleteField" class="mr-2"> 删除字段11 </el-button>
        </div>
      </el-col>
   </el-row> 
    <el-row >
      <el-col :span="24">
        <PdForm @register="register" >
        </PdForm>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <PdForm @register="register1">
        </PdForm>
      </el-col>
    </el-row>
</template>

<script setup lang="tsx" name="demo04">
import { IFormSchema, useForm } from '@modules/PdForm/index'
const schemas: IFormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 8,
      },
      show: ({ values }) => {
        return !!values.field5;
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 8,
      },
      ifShow: ({ values }) => {
        console.log(values)
        return !!values.field6;
      },
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8,
      },
      dynamicDisabled: ({ values }) => {
        return !!values.field7;
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      dynamicRules: ({ values }) => {
        return values.field8 ? [{ required: true, message: '字段4必填' }] : [];
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
      field: 'field11',
      component: 'DatePicker',
      label: '字段11',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field5',
      component: 'Switch',
      label: '是否显示字段1(css控制)',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field6',
      component: 'Switch',
      label: '是否显示字段2(dom控制)',
      colProps: {
        span: 8,
      }
    },
    {
      field: 'field7',
      component: 'Switch',
      label: '是否禁用字段3',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field8',
      component: 'Switch',
      label: '字段4是否必填',
      colProps: {
        span: 8,
      },
    },
  ];

  const schemas1: IFormSchema[] = [
    {
      field: 'f1',
      component: 'Input',
      label: 'F1',
      colProps: {
        span: 12,
      },
      componentProps: ({ formModel }) => {
        return {
          placeholder: '同步f2的值为f1',
          onChange: (e: ChangeEvent) => {
            formModel.f2 = e.target.value;
          },
        };
      },
    },
    {
      field: 'f2',
      component: 'Input',
      label: 'F2',
      colProps: {
        span: 12,
      },
      componentProps: { disabled: true },
    },
    {
      field: 'f3',
      component: 'Input',
      label: 'F3',
      colProps: {
        span: 12,
      },
      // @ts-ignore
      componentProps: ({ formActionType }) => {
        return {
          placeholder: '值改变时执行查询,查看控制台',
          onChange: async () => {
            const { validate } = formActionType;
            // tableAction只适用于在表格内开启表单的例子
            // const { reload } = tableAction;
            const res = await validate();
            console.log(res);
          },
        };
      },
    },
  ];

  const [register, {  updateSchema, appendSchemaByField, removeSchemaByFiled }] =
    useForm({
      labelWidth: 180,
      schemas,
      actionColOptions: {
        span: 24,
      }, 
    });
  const [register1] = useForm({
    labelWidth: 180,
    schemas: schemas1,
    actionColOptions: {
      span: 24,
    },
  });
  function changeLabel3() {
    updateSchema({
      field: 'field3',
      label: '字段3 New',
    });
  }
  function changeLabel34() {
    updateSchema([
      {
        field: 'field3',
        label: '字段3 New++',
      },
      {
        field: 'field4',
        label: '字段4 New++',
      },
    ]);
  }

  function appendField() {
    appendSchemaByField(
      {
        field: 'field10',
        label: '字段10',
        component: 'Input',
        colProps: {
          span: 8,
        },
      },
      'field3',
    );
  }
  function deleteField() {
    removeSchemaByFiled('field11');
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