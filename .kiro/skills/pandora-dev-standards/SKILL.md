---
name: "pandora-dev-standards"
description: "Pandora2 组件库完整开发指南。新增组件、编写 Hook、定义类型、写测试或调整架构时调用。包含从脚手架到发版的全流程规范。"
---

# Pandora2 组件库开发指南

## 一、新建组件完整流程

### 步骤 1：生成脚手架

```bash
pnpm gen
# 按提示输入：组件名（PascalCase）、中文名、组件描述
```

脚手架会自动生成：
- `packages/components/PdXxx/index.ts`
- `packages/components/PdXxx/src/index.vue`
- `src/_docs/PdXxx/` 文档目录
- 路由配置

### 步骤 2：手动补全目录结构

```
packages/components/PdXxx/
  __tests__/
    PdXxx.spec.ts         # 单元测试（必须）
  src/
    index.vue             # 主组件
    types/
      index.ts            # 对外类型（接口、ActionType、UseXxxReturnType）
    props/
      index.ts            # Props 声明
    hooks/
      useXxx.ts           # 组件内部 Hook（逻辑超过 200 行时拆分）
  index.ts                # 对外导出入口
```

### 步骤 3：index.ts 固定写法

```ts
import { withInstall } from '@pandora/shared/_utils/vue'
import _Xxx from './src/index.vue'

export const PdXxx = withInstall(_Xxx)
export default PdXxx

export type XxxInstance = InstanceType<typeof PdXxx>
export * from './src/types'
```

### 步骤 4：主组件固定结构

```vue
<script lang="tsx">  <!-- 需要 JSX 渲染时用 tsx，否则用 ts -->
import { createNamespace } from '@pandora/shared/_utils/create'
import { defineComponent, onMounted, ref } from 'vue'
import { xxxProps } from './props'
import type { IXxxActionType } from './types'

const [name] = createNamespace('Xxx')  // → 'PdXxx'

export default defineComponent({
  name,
  inheritAttrs: false,
  props: xxxProps,
  emits: ['register'],
  setup(props, { emit }) {
    // 1. 定义内部状态
    // 2. 组合 hooks
    // 3. 定义 actionType（对外暴露的方法集合）
    const xxxAction: IXxxActionType = {
      setProps: async (p) => { ... },
      // ...
    }
    // 4. mounted 时通过 register 暴露实例
    onMounted(() => {
      emit('register', xxxAction)
    })
    // 5. 返回渲染函数（JSX）
    return () => (
      <div class="vpandora-xxx">
        {/* 组件内容 */}
      </div>
    )
  }
})
</script>

<style lang="less">
.vpandora-xxx {
  width: 100%;
}
</style>
```

### 步骤 5：在 packages/components/index.ts 注册

```ts
export * from './PdXxx'
```

---

## 二、register 模式（命令式调用）

当需要在父组件中命令式操作子组件时，使用 register 模式。

### 组件内 setup

```ts
const xxxAction: IXxxActionType = {
  setProps: async (props) => { ... },
  getData: () => { ... }
}

onMounted(() => {
  emit('register', xxxAction)
})
```

### 配套 Hook（src/hooks/useXxx.ts）

```ts
import { ref, watch, onUnmounted, unref, nextTick } from 'vue'
import { isProdMode } from '@pandora/shared/_utils/env'
import { getDynamicProps, error } from '@pandora/shared/_utils'
import type { IXxxActionType, UseXxxReturnType } from '../types'

export function useXxx(props?: Partial<IXxxProps>): UseXxxReturnType {
  const xxxRef = ref<Nullable<IXxxActionType>>(null)

  async function getInstance() {
    const inst = unref(xxxRef)
    if (!inst) {
      error('组件实例未获取到，请确保组件已渲染！')
    }
    await nextTick()
    return inst as IXxxActionType
  }

  const register = (instance: IXxxActionType) => {
    isProdMode() && onUnmounted(() => { xxxRef.value = null })
    xxxRef.value = instance

    watch(
      () => props,
      () => { props && instance.setProps(getDynamicProps(props)) },
      { immediate: true, deep: true }
    )
  }

  const methods: IXxxActionType = {
    setProps: async (p) => {
      const inst = await getInstance()
      inst.setProps(p)
    }
    // ...
  }

  return [register, methods]
}
```

### 使用方

```vue
<template>
  <PdXxx @register="register" />
</template>

<script lang="ts" setup>
import { useXxx } from '@pandora/components/PdXxx'

const [register, xxxAction] = useXxx()
// 直接调用：xxxAction.setProps(...)
</script>
```

---

## 三、类型定义规范

### 命名约定

| 场景 | 命名规则 | 示例 |
|------|---------|------|
| Props 类型 | `IXxxProps` | `IFormProps` |
| 配置选项类型 | `IXxxOption` / `IXxxConfig` | `IPandoraTable` |
| 列/项类型 | `IXxxColumn` / `IXxxSchema` | `IPandoraTableColumn`、`IFormSchema` |
| 实例方法集合 | `IXxxActionType` | `ITableActionType`、`IFormActionType` |
| Hook 返回类型 | `UseXxxReturnType` | `UseTableReturnType` |
| 排序/特殊配置 | `IXxxSort` | `IPandoraTableSort` |

### types/index.ts 标准结构

```ts
// 1. 引入外部类型
import type { ColProps } from 'element-plus'
import type { VNode, Ref, ComputedRef } from 'vue'

// 2. 基础工具类型
export type Fn = (...args: any[]) => any
export type EmitType = (event: string, ...args: any[]) => void

// 3. 配置/选项接口（I 前缀）
export interface IXxxProps {
  data: any[]
  // ...
}

// 4. ActionType（组件对外暴露的方法集合）
export type IXxxActionType = {
  setProps: (props: Partial<IXxxProps>) => Promise<void>
  getData: <T = any>() => T[]
  // ...
}

// 5. Hook 返回类型
export type RegisterFn = (instance: IXxxActionType) => void
export type UseXxxReturnType = [RegisterFn, IXxxActionType]
```

---

## 四、Props 定义规范

```ts
// src/props/index.ts
import { propTypes } from '@pandora/shared/_utils/propTypes'
import type { IXxxProps } from '../types'
import type { PropType } from 'vue'

export const xxxProps = {
  // 使用 propTypes 工具
  data: propTypes.array.def([]),
  visible: propTypes.bool.def(false),

  // 复杂对象类型
  config: {
    type: Object as PropType<IXxxProps>,
    default: () => ({})
  },

  // 函数类型
  onConfirm: {
    type: Function as PropType<(val: any) => void>
  }
}
```

---

## 五、可用的共享工具

### shared/_utils/create

```ts
import { createNamespace } from '@pandora/shared/_utils/create'
const [name] = createNamespace('Form')  // → 'PdForm'
```

### shared/_utils/vue

```ts
import { withInstall, withInstallFunction, withInstallDirective } from '@pandora/shared/_utils/vue'
import { composeRefs } from '@pandora/shared/_utils/vue'
```

### shared/_utils（通用工具）

```ts
import {
  error,           // 抛出错误（开发模式警告）
  getDynamicProps, // 从 Ref/ComputedRef 中解包 props
  getPopupContainer,
  propTypes
} from '@pandora/shared/_utils'
```

### shared/_utils/env

```ts
import { isProdMode, isDevMode } from '@pandora/shared/_utils/env'
```

### shared/_utils/dateUtil

```ts
import { dateUtil } from '@pandora/shared/_utils/dateUtil'
// 基于 dayjs 的日期工具
```

### shared/_utils/is（类型判断）

```ts
import { isFunction, isObject, isArray, isString, isNil } from '@pandora/shared/_utils/is'
```

---

## 六、测试规范

### 文件位置

```
packages/components/PdXxx/__tests__/PdXxx.spec.ts
```

### 标准测试结构

```ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import PdXxx from '../src/index.vue'

describe('PdXxx', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(PdXxx, {
      props: { data: [] }
    })
    expect(wrapper.find('.vpandora-xxx').exists()).toBe(true)
  })

  it('emits register event on mounted', () => {
    const wrapper = mount(PdXxx, { props: {} })
    expect(wrapper.emitted('register')).toBeTruthy()
  })
})
```

### 运行命令

```bash
pnpm test:ci       # CI 模式，单次执行
pnpm test          # watch 模式（本地开发）
pnpm test:coverage # 覆盖率报告
```

---

## 七、文档规范

### 目录结构

```
src/_docs/PdXxx/
  docs/
    README.md         # 主文档（属性/事件/slots/方法说明）
    demo.vue          # 主示例
    [feature].md      # 扩展能力文档（分页.md、排序.md 等）
    [feature].vue     # 对应示例
  index.ts            # 文档路由入口
```

### README.md 标准结构

```markdown
# PdXxx 组件

## 基础用法
...（demo 引用）

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | any[] | [] | 数据源 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| register | (instance: IXxxActionType) | 注册实例 |

## useXxx Hook

### 返回值

| 方法 | 签名 | 说明 |
|------|------|------|
| setProps | (props) => Promise<void> | 动态更新 props |
```

---

## 八、发版流程

```bash
# 1. 执行测试 + 构建（preversion 钩子自动触发）
pnpm release:patch    # 或 minor / major

# 自动执行顺序：
# 1. pnpm test:ci
# 2. pnpm build:lib
# 3. 更新 package.json version
# 4. 生成 CHANGELOG
# 5. git tag + push

# 2. 发布 npm
npm publish
```

---

## 九、常见错误与解决方案

### 问题 1：组件实例未找到

```
Error: The xxx instance has not been obtained...
```

原因：在组件挂载前调用了实例方法。  
解决：确保 `useXxx` 的方法调用在 `onMounted` 之后，或在 `nextTick` 中调用。

### 问题 2：类型推断失效

原因：`import` 忘记加 `type` 关键字，或未在 `tsconfig.paths` 中配置别名。  
解决：
```ts
import type { IXxxActionType } from './types'
```

### 问题 3：样式不生效

原因：组件 style 加了 `scoped`，导致全局无法覆盖。  
解决：组件库样式不加 `scoped`，用根类名 `.vpandora-xxx` 隔离。

### 问题 4：props 响应式更新不触发

原因：直接替换对象引用而非 merge。  
解决：使用 `merge({}, unref(propsRef), newProps)` 或展开语法保留响应式。
