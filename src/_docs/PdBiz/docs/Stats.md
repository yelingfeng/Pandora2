# Stats 统计数据展示

用于展示多个统计数据指标的组件。

<Preview comp-name="PdBiz" demo-name="Stats">
  <StatsDemo />
</Preview>

## 基础用法

```vue
<template>
  <PdBizStats :renderData="statsData" layout="auto" />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizStats } from '@pandora/components/PdBiz'

const statsData = ref([
  { label: '总用户数', value: 12580, icon: 'icon-user' },
  { label: '活跃用户', value: 8960, icon: 'icon-active' },
  { label: '新增用户', value: 456 }
])
</script>
```

## 自动布局

组件支持 1-4 个数据项时的自动布局优化。

```vue
<!-- 2个数据项：自动 50% 宽度 -->
<PdBizStats
  :renderData="[
    { label: '总数', value: 1000 },
    { label: '完成', value: 800 }
  ]"
  layout="auto"
/>

<!-- 3个数据项：自动 33.33% 宽度 -->
<PdBizStats
  :renderData="[
    { label: '总数', value: 1000 },
    { label: '进行中', value: 200 },
    { label: '完成', value: 800 }
  ]"
  layout="auto"
/>
```

## Flex 布局

超过 4 个数据项时，建议使用 `flex` 布局。

```vue
<PdBizStats
  :renderData="statsData"
  layout="flex"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| renderData | 统计数据 | `IStatsItem[]` | `[]` |
| layout | 布局方式 | `'auto' \| 'flex'` | `'auto'` |

### IStatsItem

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | 是 |
| value | 统计值 | `number` | 是 |
| icon | 图标类名 | `string` | 否 |

<script setup>
import StatsDemo from '../demos/Stats.vue'
</script>
