# Design Document

## Introduction

本文档为 Pandora2 工程化全面升级（14 条需求）提供技术实现方案。方案覆盖：组件 API 重构、类型系统精确化、测试覆盖扩展、构建配置升级、CI/CD 优化、工程规范接入六个维度。所有变更均以向后兼容为前提，Breaking Change 通过 `@deprecated` 注释 + DEV 警告 + CHANGELOG 三重标注处理。

技术栈：Vue 3 + TypeScript（strict）+ Vitest + Vite 7 + pnpm。

---

## Architecture Overview

```
Pandora2 Monorepo
├── packages/
│   ├── components/
│   │   ├── PdTable/          ← Req 1: API 拆分（Breaking Change）
│   │   │   ├── src/
│   │   │   │   ├── props/index.ts       (新增 paginationConfig / selectionConfig)
│   │   │   │   ├── types/index.ts       (新增 IPaginationConfig / ISelectionConfig)
│   │   │   │   └── index.vue            (适配新 props，保留旧 tableConfig 兼容)
│   │   │   └── __tests__/              (已有，扩充覆盖)
│   │   ├── PdForm/           ← Req 2,3: 类型精确化 + 测试
│   │   │   ├── src/types/index.ts       (IFormSchema 泛型化 + ComponentPropsMap)
│   │   │   └── __tests__/              (新建)
│   │   ├── PdPageLayout/     ← Req 4: 测试（已有部分）
│   │   │   └── __tests__/              (补全)
│   │   └── PdCharts/         ← Req 5,8: 测试 + 类型导出
│   │       ├── __tests__/              (新建)
│   │       └── index.ts                (导出 ChartsInstance — 已有，确认)
│   └── shared/
│       └── _utils/__tests__/           ← Req 6: 已有，补全 createNamespace + withInstall
├── build/
│   └── lib.config.ts                   ← Req 7: vite-plugin-dts 升级
├── volar.d.ts                          ← Req 8: 全组件声明补全
├── vitest.config.ts                    ← Req 14: 覆盖率范围扩展
├── .changeset/                         ← Req 10: Changesets 接入（新建）
├── commitlint.config.cjs               ← Req 9: commitlint 配置（新建）
├── .husky/commit-msg                   ← Req 9: Husky hook（新建）
├── .gitignore                          ← Req 12: coverage/ 修正
└── .github/workflows/node.js.yml       ← Req 11: CI 优化
```

---

## Requirement 1 — PdTable API 拆分

### 变更文件

| 文件 | 操作 |
|------|------|
| `packages/components/PdTable/src/types/index.ts` | 新增 `IPaginationConfig`、`ISelectionConfig`；`IPandoraTable` 旧字段加 `@deprecated` |
| `packages/components/PdTable/src/props/index.ts` | 新增 `paginationConfig`、`selectionConfig` prop |
| `packages/components/PdTable/src/index.vue` | setup 中读取新 props，覆盖旧 tableConfig 对应字段；DEV warn |
| `packages/components/PdTable/index.ts` | 确保 `IPaginationConfig`、`ISelectionConfig` 经 `export * from './src/types'` 透传 |

### 新类型定义

```typescript
// src/types/index.ts（新增部分）

/** @since 1.1.0 — 替换 IPageConfig + IPandoraTable.pagination/pageOpt */
export interface IPaginationConfig {
  currentPage?: number
  total?: number
  pageSize?: number
  pageSizes?: number[]
  layout?: string
  height?: number
  pageCount?: number
}

/** @since 1.1.0 — 替换 ISelectionMode + IPandoraTable.selection */
export interface ISelectionConfig<T = any> {
  selectionMode?: 'single' | 'multi'
  selectionPos?: 'top' | 'end'
  selectable?: (row: T, index: number) => boolean
}
```

`IPandoraTable` 中的 `pagination`、`pageOpt`、`selection` 字段保留，添加注释：

```typescript
/**
 * @deprecated 请使用顶层 prop `paginationConfig` 替代。将在 v2.0 移除。
 * @migration paginationConfig?: IPaginationConfig | false
 */
pagination?: IPageConfig | boolean
```

### Props 变更

```typescript
// src/props/index.ts（新增）
paginationConfig: {
  type: [Object, Boolean] as PropType<IPaginationConfig | false>,
  default: false          // 默认不显示分页，与旧行为对齐
},
selectionConfig: {
  type: Object as PropType<ISelectionConfig>,
  default: undefined
}
```

### 向后兼容策略

`index.vue` 的 `getConfig()` 函数替换为优先级合并辅助：

```typescript
// 新 prop 存在则覆盖旧 tableConfig 同名字段
const effectivePaginationConfig = computed(() =>
  props.paginationConfig !== undefined
    ? props.paginationConfig
    : innerProps.tableConfig?.pagination ?? false
)

const effectiveSelectionConfig = computed(() =>
  props.selectionConfig !== undefined
    ? props.selectionConfig
    : innerProps.tableConfig?.selection
)
```

DEV 警告（仅触发一次，用 `once` flag 避免重复打印）：

```typescript
// setup() 顶部
if (import.meta.env.DEV && props.tableConfig && Object.keys(props.tableConfig).length > 0) {
  console.warn(
    '[PdTable] `tableConfig` prop is deprecated. ' +
    'Please migrate to `paginationConfig` and `selectionConfig`. ' +
    'See: https://github.com/yelingfeng/Pandora2/blob/main/CHANGELOG.md'
  )
}
```

---

## Requirement 2 — PdForm schemas 类型精确化

### 变更文件

`packages/components/PdForm/src/types/index.ts`

### ComponentPropsMap 设计

```typescript
// 从 element-plus 导入各控件 props 类型
import type {
  AutocompleteProps, ButtonProps, CascaderProps,
  CheckboxProps, CheckboxGroupProps, DatePickerProps,
  InputProps, InputNumberProps, RadioProps, RadioGroupProps,
  RateProps, SelectProps, SliderProps, SwitchProps,
  TimePickerDefaultProps, TimeSelectProps
} from 'element-plus'

export type ComponentPropsMap = {
  Autocomplete: Partial<AutocompleteProps>
  Button: Partial<ButtonProps>
  Cascader: Partial<CascaderProps>
  Checkbox: Partial<CheckboxProps>
  CheckboxGroup: Partial<CheckboxGroupProps>
  DatePicker: Partial<DatePickerProps>
  Input: Partial<InputProps>
  InputNumber: Partial<InputNumberProps>
  Radio: Partial<RadioProps>
  RadioGroup: Partial<RadioGroupProps>
  Rate: Partial<RateProps>
  Select: Partial<SelectProps>
  SelectOption: Record<string, any>  // ElOption 无独立 props 类型
  Slider: Partial<SliderProps>
  Switch: Partial<SwitchProps>
  TimePicker: Partial<TimePickerDefaultProps>
  TimeSelect: Partial<TimeSelectProps>
  Divider: Record<string, any>
  ApiSelect: Record<string, any>    // 自定义组件
}
```

### IFormSchema 泛型化

```typescript
export type IFormSchema<T extends ComponentType = ComponentType> = {
  component: T
  componentProps?:
    | ((opt: { schema: IFormSchema<T>; formModel: Recordable }) => ComponentPropsMap[T])
    | ComponentPropsMap[T]
  // ... 其余字段不变
  field: string
  label: string
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  rules?: FormItemRule | FormItemRule[]
  // ... （其余字段原样保留）
}
```

### 向后兼容保证

- 不传泛型时 `T` 默认为 `ComponentType`（联合类型），此时 `ComponentPropsMap[T]` 退化为所有 props 的联合，行为与旧版 `any` 接近，不产生新的 TS 错误
- `IFormProps.schemas?: IFormSchema[]` 签名不变

---

## Requirement 3 — PdForm 测试套件

### 测试文件位置

```
packages/components/PdForm/__tests__/
  PdForm.spec.ts       ← useForm hook / register / 读写值
  FormSchema.spec.ts   ← updateSchema / resetFields
  FormAdvanced.spec.ts ← showAdvancedButton 展开收起
  FormValidation.spec.ts ← required 校验触发
```

### 关键测试结构

```typescript
// PdForm.spec.ts — register 模式
import { mount } from '@vue/test-utils'
import { useForm } from '../src/hooks/useForm'
import PdForm from '../src/index.vue'

describe('useForm register pattern', () => {
  test('register callback is invoked after mount', async () => {
    let formAction: IFormActionType | null = null
    const [register] = useForm()

    const wrapper = mount(PdForm, {
      props: {
        schemas: [{ field: 'name', label: '姓名', component: 'Input' }]
      },
      attrs: { onRegister: (inst: IFormActionType) => { formAction = inst } }
    })
    await nextTick()
    expect(formAction).not.toBeNull()
  })
})

// FormSchema.spec.ts — setFieldsValue / getFieldsValue 读写
describe('form value read-write', () => {
  test('getFieldsValue returns what setFieldsValue wrote', async () => {
    const [register, { setFieldsValue, getFieldsValue }] = useForm()
    // mount + register ...
    await setFieldsValue({ name: 'Alice' })
    expect(getFieldsValue().name).toBe('Alice')
  })
})
```

---

## Requirement 4 — PdPageLayout 测试补全

已有测试文件 `packages/components/PdPageLayout/__tests__/PdPageLayout.test.tsx` 覆盖了需求 4.1-4.7 的全部场景（基于代码审查确认）。需要补充的边界情况：

- `buttonConfig` 为空数组时 `buttons` 插槽 fallback 渲染
- `syncCrudHeight` 与 `refreshLayout` 是同一函数引用的验证

无需新建文件，在现有 `PdPageLayout.test.tsx` 中追加 `describe` 块。

---

## Requirement 5 — PdCharts 测试套件

### 测试文件

```
packages/components/PdCharts/__tests__/
  PdCharts.test.tsx
```

### Mock 策略

`echarts` 在 jsdom 环境中无 canvas，需完整 mock：

```typescript
// __tests__/PdCharts.test.tsx
vi.mock('echarts', () => ({
  init: vi.fn(() => ({
    setOption: vi.fn(),
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    dispose: vi.fn(),
    resize: vi.fn(),
    clear: vi.fn(),
    getZr: vi.fn(() => ({ on: vi.fn(), off: vi.fn() })),
    on: vi.fn(),
    off: vi.fn(),
  })),
  registerTheme: vi.fn(),
  use: vi.fn(),
}))
```

### 测试结构

```typescript
describe('PdCharts', () => {
  test('echarts.init called once on mount', async () => {
    const { init } = await import('echarts')
    mount(PdCharts)
    await nextTick()
    expect(init).toHaveBeenCalledTimes(1)
  })

  test('dispose called on unmount', async () => {
    const wrapper = mount(PdCharts)
    await nextTick()
    const instance = (init as vi.Mock).mock.results[0].value
    wrapper.unmount()
    expect(instance.dispose).toHaveBeenCalled()
  })

  test('useCharts register — getInstance returns non-null', async () => {
    const [register, { getInstance }] = useCharts()
    // mount with @register="register" ...
    expect(getInstance()).not.toBeNull()
  })

  test('setOption called when options prop updates', async () => {
    const wrapper = mount(PdCharts, { props: { options: { title: {} } } })
    await nextTick()
    await wrapper.setProps({ options: { title: { text: 'New' } } })
    await nextTick()
    const instance = (init as vi.Mock).mock.results[0].value
    expect(instance.setOption).toHaveBeenCalledWith(
      expect.objectContaining({ title: { text: 'New' } }),
      expect.anything()
    )
  })
})
```

---

## Requirement 6 — shared 工具函数测试补全

已有测试文件分析：

| 已有文件 | 覆盖状态 |
|---------|---------|
| `dateUtil.test.ts` | 已存在，检查边界条件是否完整 |
| `env.test.ts` | 已存在，只测类型，未 mock `import.meta.env.PROD` |
| `helper.test.ts` | 已存在，覆盖 trim/class 工具 |
| `is.test.ts` | 已存在 |
| `vueInstall.test.ts` | 已存在 |

需要**补充**的测试：

1. `env.test.ts`：补充 `vi.stubEnv` mock `import.meta.env.DEV/PROD` 后 `isDevMode`/`isProdMode` 返回预期布尔值
2. `createNamespace.test.ts`（新建）：验证 `createNamespace('Table')` 返回 `['PdTable']`
3. 现有测试中 `getDynamicProps` 未覆盖 — 需在 shared hooks 中定位后补充（Req 6.3 中提到，但该函数在 `packages/hooks` 而非 `shared/_utils/helper`，需确认位置后补全）

---

## Requirement 7 — vite-plugin-dts 升级

### 版本选择依据

当前版本 `^1.4.1` 使用旧版 API（`skipDiagnostics`、`include/exclude` 数组风格）。Vite 7 要求 `vite-plugin-dts@^4.x`（截至 2024 年最新稳定版为 `4.x`）。

| 旧 API（v1） | 新 API（v4） |
|-------------|-------------|
| `skipDiagnostics: true` | 移除（默认跳过） |
| `include: ['packages/**/*.ts']` | `include: ['packages/**/*.ts']`（保留） |
| 无 `rollupTypes` | `rollupTypes: true`（生成单文件 `.d.ts`） |
| `outDir` 隐式 | `outDir: 'dist'`（显式声明） |

### 变更文件

`package.json`：

```json
"vite-plugin-dts": "4.5.4"
```

`build/lib.config.ts`：

```typescript
dts({
  // v4 新 API
  // v1 的 skipDiagnostics 已移除，默认行为一致
  include: ['packages/**/*.ts', 'packages/**/*.tsx'],
  exclude: ['**/*.vue', 'src/_docs/**', 'packages/theme/**', '**/__tests__/**'],
  outDir: 'dist',
  // rollupTypes: true,  // 可选：合并为单一 .d.ts，视产物大小决定
  tsconfigPath: './tsconfig.json',
  // 如升级引入 API 变更，此处标注：
  // BREAKING(v1→v4): 'skipDiagnostics' 选项已移除
  // BREAKING(v1→v4): 'staticImport' 选项已重命名为 'importStatementsOrder'
})
```

---

## Requirement 8 — global.d.ts 全组件注册补全

### 变更文件

`volar.d.ts`（根目录，若不存在则新建）：

```typescript
import type { ChartsInstance } from './packages/components/PdCharts'
import type { PdPageLayout } from './packages/components/PdPageLayout'

declare module 'vue' {
  export interface GlobalComponents {
    // 已有
    PdTable: typeof import('./packages/components/PdTable')['PdTable']
    PdForm: typeof import('./packages/components/PdForm')['PdForm']
    ColorfulTable: typeof import('./packages/components/PdTable')['ColorfulTable']
    // 新增
    PdCharts: typeof import('./packages/components/PdCharts')['PdCharts']
    PdPageLayout: typeof import('./packages/components/PdPageLayout')['PdPageLayout']
    PdPageTreeLayout: typeof import('./packages/components/PdPageLayout')['PdPageTreeLayout']
  }
}
```

`packages/components/PdPageLayout/index.ts` 补充导出：

```typescript
export type PageLayoutInstance = InstanceType<typeof PdPageLayout>
export type PageTreeLayoutInstance = InstanceType<typeof PdPageTreeLayout>
```

`packages/components/PdCharts/index.ts` 中 `ChartsInstance` 已存在，无需修改。

---

## Requirement 9 — Husky + commitlint 接入

### 新建文件

`commitlint.config.cjs`：

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

`.husky/commit-msg`（hook 脚本）：

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx --no -- commitlint --edit "$1"
```

### package.json 变更

```json
"devDependencies": {
  "@commitlint/cli": "19.8.1",
  "@commitlint/config-conventional": "19.8.1"
}
```

`husky` 现有配置在 `package.json` 的 `husky.hooks` 字段（旧式配置）。需迁移到 `.husky/` 目录（Husky v8+ 推荐方式）：

- `.husky/pre-commit`：`npx lint-staged`（替代旧 `package.json` 的 `husky.hooks.pre-commit`）
- `.husky/commit-msg`：`npx --no -- commitlint --edit "$1"`（新增）

同时在 `package.json` `scripts` 中补充：

```json
"prepare": "husky"
```

---

## Requirement 10 — Changesets 版本管理接入

### 新建文件

`.changeset/config.json`：

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.5/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

`.changeset/README.md`：说明 Changesets 工作流。

### package.json 变更

```json
"devDependencies": {
  "@changesets/cli": "2.29.5"
},
"scripts": {
  "changeset": "changeset",
  "version-packages": "changeset version",
  "release": "changeset publish",
  // 保留旧脚本，标注已被 Changesets 替代
  // "release:patch": "node script/release.mjs patch",  // Deprecated: use `changeset` workflow
}
```

---

## Requirement 11 — CI 流水线优化

### 变更文件

`.github/workflows/node.js.yml`

### 结构设计

```yaml
jobs:
  build:
    steps:
      # 1. Checkout / pnpm / Node 缓存（已有，保留）
      # 2. 新增 lint 步骤
      - name: Lint
        run: pnpm run lint
      # 3. Build（已有）
      - name: Build (lib)
        run: pnpm run build:lib
      # 4. Test + coverage 上传（test:coverage 已有，codecov 已有）
      - name: Test
        run: pnpm run test:coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        # ...

  release:
    name: Publish (Changesets)
    needs: build
    runs-on: ubuntu-latest
    # 仅在 tag push 触发
    if: github.event_name == 'push' && startsWith(github.ref, 'refs/tags/v')
    steps:
      - uses: actions/checkout@v4
      # pnpm + Node setup（同 build job）
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build (npm)
        run: pnpm run build:npm
      - name: Publish
        run: pnpm run release
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> 原有 `publish` job 中的 `workflow_dispatch` 触发方式保留（兼容手动发布），新增 `release` job 专用于 tag 触发的 Changesets 发布流程。

### pnpm 缓存

`setup-node` 的 `cache: pnpm` 已在现有配置中启用，无需重复配置。需确认 `pnpm/action-setup@v4` 版本与 pnpm 9 兼容。

---

## Requirement 12 — coverage 目录 gitignore 修正

`.gitignore` 现有 `coverage` 条目（无斜杠），需补充或替换为 `coverage/`。

建议同时保留两种写法以确保兼容：

```gitignore
# Coverage reports
coverage
coverage/
*.lcov
```

若 `coverage/` 已被 git track，需执行：

```bash
git rm -r --cached coverage/
git commit -m "chore: untrack coverage directory"
```

---

## Requirement 13 — 构建产物类型声明完整性

### 入口文件检查

`packages/index.ts` 必须 re-export `PdCharts`、`PdPageLayout` 及其类型，确保 `vite-plugin-dts` 能扫描到所有导出。

`package.json` 的 `types` 字段确认指向 `./dist/packages/index.d.ts`（已是现有配置，但需在 dts 升级后验证文件实际生成位置）。

### 验证步骤

构建后运行：

```bash
# 检查关键类型文件存在
ls dist/packages/components/PdCharts/index.d.ts
ls dist/packages/components/PdPageLayout/index.d.ts

# 检查 ActionType / Instance 类型是否在产物中
grep -r "ChartsActionType\|ChartsInstance" dist/ --include="*.d.ts"
grep -r "PageLayoutInstance" dist/ --include="*.d.ts"
```

---

## Requirement 14 — Vitest 覆盖率配置扩展

### 变更文件

`vitest.config.ts`

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'lcov', 'html'],
  reportsDirectory: './coverage',
  include: [
    // 已有
    'packages/shared/**/*.{ts,tsx}',
    'packages/pandora/make-installer.ts',
    'packages/components/PdTable/src/**/*.{ts,tsx}',
    // 新增
    'packages/components/PdForm/src/**/*.{ts,tsx}',
    'packages/components/PdPageLayout/**/*.{ts,tsx}',
    'packages/components/PdCharts/src/**/*.{ts,tsx}',
  ],
  exclude: [
    // 已有排除项...
    '**/*.vue',
    '**/__tests__/**',
    '**/node_modules/**',
    'dist/**',
    // 新增排除
    'packages/components/PdCharts/src/types/**',
    'packages/components/PdCharts/src/utils/wc.ts', // web component 注册，jsdom 不兼容
  ],
  // 行覆盖率低于 60% 时输出警告（不强制失败）
  thresholds: {
    lines: 60,
    // perFile: false 表示聚合计算，不逐文件失败
  }
}
```

---

## Component Interfaces

### PdTable 新增 Props 接口

```typescript
interface PdTableProps {
  data: any[]
  columns: IPandoraTableColumn<any>[]
  sortConfig?: IPandoraTableSort<any>
  /** @deprecated 使用 paginationConfig + selectionConfig 替代 */
  tableConfig?: IPandoraTable<any>
  /** @since 1.1.0 */
  paginationConfig?: IPaginationConfig | false
  /** @since 1.1.0 */
  selectionConfig?: ISelectionConfig
}
```

### PdForm 泛型 Schema

```typescript
// 使用示例（类型联动）
const schemas: IFormSchema<'Input'>[] = [
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    componentProps: { placeholder: '请输入', clearable: true } // 推断为 Partial<InputProps>
  }
]

// 向后兼容（无泛型，行为不变）
const schemas: IFormSchema[] = [
  { field: 'age', label: '年龄', component: 'InputNumber', componentProps: { min: 0 } }
]
```

---

## Data Models

### IPaginationConfig（新增）

```
IPaginationConfig
├── currentPage?: number     (当前页，默认 1)
├── total?: number           (总条目数)
├── pageSize?: number        (每页条数，默认 10)
├── pageSizes?: number[]     (可选每页条数，默认 [10, 20, 50, 100])
├── layout?: string          (分页布局，默认 'total, sizes, prev, pager, next, jumper')
├── height?: number          (分页区域高度)
└── pageCount?: number       (最大页码按钮数)
```

### ISelectionConfig（新增）

```
ISelectionConfig<T>
├── selectionMode?: 'single' | 'multi'
├── selectionPos?: 'top' | 'end'
└── selectable?: (row: T, index: number) => boolean
```

---

## Error Handling

### Breaking Change 处理策略

| 场景 | 处理方式 |
|------|---------|
| `tableConfig` 传入（DEV） | `console.warn` + 迁移路径提示，仅在 `import.meta.env.DEV` 时触发 |
| `tableConfig` 传入（PROD） | 静默兼容，正常渲染，不抛出错误 |
| `paginationConfig` 与 `tableConfig.pagination` 同时存在 | `paginationConfig` 优先，记录在 JSDoc 中 |
| `vite-plugin-dts` API 变更 | `lib.config.ts` 注释标注旧 vs 新 API，方便回滚 |

### 构建失败处理

`vite-plugin-dts@4.x` 升级后若 `build:lib` 失败：
1. 检查 `tsconfig.json` 中 `declaration` / `declarationDir` 设置是否与插件冲突
2. 确认 `packages/index.ts` 所有导出路径可被 TypeScript 解析
3. `rollupTypes: true` 模式要求所有导入均为纯 TypeScript（无 `.vue` 动态导入），如遇冲突先禁用此选项

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: paginationConfig 优先级高于 tableConfig

*For any* combination of `paginationConfig` prop and `tableConfig.pagination` passed to PdTable simultaneously, the component SHALL use `paginationConfig` as the effective pagination configuration, ignoring `tableConfig.pagination`.

**Validates: Requirements 1.3**

### Property 2: DEV warn 对任意非空 tableConfig 触发

*For any* non-empty `tableConfig` object passed to PdTable when `import.meta.env.DEV` is `true`, `console.warn` SHALL be called at least once with a message containing the migration path.

**Validates: Requirements 1.4**

### Property 3: setFieldsValue / getFieldsValue 读写一致性

*For any* key-value record passed to `setFieldsValue`, calling `getFieldsValue` afterwards SHALL return an object where each key maps to the same value that was set.

**Validates: Requirements 3.2**

### Property 4: updateSchema 字段属性更新生效

*For any* valid `field` name present in the current schema list, and *for any* partial schema patch object, calling `updateSchema` with that patch SHALL result in the schema for that field reflecting the updated properties.

**Validates: Requirements 3.3**

### Property 5: resetFields 恢复 defaultValue

*For any* form where schemas include `defaultValue` fields, and *for any* sequence of `setFieldsValue` calls, calling `resetFields` afterwards SHALL restore each field to its declared `defaultValue` (or empty/undefined if no default was declared).

**Validates: Requirements 3.4**

### Property 6: buttonConfig 渲染数量与配置长度一致

*For any* `buttonConfig` array of length N passed to PdPageLayout, the rendered button count in `.pandora-button-section` SHALL equal N.

**Validates: Requirements 4.4**

### Property 7: options 更新触发 setOption

*For any* new `options` object passed as a prop update to PdCharts, the ECharts instance's `setOption` method SHALL be called with that exact options object as the first argument.

**Validates: Requirements 5.6**

### Property 8: isXxx 类型判断函数正确性

*For any* JavaScript value `v`, each type-guard function in `shared/_utils/is` SHALL return `true` if and only if `v` is of the declared type (e.g., `isString(v)` returns `true` iff `typeof v === 'string'`).

**Validates: Requirements 6.2**

### Property 9: createNamespace 前缀不变量

*For any* non-empty component name string `S`, `createNamespace(S)` SHALL return a tuple whose first element equals `'Pd' + S`.

**Validates: Requirements 6.4**

### Property 10: withInstall 注册不变量

*For any* Vue component definition `C`, `withInstall(C)` SHALL return an object with an `install` method such that calling `app.use(result)` registers the component under the name `C.name` in the application.

**Validates: Requirements 6.5**
