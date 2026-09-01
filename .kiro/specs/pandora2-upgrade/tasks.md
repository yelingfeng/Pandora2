# Implementation Plan: Pandora2 工程化全面升级

## Overview

基于 14 条需求和详细设计方案，将升级任务分为六个方向依次实现：工程规范（commitlint / Changesets / gitignore）、构建配置（vite-plugin-dts 升级 / global.d.ts 补全）、PdTable API 拆分、PdForm 类型精确化、测试覆盖扩充（PdForm / PdPageLayout / PdCharts / shared）、CI 流水线优化 / Vitest 覆盖率配置。每个方向均包含核心实现子任务，测试子任务标注为可选。

---

## Tasks

- [ ] 1. 工程规范基础设施接入
  - [ ] 1.1 接入 commitlint：在根目录新建 `commitlint.config.cjs`，规则集使用 `@commitlint/config-conventional`；在 `package.json` devDependencies 中添加 `@commitlint/cli` 和 `@commitlint/config-conventional` 精确版本；在 `.husky/commit-msg` 中写入 `npx --no -- commitlint --edit "$1"`；将 `.husky/pre-commit` 补全（`npx lint-staged`）以替代 `package.json` 旧式 `husky.hooks`；在 `scripts` 中新增 `"prepare": "husky"`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ] 1.2 接入 Changesets：新建 `.changeset/config.json`（`changelog`、`access: "public"`、`baseBranch: "main"` 等字段）；新建 `.changeset/README.md` 说明工作流；在 `package.json` devDependencies 中添加 `@changesets/cli` 精确版本；在 `scripts` 中新增 `changeset`、`version-packages`、`release` 三条脚本；保留 `release:patch/minor/major` 并在注释中说明已被 Changesets 替代
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ] 1.3 修正 `.gitignore`：将 `coverage` 条目补充或替换为 `coverage/`，同时保留无斜杠版本，追加 `*.lcov` 条目；如果 `coverage/` 已被 git track，执行 `git rm -r --cached coverage/`
    - _Requirements: 12.1, 12.2, 12.3_

- [ ] 2. 构建配置升级
  - [ ] 2.1 升级 `vite-plugin-dts`：将 `package.json` devDependencies 中 `vite-plugin-dts` 从 `^1.4.1` 升级至 `4.5.4`；更新 `build/lib.config.ts` 中的插件配置，移除已废弃的 `skipDiagnostics`，显式声明 `outDir: 'dist'`，`include` 补全 `.tsx` 匹配，追加 `exclude` 排除 `__tests__` 和 `.vue`，在注释中标注 v1→v4 的 API 破坏性变更
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ] 2.2 补全 `volar.d.ts` 全组件声明：在 `declare module 'vue'` 的 `GlobalComponents` 接口中新增 `PdCharts`、`PdPageLayout`、`PdPageTreeLayout` 的类型声明，保留已有 `PdTable`、`PdForm`、`ColorfulTable` 声明；修改 `packages/components/PdPageLayout/index.ts`，补充导出 `PageLayoutInstance` 和 `PageTreeLayoutInstance` 类型
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 3. PdTable API 拆分（Breaking Change）
  - [ ] 3.1 扩展 PdTable 类型定义：在 `packages/components/PdTable/src/types/index.ts` 中新增 `IPaginationConfig` 接口（`currentPage / total / pageSize / pageSizes / layout / height / pageCount`）和 `ISelectionConfig<T>` 接口（`selectionMode / selectionPos / selectable`）；将 `IPandoraTable` 中的 `pagination`、`pageOpt`、`selection` 字段保留并添加 `@deprecated` JSDoc 注释及迁移路径说明
    - _Requirements: 1.1, 1.2, 1.5_

  - [ ] 3.2 新增 PdTable Props：在 `packages/components/PdTable/src/props/index.ts` 中新增 `paginationConfig`（类型 `IPaginationConfig | false`，默认 `false`）和 `selectionConfig`（类型 `ISelectionConfig`，默认 `undefined`）两个 prop；在 `packages/components/PdTable/index.ts` 中确保 `IPaginationConfig` 和 `ISelectionConfig` 通过 `export *` 对外透传
    - _Requirements: 1.1, 1.2, 1.6_

  - [ ] 3.3 改造 `PdTable/src/index.vue` 兼容层：在 `setup()` 中添加 `effectivePaginationConfig` 和 `effectiveSelectionConfig` computed（新 props 优先级高于旧 `tableConfig` 对应字段）；在 `setup()` 顶部添加 DEV 模式下一次性 `console.warn` deprecation 提示（含迁移路径 URL）
    - _Requirements: 1.3, 1.4_

  - [ ]* 3.4 编写 PdTable 新 Props 属性测试
    - **Property 1: paginationConfig 优先级高于 tableConfig.pagination**
    - **Validates: Requirements 1.3**
    - **Property 2: DEV warn 对任意非空 tableConfig 触发**
    - **Validates: Requirements 1.4**

- [ ] 4. Checkpoint — PdTable 核心改造验证
  - 确认所有已有 PdTable 测试通过，新 props 可正常使用，旧 `tableConfig` 仍正常渲染。如有问题请提问。

- [ ] 5. PdForm schemas 类型精确化
  - [ ] 5.1 在 `packages/components/PdForm/src/types/index.ts` 中新增 `ComponentPropsMap` 类型，为 `ComponentType` 的每种枚举值映射对应的 Element Plus 组件 props 类型（使用 `Partial<XxxProps>`，自定义组件用 `Record<string, any>`）
    - _Requirements: 2.1_

  - [ ] 5.2 将 `IFormSchema` 重构为泛型类型 `IFormSchema<T extends ComponentType = ComponentType>`，`componentProps` 字段类型修改为 `((opt: ...) => ComponentPropsMap[T]) | ComponentPropsMap[T]`；确保不传泛型参数时行为与旧版一致（`IFormProps.schemas?: IFormSchema[]` 签名不变）
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [ ] 6. PdForm 测试套件
  - [ ] 6.1 新建 `packages/components/PdForm/__tests__/PdForm.spec.ts`：覆盖 `useForm` hook 的 `register` 模式（挂载后 `register` 回调被调用，返回的 `IFormActionType` 实例不为 `null`）
    - _Requirements: 3.1, 3.7_

  - [ ] 6.2 新建 `packages/components/PdForm/__tests__/FormSchema.spec.ts`：覆盖 `setFieldsValue` / `getFieldsValue` 读写（设置后可读取相同值）；覆盖 `updateSchema` 方法（调用后对应 field 的 schema 属性更新生效）；覆盖 `resetFields` 方法（调用后恢复 `defaultValue`）
    - _Requirements: 3.2, 3.3, 3.4_

  - [ ]* 6.3 编写 PdForm 读写一致性属性测试
    - **Property 3: setFieldsValue / getFieldsValue 读写一致性**
    - **Validates: Requirements 3.2**
    - **Property 4: updateSchema 字段属性更新生效**
    - **Validates: Requirements 3.3**
    - **Property 5: resetFields 恢复 defaultValue**
    - **Validates: Requirements 3.4**

  - [ ] 6.4 新建 `packages/components/PdForm/__tests__/FormAdvanced.spec.ts`：覆盖 `showAdvancedButton: true` 且 schema 数量超过折叠阈值时，展开/收起按钮的渲染与点击行为
    - _Requirements: 3.5_

  - [ ] 6.5 新建 `packages/components/PdForm/__tests__/FormValidation.spec.ts`：覆盖 `required: true` 字段提交前校验逻辑被触发
    - _Requirements: 3.6_

- [ ] 7. PdPageLayout 测试补全
  - [ ] 7.1 在现有 `packages/components/PdPageLayout/__tests__/PdPageLayout.test.tsx` 中追加 `describe` 块，补全以下场景：默认布局 CSS 类存在（`pandora-page-layout` 等）；`layout: 'tabs'` 时附加 `pandora-page-layout--tabs` 类；`toolbar` 插槽渲染在 `pandora-table-toolbar` 容器内；`expose` 的 `refreshLayout` 和 `syncCrudHeight` 类型为 `function`；`provide('isInPageLayout', true)` 注入行为；`buttonConfig` 为空数组时 fallback 渲染；`syncCrudHeight` 与 `refreshLayout` 是同一函数引用
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ]* 7.2 追加 PdPageLayout buttonConfig 渲染数量属性测试
    - **Property 6: buttonConfig 渲染数量与配置长度一致**
    - **Validates: Requirements 4.4**

  - [ ] 7.3 在同一文件中追加 `PdPageTreeLayout` 的 `describe` 块：覆盖侧边栏折叠/展开行为（点击折叠按钮后 `.pandora-sidebar` 宽度切换、`sidebar-toggle` 事件发射）
    - _Requirements: 4.7_

- [ ] 8. PdCharts 测试套件
  - [ ] 8.1 新建 `packages/components/PdCharts/__tests__/PdCharts.test.tsx`：在文件顶部完整 mock `echarts`（`init` 返回带 `setOption / showLoading / hideLoading / dispose / resize` 等方法的对象）；mock `ResizeObserver`；覆盖挂载后 `echarts.init` 被调用一次；覆盖卸载时 `dispose` 被调用；覆盖 `useCharts` register 模式（`getInstance()` 返回非 null）；覆盖 `options` prop 更新后 `setOption` 被以新值调用；覆盖 `loading: true` 时 `showLoading` 被调用
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [ ]* 8.2 编写 PdCharts options 更新属性测试
    - **Property 7: options 更新触发 setOption**
    - **Validates: Requirements 5.6**

- [ ] 9. shared 工具函数测试补全
  - [ ] 9.1 在 `packages/shared/_utils/__tests__/env.test.ts` 中补充使用 `vi.stubEnv` mock `import.meta.env.DEV/PROD` 后 `isDevMode` / `isProdMode` 返回正确布尔值的测试用例
    - _Requirements: 6.6_

  - [ ] 9.2 新建 `packages/shared/_utils/__tests__/createNamespace.test.ts`：验证 `createNamespace('Table')` 返回元组，第一个元素为 `'PdTable'`；覆盖边界情况（空字符串、多级命名）
    - _Requirements: 6.4_

  - [ ]* 9.3 编写 createNamespace 前缀不变量属性测试
    - **Property 9: createNamespace 前缀不变量**
    - **Validates: Requirements 6.4**

  - [ ]* 9.4 补充 `is.test.ts` 中 `isString / isNumber / isArray / isObject / isFunction / isNil` 等类型判断函数的真值与假值分支测试（若已有完整覆盖则跳过）
    - **Property 8: isXxx 类型判断函数正确性**
    - **Validates: Requirements 6.2**

  - [ ]* 9.5 补充 `vueInstall.test.ts` 中 `withInstall` 的 `install` 方法注册不变量测试
    - **Property 10: withInstall 注册不变量**
    - **Validates: Requirements 6.5**

- [ ] 10. Checkpoint — 测试覆盖全量验证
  - 运行 `pnpm test:ci` 确认所有新增测试通过，无遗漏 skip。如有问题请提问。

- [ ] 11. Vitest 覆盖率配置扩展
  - [ ] 11.1 修改 `vitest.config.ts`：在 `coverage.include` 中新增 `packages/components/PdForm/src/**/*.{ts,tsx}`、`packages/components/PdPageLayout/**/*.{ts,tsx}`、`packages/components/PdCharts/src/**/*.{ts,tsx}`；在 `coverage.exclude` 中新增 `packages/components/PdCharts/src/types/**`；设置 `thresholds: { lines: 60 }`（不强制失败，仅输出警告）；确认 `reporter: ['text', 'lcov', 'html']` 保持不变
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ] 12. CI 流水线优化
  - [ ] 12.1 修改 `.github/workflows/node.js.yml`：在 `build` job 的 `Install dependencies` 步骤之后、`Build (lib)` 步骤之前插入 `Lint` 步骤（`pnpm run lint`）；更新 `Test` 步骤确认执行 `pnpm run test:coverage`；确认 `codecov/codecov-action@v4` 上传 `coverage/lcov.info`；确认 pnpm store 缓存已通过 `setup-node cache: pnpm` 启用
    - _Requirements: 11.1, 11.2, 11.6_

  - [ ] 12.2 在 `.github/workflows/node.js.yml` 中新增独立的 `release` job：条件为 `github.event_name == 'push' && startsWith(github.ref, 'refs/tags/v')`；`needs: build`；步骤包含 checkout、pnpm/node setup、`pnpm install --frozen-lockfile`、`pnpm run build:npm`、`pnpm run release`（使用 `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`）
    - _Requirements: 11.3, 11.4, 11.5_

- [ ] 13. Final Checkpoint — 全流程验证
  - 运行 `pnpm run build:lib` 确认 `dist/` 包含 `.d.ts` 文件；运行 `pnpm run test:coverage` 确认覆盖率报告生成；确认 `volar.d.ts` 中四个核心组件类型声明完整。如有问题请提问。

---

## Notes

- 任务标注 `*` 的子任务为可选，可在 MVP 阶段跳过
- 每个子任务均引用对应的 Requirements 编号，方便追踪
- 所有代码变更使用 TypeScript strict 模式，遵循 `packages/components/PdXxx/src/types/index.ts` 统一类型出口规范
- PdTable 变更为 Breaking Change，需在 CHANGELOG 中同步标注
- vite-plugin-dts v1→v4 升级是构建任务的前置依赖，建议最先执行 Task 2.1
- 属性测试（Property-Based Tests）通过 Vitest 实现，可配合 `fast-check` 库

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["3.1", "5.1", "9.1", "9.2"] },
    { "id": 3, "tasks": ["3.2", "5.2", "9.3", "9.4", "9.5"] },
    { "id": 4, "tasks": ["3.3", "6.1", "6.4", "6.5", "7.1", "7.3", "8.1"] },
    { "id": 5, "tasks": ["3.4", "6.2", "6.3", "7.2", "8.2"] },
    { "id": 6, "tasks": ["11.1"] },
    { "id": 7, "tasks": ["12.1", "12.2"] }
  ]
}
```
