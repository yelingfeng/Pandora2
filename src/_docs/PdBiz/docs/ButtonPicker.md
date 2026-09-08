# ButtonPicker 按钮选择器

按钮形式的选择器组件，基于 Element Plus 的 Segmented 组件封装，支持单选和禁用状态。

<Preview comp-name="PdBiz" demo-name="ButtonPicker">
  <ButtonPickerDemo />
</Preview>

## 基础用法

```vue
<template>
  <PdBizButtonPicker
    v-model="selected"
    :options="options"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizButtonPicker } from '@pandora/components/PdBiz'

const selected = ref('')
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]

const handleChange = (value) => {
  console.log('选中值:', value)
}
</script>
```

## 禁用选项

通过设置选项的 `disabled` 属性可以禁用特定选项。

```vue
<PdBizButtonPicker
  v-model="selected"
  :options="[
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2', disabled: true },
    { label: '选项3', value: '3' }
  ]"
/>
```

## 时间范围选择

配合 `timeRange` 属性可以实现时间范围的快速选择。

```vue
<PdBizButtonPicker
  v-model="selected"
  :options="[
    { label: '近7天', value: '7', timeRange: true },
    { label: '近30天', value: '30', timeRange: true },
    { label: '近90天', value: '90', timeRange: true }
  ]"
  @change="handleTimeRangeChange"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / value | 绑定值 | `string \| number` | - |
| options | 选项数据 | `IButtonOption[]` | `[]` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值变化时触发 | `(value: string \| number)` |
| input | 更新绑定值（v-model） | `(value: string \| number)` |

### IButtonOption

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 显示文本 | `string` | 是 |
| value | 选项值 | `string \| number` | 是 |
| disabled | 是否禁用 | `boolean` | 否 |
| timeRange | 是否为时间范围选项 | `boolean` | 否 |

## 技术说明

本组件基于 Element Plus 2.7+ 的 `el-segmented` 组件封装，提供了统一的样式和交互体验。相比直接使用 `el-tabs`，`el-segmented` 提供了更好的分段控制器 UI 表现。

<script setup>
import ButtonPickerDemo from '../demos/ButtonPicker.vue'
</script>
