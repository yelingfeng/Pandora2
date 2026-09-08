# AdvancedQuery 高级查询

高级查询构造器，支持多字段、多条件的动态查询。

<Preview comp-name="PdBiz" demo-name="AdvancedQuery">
  <AdvancedQueryDemo />
</Preview>

## 基础用法

```vue
<template>
  <el-button type="primary" @click="visible = true">打开高级查询</el-button>
  
  <PdBizAdvancedQuery
    v-model:visible="visible"
    :fields="fields"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizAdvancedQuery } from '@pandora/components/PdBiz'

const visible = ref(false)

const fields = [
  { label: 'IP地址', value: 'ip', type: 'input' },
  { label: '机房', value: 'room', type: 'input' },
  { label: '状态', value: 'status', type: 'input' }
]

const handleConfirm = (conditions) => {
  console.log('查询条件:', conditions)
}
</script>
```

## 支持的条件类型

组件支持以下查询条件：
- **等于**：字段值等于指定值
- **不等于**：字段值不等于指定值
- **包含**：字段值包含指定文本
- **大于**：字段值大于指定值（数值类型）
- **小于**：字段值小于指定值（数值类型）
- **为空**：字段值为空（无需输入值）
- **不为空**：字段值不为空（无需输入值）

## 多字段类型

支持不同类型的字段输入：

```vue
<PdBizAdvancedQuery
  v-model:visible="visible"
  :fields="[
    { label: 'IP地址', value: 'ip', type: 'input' },
    { label: '端口', value: 'port', type: 'number' },
    {
      label: '状态',
      value: 'status',
      type: 'select',
      options: [
        { label: '在线', value: '1' },
        { label: '离线', value: '0' },
        { label: '异常', value: '2' }
      ]
    },
    { label: '创建时间', value: 'createTime', type: 'date' }
  ]"
  @confirm="handleConfirm"
/>
```

## 自定义按钮文本

```vue
<PdBizAdvancedQuery
  v-model:visible="visible"
  :fields="fields"
  confirmText="应用筛选"
  cancelText="重置"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示对话框 | `boolean` | `false` |
| fields | 字段配置 | `IQueryField[]` | `[]` |
| confirmText | 确认按钮文本 | `string` | `'确定'` |
| cancelText | 取消按钮文本 | `string` | `'取消'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认时触发 | `(conditions: IQueryCondition[])` |
| cancel | 点击取消时触发 | `()` |
| update:visible | 更新显示状态 | `(value: boolean)` |

### IQueryField

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 字段显示名称 | `string` | 是 |
| value | 字段值 | `string` | 是 |
| type | 字段类型 | `'input' \| 'number' \| 'select' \| 'date'` | 是 |
| options | 下拉选项（type为select时） | `Array<{label: string, value: string}>` | 否 |

### IQueryCondition

返回的查询条件对象：

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| field | 字段值 | `string` |
| fieldLabel | 字段显示名称 | `string` |
| condition | 条件值 | `string` |
| conditionLabel | 条件显示名称 | `string` |
| value | 查询值 | `any` |

## 使用场景

适用于需要复杂筛选条件的场景，如：
- 数据表格的高级筛选
- 日志查询系统
- 报表数据筛选
- 资源管理系统的条件查询

<script setup>
import AdvancedQueryDemo from '../demos/AdvancedQuery.vue'
</script>
