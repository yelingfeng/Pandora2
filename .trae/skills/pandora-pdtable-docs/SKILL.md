---
name: "pandora-pdtable-docs"
description: "Guides PdTable docs, props and behavior demos. Invoke when editing table examples, pagination/sort/selection docs, or table option descriptions."
---

# Pandora PdTable Docs Guide

用于 Pandora2 中 PdTable 文档与示例开发的执行规范。

## 何时调用

- 用户要求修改 `src/_docs/PdTable/docs/**`
- 用户要求补充 table 属性说明、分页、排序、选择、交互示例
- 用户要求排查文档中的属性描述与示例行为不一致

## 关键事实（基于当前仓库）

- 文档目录：`src/_docs/PdTable/docs`
- 核心文档：`README.md`
- 扩展示例：`pagination.md`、`sort.md`、`selection.md`、`interaction.md`、`styles.md`、`useTable.md`、`colorful.md`
- 示例文件与 mock：同目录下 `*.vue` 与 `mockData.js`

## 实施步骤

1. 修改属性文档时，优先核对 `README.md` 的参数表与默认值。
2. 涉及分页/排序/选择逻辑时，确保对应 demo 可直接复现文档行为。
3. 若新增示例，按现有命名与结构补齐 `.md + .vue`。
4. 完成后执行 docs 构建验证。

## 输出要求

- 说明新增/修改了哪些表格能力说明
- 说明对应 demo 是否同步更新
- 提供构建结果

## 示例代码

### 1) 分页 + 多选 + 排序

```ts
const tableOption = {
  selection: true,
  selectionMode: 'multi',
  selectionPos: 'top',
  pagination: true,
  sortMode: 'single',
  defaultSort: [{ prop: 'age', order: 'descending' }]
}
```

### 2) 选择项可用性控制

```ts
const selectable = (row: any, index: number) => index !== 4
```

### 3) 排序变更回调

```ts
const sortChange = (column: any) => {
  console.log('sort change', column)
}
```

## 属性配置用法（补全）

### 1) 顶层 props（IPandoraTableProps）

- `data: any[]`
- `columns: IPandoraTableColumn[]`
- `sortConfig: IPandoraTableSort`
- `tableConfig: IPandoraTable`

```vue
<PdTable
  :data="tableData"
  :columns="columns"
  :sort-config="sortConfig"
  :table-config="tableConfig"
/>
```

### 2) tableConfig（IPandoraTable）

- `selection: boolean | { selectionMode, selectionPos, selectable }`
- `pagination: boolean`
- `pageOpt: { currentPage, pageSize, pageSizes, total, layout }`
- `rowClick`、`rowChange`
- 同时支持 Element Table 常见字段：`stripe`、`border`、`showHeader`、`highlightCurrentRow` 等

```ts
const tableConfig = {
  stripe: true,
  border: true,
  showHeader: true,
  highlightCurrentRow: true,
  selection: { selectionMode: 'multi', selectionPos: 'top' },
  pagination: true,
  pageOpt: { currentPage: 1, pageSize: 10, total: 120, layout: 'total, prev, pager, next' }
}
```

### 3) columns（IPandoraTableColumn）

- 继承 Element TableColumn 能力：`prop`、`label`、`width`、`sortable`、`fixed` 等
- 扩展字段：`name`、`value`、`render`

```ts
const columns = [
  { prop: 'name', label: '姓名', sortable: true, width: 160 },
  { prop: 'age', label: '年龄', sortable: true, width: 120 },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }) => row.status === 1 ? '启用' : '停用'
  }
]
```
