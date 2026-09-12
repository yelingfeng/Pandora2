# Pandora2 全局样式主题

从 PdPageLayout 组件中提炼出的全局样式系统，提供统一的页面布局、表单、表格样式。

## 使用方式

### 1. 全局引入

在项目入口文件中引入：

```ts
// main.ts
import '@yelingfeng/pandora2/dist/style.css'
// 引入全局样式主题
import '@yelingfeng/pandora2/dist/styles/index.css'
```

### 2. 按需引入

只引入需要的样式：

```ts
// 只引入主题变量
import '@yelingfeng/pandora2/dist/styles/theme.css'

// 只引入布局样式
import '@yelingfeng/pandora2/dist/styles/layout.css'
```

## 主题变量

### 颜色系统

```css
--pd-color-primary: #0064c8;
--pd-color-primary-hover: #0054a8;
--pd-color-border: #d9d9d9;
--pd-color-bg-page: #f0f2f5;
```

### 间距系统

```css
--pd-spacing-xs: 4px;
--pd-spacing-sm: 8px;
--pd-spacing-md: 12px;
--pd-spacing-lg: 16px;
```

### 自定义主题

可以在项目中覆盖 CSS 变量来自定义主题：

```css
:root {
  --pd-color-primary: #1890ff; /* 自定义主题色 */
  --pd-button-height: 36px; /* 自定义按钮高度 */
}
```

## 布局类使用

### 页面容器

```vue
<template>
  <div class="pd-page-container">
    <!-- 表单区域 -->
    <div class="pd-form-section">
      <div class="pd-form-content">
        <el-form>...</el-form>
      </div>
      <div class="pd-button-group">
        <div class="pd-button-section">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </div>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="pd-table-section">
      <div class="pd-table-toolbar">
        <el-button>新增</el-button>
        <el-button>删除</el-button>
      </div>
      <div class="pd-table-body">
        <el-table>...</el-table>
      </div>
    </div>
  </div>
</template>
```

### Tabs 模式

在 Tabs 内嵌页面使用，去掉灰色背景和外边距：

```vue
<template>
  <div class="pd-page-container pd-page-container--tabs">
    <!-- 内容 -->
  </div>
</template>
```

### 表单展开/收起

```vue
<template>
  <div class="pd-form-section" :class="{ 'pd-form-section--expanded': isExpanded }">
    <!-- 表单内容 -->
  </div>
</template>
```

## 工具类

### 布局类

```html
<!-- Flex 布局 -->
<div class="pd-flex">...</div>
<div class="pd-flex-col">...</div>
<div class="pd-flex-center">...</div>

<!-- 间距 -->
<div class="pd-gap-md">...</div>
<div class="pd-p-lg">...</div>
<div class="pd-m-sm">...</div>
```

### 卡片容器

```html
<div class="pd-card">卡片内容</div>
<div class="pd-card pd-card--bordered">带边框卡片</div>
<div class="pd-card pd-card--no-shadow">无阴影卡片</div>
```

## 与 PdPageLayout 的关系

- **PdPageLayout**：功能完整的布局组件，包含自动计算高度、响应式布局等高级特性
- **全局样式类**：提炼出的纯样式类，适用于不使用 PdPageLayout 但需要统一样式的场景

### 何时使用全局样式类

1. 不需要 PdPageLayout 的自动高度计算
2. 需要更灵活的自定义布局
3. 简单的列表页或详情页
4. 需要在非 Vue 环境中使用统一样式

### 何时使用 PdPageLayout

1. 标准的列表页（查询+表格）
2. 需要表单自动展开/收起
3. 需要响应式自适应高度
4. 需要最小化样式代码

## 样式覆盖

### 局部覆盖

```vue
<style scoped>
.pd-page-container {
  --pd-form-padding: 20px 24px; /* 调整表单内边距 */
}
</style>
```

### 全局覆盖

```css
/* global.css */
:root {
  --pd-color-primary: #409eff; /* Element Plus 默认主题色 */
  --pd-button-radius: 4px; /* 更大的圆角 */
}
```

## 最佳实践

### 1. 保持一致性

在整个项目中使用统一的布局类和主题变量，避免混用多种样式方案。

### 2. 语义化类名

使用语义化的类名组合，而不是直接写内联样式：

```html
<!-- ✅ 推荐 -->
<div class="pd-flex pd-gap-md pd-p-lg">...</div>

<!-- ❌ 不推荐 -->
<div style="display: flex; gap: 12px; padding: 16px;">...</div>
```

### 3. 主题定制

通过 CSS 变量统一定制主题，而不是在每个组件中重复样式：

```css
/* ✅ 推荐：在全局定义 */
:root {
  --pd-color-primary: #1890ff;
}

/* ❌ 不推荐：在组件中重复 */
.my-button {
  background: #1890ff;
}
```

### 4. 响应式设计

利用 CSS 变量的特性实现响应式主题：

```css
/* 在不同断点下调整主题变量 */
@media (max-width: 768px) {
  :root {
    --pd-form-padding: 8px 12px;
    --pd-button-height: 28px;
  }
}
```

## 迁移指南

### 从 PdPageLayout 迁移到全局样式类

```vue
<!-- Before: 使用 PdPageLayout -->
<template>
  <PdPageLayout>
    <template #form>
      <el-form>...</el-form>
    </template>
    <template #table>
      <el-table>...</el-table>
    </template>
  </PdPageLayout>
</template>

<!-- After: 使用全局样式类 -->
<template>
  <div class="pd-page-container">
    <div class="pd-form-section">
      <div class="pd-form-content">
        <el-form>...</el-form>
      </div>
    </div>
    <div class="pd-table-section">
      <div class="pd-table-body">
        <el-table>...</el-table>
      </div>
    </div>
  </div>
</template>
```

## 浏览器兼容性

- Chrome/Edge >= 88
- Firefox >= 78
- Safari >= 14

主要依赖 CSS 变量（Custom Properties），现代浏览器均支持。
