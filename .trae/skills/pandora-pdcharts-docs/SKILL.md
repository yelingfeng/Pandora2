---
name: "pandora-pdcharts-docs"
description: "Guides PdCharts APIs, demos, autoFormatView and tooltip templates. Invoke when editing PdCharts docs, chart config, transform/engine tooltip, or bar/line/pie examples."
---

# Pandora PdCharts Docs Guide

用于 Pandora2 中 PdCharts 相关开发与文档更新的执行规范。

## 何时调用

- 用户要求修改 `src/_docs/PdCharts/docs/**` 下图表示例或文档
- 用户要求调整 `autoFormatView`、tooltip 模版、axis/series 展示
- 用户要求排查 `transform` / `engine` / `builder` 与 docs 展示不一致问题
- 用户要求新增图表 demo（bar/line/pie/hook）

## 关键事实（基于当前仓库）

- 文档根目录：`src/_docs/PdCharts/docs`
- 主要示例：
  - bar：`basicBar.vue`、`horiRankBar.vue`、`numberBar.vue`、`rateBar.vue`、`tooltipDemo.vue`
  - line：`line01.vue`
  - pie：`pie01.vue`、`pie02.vue`
  - hook：`useCharts.vue`
- 入口说明文档：`src/_docs/PdCharts/docs/README.md`
- 导航由 `src/_docs/list.json` 管理

## 实施步骤

1. 先确认 demo 是否已在 `list.json` 可见；新增 demo 时同步补充导航。
2. 涉及数据格式化时优先走 `autoFormatView`（数组模式），保持 demo 与引擎一致。
3. 涉及 tooltip 时优先使用引擎 `TooltipConfig` 能力：
   - `formatter(params, ctx)`
   - `rowTemplate(row, ctx)`
   - `valueFormatter(val, ctx)`
   - `containerClass` / `itemClass` / `extraCssText`
4. 修改后执行 docs 构建验证，确保示例可渲染且交互生效。

## 输出要求

- 给出变更文件清单
- 明确说明影响的图表类型与模式（如 num/rate/percent）
- 标注是否更新了 `list.json`
- 提供构建结果（通过/失败与关键原因）

## 示例代码

### 1) bar demo 中开启 autoFormatView + tooltip 模版

```ts
setProps({
  data,
  chartConfig: {
    themeMode: 'dark',
    autoFormatView: {
      type: 'rate',
      decimalPlaces: 2,
      unitName: 'Mbps'
    },
    tooltip: {
      containerClass: 'tt-wrap',
      rowTemplate: (row, ctx) =>
        `<tr><td>${row.marker}${row.name}</td><td>${row.value} ${ctx.unit || ''}</td></tr>`
    }
  }
})
```

### 2) 新增 docs demo 并注册导航

```json
{
  "title": "TooltipDemo",
  "compName": "TooltipDemo",
  "compZhName": "Tooltip 模版演示",
  "doc": "_docs/PdCharts/docs/bar/tooltipDemo.md"
}
```

## 属性配置用法（补全）

### 1) Charts 组件常用 props

- `data: any[]` 原始数据
- `chartType: 'pie' | 'line' | 'bar'`
- `subChartType` 二级图表类型（如 `basicBar`、`horiRankBar`、`line01`、`pie01`）
- `chartConfig: IChartConfigType` 图表配置核心入口
- `theme / manualUpdate / loading / loadingOptions / initOptions / updateOptions / autoresize / group / options`

```vue
<Charts
  :data="data"
  chartType="bar"
  subChartType="basicBar"
  :chartConfig="chartConfig"
  :loading="loading"
  @register="register"
/>
```

### 2) chartConfig 全字段（IChartConfigType）

- `themeMode: 'light' | 'dark'`
- `colors: string[]`
- `smooth: boolean`（折线平滑）
- `subChartType`
- `legend: Record<string, any>`
- `axisLabel: AxisLabelType`
- `axisLine: AxisLineType`
- `splitLine: BaseLineType`
- `tooltip: TooltipConfig`
- `dataZoom: DataZoomType`
- `bar: BarConfig`
- `autoFormatView: AutoFormatArrayOptions`

```ts
const chartConfig = {
  themeMode: 'dark',
  colors: ['#5B8FF9', '#5AD8A6'],
  smooth: true,
  legend: { show: true },
  axisLabel: { xAxis: true, yAxis: true, color: '#AFC4FF' },
  axisLine: { xAxis: true, yAxis: true },
  splitLine: { yAxis: true, xAxis: false, lineType: 'dashed' },
  dataZoom: { show: true, start: 20 },
  autoFormatView: { type: 'num', decimalPlaces: 1, unitName: '' }
}
```

### 3) autoFormatView 用法（数组模式）

- `type: 'flow' | 'num' | 'percent' | 'custom' | 'rate'`
- `key?: string`（默认 `value`）
- `decimalPlaces?: number`
- `showUnitLabel?: boolean`
- `unitName?: string`

```ts
autoFormatView: {
  key: 'value',
  type: 'percent',
  decimalPlaces: 2,
  unitName: '',
  showUnitLabel: false
}
```

### 4) tooltip 扩展字段（TooltipConfig）

- `containerClass?: string`
- `itemClass?: string`
- `extraCssText?: string`
- `formatter?: (params, ctx) => string`
- `rowTemplate?: (row, ctx) => string`
- `valueFormatter?: (val, ctx) => string`

```ts
tooltip: {
  containerClass: 'tt-wrap',
  itemClass: 'tt-row',
  valueFormatter: (val) => Number(val).toFixed(2),
  rowTemplate: (row, ctx) =>
    `<tr><td>${row.marker}${row.name}</td><td>${row.value} ${ctx.unit || ''}</td></tr>`
}
```
