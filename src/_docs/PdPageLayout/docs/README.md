<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>

<!-- 加载 demo 组件 end -->

# PdPageLayout 页面布局

用于构建典型的「上部表单搜索 + 下部表格展示」的页面布局。自动处理高度自适应、查询区折叠/展开，以及 Tab 内嵌场景下的样式适配。

## 基础用法

<Preview comp-name="PdPageLayout" demo-name="demo">
  <demo />
</Preview>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 容器高度 | `number \| string` | `calc(100vh - 94px)` |
| baseTableHeight | 表格初始高度兜底 | `number` | `400` |
| tableLoading | 表格加载遮罩 | `boolean` | `false` |
| layout | 布局模式：`default` 独立页 / `tabs` Tab 内嵌 | `'default' \| 'tabs'` | `'default'` |
| buttonConfig | 查询区按钮配置（配合 PdForm `showActionButtonGroup=false`） | `PageLayoutButton[]` | `[]` |
| initialExpanded | 查询区初始是否展开 | `boolean` | `false` |
| formLabelWidth | 表单项 label 宽度（用于自适应布局计算） | `number` | `120` |
| style | 额外容器样式 | `StyleValue` | `{}` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| search | 点击查询按钮 | `(button: PageLayoutButton)` |
| reset | 点击重置按钮 | `(button: PageLayoutButton)` |
| form-toggle | 查询区展开/收起 | `(expanded: boolean)` |

### Slots

| 插槽 | 说明 |
| --- | --- |
| form | 查询表单（通常放 PdForm） |
| toolbar | 表格上方工具栏 |
| table | 表格区域，参数 `{ height }` |
| buttons | 自定义查询区按钮（未传 buttonConfig 时） |

### Expose

| 方法 | 说明 |
| --- | --- |
| refreshLayout / syncCrudHeight | 主动触发一次布局重算（Tab 切换等场景） |

## 业务默认样式

按需引入阿里云控制台风格的全局样式：

```ts
import '@yelingfeng/pandora2/dist/business.css'
```

包含：按钮、表格、分页、表单、Tab 页签、业务 tip 条（`.pd-biz-hint`）、导入导出分段按钮（`.pd-io-group`）等。
