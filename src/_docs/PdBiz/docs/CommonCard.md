# CommonCard 通用卡片

通用的卡片容器组件，支持标题、提示、跳转图标和加载状态。

<Preview comp-name="PdBiz" demo-name="CommonCard">
  <CommonCardDemo />
</Preview>

## 基础用法

```vue
<template>
  <PdBizCommonCard title="卡片标题">
    <template #content>
      <p>卡片内容</p>
    </template>
  </PdBizCommonCard>
</template>

<script setup>
import { PdBizCommonCard } from '@pandora/components/PdBiz'
</script>
```

## 加载状态

通过 `loading` 属性显示加载状态。

```vue
<PdBizCommonCard title="加载中的卡片" :loading="true">
  <template #content>
    <p>内容加载中...</p>
  </template>
</PdBizCommonCard>
```

## 跳转图标

通过 `showIcon` 属性控制是否显示标题右侧的跳转图标。点击图标触发 `clickHeader` 事件。

```vue
<PdBizCommonCard 
  title="可跳转的卡片" 
  :showIcon="true" 
  @clickHeader="handleJump"
>
  <template #content>
    <p>点击右上角图标跳转</p>
  </template>
</PdBizCommonCard>
```

## 标题提示

通过 `showTips` 和 `titleTip` 属性显示标题提示信息。

```vue
<PdBizCommonCard 
  title="带提示的卡片" 
  :showTips="true" 
  titleTip="这是一段提示信息"
>
  <template #content>
    <p>鼠标悬停标题图标查看提示</p>
  </template>
</PdBizCommonCard>
```

## 自定义标题右侧内容

使用 `titleRight` 插槽自定义标题右侧内容。

```vue
<PdBizCommonCard title="自定义标题">
  <template #titleRight>
    <el-button size="small">操作</el-button>
  </template>
  <template #content>
    <p>卡片内容</p>
  </template>
</PdBizCommonCard>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | `string` | - |
| loading | 是否显示加载状态 | `boolean` | `false` |
| showIcon | 是否显示跳转图标 | `boolean` | `true` |
| showTips | 是否显示标题提示图标 | `boolean` | `false` |
| titleTip | 标题提示内容 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| clickHeader | 点击跳转图标时触发 | `()` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| content | 卡片内容区域 |
| titleRight | 标题右侧自定义内容 |

## 注意事项

- 使用 `content` 插槽而非默认插槽来放置卡片内容
- 跳转图标默认显示，如不需要可设置 `:showIcon="false"`
- 标题提示需要同时设置 `showTips` 和 `titleTip` 才会显示

<script setup>
import CommonCardDemo from '../demos/CommonCard.vue'
</script>
