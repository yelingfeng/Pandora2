
# 彩色汇总表格 (ColorfulTable)

<Preview comp-name="PdTable" demo-name="colorful">
  <colorful />
</Preview>

## 使用说明

ColorfulTable 是对 PdTable 的增强封装，核心能力：

- 自动解析并渲染「汇总行 + 普通行」的颜色、高亮、趋势箭头、tooltip、单位格式化
- 支持汇总行点击（按列字段 prop 回传），用于联动钻取
- 支持服务端排序：点击表头排序图标后，统一抛出 `sort-change`

### 快速开始

```vue
<template>
  <ColorfulTable
    :data="tableData"
    :columns="columns"
    :tableConfig="tableConfig"
    :summarySplitMode="true"
    :summaryClickableProps="['req_match_rate', 'rsp_match_rate']"
    @summary-click="onSummaryClick"
    @sort-change="onSortChange"
  />
</template>
```

## 属性说明（ColorfulTable 扩展部分）

> 其余 PdTable 原始属性保持一致（`data / columns / tableConfig / sortConfig ...`），这里仅列出扩展/默认行为相关的部分。

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| totalRow | object \| null | null | 手动指定汇总行对象；优先级高于 `summarySplitMode` 推断 |
| summaryEnabled | boolean | true | 是否开启汇总行（基于 Element Plus `show-summary` + `summary-method`） |
| summaryLabel | string | 全国 | 汇总行首列文案（默认展示在第一个存在 `property` 的列上） |
| summarySplitMode | boolean | false | `true` 时认为 `data[0]` 是汇总行，表体展示 `data.slice(1)` |
| summaryClickable | boolean | true | 是否允许汇总行单元格点击 |
| summaryClickableProps | string[] | [] | 限制哪些列可点击；为空表示不限制（配合 `summaryClickable`） |
| highlightOnRowClick | boolean | true | 点击任意行后追加高亮 class（不会影响原始 rowClassName） |
| serverSort | boolean | true | 开启后把 sortService 的排序结果转成 `{orderFile, orderType}` 并 emit `sort-change` |
| loading | boolean \| undefined | undefined | 自定义 loading（叠加遮罩），不传则不显示 |

## 事件说明

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| summary-click | (prop: string) | 点击汇总行某个指标单元格触发，回传列字段名 |
| cell-click | ({ prop: string, row: any, value: any }) | 点击表体普通单元格触发（需开启 `cellClickable`），回传字段/行/原始值 |
| sort-change | ({ orderFile: string, orderType: 'asc' \| 'desc' }) | 开启 `serverSort` 后，点击排序图标触发 |

## 排序演示（serverSort）

ColorfulTable 内部复用了 PdTable 的 sortService，自定义表头排序图标后会把排序状态统一转换成：

```ts
{ orderFile: string; orderType: 'asc' | 'desc' }
```

在 docs demo 中，我们把最近一次排序状态展示在顶部：

```vue
<ColorfulTable
  :serverSort="true"
  @sort-change="(payload) => { sortState = payload }"
/>
```

> 在真实业务里，你通常会在 `sort-change` 里发起接口请求，并用返回的数据刷新 `data`。

## 单元格点击演示（cell-click）

普通行单元格的点击事件默认关闭，开启后可对指定字段（列）生效：

```vue
<ColorfulTable
  :cellClickable="true"
  :cellClickableProps="['req_match_rate', 'cdr_num_day']"
  @cell-click="({ prop, row, value }) => {
    // docs demo 使用 ElMessageBox 弹窗展示
  }"
/>
```

## 自动渲染规则（普通行 + 汇总行）

ColorfulTable 会自动根据 row 中的「字段后缀」决定显示效果（无需在 columns 写 render）：

- 颜色：`${prop}_color`（例如 `req_match_rate_color`）
- 趋势箭头：`${prop}_udFlag`（值为 `up/down` 时显示 Top/Bottom 图标）
- Tooltip：`${prop}_type`（存在时显示 i 图标，并用 Tooltip 展示）
- 单位格式化：
  - `prop` 包含 `_num`：数值自动转为 万 / 亿 / 万亿（保留 2 位小数）
  - `prop` 包含 `_rate`：追加 `%`
  - `prop` 包含 `_traffic` 或 `_byte`：按 Kbps/Mbps/Gbps/Tbps 逻辑格式化（可按 prop 名推断输入单位）

> 若某列你已经在 columns 中声明了 `render`，ColorfulTable 不会覆盖它（以你的自定义渲染为准）。

## mock 数据说明

demo 使用的 mock 数据：

数据结构约定：

```ts
type Row = Record<string, any> & {
  provName: string
  // 以 cdr_num_day 为例：
  cdr_num_day: number | string
  cdr_num_day_color?: string
  cdr_num_day_udFlag?: 'up' | 'down' | ''
  cdr_num_day_type?: string
}

type Mock = {
  code: number
  message: string
  data: {
    list: Row[]
  }
}
```

demo 默认开启 `summarySplitMode`，因此 `list[0]` 会被当作汇总行（例如 provName=综合），表体从 `list[1]` 开始展示。

<script setup>
import colorful from './colorful.vue'
</script>
