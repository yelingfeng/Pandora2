# Requirements Document

## Introduction

本需求文档描述 Pandora2 组件库工程化全面升级的目标与验收标准。升级范围覆盖六个维度：代码质量、工程化配置、组件 API 设计、类型系统精确化、测试覆盖率提升、构建流水线优化。核心变更包括：`PdTable` 的 `tableConfig` 大对象 API 拆分（带 breaking change 标注）、`PdForm` `schemas` 类型精确化、四个核心组件（PdTable / PdForm / PdPageLayout / PdCharts）以及 shared 工具函数的测试覆盖、`vite-plugin-dts` 升级兼容 Vite 7、`global.d.ts` 全组件注册补全、Husky + commitlint 接入、Changesets 版本管理接入、CI 流水线增强。

---

## Glossary

- **Pandora2**：本项目，基于 Vue 3 + TypeScript + Element Plus 的业务组件库
- **PdTable**：表格组件，路径 `packages/components/PdTable`
- **PdForm**：表单组件，路径 `packages/components/PdForm`
- **PdPageLayout**：页面布局组件，路径 `packages/components/PdPageLayout`
- **PdCharts**：图表组件，路径 `packages/components/PdCharts`
- **shared**：公共工具库，路径 `packages/shared`
- **tableConfig**：PdTable 现有的嵌套大对象配置，包含 `pagination`、`selection`、`pageOpt` 等混合属性
- **IFormSchema**：PdForm 表单项 schema 类型定义
- **ComponentType**：PdForm 中允许的表单控件枚举类型
- **ITableActionType**：PdTable 对外暴露的命令式 API 类型
- **ChartsActionType**：PdCharts 对外暴露的命令式 API 类型
- **IFormActionType**：PdForm 对外暴露的命令式 API 类型
- **register 模式**：组件通过 `emit('register', instance)` 向父组件暴露实例的设计模式
- **vite-plugin-dts**：Vite 的 TypeScript 声明文件生成插件
- **Changesets**：基于 changeset 的 monorepo 版本管理与 changelog 工具
- **commitlint**：提交信息格式校验工具
- **CI**：持续集成，本项目使用 GitHub Actions
- **Vitest**：本项目使用的单元测试框架
- **Breaking Change**：破坏性变更，需通过 deprecation 注释或 CHANGELOG 明确标注
- **LCOV**：覆盖率报告格式，用于 Codecov 上传
- **ESM**：ECMAScript 模块格式，构建产物之一
- **UMD**：通用模块定义格式，构建产物之一

---

## Requirements

### Requirement 1 — PdTable API 拆分（Breaking Change）

**User Story:** 作为组件库使用者，我希望 PdTable 的配置项按职责分离为独立 props，而不是通过 `tableConfig` 嵌套大对象传入，以便代码可读性更强、IDE 自动补全更精确。

#### Acceptance Criteria

1. THE PdTable SHALL 将 `tableConfig` 中的 `pagination` / `pageOpt` 合并为独立的顶层 prop `paginationConfig`，类型为 `IPaginationConfig | false`，默认值为 `false`（不显示分页）。

2. THE PdTable SHALL 将 `tableConfig` 中的 `selection` 提取为独立的顶层 prop `selectionConfig`，类型为 `ISelectionConfig`。

3. THE PdTable SHALL 保留 `tableConfig` prop 并标注 `@deprecated`，支持 `tableConfig` 与新 props 同时存在，新 props 优先级高于 `tableConfig` 中对应字段。

4. WHEN `tableConfig` prop 被传入，THE PdTable SHALL 在开发环境（`import.meta.env.DEV` 为 `true`）通过 `console.warn` 输出 deprecation 提示信息，提示内容包含迁移路径。

5. THE PdTable 类型文件 `src/types/index.ts` SHALL 新增 `IPaginationConfig` 和 `ISelectionConfig` 接口，并从 `IPandoraTable` 中移除已迁移的字段（保留 `@deprecated` 注释）。

6. THE PdTable `index.ts` 对外导出文件 SHALL 导出 `IPaginationConfig`、`ISelectionConfig` 类型，保持向后兼容的类型导出。

---

### Requirement 2 — PdForm schemas 类型精确化

**User Story:** 作为组件库使用者，我希望 `IFormSchema` 的 `component` 字段类型精确对应所有可用控件，且 `componentProps` 根据 `component` 值自动收窄类型，以减少运行时错误。

#### Acceptance Criteria

1. THE PdForm 类型文件 `src/types/index.ts` SHALL 为 `ComponentType` 枚举的每种值定义对应的 Element Plus 组件 props 类型映射 `ComponentPropsMap`。

2. THE PdForm 类型文件 SHALL 将 `IFormSchema` 的 `componentProps` 字段类型从 `((opt: ...) => Recordable) | any` 修改为 `((opt: RenderCallbackParams) => ComponentPropsMap[T]) | ComponentPropsMap[T]`，其中 `T` 为 `ComponentType`。

3. THE PdForm 类型文件 SHALL 将 `IFormSchema` 重构为泛型类型 `IFormSchema<T extends ComponentType = ComponentType>`，以支持 `component` 与 `componentProps` 的类型联动。

4. THE PdForm 类型文件 SHALL 保持与现有使用方式的向后兼容：不传泛型参数时，`IFormSchema` 默认行为与重构前一致。

5. WHEN `IFormSchema` 的 `required` 字段为 `true`，THE PdForm 类型系统 SHALL 允许省略 `rules` 字段（`required: true` 本身即满足必填校验）。

---

### Requirement 3 — 测试覆盖率：PdForm

**User Story:** 作为维护者，我希望 PdForm 的核心流程有单元测试覆盖，以便重构时快速发现回归问题。

#### Acceptance Criteria

1. THE PdForm 测试套件 SHALL 覆盖 `useForm` hook 的 `register` 模式：挂载后 `register` 回调被调用，返回的 `IFormActionType` 实例不为 `null`。

2. THE PdForm 测试套件 SHALL 覆盖 `setFieldsValue` / `getFieldsValue` 的基本读写流程：设置值后 `getFieldsValue` 返回相同键值。

3. THE PdForm 测试套件 SHALL 覆盖 `updateSchema` 方法：调用后指定 `field` 的 schema 属性更新生效。

4. THE PdForm 测试套件 SHALL 覆盖 `resetFields` 方法：调用后表单值恢复到 `defaultValue`。

5. THE PdForm 测试套件 SHALL 覆盖 `showAdvancedButton` 为 `true` 且 schema 数量超过折叠阈值时，展开/收起按钮的渲染与点击行为。

6. IF `schemas` prop 包含 `required: true` 的字段，THEN THE PdForm 测试套件 SHALL 验证提交前校验逻辑被触发。

7. THE PdForm 测试文件 SHALL 位于 `packages/components/PdForm/__tests__/` 目录，文件名以 `.spec.ts` 或 `.test.tsx` 结尾。

---

### Requirement 4 — 测试覆盖率：PdPageLayout

**User Story:** 作为维护者，我希望 PdPageLayout 的布局行为、插槽渲染、事件发射有单元测试覆盖。

#### Acceptance Criteria

1. THE PdPageLayout 测试套件 SHALL 覆盖默认布局渲染：`pandora-page-layout`、`pandora-form-section`、`pandora-table-section` 等 CSS 类存在于 DOM。

2. THE PdPageLayout 测试套件 SHALL 覆盖 `layout: 'tabs'` 时附加 CSS 类 `pandora-page-layout--tabs` 的行为。

3. THE PdPageLayout 测试套件 SHALL 覆盖 `toolbar` 插槽渲染：插槽内容出现在 `pandora-table-toolbar` 容器内。

4. THE PdPageLayout 测试套件 SHALL 覆盖 `buttonConfig` 传入时按钮渲染数量与点击 `emit` 事件（`search`、`reset`）。

5. THE PdPageLayout 测试套件 SHALL 覆盖 `expose` 的 `refreshLayout` 和 `syncCrudHeight` 方法类型为 `function`。

6. THE PdPageLayout 测试套件 SHALL 覆盖 `provide('isInPageLayout', true)` 的注入行为，子组件可通过 `inject` 拿到 `true`。

7. THE PdPageTreeLayout 测试套件 SHALL 覆盖侧边栏折叠/展开行为：点击折叠按钮后 `.pandora-sidebar` 宽度切换、`sidebar-toggle` 事件发射。

---

### Requirement 5 — 测试覆盖率：PdCharts

**User Story:** 作为维护者，我希望 PdCharts 的核心生命周期（挂载初始化、销毁、resize、数据更新）有单元测试覆盖。

#### Acceptance Criteria

1. THE PdCharts 测试套件 SHALL 包含测试文件 `packages/components/PdCharts/__tests__/PdCharts.test.tsx`。

2. THE PdCharts 测试套件 SHALL 覆盖组件挂载后 ECharts 实例被初始化（通过 mock `echarts.init` 验证调用次数为 1）。

3. THE PdCharts 测试套件 SHALL 覆盖组件卸载时 ECharts 实例的 `dispose` 方法被调用（防止内存泄漏）。

4. THE PdCharts 测试套件 SHALL 覆盖 `useCharts` hook 的 `register` 模式：`register` 回调被调用后，`ChartsActionType` 实例的 `getInstance` 方法返回非 `null` 值。

5. WHEN `loading` prop 为 `true`，THE PdCharts 测试套件 SHALL 验证 ECharts 实例的 `showLoading` 方法被调用。

6. WHEN `options` prop 更新，THE PdCharts 测试套件 SHALL 验证 ECharts 实例的 `setOption` 方法被以新 options 为参数调用。

7. THE PdCharts 测试套件 SHALL mock `ResizeObserver` 以避免 jsdom 环境报错。

---

### Requirement 6 — 测试覆盖率：shared 工具函数

**User Story:** 作为维护者，我希望 shared/_utils 中的工具函数有完整的单元测试，以保证基础能力的稳定性。

#### Acceptance Criteria

1. THE shared 测试套件 SHALL 覆盖 `dateUtil.ts` 中所有导出函数的正常路径与边界条件（空值、无效日期格式）。

2. THE shared 测试套件 SHALL 覆盖 `is/` 目录下所有类型判断函数（`isString`、`isNumber`、`isArray`、`isObject`、`isFunction`、`isNil` 等）的真值与假值分支。

3. THE shared 测试套件 SHALL 覆盖 `helper/` 目录下的辅助函数，包括 `getDynamicProps` 的深度合并逻辑。

4. THE shared 测试套件 SHALL 覆盖 `create/createNamespace` 函数：输入 `'Table'` 时返回 `['PdTable', ...]` 形式的元组。

5. THE shared 测试套件 SHALL 覆盖 `vue/withInstall` 函数：返回值带有 `install` 方法，调用后组件被正确注册到 Vue 应用实例。

6. THE shared 测试套件 SHALL 覆盖 `env.ts` 中的 `isProdMode` / `isDevMode` 函数：mock `import.meta.env.PROD` 后返回值符合预期。

---

### Requirement 7 — vite-plugin-dts 升级

**User Story:** 作为构建维护者，我希望 `vite-plugin-dts` 版本与当前 Vite 7 兼容，以避免构建时类型声明文件生成异常。

#### Acceptance Criteria

1. THE 构建配置 SHALL 将 `vite-plugin-dts` 依赖版本从 `^1.4.1` 升级至与 Vite 7 兼容的版本（`^4.x` 或当前最新稳定版）。

2. THE lib 构建配置文件（`build/lib.config.ts`）SHALL 更新 `vite-plugin-dts` 的 `rollupTypes`、`outDir`、`include` 等配置项以匹配新版 API。

3. WHEN 执行 `pnpm run build:lib`，THE 构建流程 SHALL 在 `dist/` 目录下生成正确的 `.d.ts` 声明文件，不抛出 `vite-plugin-dts` 相关错误。

4. IF `vite-plugin-dts` 升级引入了 API 破坏性变更，THEN THE 构建配置 SHALL 在注释中标注变更点，方便后续维护。

---

### Requirement 8 — global.d.ts 全组件注册补全

**User Story:** 作为使用 Volar 的开发者，我希望全局注册 Pandora2 时，所有四个组件（PdTable、PdForm、PdPageLayout、PdCharts）都有 Volar 类型推导支持。

#### Acceptance Criteria

1. THE `volar.d.ts`（或 `global.d.ts`）文件 SHALL 在 `GlobalComponents` 接口中声明 `PdCharts` 组件类型，类型引用 `ChartsInstance`。

2. THE `volar.d.ts` 文件 SHALL 在 `GlobalComponents` 接口中声明 `PdPageLayout` 组件类型，类型引用对应的 `InstanceType`。

3. THE `volar.d.ts` 文件 SHALL 保持已有的 `PdTable`、`PdForm` 声明不变。

4. THE `packages/components/PdCharts/index.ts` SHALL 导出 `ChartsInstance` 类型（`InstanceType<typeof PdCharts>`）。

5. THE `packages/components/PdPageLayout/index.ts`（若存在）SHALL 导出 `PageLayoutInstance` 类型（`InstanceType<typeof PdPageLayout>`）。

---

### Requirement 9 — Husky + commitlint 接入

**User Story:** 作为团队成员，我希望提交信息自动经过 `commitlint` 校验，以强制执行 Conventional Commits 格式，避免无效提交信息进入仓库。

#### Acceptance Criteria

1. THE 项目根目录 SHALL 包含 `commitlint.config.cjs`（或等效配置文件），规则集使用 `@commitlint/config-conventional`。

2. THE Husky 配置 SHALL 包含 `commit-msg` hook，执行 `npx --no -- commitlint --edit $1` 对提交信息进行校验。

3. WHEN 提交信息不符合 `type(scope): subject` 格式，THE commit-msg hook SHALL 退出码非零，阻止提交。

4. THE `package.json` SHALL 在 `devDependencies` 中声明 `@commitlint/cli` 和 `@commitlint/config-conventional` 的精确版本号。

5. THE `package.json` 中已有的 `husky` hooks 配置 SHALL 保留（`pre-commit` 执行 `lint-staged`），新增 `commit-msg` hook 不影响现有流程。

---

### Requirement 10 — Changesets 版本管理接入

**User Story:** 作为发版维护者，我希望使用 Changesets 管理版本号和 CHANGELOG，以替代现有的手动 `conventional-changelog` 脚本，支持更精细的变更描述。

#### Acceptance Criteria

1. THE 项目根目录 SHALL 包含 `.changeset/config.json`，配置 `changelog` 为 `@changesets/changelog-github` 或 `@changesets/cli/changelog`，`access` 为 `public`。

2. THE `package.json` SHALL 在 `devDependencies` 中声明 `@changesets/cli` 的精确版本。

3. THE `package.json` 的 `scripts` SHALL 新增 `changeset`（执行 `changeset`）、`version-packages`（执行 `changeset version`）、`release`（执行 `changeset publish`）三条脚本。

4. THE `.changeset/` 目录 SHALL 被提交到 git（不在 `.gitignore` 中排除），初始包含 `config.json` 和 `README.md`。

5. THE 现有 `release:patch` / `release:minor` / `release:major` 脚本 SHALL 保留，标注注释说明已被 Changesets 工作流替代，仅作兼容保留。

---

### Requirement 11 — CI 流水线优化

**User Story:** 作为 DevOps 维护者，我希望 CI 流水线能够输出测试覆盖率报告、执行 lint 检查，并在 tag 推送时自动触发 Changesets 发布流程。

#### Acceptance Criteria

1. THE CI 工作流文件（`.github/workflows/node.js.yml`）SHALL 在 `build` job 中新增 `lint` 步骤，执行 `pnpm run lint`，lint 失败时 job 失败。

2. THE CI 工作流 `build` job SHALL 在测试步骤执行 `pnpm run test:coverage`，并通过 `codecov/codecov-action@v4` 上传 `coverage/lcov.info`。

3. THE CI 工作流 SHALL 新增独立的 `release` job，仅在 `push` 事件且 `ref` 以 `refs/tags/v` 开头时触发，执行 `pnpm run release`（Changesets publish）。

4. THE CI `release` job SHALL 依赖 `build` job 成功完成（`needs: build`）。

5. THE CI `release` job SHALL 使用 `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` 进行 npm 鉴权。

6. WHILE CI 执行 `build` job，THE CI 工作流 SHALL 缓存 pnpm store（使用 `pnpm/action-setup` 和 `setup-node` 的 `cache: pnpm`），避免每次全量安装依赖。

---

### Requirement 12 — coverage 目录 gitignore 修正

**User Story:** 作为仓库维护者，我希望 `coverage/` 目录不被提交到 git，以保持仓库干净，避免覆盖率产物污染代码历史。

#### Acceptance Criteria

1. THE `.gitignore` 文件 SHALL 包含 `coverage/` 条目（已存在 `coverage` 不含斜杠时，SHALL 同时保留或替换为 `coverage/`）。

2. WHEN `pnpm run test:coverage` 执行后生成的 `coverage/` 目录，THE git 状态 SHALL 不显示该目录为未跟踪文件（`git status` 输出不含 `coverage/`）。

3. IF `coverage/` 目录已被 git track，THEN THE 项目 SHALL 通过 `git rm -r --cached coverage/` 将其从索引中移除，并在 CHANGELOG 或 README 中说明此操作。

---

### Requirement 13 — 构建产物类型声明完整性

**User Story:** 作为 npm 包使用者，我希望安装 `@yelingfeng/pandora2` 后，所有导出的类型均可在 TypeScript 项目中正确推导，无需手动添加类型声明文件。

#### Acceptance Criteria

1. WHEN 执行 `pnpm run build:lib`，THE 构建流程 SHALL 为 `packages/components/PdCharts`、`packages/components/PdPageLayout` 的导出类型生成对应的 `.d.ts` 文件。

2. THE `package.json` 的 `types` 字段 SHALL 指向 `dist/` 目录下正确的入口类型声明文件。

3. THE 构建产物 `dist/` 目录 SHALL 包含 `pandora2.es.js`、`pandora2.umd.js` 和对应的 `.d.ts` 入口文件。

4. IF 类型声明文件缺失任意已导出的 `ActionType` 或 `Instance` 类型，THEN THE 构建验证步骤 SHALL 报错并阻止发布。

---

### Requirement 14 — Vitest 覆盖率配置扩展

**User Story:** 作为质量保证人员，我希望 Vitest 覆盖率报告涵盖全部四个核心组件和 shared 工具函数，而不只是 PdTable。

#### Acceptance Criteria

1. THE Vitest 配置（`vite.config.ts` 或独立 `vitest.config.ts`）SHALL 将覆盖率 `include` 范围扩展至 `packages/components/PdForm/**`、`packages/components/PdPageLayout/**`、`packages/components/PdCharts/**`、`packages/shared/**`。

2. THE Vitest 覆盖率配置 SHALL 保留已有的 `packages/components/PdTable/**` 覆盖范围，不缩减已有覆盖。

3. THE Vitest 覆盖率配置 SHALL 设置 `reporter: ['text', 'lcov', 'html']`，确保同时生成终端输出、`lcov.info` 和 HTML 报告。

4. WHEN 覆盖率低于 60%（行覆盖率 `lines`）时，THE `test:coverage` 命令 SHALL 输出警告信息（不强制失败，以渐进式覆盖为目标）。

