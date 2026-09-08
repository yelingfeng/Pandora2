# Loading 加载状态

全局加载状态组件，用于覆盖容器显示加载动画。

<Preview comp-name="PdBiz" demo-name="Loading">
  <LoadingDemo />
</Preview>

## 基础用法

```vue
<template>
  <div style="position: relative; height: 200px;">
    <PdBizLoading :loading="loading" />
    <div v-if="!loading">
      <!-- 内容 -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PdBizLoading } from '@pandora/components/PdBiz'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 2000)
</script>
```

## 自定义加载文本

通过 `text` 属性自定义加载提示文本。

```vue
<PdBizLoading :loading="true" text="数据加载中..." />
```

## 在卡片中使用

常用于卡片、表格等容器组件的加载状态展示。

```vue
<el-card>
  <div style="position: relative; min-height: 150px;">
    <PdBizLoading :loading="loading" />
    <div v-if="!loading">
      <!-- 卡片内容 -->
    </div>
  </div>
</el-card>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示加载状态 | `boolean` | `false` |
| text | 加载提示文本 | `string` | `'加载中...'` |

## 使用说明

### 容器定位

Loading 组件使用绝对定位覆盖父容器，因此父容器需要设置 `position: relative`。

```vue
<!-- ✅ 正确 -->
<div style="position: relative; height: 200px;">
  <PdBizLoading :loading="true" />
</div>

<!-- ❌ 错误：父容器未设置 position -->
<div style="height: 200px;">
  <PdBizLoading :loading="true" />
</div>
```

### 最小高度

建议为父容器设置最小高度，避免加载状态时容器塌陷。

```vue
<div style="position: relative; min-height: 100px;">
  <PdBizLoading :loading="loading" />
</div>
```

### 条件渲染

配合 `v-if` 使用，在加载完成后显示内容。

```vue
<div style="position: relative;">
  <PdBizLoading :loading="loading" />
  <div v-if="!loading">
    <!-- 加载完成后显示的内容 -->
  </div>
</div>
```

<script setup>
import LoadingDemo from '../demos/Loading.vue'
</script>
