<template>
  <el-row>
    <el-col :span="24">
      <PdForm @register="register" @submit="handleSubmit">
        <template #f3="{ model, field }">
          <el-input v-model="model[field]" placeholder="自定义slot" />
        </template>
      </PdForm>
    </el-col>
  </el-row>
</template>

<script setup lang="tsx" name="demo04">
import { useMessage } from '@/hooks/web/useMessage';
import { IFormSchema, useForm } from '@pandora/components/PdForm/index';
import { ElInput } from 'element-plus';
const schemas: IFormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: 'render方式',
    colProps: {
      span: 8,
    },
    rules: { required: true },
    render: ({ model, field }) => {
      return <ElInput placeholder="请输入" v-model={model[field]} change={(e: ChangeEvent) => model[field] = e.target.value} />
    },
  },
  {
    field: 'field2',
    component: 'Input',
    label: 'render组件slot',
    colProps: {
      span: 8,
    },
    rules: { required: true },
    renderComponentContent: () => {
      return {
        suffix: () => 'suffix',
      };
    },
  },
  {
    field: 'field3',
    component: 'Input',
    label: '自定义Slot',
    slot: 'f3',
    colProps: {
      span: 8,
    },
    rules: { required: true },
  },
];


const { createMessage } = useMessage();
const [register] = useForm({
  labelWidth: 120,
  schemas,
  actionColOptions: {
    span: 24,
  },
});

const handleSubmit = (values: any) => {
  createMessage.success('click search,values:' + JSON.stringify(values));
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
