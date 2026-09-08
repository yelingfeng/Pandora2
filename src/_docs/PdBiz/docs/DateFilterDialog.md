# DateFilterDialog 日期筛选对话框

日期范围快速筛选对话框，提供预设的时间范围选项。

<Preview comp-name="PdBiz" demo-name="DateFilterDialog">
  <DateFilterDialogDemo />
</Preview>

## 基础用法

```vue
<template>
  <el-button type="primary" @click="visible = true">打开日期筛选</el-button>
  
  <PdBizDateFilterDialog
    :visible="visible"
    @update:visible="visible = $event"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizDateFilterDialog } from '@pandora/components/PdBiz'

const visible = ref(false)

const handleConfirm = (result) => {
  console.log('选择:', result.option.label)
  console.log('开始时间:', result.startTime)
  console.log('结束时间:', result.endTime)
}
</script>
```

## 默认选项

组件内置了常用的日期范围选项：
- 近1天
- 近3天
- 近7天
- 近30天

## 自定义选项

通过 `options` 属性自定义日期范围选项。

```vue
<PdBizDateFilterDialog
  :visible="visible"
  :options="[
    { label: '今天', value: 0, desc: '今天的数据', days: 0 },
    { label: '近3天', value: 3, desc: '最近3天', days: 3 },
    { label: '近一周', value: 7, desc: '最近7天', days: 7 },
    { label: '近半个月', value: 15, desc: '最近15天', days: 15 },
    { label: '近一个月', value: 30, desc: '最近30天', days: 30 }
  ]"
  @confirm="handleConfirm"
/>
```

## 自定义按钮文本

```vue
<PdBizDateFilterDialog
  :visible="visible"
  confirmText="确定"
  cancelText="取消"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示对话框 | `boolean` | `false` |
| options | 日期范围选项 | `IDateRangeOption[]` | 默认选项 |
| confirmText | 确认按钮文本 | `string` | `'确认'` |
| cancelText | 取消按钮文本 | `string` | `'取消'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认时触发 | `({ option, startTime, endTime })` |
| cancel | 点击取消时触发 | `()` |
| update:visible | 更新显示状态 | `(value: boolean)` |

### IDateRangeOption

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 选项文本 | `string` | 是 |
| value | 选项值 | `number` | 是 |
| desc | 描述信息 | `string` | 否 |
| days | 天数 | `number` | 是 |

### 返回数据格式

```typescript
{
  option: IDateRangeOption,
  startTime: string, // 格式: YYYY-MM-DD HH:mm:ss
  endTime: string    // 格式: YYYY-MM-DD HH:mm:ss
}
```

<script setup>
import DateFilterDialogDemo from '../demos/DateFilterDialog.vue'
</script>
