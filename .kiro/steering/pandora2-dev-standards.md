---
inclusion: auto
name: "pandora2-dev-standards"
description: "Pandora2 组件库开发规范。当用户新增组件、修改组件逻辑、编写 Hook、定义类型或调整项目结构时自动激活。"
---

# Pandora2 组件库开发规范

## 项目概览

Pandora2 是一个基于 **Vue 3 + TypeScript + Element Plus** 的业务组件库，采用 monorepo 风格组织，通过 Vite 构建，输出 ESM / UMD 双格式包。

### 技术栈

| 技术 | 版本约束 |
|------|---------|
| Vue | ^3.x（Composition API，禁用 Options API） |
| TypeScript | strict 模式，noImplicitAny + strictNullChecks |
| Element Plus | ^2.x（按需引入） |
| Vite | ^7.x |
| Vitest | ^4.x |
| Less | 样式预处理器 |
| lodash-es | 工具函数（禁用 lodash） |
| dayjs | 日期处理（禁用 moment） |
| @vueuse/core | Vue 工具 Hook |
| vue-types | Props 类型验证 |

### 路径别名

```
@          → ./src
@pandora   → ./packages
#          → ./src/types
```

---

## 目录结构规范

```
packages/
  components/       # 业务组件（每个组件独立目录）
    PdXxx/
      __tests__/    # 单元测试
      src/
        index.vue   # 主组件（JSX 或 Template）
        types/      # 类型定义（index.ts 统一导出）
        props/      # Props 定义
        hooks/      # 组件内部 Hooks
        render/     # 渲染函数（JSX 组件）
      index.ts      # 对外导出入口（withInstall 包装）
  shared/
    _utils/
      create/       # createNamespace 等工厂函数
      vue/          # withInstall、composeRefs 等
      is/           # 类型判断工具
      log/          # 日志工具
      helper/       # 通用辅助函数
    enums/          # 公共枚举
    hooks/          # 公共 Hooks
src/
  _docs/            # 组件文档（markdown + vue demo）
  _utils/           # 应用层工具（非库代码）
  hooks/            # 应用层 Hooks
  components/       # 应用层组件
```

---

## 组件开发规范

### 1. 组件命名

- 组件目录名：PascalCase，前缀 `Pd`（如 `PdTable`、`PdForm`）
- `defineComponent` 的 `name` 字段必须通过 `createNamespace` 生成：

```ts
import { createNamespace } from '@pandora/shared/_utils/create'
const [name] = createNamespace('Table')  // → 'PdTable'
export default defineComponent({ name, ... })
```

- CSS class 根节点统一使用 `vpandora-{name}` 命名（kebab-case，如 `vpandora-table`）

### 2. 对外导出入口（index.ts）

每个组件必须通过 `withInstall` 包装后导出，同时导出实例类型和相关类型：

```ts
import { withInstall } from '@pandora/shared/_utils/vue'
import _Table from './src/index.vue'

export const PdTable = withInstall(_Table)
export default PdTable

export type TableInstance = InstanceType<typeof PdTable>
export * from './src/types'   // 导出全部类型
```

### 3. Props 定义规范

- Props 对象定义在独立的 `props/` 目录，通过 `propTypes` 或原生 Vue props 方式声明
- 使用 `vue-types` 的 `propTypes` 进行复杂类型验证
- Props 的 TypeScript 接口在 `types/` 目录统一维护

```ts
// props/index.ts
import { propTypes } from '@pandora/shared/_utils/propTypes'
export const tableProps = {
  data: propTypes.array.def([]),
  columns: propTypes.array.def([]),
  tableConfig: propTypes.object.def({})
}
```

### 4. 类型定义规范

- 所有对外导出类型放在 `src/types/index.ts`
- 接口命名统一加 `I` 前缀（如 `IPandoraTableProps`）
- 对外 Action 类型命名以 `ActionType` 结尾（如 `ITableActionType`、`IFormActionType`）
- 使用 `UseXxxReturnType` 类型描述 Hook 返回值：

```ts
export type UseTableReturnType = [
  (instance: ITableActionType) => void,
  ITableActionType
]
```

### 5. register 模式（组件对外暴露实例）

所有需要在父组件中命令式调用的组件，必须实现 `register` 模式：

```ts
// 组件内部 setup
onMounted(() => {
  emit('register', tableAction)  // 在 mounted 时 emit register
})

// 配套 Hook（hooks/useTable.ts）
export function useTable(props?: Props): UseTableReturnType {
  const tableRef = ref<Nullable<ITableActionType>>(null)

  const register = (instance: ITableActionType) => {
    tableRef.value = instance
    // 生产模式：组件卸载时清理
    isProdMode() && onUnmounted(() => { tableRef.value = null })
    // 同步 props 变化到实例
    watch(() => props, () => {
      props && instance.setProps(getDynamicProps(props))
    }, { immediate: true, deep: true })
  }

  return [register, methods]  // [注册函数, 方法集合]
}

// 用法
const [register, tableAction] = useTable()
// <PdTable @register="register" />
```

### 6. 渲染函数（JSX）规范

- 纯逻辑渲染（列、分页）提取到 `render/` 目录，以 `use` 前缀命名渲染函数
- 主组件 setup 返回渲染函数（JSX），不使用 `<template>`：

```tsx
// render/column.ts
export function useColumnRender(columns, $sortService) { ... }

// index.vue setup 内
return () => (
  <div class="vpandora-table">
    <ElTable {...tableProps}>{columnsVNode}</ElTable>
    {pageVNode}
  </div>
)
```

### 7. Hook 拆分规范

组件内部逻辑超过 200 行时，按职责拆分成独立 Hook，放在组件 `src/hooks/` 目录：

| Hook 名称 | 职责 |
|----------|------|
| `useTableProps` | 解析 props，管理列与数据 |
| `useFormEvents` | 表单提交、重置、validate |
| `useFormValues` | 表单值初始化与转换 |
| `useAdvanced` | 展开/折叠高级搜索 |
| `useAutoFocus` | 自动聚焦 |

---

## 样式规范

- 使用 **Less**，不使用 SCSS / Tailwind
- 组件根类名：`vpandora-{name}`（如 `.vpandora-table`、`.vpandora-form`）
- 样式默认不使用 `scoped`（组件库需支持全局覆盖）
- 布局尺寸使用 `width: 100%; height: 100%` 适应容器
- Element Plus 组件样式覆盖在组件根类内：

```less
.vpandora-form {
  .el-select, .el-date-editor { width: 100%; }
  .el-input__wrapper { border-radius: 0; }
}
```

---

## TypeScript 规范

- 开启 `strict: true`，`noImplicitAny: true`，`strictNullChecks: true`
- 禁止使用 `any`（特殊场景加 eslint-disable 注释说明原因）
- 优先使用 `type` 而非 `interface`（除需要扩展的接口用 `interface`）
- 全局通用类型在 `global.d.ts` 声明（如 `Recordable`、`Nullable`）
- 导入类型使用 `import type`：

```ts
import type { IFormProps, IFormSchema } from './types'
```

---

## 代码格式规范

基于 `.prettierrc` 和 `.eslintrc.js` 配置：

- 缩进：2 空格，不使用 Tab
- 引号：**单引号**
- 语句末尾：**不加分号**
- 末尾逗号：**不加**（`trailingComma: "none"`）
- 每行最大字符：80（推荐）
- Vue Script / Style 块内容缩进（`vueIndentScriptAndStyle: true`）

---

## 测试规范

- 测试框架：**Vitest** + `@vue/test-utils`
- 测试文件放在组件同级 `__tests__/` 目录，文件名 `*.spec.ts`
- 单测命令：`pnpm test:ci`（CI 单次执行，非 watch 模式）
- 覆盖率命令：`pnpm test:coverage`
- 测试文件不写进 npm 包（`.npmignore` 已排除）

---

## Git 提交规范

- 使用 **Commitizen** + `cz-conventional-changelog`，统一通过 `pnpm commit` 提交
- 提交信息格式：`type(scope): subject`
- 常用 type：`feat`、`fix`、`docs`、`style`、`refactor`、`test`、`chore`
- pre-commit Hook：`lint-staged` 对 `.js/.ts/.json/.md/.vue` 执行 prettier 格式化

---

## 依赖管理规范

- 包管理器：**pnpm**（不使用 npm / yarn）
- 运行时依赖（`vue`、`element-plus`）打包时 **external**，不打进库包
- 新增依赖必须 pinned 版本，禁止使用 `*` 或 `latest`
- 优先使用已有依赖（`lodash-es`、`@vueuse/core`、`dayjs`），不重复引入同类库

---

## 发版规范

- patch 版本：`pnpm release:patch`
- minor 版本：`pnpm release:minor`
- major 版本：`pnpm release:major`
- 发版前自动执行：`test:ci` + `build:lib`
- CHANGELOG 由 `conventional-changelog` 自动生成
