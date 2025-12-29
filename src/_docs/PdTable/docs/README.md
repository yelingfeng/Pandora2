<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>

<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# PdTable 组件

Pandora2 的table组件

## 基础使用
<Preview comp-name="PdTable" demo-name="demo">
  <demo />
</Preview>



## `stripe`

- 类型： `Boolean`
- 默认： `false`

是否隔行变色

## `loading`

- 类型： `Boolean`
- 默认： `false`

是否显示`loading`

## `isHeader`

- 类型： `Boolean`
- 默认： `true`

是否显示表头

## `border`

- 类型： `Boolean`
- 默认： `false`

是否带有纵向边框

## `fix`

- 类型： `Boolean`
- 默认： `true`

列的宽度是否自撑开

## `size`

- 类型： `String`
- 默认： `-`
- 可选值： `medium / small / mini`

Table 的尺寸

## `selection`

- 类型： `Boolean`
- 默认： `false`

是否显示`selection`列 包括复选或者单选

## `selectionMode`

- 类型： `string`
- 默认值： `空`
- 可选值: `single`|`multi`

选择模式 单选还是多选 搭配 `selection` 属性使用

## `selectionPos`

- 类型： `string`
- 默认值： `空`
- 可选择: `top` 首列 | `end` 尾列

复现框的位置 在列前还是列后 搭配 `selection` 属性使用

例子

```ts
const tableOption = {
  selection: true,
  selectionPos: 'top',
  selectionMode: 'multi'
}
```

## `selectable`

- 类型： `{Function} (row: object, index: number) => void`
- `row` 行数据
- `index` 列 index

`selection`列 回调处理 可细化每行的`selection`项

例子

```ts
  selectable: function(row: any, index: any) {
    return index !== 4
  }
```

## `sortMode`

- 类型： `string`
- 默认值： `空`
- 可选值: `'single'` | `'multi'`

排序模式 支持二种排列模式 多列和单列

## `defaultSort`

- 类型： `Array`

默认排序字段列配置

```ts
defaultSort: [
  { prop: 'age', order: 'descending' },
  { prop: 'user', order: 'ascending' },
  { prop: 'phone', order: 'ascending' }
]
```

## `defaultOrder`

- 类型： `string`
- 默认值:`'descending'`

默认排序方向 配置优先级

> `defaultSort` > `defaultOrder`

## `sortChange`

- 类型： `{Function} (column: object) => void`

- `column`值: `{Object} key:`排序列定义 ,`value:`对应排序值 `descending` 还是 `ascending` 搭配`defaultSort`使用

排序回调事件

## `highlightCurrentRow`

- 类型: 同`element-ui`

## `rowClick`

- 类型： `{Function} (row: any, column: object, event: any) => void`

行点击事件

## `handleSelectionChange`

- 类型： `{Function} (val: any)`

复选框回调事件

## `pagination`

- 类型: `Boolean`
- 默认值: `true`

是否显示分页

## `pageOpt`

- 类型: `IPageOpt`
- 默认值: `{}`

分页属性配置对象

## `column`

- 类型: `Array{Object}`
- 默认值: `[]`

Table `Column` 数据配置说明

## `data`

- 类型: `Array{Object}`
- 默认值: `[]`

数据

## `summary`

- 类型: `Object{} ISummaryOption`
- 默认值： `{}`

汇总行属性
