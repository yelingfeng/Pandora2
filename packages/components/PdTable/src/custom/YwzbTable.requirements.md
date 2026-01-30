# YwzbTable 抽象封装需求（集成到 PdTable）

## 背景

`packages/components/PdTable/src/custom/YwzbTable.vue` 是一套业务表格封装，基于 Element Plus `el-table` 实现了：

- 汇总行（footer summary）展示与点击联动
- 服务端排序事件转换（`sort-change` -> `{ orderFile, orderType }`）
- 选中行高亮
- 汇总行单元格“数值 + 信息图标 tooltip + 趋势箭头”的渲染
- 鼠标 hover 下划线（对满足条件的 span 添加 underline）
- loading 蒙层（NextLoading）

当前希望把其中“通用可复用”的能力抽象出来，形成一个新的业务组件（可另起名字），但要求**继承（extends）现有 PdTable**，并最终集成在 `packages/components/PdTable` 体系中；数据模拟放在同目录 `data.js`。

本文件先做现状拆解与需求清单，不做实现。

## 现状分析：YwzbTable 组件行为拆解

### 1) 组件结构与渲染策略

- 外层包裹 `.globalTable`，内部渲染：
  - `NextLoading`（遮罩）
  - `el-table`（通过 `v-bind="$attrs"` 透传属性；`v-on="forwardListeners"` 透传事件）
- 列渲染两种模式：
  - 传 `columns`：按配置生成 `el-table-column`（支持一层 `children` 子列）
  - 未传 `columns`：直接透传默认插槽，允许父组件完全自定义列（`demo.vue` 就是这种方式）

### 2) Props（显式对外参数）

- `data:Array`：表格数据源，内部复制到 `localData`
- `columns:Array|null`：可选列配置
- `totalRow:Object|null`：汇总行数据（来自父组件；避免 `$parent`）
- `defaultSort:Object`：默认排序（默认 `{ prop:'cdr_num', order:'descending' }`）

### 3) Emits（对外事件）

- `summary-click(prop)`：点击汇总行某个单元格后，把列 `prop` 回传给外层用于联动（图表等）
- `sort-change({ orderFile, orderType })`：把 Element Plus 的 `sort-change({ prop, order })` 转成业务接口参数（`asc/desc`），并做重复触发去重

### 4) 内部状态与 watch/生命周期

核心状态：

- `localData`：`data` 的浅拷贝
- `selectedRowIndex`：用于行高亮
- `lastSortKey`：用于排序去重
- `lastColumnCount / lastDOMColumnCount`：用于检测列数变化、v-if 切换导致的表结构变化

watch 行为：

- `data`：更新 `localData` 后 `nextTick` 强制刷新汇总行 + 绑定汇总行 click
- `totalRow`：变化时 `nextTick` 强制刷新汇总行；再 `setTimeout` 绑定点击
- `columns` / `hasColumns`：列数变化或 v-if 切换时触发 `forceUpdateSummary`

生命周期：

- `mounted/updated`：反复尝试绑定汇总行事件、设置 underline；并在 `updated` 检测 DOM 列数变化触发重新渲染
- `beforeDestroy`：解除 footer wrapper click 事件

### 5) 汇总行生成（summary-method）

`localGetSummaries({ columns, data })` 逻辑特点：

- 汇总数据源优先使用 `totalRow`，否则退化用 `data[0]`
- 找到第一个有 `property` 的列索引作为“综合”列位置；该位置显示“全国”，之前留空
- 根据字段名规则决定格式化方式：
  - `*_traffic` / `*_byte`：走 `formatTrafficRate` 并带单位
  - `*_num`：走 `formatNumberValueOnly`
  - `*_rate`：拼接 `%`
  - 时间字符串：显示 `-`
- 通过拼接字符串标记“需要图标+tooltip+箭头”的单元格：
  - `displayText|ICON_MARKER|tooltipText|COLOR|colorHex|UDFLAG|up/down`

补充背景与重构方向：

- 该段逻辑最初来自 **Vue2 + element-ui** 场景：element-ui 的 `summary-method` 只能返回 `string[]`，无法直接返回 VNode，也缺少足够的扩展点去自定义汇总行单元格结构，所以当时只能通过 **DOM 二次加工**（扫描文本标记、重建 cell DOM、手写 tooltip）来实现“图标/tooltip/箭头”等富交互。
- 在 **Element Plus** 体系下建议重构为“API 驱动渲染”，把汇总行富交互从 DOM hack 挪到 Vue 渲染层完成，降低对内部 DOM 结构的依赖。

建议的 Element Plus 重构实现方式（按优先级）：

1) `summary-method` 仍返回 `string[]`，但把“富信息”作为结构化数据放到组件状态中
   - `summary-method` 只负责返回**纯展示文本**（不再夹带 `ICON_MARKER`）
   - 同时在组件内维护一份 `summaryMetaByProp`（或 `summaryMetaByIndex`）：
     - `prop -> { color, tooltip, udFlag, clickable }`
   - 配合 `footer-cell-class-name` / `footer-cell-style` 做基础样式（加粗、cursor、颜色等）
   - 在“可控范围内”补充一个轻量的 footer 渲染增强层：
     - 优先使用 Element Plus 提供的 class/style hooks 定位与渲染
     - 若必须插入 icon，可通过 `nextTick` + `footer-cell` 定位做最小 DOM 注入，但注入对象应为可复用 Vue 组件（例如 `RenderDataCell` 的简化版），并集中在单一模块内，避免 scattered DOM 操作

2) 用插槽覆盖汇总行（推荐作为最终形态）
   - 新业务组件（extends PdTable）额外提供 `summaryCell` 插槽：
     - 入参：`{ prop, valueText, meta, columnIndex }`
     - 由业务组件内部负责生成 `meta`（颜色/tooltip/udFlag），并把值格式化后交给 slot
   - 组件内部仍使用 Element Plus 的汇总行机制生成“占位文本”，然后通过 slot 渲染同一套 UI（icon/tooltip/arrow）
   - 好处：交互与样式完全由 Vue 渲染，避免重建 DOM 的复杂性；同时业务可按需覆写渲染

3) 若 Element Plus 后续开放“汇总行 VNode 渲染”能力，则替换为纯渲染方案
   - 保持 `summaryMeta` 与格式化逻辑为纯函数与结构化数据
   - 将当前 “ICON_MARKER” 方案彻底移除

重构验收点（summary 相关）：

- 不再依赖 `|ICON_MARKER|` 文本协议
- tooltip 使用 Element Plus 组件能力（`ElTooltip`），不再手写 tooltip DOM
- 箭头与颜色渲染基于结构化 meta（`*_color` / `*_udFlag`），且能在固定列/footer 场景下稳定工作

### 6) 汇总行的“富渲染”（DOM 二次加工）

现有实现采用**DOM 操作**：

- 在 `.el-table__footer-wrapper td .cell` 中扫描 `|ICON_MARKER|`
- 清空单元格内容，重建 DOM 结构：
  - 文字（应用 color）
  - `i.header-info` 信息图标，并自定义 tooltip（纯 DOM 创建/定位/销毁）
  - 趋势箭头 icon（依赖 `udFlag` 或 color 推断）
- 给第 2-12 列设置加粗和 pointer cursor
- 绑定 footer wrapper click 事件：根据点击 td 的列 index 映射到 column prop 并 emit
- 为 hover underline：扫描所有 `td .cell span`，根据内容规则添加/移除 `show-underline` 类

该方案能工作但维护成本高，且对 Element Plus 的 DOM 结构强依赖（尤其固定列/footer wrapper）。

### 7) 当前代码存在的耦合/问题点

- 组件 import 仍引用工程外部别名（`@/util/biz`、`@/components/common/NextLoading.vue`），与 packages 解耦目标冲突
- 使用了大量直接 DOM 操作 + 定时器，存在：
  - 重复绑定/清理复杂
  - Element Plus 内部结构调整风险
  - 性能风险（每次 updated 扫描全表 span/cell）
- 事件与列 prop 映射：当前有两套逻辑（从 store.states.columns 与从 this.columns），行为不完全一致

## 可抽象复用点（建议抽成“业务增强层”能力）

### A. 汇总行能力（Summary）

1) 汇总数据接入模式

- 支持显式传入 `totalRow`
- 支持“接口返回第一条为汇总数据”的模式：提供工具方法/配置自动拆分

2) 汇总行计算策略可配置

- 字段格式化规则：`*_num`、`*_rate`、流量单位转换、时间字段识别
- 单位字段约定：`${prop}_type`
- 颜色字段约定：`${prop}_color`
- 趋势字段约定：`${prop}_udFlag`（up/down）
- tooltip 文案来源：目前使用 unit 文案，建议可配置 `${prop}_tooltip` 或外部 map

3) 汇总行点击联动

- 按列 prop emit `summary-click(prop)`
- 支持禁用/白名单/黑名单（例如只允许某些指标联动）

### B. 单元格渲染能力（Cell Renderer）

目录下已有 `RenderDataCell.vue`，实现“值+箭头+颜色+点击”：

- 可作为业务组件的一部分（导出给业务使用），避免在多个页面重复写 slot-scope/颜色逻辑
- 但 `RenderDataCell` 的格式化逻辑应与汇总行保持一致（时间识别、*_num 格式化等）

### C. 行选中高亮能力（Row Select Highlight）

- 点击行仅负责高亮，不改变外部 selection
- 高亮样式目前通过 `row-class-name` 实现，适合抽成可选能力：
  - `highlightOnRowClick:boolean`
  - `highlightClass:string`

### D. 排序事件适配（Server Sort Adapter）

- Element Plus `sort-change({ prop, order })` -> `{ orderFile, orderType }`
- 去重（lastSortKey）
- 支持清空排序时的行为（当前是直接 return，不触发）

### E. Loading 蒙层

- 目前 `NextLoading` 与 ElementPlus loading 并存，建议定义业务组件的 loading 行为：
  - `loading:boolean` 明确控制
  - 默认策略：`data` 空时是否显示 loading（当前是 data 为空即 loading）

## 目标形态：新组件（暂定名：PdBizTable / PdYwzbTable）

### 1) 组件定位

- 位于 `packages/components/PdTable` 下，作为 PdTable 的业务增强版本
- 必须 `extends` 现有 PdTable（按要求），并在其基础上新增能力

补充命名约定：

- 重构后的新组件命名为 **ColorfulTable**（对外导出也使用该名字）
- `YwzbTable` 保留在 `custom` 目录仅作为历史实现参考与对照

### 2) 对外 API（建议）

Props（在 PdTable 基础上新增）：

- `totalRow:Object|null`：汇总行数据
- `summaryEnabled:boolean`：是否开启汇总行
- `summaryLabel:string`：汇总行 label（默认“全国”或“合计”）
- `summarySplitMode:boolean`：是否把 `data[0]` 当汇总行（兼容接口返回）
- `summaryClickable:boolean`：是否启用汇总行点击联动
- `summaryClickableProps:Array<string>`：允许点击联动的 prop 白名单（可选）
- `highlightOnRowClick:boolean`：开启行点击高亮
- `serverSort:boolean`：开启排序适配（emit `{ orderFile, orderType }`）
- `loading:boolean`：显式 loading（优先级高）

Emits：

- `summary-click(prop)`
- `sort-change({ orderFile, orderType })`
- 其余沿用 PdTable 的 emits（register / page change 等）

Slots：

- 透传 PdTable 的列渲染方式（columns 配置或 slot 方式）
- 新增可选：`summaryCell`（允许自定义汇总单元格渲染，减少 DOM hack）

### 3) 关键实现原则（需求约束）

- 不再依赖工程 `src` 的业务别名（`@/...`），所有依赖都在 packages 内部（shared 或本组件目录）
- 尽量避免直接 DOM 操作完成“富渲染”，优先使用：
  - Element Plus 自带 `summary-method` 返回 VNode（或通过 slot/formatter）进行渲染
  - 或者提供 `summaryCell` slot 让业务渲染 icon/tooltip/箭头
- 代码风格要求：尽量使用 ES6，避免 `?.` 等语法（以仓库约束为准）

## 开发规范（Vue3 标准化升级）

- 新组件使用 Vue3 Composition API 的 `<script setup>` 风格实现，优先 TypeScript（与仓库现有组件一致）
- 把原先散落在组件 methods/watch/DOM 操作中的逻辑，拆成可复用的“纯函数 + 组合式能力”：
  - 汇总行：纯函数 `buildSummaryTexts()` + `buildSummaryMeta()`（结构化 meta）
  - 单元格格式化：可复用 formatter（时间识别、*_num、*_rate、流量单位）
  - 交互：行高亮、排序适配、汇总点击联动作为可选开关能力
- 目标是提升复用率与扩展性：
  - 新增指标字段时只需要补充规则/映射，不需要改 DOM 处理
  - 新增汇总单元格 UI 时优先通过 `summaryCell` slot 扩展

## 文档与验证（docs）

为便于验证 ColorfulTable 的重构效果，需要在 docs 中补齐最小可用入口：

- 新增 docs 测试组件：展示 ColorfulTable 的核心能力（汇总行、tooltip、箭头、summary-click、排序适配、行高亮、loading）
- 新增 docs 菜单与路由入口：把该测试组件挂到文档站点侧边栏与路由中，便于手动回归验证
- 模拟数据统一来自当前目录 `data.js`

## 数据模拟（data.js）

现状 `data.js` 是 JSON 对象文本，建议调整为可 import 的模块（后续实现阶段执行）：

- `export default {...}` 或 `export const mockData = {...}`
- 供新组件的 demo/文档直接引用

## 拆解工作项（后续实现阶段）

1) 依赖清理
- 移除 `@/util/biz`、`@/components/common/NextLoading.vue` 等外部依赖，统一改为 packages 内部引用

2) 新组件骨架
- 新建业务组件（例如 `PdBizTable.vue`），`extends: PdTable`
- 维持 PdTable 的 register / pagination / columns 渲染能力

3) 汇总行渲染重构
- 汇总数据计算抽成纯函数（不依赖 DOM）
- icon/tooltip/箭头渲染改为“可配置 + 可 slot 覆盖”
- 处理固定列 footer wrapper 的兼容性（若仍需 DOM，需隔离为可选兼容层）

4) 事件与交互
- summary-click：列 prop 映射一致性（优先使用 Element Plus columns store）
- server sort：去重与清空排序策略
- 行高亮：可开关

5) demo 与文档
- 基于 `data.js` 提供最小可运行 demo（仅依赖 packages）

6) 测试
- 组件测试：汇总行显示/点击、排序事件转换、行高亮、loading 显隐

## 验收标准

- 新业务组件在 packages 内可独立使用（不依赖 src 业务代码）
- 具备 YwzbTable 的核心能力：汇总行（含 icon/tooltip/箭头）、汇总点击联动、服务端排序适配、行高亮、loading
- PdTable 原能力不回归（现有测试通过）
- demo 基于 `data.js` 可跑通并展示关键交互
