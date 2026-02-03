# PdCharts

Pandora2 的图表组件，基于 ECharts 封装，核心目标：

- 提供一个统一的 `<Charts>` 组件，约定 `data + chartType + subChartType` 即可渲染常见图表
- 通过 `useCharts()` 暴露 ECharts 实例的常用控制能力（setOptions / resize / loading / clear / dispose 等）

<!-- 加载 demo 组件 end -->

<script setup>
import pie02 from './pie/pie02.vue'
import useCharts from './hook/useCharts.vue'
</script>

<!-- 加载 demo 组件 start -->

## 快速开始

### 组件使用

```vue
<template>
  <div style="height: 400px">
    <Charts :data="data" chartType="pie" subChartType="ring" />
  </div>
</template>

<script setup lang="ts">
import { Charts } from '@pandora/components/PdCharts'

const data = [
  { name: 'Search Engine', value: 1048 },
  { name: 'Direct', value: 735 }
]
</script>
```

### useCharts Hook

```ts
import { Charts, useCharts } from '@pandora/components/PdCharts'

const [register, { setOptions, resize, showLoading, hideLoading }] = useCharts()
```

## Charts 组件属性（部分）

完整类型：`ChartsProps`

| 属性名 | 类型 | 说明 |
| --- | --- | --- |
| data | `any[]` | 原始数据，内部会根据 `chartType/subChartType` 转成 option |
| options | `ChartsOption` | 直接传入 ECharts option（`manualUpdate=true` 时可手动 setOptions） |
| chartType | `string` | 业务图表类型（如 `'pie'`、未来可扩展 line/bar 等） |
| subChartType | `string` | 子类型（如 `'ring'`、`'pie01'` 等，交由 transform 层解析） |
| theme | `Theme` | ECharts 主题 |
| manualUpdate | `boolean` | 是否手动更新 options（配合 `setOptions` 使用） |
| autoresize | `AutoresizeProp` | 是否根据容器自动 resize（支持节流配置） |
| loading | `boolean` | 是否显示 loading |
| loadingOptions | `LoadingOptions` | loading 配置（颜色、文案、大小等） |
| initOptions | `InitOptions` | ECharts 初始化参数 |
| updateOptions | `UpdateOptions` | 调用 `setOption` 时的更新参数 |
| group | `string` | 图表 group，同组图表可进行联动 |

## useCharts 返回值

`useCharts(props?)` 返回 `[register, methods]`：

- `register(instance)`：绑定到 `<Charts @register="register" />`
- `methods`：图表实例方法（`ChartsActionType`）

常用方法：

- `setProps(props)`：动态修改 Charts 组件 props，如 `setProps({ loading: true })`
- `setOptions(options)`：调用 ECharts `setOption`（内部处理 manualUpdate/init 逻辑）
- `resize()`：手动触发重绘
- `getInstance()`：获取原始 ECharts 实例（方便访问 addGraphic 等高级能力）
- `showLoading(type?, opts?)` / `hideLoading()`
- `clear()`：清空图表
- `dispose()`：销毁实例

## 事件绑定（ECharts Events）

Charts 支持把 ECharts 事件以 Vue 事件形式直接监听（例如 `@click`、`@legendselectchanged`、`@zr:click` 等），事件名与 ECharts 保持一致；另有一个组件事件：

- `register`：回传 `ChartsActionType`（给 useCharts 使用）

```vue
<Charts
  :data="data"
  chartType="pie"
  @click="(params) => console.log('click', params)"
  @legendselectchanged="() => console.log('legend changed')"
/>
```


