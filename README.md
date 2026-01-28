# Pandora2

[![version](https://img.shields.io/github/package-json/v/yelingfeng/Pandora2)](https://github.com/yelingfeng/Pandora2)
[![npm](https://img.shields.io/npm/v/%40yelingfeng%2Fpandora2)](https://www.npmjs.com/package/@yelingfeng/pandora2)
[![test](https://github.com/yelingfeng/Pandora2/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/yelingfeng/Pandora2/actions/workflows/node.js.yml)
[![coverage](https://codecov.io/gh/yelingfeng/Pandora2/branch/main/graph/badge.svg)](https://codecov.io/gh/yelingfeng/Pandora2)

<p align="center">
  <img src="https://github.com/yelingfeng/Pandora2/blob/main/src/assets/logo.svg?raw=true" alt="Pandora2 Logo" />
</p>

### 介绍
---

`Pandora2` 是一套基于 `Vue 3` + `TypeScript` + `Vite` + `Element Plus` 的业务组件库，核心目标是用更少的 View 层代码完成常见的后台管理开发：

- 表单：Schema（JSON）驱动，支持动态显示/禁用、联动与自定义渲染
- 表格：列配置驱动，分页/选择/排序等能力封装
- 页面布局：表单 + 表格的常用布局封装（PageLayout / TreeLayout）
- 图表：ECharts WebComponent 封装（Charts）


### 安装

```bash
pnpm add @yelingfeng/pandora2
```

```ts
import { createApp } from 'vue'
import App from './App.vue'

import Pandora2 from '@yelingfeng/pandora2'
import '@yelingfeng/pandora2/dist/style.css'

const app = createApp(App)
app.use(Pandora2)
app.mount('#app')
```

### 技术栈与版本
| 依赖 | 版本（当前） |
| ------ | ------ |
| Vue | ^3.5.26 |
| Element Plus | ^2.13.1 |
| TypeScript | ^5.9.3 |
| Vite | ^7.3.1 |
| Vitest | ^4.0.18 |
| pnpm（推荐） | 9.x（与 CI 一致） |
| Node（推荐） | 22.21.1（与 CI 一致） |

### 测试与覆盖率
徽章说明：

- test：GitHub Actions `CI & Publish Pandora2` 在 `main` 分支的测试状态
- coverage：Codecov 展示的覆盖率（点击可查看图表与文件级明细）

本地运行：

```bash
pnpm run test:ci
pnpm run test:coverage
```

覆盖率产物：

- `coverage/lcov.info`：用于 CI 上传到 Codecov
- `coverage/index.html`：本地可视化覆盖率报告（图表 + 文件明细）

### 发布（自动打 Tag）
该仓库的 GitHub Actions 会在推送 `v*` tag 时触发 `npm publish`。

本地发布（会自动生成 changelog、提交、打 tag 并 push）：

```bash
pnpm run release:patch
# pnpm run release:minor
# pnpm run release:major
```

如果出现 `Tag already exists: vX.Y.Z`，说明该版本 tag 已经存在（本地或远端），需要先提升 `package.json` 的 version，再重新发布。

#

### 开发者 👨‍💻
| Author | E-mail |
| ------ | ----- |
| [yelingfeng](http://github.com/yelingfeng) | 315977815@qq.com |
