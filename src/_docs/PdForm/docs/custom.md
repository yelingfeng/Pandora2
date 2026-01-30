
## 自定义组件

当内置 `ComponentType` 不满足需求时，可以把业务组件注册到 PdForm 的组件映射里，然后在 schema 中通过 `component` 使用它。

```ts
import { useComponentRegister } from '@pandora/components/PdForm'
import MyCustomInput from './MyCustomInput.vue'

useComponentRegister('Input' as any, MyCustomInput)
```

建议使用一个“不会与内置 ComponentType 冲突”的名称（例如 `BizSelect`），并在 schema 中引用：

```ts
const schemas = [
  { field: 'biz', label: '业务组件', component: 'BizSelect' as any }
]
```

<Preview comp-name="PdForm" demo-name="custom">
  <custom/>
</Preview>

<script setup>
import custom from './custom.vue'
</script>
