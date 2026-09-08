# TabSwitcher 标签切换器

标签式的切换组件，支持数量统计和禁用状态。

<Preview comp-name="PdBiz" demo-name="TabSwitcher">
  <TabSwitcherDemo />
</Preview>

## 基础用法

```vue
<template>
  <PdBizTabSwitcher
    v-model="activeTab"
    :tabs="tabs"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizTabSwitcher } from '@pandora/components/PdBiz'

const activeTab = ref('all')
const tabs = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'doing' },
  { label: '已完成', value: 'done' }
]

const handleChange = (value) => {
  console.log('切换到:', value)
}
</script>
```

## 带数量统计

通过设置 `count` 属性显示统计数量。

```vue
<PdBizTabSwitcher
  v-model="activeTab"
  :tabs="[
    { label: '在线', value: 'online', count: 125 },
    { label: '离线', value: 'offline', count: 38 },
    { label: '告警', value: 'alarm', count: 5 }
  ]"
/>
```

## 禁用状态

通过设置 `disabled` 属性禁用特定标签。

```vue
<PdBizTabSwitcher
  v-model="activeTab"
  :tabs="[
    { label: '标签1', value: 'tab1' },
    { label: '标签2', value: 'tab2', disabled: true },
    { label: '标签3', value: 'tab3' }
  ]"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前选中的标签值 | `string` | - |
| tabs | 标签数据 | `ITabItem[]` | `[]` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签时触发 | `(value: string)` |
| update:modelValue | 更新绑定值 | `(value: string)` |

### ITabItem

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | 是 |
| value | 标签值 | `string` | 是 |
| count | 统计数量 | `number` | 否 |
| disabled | 是否禁用 | `boolean` | 否 |

<script setup>
import TabSwitcherDemo from '../demos/TabSwitcher.vue'
</script>
