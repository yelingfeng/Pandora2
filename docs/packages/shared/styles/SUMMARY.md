# 全局样式主题系统总结

## 已完成的工作

### 1. 样式文件创建

创建了以下样式文件：

```
packages/shared/styles/
├── index.css           # 样式入口，导入所有样式文件
├── theme.css          # CSS 变量主题定义
├── layout.css         # 布局工具类（从 PdPageLayout 提炼）
├── element-plus.css   # Element Plus 组件样式覆盖
├── README.md          # 使用文档
└── EXAMPLES.md        # 使用示例
```

### 2. 集成到文档站点

在 `src/main.ts` 中引入全局样式：

```ts
import '../packages/shared/styles/index.css'
```

### 3. 核心特性

#### 主题变量（theme.css）
- 颜色系统：主色、文本色、边框色、背景色
- 间距系统：xs, sm, md, lg, xl
- 圆角：xs, sm, md, lg
- 阴影：card, sm
- 组件特定变量：按钮、表单、表格

#### 布局工具类（layout.css）
- `.pd-page-container` - 页面容器
- `.pd-form-section` - 表单区域
- `.pd-table-section` - 表格区域
- `.pd-button-group` - 按钮组
- `.pd-card` - 卡片容器
- 工具类：flex、gap、padding、margin

#### Element Plus 样式覆盖（element-plus.css）
- 表格：统一表头背景、边框颜色、hover 效果
- 分页器：统一激活状态、hover 颜色
- 表单：统一输入框、选择器样式
- 对话框：统一圆角、间距
- 按钮：统一主色按钮样式
- 其他组件：Tag、Card、Descriptions 等

## 使用方式

### 方式 1：使用全局样式类（推荐用于灵活场景）

```vue
<template>
  <div class="pd-page-container">
    <div class="pd-form-section">
      <div class="pd-form-content">
        <el-form>...</el-form>
      </div>
      <div class="pd-button-group">
        <div class="pd-button-section">
          <el-button type="primary">查询</el-button>
        </div>
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

### 方式 2：使用 PdPageLayout 组件（推荐用于标准场景）

```vue
<template>
  <PdPageLayout
    :button-config="buttonConfig"
    @search="handleSearch"
  >
    <template #form>
      <el-form>...</el-form>
    </template>
    <template #table="{ height }">
      <el-table :height="height">...</el-table>
    </template>
  </PdPageLayout>
</template>
```

### 方式 3：自定义主题

```vue
<style scoped>
.my-page {
  /* 覆盖 CSS 变量 */
  --pd-color-primary: #1890ff;
  --pd-button-height: 36px;
}
</style>
```

## 优势

1. **样式复用**：从 PdPageLayout 提炼出通用样式，可在任何地方使用
2. **主题定制**：基于 CSS 变量，灵活定制主题
3. **渐进增强**：可独立使用，也可配合组件使用
4. **统一风格**：Element Plus 组件样式统一，保持视觉一致性
5. **易于维护**：集中管理样式，修改一处全局生效

## 与 PdPageLayout 的关系

```
┌─────────────────────────────────────────┐
│         PdPageLayout 组件                │
│  ┌────────────────────────────────┐     │
│  │ 功能层                          │     │
│  │ • 自动高度计算                  │     │
│  │ • 响应式布局                    │     │
│  │ • 表单展开/收起                 │     │
│  └────────────────────────────────┘     │
│              ↓                          │
│  ┌────────────────────────────────┐     │
│  │ 样式层（内部 class: pandora-*） │     │
│  │ 基于全局样式类实现              │     │
│  └────────────────────────────────┘     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│     全局样式类（class: pd-*）            │
│  ┌────────────────────────────────┐     │
│  │ 提炼自 PdPageLayout 的样式      │     │
│  │ 可独立使用                      │     │
│  │ 支持主题定制                    │     │
│  └────────────────────────────────┘     │
└─────────────────────────────────────────┘
```

## 样式命名规范

### 组件内部样式
- 命名空间：`pandora-*`
- 示例：`.pandora-form-section`, `.pandora-button-group`
- 使用场景：组件内部，不对外暴露

### 全局样式类
- 命名空间：`pd-*`
- 示例：`.pd-page-container`, `.pd-form-section`
- 使用场景：用户可直接使用的工具类

### CSS 变量
- 命名空间：`--pd-*`
- 示例：`--pd-color-primary`, `--pd-spacing-md`
- 使用场景：主题定制

## 最佳实践

### 1. 选择合适的方式

- **标准列表页**：使用 `PdPageLayout` 组件
- **简单页面**：使用全局样式类
- **自定义布局**：全局样式类 + CSS 变量

### 2. 主题定制

```css
/* 全局定制 */
:root {
  --pd-color-primary: #1890ff;
}

/* 局部定制 */
.my-module {
  --pd-color-primary: #9c27b0;
}
```

### 3. 响应式设计

```css
@media (max-width: 768px) {
  :root {
    --pd-form-padding: 8px 12px;
    --pd-button-height: 28px;
  }
}
```

## 文档参考

- [使用文档](./README.md)
- [使用示例](./EXAMPLES.md)
- [架构文档](../../../.claude/ARCHITECTURE.md)

## 浏览器兼容性

- Chrome/Edge >= 88
- Firefox >= 78
- Safari >= 14

依赖 CSS 变量（Custom Properties）和现代 CSS 特性。
