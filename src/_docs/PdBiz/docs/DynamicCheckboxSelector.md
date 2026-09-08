# DynamicCheckboxSelector 动态多选选择器

基于抽屉的动态多选组件，支持分组和全选功能。

<Preview comp-name="PdBiz" demo-name="DynamicCheckboxSelector">
  <DynamicCheckboxSelectorDemo />
</Preview>

## 基础用法

```vue
<template>
  <el-button type="primary" @click="visible = true">打开选择器</el-button>
  
  <PdBizDynamicCheckboxSelector
    v-model:visible="visible"
    v-model:selected="selected"
    :options="options"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizDynamicCheckboxSelector } from '@pandora/components/PdBiz'

const visible = ref(false)
const selected = ref([])

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' }
]

const handleConfirm = (values) => {
  console.log('已选择:', values)
}
</script>
```

## 分组选项

通过设置选项的 `type` 属性可以实现分组显示。

```vue
<PdBizDynamicCheckboxSelector
  v-model:visible="visible"
  v-model:selected="selected"
  :options="[
    { label: '路由器', value: 'router', type: '网络设备' },
    { label: '交换机', value: 'switch', type: '网络设备' },
    { label: '服务器', value: 'server', type: '计算设备' },
    { label: '存储', value: 'storage', type: '计算设备' }
  ]"
/>
```

## 默认选中

通过 `v-model:selected` 设置默认选中项。

```vue
<PdBizDynamicCheckboxSelector
  v-model:visible="visible"
  v-model:selected="['apple', 'banana']"
  :options="options"
/>
```

## 自定义标题和按钮

```vue
<PdBizDynamicCheckboxSelector
  v-model:visible="visible"
  v-model:selected="selected"
  :options="options"
  title="选择设备类型"
  confirmText="确认选择"
  cancelText="取消"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示抽屉 | `boolean` | `false` |
| selected | 已选中的值 | `string[]` | `[]` |
| options | 选项数据 | `ICheckboxOption[]` | `[]` |
| title | 抽屉标题 | `string` | `'选择'` |
| confirmText | 确认按钮文本 | `string` | `'确定'` |
| cancelText | 取消按钮文本 | `string` | `'取消'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认时触发 | `(values: string[])` |
| cancel | 点击取消时触发 | `()` |
| update:visible | 更新显示状态 | `(value: boolean)` |
| update:selected | 更新选中值 | `(values: string[])` |

### ICheckboxOption

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 选项文本 | `string` | 是 |
| value | 选项值 | `string` | 是 |
| type | 分组类型 | `string` | 否 |

## 功能说明

- **全选/取消全选**：点击"全选"按钮可以选中/取消所有选项
- **分组选择**：设置 `type` 属性后，同类型选项会显示在同一组，支持按组全选
- **其他分组**：未设置 `type` 的选项会归入"其他"分组

<script setup>
import DynamicCheckboxSelectorDemo from '../demos/DynamicCheckboxSelector.vue'
</script>
