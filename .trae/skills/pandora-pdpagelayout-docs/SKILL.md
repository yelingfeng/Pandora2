---
name: "pandora-pdpagelayout-docs"
description: "Guides PdPageLayout docs and layout demos. Invoke when editing page layout examples, search+table page structure docs, or adaptive collapse behavior."
---

# Pandora PdPageLayout Docs Guide

用于 Pandora2 中 PdPageLayout 文档与示例开发的执行规范。

## 何时调用

- 用户要求修改 `src/_docs/PdPageLayout/docs/**`
- 用户要求调整“上部搜索 + 下部表格”页面布局示例
- 用户要求更新布局说明（高度自适应、折叠交互）

## 关键事实（基于当前仓库）

- 文档目录：`src/_docs/PdPageLayout/docs`
- 核心文档：`README.md`（基础布局）
- 扩展文档：`TreeLayout.md`
- 示例：`demo.vue`、`demo-tree.vue`

## 实施步骤

1. 优先保持示例与 README 描述一致（布局结构、折叠体验）。
2. 修改 TreeLayout 时同步验证普通布局页不受影响。
3. 若新增布局示例，按 `.md + .vue` 方式组织并补导航。
4. 完成后执行 docs 构建验证。

## 输出要求

- 说明布局场景变化点
- 说明影响文件和示例
- 提供构建结果

## 示例代码

### 1) 基础搜索+表格布局

```vue
<PdPageLayout>
  <template #header>
    <PdForm :schemas="schemas" @register="register" />
  </template>
  <template #content>
    <PdTable :data="data" :column="columns" />
  </template>
</PdPageLayout>
```

### 2) 树侧栏布局

```vue
<PdPageTreeLayout>
  <template #left>
    <el-tree :data="treeData" />
  </template>
  <template #right>
    <PdTable :data="data" :column="columns" />
  </template>
</PdPageTreeLayout>
```

## 属性配置用法（补全）

### 1) PdPageLayout props

- `height: Number | String`，默认 `calc(100vh - 124px)`
- `baseTableHeight: number`，默认 `400`
- `tableLoading: boolean`，默认 `false`
- `style: String | Object`

```vue
<PdPageLayout
  :height="'calc(100vh - 160px)'"
  :base-table-height="420"
  :table-loading="loading"
  :style="{ padding: '12px' }"
>
  <template #form>
    <PdForm :schemas="schemas" @register="register" />
  </template>
  <template #table>
    <PdTable :data="data" :columns="columns" />
  </template>
</PdPageLayout>
```

### 2) PdPageTreeLayout 常用属性（基于当前 docs 场景）

- 继承主布局参数（高度/加载等）
- 常见扩展：左侧树区域宽度、显隐状态、折叠交互（按 demo/tree 约定）

```vue
<PdPageTreeLayout>
  <template #left>
    <el-tree :data="treeData" />
  </template>
  <template #right>
    <PdPageLayout :table-loading="loading">
      <template #form>
        <PdForm :schemas="schemas" @register="register" />
      </template>
      <template #table>
        <PdTable :data="data" :columns="columns" />
      </template>
    </PdPageLayout>
  </template>
</PdPageTreeLayout>
```
