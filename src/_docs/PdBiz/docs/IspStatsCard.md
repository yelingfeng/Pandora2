# IspStatsCard 运营商统计卡

用于展示按运营商分组的统计数据卡片。

<Preview comp-name="PdBiz" demo-name="IspStatsCard">
  <IspStatsCardDemo />
</Preview>

## 基础用法

```vue
<template>
  <PdBizIspStatsCard :data="statsData" />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizIspStatsCard } from '@pandora/components/PdBiz'

const statsData = ref([
  { isp: '1', count: 1250, flag: 'mobile' },
  { isp: '2', count: 980, flag: 'unicom' },
  { isp: '3', count: 1560, flag: 'telecom' }
])
</script>
```

## 自定义运营商映射

通过 `ispMap` 和 `ispOrder` 属性自定义运营商显示名称和顺序。

```vue
<PdBizIspStatsCard
  :data="statsData"
  :ispMap="{
    '1': '中国移动',
    '2': '中国联通',
    '3': '中国电信',
    '4': '其他运营商'
  }"
  :ispOrder="['1', '2', '3', '4']"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 统计数据 | `IIspStatItem[]` | `[]` |
| ispMap | 运营商映射表 | `Record<string, string>` | 默认映射 |
| ispOrder | 运营商显示顺序 | `string[]` | - |

### IIspStatItem

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| isp | 运营商标识 | `string \| number` | 是 |
| count | 统计数量 | `number` | 是 |
| flag | 运营商标志 | `string` | 是 |

<script setup>
import IspStatsCardDemo from '../demos/IspStatsCard.vue'
</script>
