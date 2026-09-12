# Pandora2

<p align="center">
  <img src="https://github.com/yelingfeng/Pandora2/blob/main/src/assets/pandora-logo.png?raw=true" alt="Pandora2 Logo" width="200" />
</p>

<p align="center">
  <a href="https://github.com/yelingfeng/Pandora2"><img src="https://img.shields.io/github/package-json/v/yelingfeng/Pandora2" alt="version" /></a>
  <a href="https://www.npmjs.com/package/@yelingfeng/pandora2"><img src="https://img.shields.io/npm/v/@yelingfeng/pandora2" alt="npm" /></a>
  <a href="https://github.com/yelingfeng/Pandora2/actions/workflows/node.js.yml"><img src="https://img.shields.io/github/actions/workflow/status/yelingfeng/Pandora2/node.js.yml?branch=main&amp;event=push&amp;label=CI" alt="CI" /></a>
  <a href="https://codecov.io/gh/yelingfeng/Pandora2"><img src="https://img.shields.io/codecov/c/github/yelingfeng/Pandora2" alt="coverage" /></a>
  <a href="https://github.com/yelingfeng/Pandora2/blob/main/LICENSE"><img src="https://img.shields.io/github/license/yelingfeng/Pandora2" alt="license" /></a>
</p>

<p align="center">
  <strong>基于 Vue 3 + TypeScript + Element Plus 的业务组件库</strong><br />
  用更少的 View 层代码完成常见的后台管理开发
</p>

## 永久冠名 · 特别感谢

感谢以下开发团队成员对本项目的长期支持与贡献：

| Avatar | GitHub | 主页 |
| --- | --- | --- |
| <img src="https://github.com/niumiaomiao.png" width="48" height="48" alt="niumiaomiao" /> | [@niumiaomiao](https://github.com/niumiaomiao) | [喵喵](https://github.com/niumiaomiao) |
| <img src="https://github.com/futai.png" width="48" height="48" alt="futai" /> | [@futai](https://github.com/futai) | [futai](https://github.com/futai) |
| <img src="https://github.com/wangfeng0596.png" width="48" height="48" alt="wangfeng0596" /> | [@wangfeng0596](https://github.com/wangfeng0596) | [wang feng](https://github.com/wangfeng0596) |

---

## ✨ 特性

- 🚀 **Schema 驱动**：表单/表格通过 JSON 配置驱动，减少重复代码
- 📦 **开箱即用**：封装常见后台管理场景（分页、排序、选择、联动等）
- 🎨 **高度可定制**：支持自定义渲染、插槽扩展和主题定制
- 🔧 **完整类型支持**：TypeScript 编写，提供完整的类型定义和智能提示
- ⚡️ **现代化工具链**：基于 Vite 8 + Vue 3.5 + Element Plus 2
- 🧪 **高测试覆盖**：37 个测试文件，108+ 测试用例，包含属性测试（Property-Based Tests）

## 📦 安装

```bash
# pnpm（推荐）
pnpm add @yelingfeng/pandora2

# npm
npm install @yelingfeng/pandora2

# yarn
yarn add @yelingfeng/pandora2
```

## 🚀 快速开始

```ts
import { createApp } from 'vue'
import App from './App.vue'

import Pandora2 from '@yelingfeng/pandora2'
import '@yelingfeng/pandora2/dist/style.css'

const app = createApp(App)
app.use(Pandora2)
app.mount('#app')
```

## 🎯 核心组件

### PdForm - 表单组件
基于 Schema 驱动的动态表单，支持：
- JSON 配置生成表单
- 动态显示/隐藏、启用/禁用
- 字段联动与自定义渲染
- 完整的类型推导（泛型支持）

### PdTable - 表格组件
列配置驱动的数据表格，支持：
- 分页、排序、筛选
- 单选/多选
- 自定义列渲染
- 树形数据展示

### PdPageLayout - 页面布局
表单 + 表格的常用布局封装：
- PageLayout：标准布局
- TreeLayout：带侧边树的布局
- 自动高度计算与响应式

### PdCharts - 图表组件
ECharts 封装，支持：
- 响应式自适应
- 加载状态管理
- 主题切换
- 完整的 TypeScript 类型

### PdBiz - 业务组件库 🆕
常用业务场景组件，包含：
- **CommonCard**：通用卡片容器（带标题、加载状态）
- **ButtonPicker**：按钮样式选择器（Shadcn 风格）
- **Stats**：统计卡片组（自动格式化大数字）
- **TabSwitcher**：轻量级 Tab 切换器
- **Loading**：旋转点加载动画

查看详细文档：[PdBiz README](./packages/components/PdBiz/README.md)

## 🔧 技术栈与版本

| 依赖 | 版本 | 说明 |
| ------ | ------ | ------ |
| Vue | ^3.5.26 | 渐进式 JavaScript 框架 |
| Element Plus | ^2.13.1 | Vue 3 组件库 |
| TypeScript | ^5.9.3 | JavaScript 的超集 |
| Vite | ^8.2.2 | 下一代前端构建工具 |
| Vitest | ^4.0.18 | 由 Vite 驱动的单元测试框架 |
| ECharts | ^5.6.1 | 数据可视化图表库 |
| fast-check | ^4.9.0 | 属性测试（Property-Based Testing）库 |

**开发环境推荐：**
- Node.js: **22.21.1**（与 CI 一致）
- pnpm: **9.x**（与 CI 一致）

## 🧪 测试与覆盖率

### 测试状态

- ✅ **37** 个测试文件
- ✅ **108** 个测试用例
- ✅ 包含属性测试（Property-Based Tests）
- ✅ CI/CD 自动化测试

### 徽章说明

- **test**：GitHub Actions `CI & Publish Pandora2` 在 `main` 分支的测试状态
- **coverage**：Codecov 展示的覆盖率（点击可查看图表与文件级明细）

### 本地运行

```bash
# 运行所有测试
pnpm test

# CI 模式（单次运行）
pnpm run test:ci

# 生成覆盖率报告
pnpm run test:coverage
```

### 覆盖率产物

- `coverage/lcov.info`：用于 CI 上传到 Codecov
- `coverage/index.html`：本地可视化覆盖率报告（图表 + 文件明细）

### 测试覆盖范围

本项目包含完整的测试套件，覆盖以下场景：

**组件测试：**
- PdTable：分页配置、选择配置、Hook 集成、列渲染
- PdForm：Schema 驱动、字段联动、表单验证、读写一致性
- PdPageLayout：布局渲染、按钮配置、高度计算
- PdCharts：ECharts 集成、响应式、加载状态

**工具函数测试：**
- 类型判断（isString、isNumber、isArray 等）
- 命名空间生成（createNamespace）
- Vue 安装辅助（withInstall）
- 日期、环境、Props 工具函数

**属性测试（Property-Based Tests）：**
使用 `fast-check` 库实现，通过生成随机测试数据验证不变量：
- PdTable 优先级不变量
- PdForm 读写一致性不变量
- PdPageLayout 渲染数量不变量
- createNamespace 前缀不变量
- withInstall 注册不变量

## 📦 构建与发布

### 构建命令

```bash
# 构建组件库（生产环境）
pnpm run build:npm

# 构建文档站点
pnpm run build:docs

# 构建库（含类型检查）
pnpm run build:lib

# 代码检查
pnpm run lint

# 代码检查并自动修复
pnpm run lint-fix
```

### 发布流程（Changesets 工作流）

本项目使用 [Changesets](https://github.com/changesets/changesets) 进行版本管理和发布：

```bash
# 1. 创建 changeset（描述本次变更）
pnpm changeset

# 2. 更新版本号和 CHANGELOG
pnpm version-packages

# 3. 发布到 npm
pnpm release
```

### 自动发布（GitHub Actions）

推送 `v*` tag 时会自动触发 CI 发布流程：

```bash
# 推送 tag 触发自动发布
git tag v1.0.7
git push origin v1.0.7
```

**旧版发布脚本（已被 Changesets 替代，仅作兼容保留）：**

```bash
pnpm run release:patch   # 补丁版本 1.0.6 → 1.0.7
pnpm run release:minor   # 次版本 1.0.6 → 1.1.0
pnpm run release:major   # 主版本 1.0.6 → 2.0.0
```

## 🏗️ 工程化特性

### 代码规范

- **ESLint**：代码质量检查
- **Prettier**：代码格式化
- **commitlint**：提交信息规范（遵循 [Conventional Commits](https://www.conventionalcommits.org/)）
- **lint-staged**：Git 暂存区代码检查
- **husky**：Git hooks 管理

### 提交规范

使用 commitlint 确保提交信息符合规范：

```bash
# 格式：<type>(<scope>): <subject>
feat(PdTable): 新增 selectionConfig 配置项
fix(PdForm): 修复 resetFields 不生效的问题
docs(README): 更新安装文档
test(PdCharts): 补充 options 更新测试
chore(deps): 升级 vite 到 8.2.2
```

**常用 type：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具变动

### 类型定义

- **完整的 TypeScript 支持**：所有组件都有完整的类型定义
- **Volar 支持**：提供 `volar.d.ts` 全局组件类型声明
- **泛型支持**：`IFormSchema<T>` 等支持泛型类型推导

### 构建产物

构建后生成以下产物：

```
dist/
├── pandora2.mjs          # ESM 格式
├── pandora2.cjs          # CommonJS 格式
├── pandora2.umd.js       # UMD 格式（浏览器）
├── style.css             # 组件样式
├── business.css          # 业务样式
└── packages/             # TypeScript 类型定义
    └── index.d.ts
```

## 🔄 最近更新（v1.0.6）

本版本完成了大规模的工程化升级和测试体系建设：

### 🎯 Breaking Changes

- **PdTable API 拆分**：
  - 新增 `paginationConfig` 和 `selectionConfig` 独立配置
  - 旧版 `tableConfig` 标记为 deprecated（向后兼容，DEV 模式下显示迁移提示）

### ✨ 新特性

- **工程规范基础设施**：
  - 接入 commitlint（Conventional Commits 规范）
  - 接入 Changesets（版本管理与 CHANGELOG 自动化）
  - 优化 `.gitignore`（正确排除 `coverage/`）

- **构建配置升级**：
  - 升级 `vite-plugin-dts` 从 v1 → v4（修复类型声明生成）
  - 补全 `volar.d.ts` 全局组件声明（PdCharts、PdPageLayout、PdPageTreeLayout）

- **类型精确化**：
  - PdForm 支持 `IFormSchema<T>` 泛型（`componentProps` 类型推导）
  - PdTable 新增 `IPaginationConfig` 和 `ISelectionConfig` 类型

### 🧪 测试体系升级

- **新增测试套件**：
  - PdForm：Hook 集成、Schema 更新、表单验证
  - PdPageLayout：布局渲染、按钮配置、侧边栏折叠
  - PdCharts：ECharts 生命周期、响应式、加载状态
  - shared 工具函数：环境判断、命名空间、类型判断

- **属性测试（Property-Based Tests）**：
  - 使用 fast-check 库实现随机测试数据生成
  - 验证组件和工具函数的不变量属性
  - 提高测试覆盖的边界情况

### ⚙️ CI/CD 优化

- 新增 Lint 步骤（在构建前执行）
- 新增独立的 release job（tag 触发自动发布）
- 确认 pnpm store 缓存和 Codecov 上传

### 📊 覆盖率配置

- 扩展覆盖范围：PdForm、PdPageLayout、PdCharts
- 设置阈值：`lines: 60%`（警告模式）
- 生成报告：`text`、`lcov`、`html`

## 📚 文档与资源

- [GitHub 仓库](https://github.com/yelingfeng/Pandora2)
- [npm 包](https://www.npmjs.com/package/@yelingfeng/pandora2)
- [Codecov 覆盖率](https://codecov.io/gh/yelingfeng/Pandora2)
- [更新日志](./CHANGELOG.md)

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 开发流程

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交变更：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 开发环境搭建

```bash
# 克隆仓库
git clone https://github.com/yelingfeng/Pandora2.git
cd Pandora2

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 构建
pnpm run build:lib
```

## 📄 License

[MIT](./LICENSE) © [yelingfeng](https://github.com/yelingfeng)

## 👨‍💻 开发者

| Author | E-mail | GitHub |
| ------ | ------ | ------ |
| yelingfeng | 315977815@qq.com | [@yelingfeng](https://github.com/yelingfeng) |

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/yelingfeng">yelingfeng</a>
</p>
