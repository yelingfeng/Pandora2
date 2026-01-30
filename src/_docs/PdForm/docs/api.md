## 表单实例 API（useForm）

PdForm 会在 mounted 时通过 `register` 事件回传表单实例（`IFormActionType`）。推荐使用 `useForm()` 统一管理实例并获得类型提示。

```ts
import { useForm } from '@pandora/components/PdForm'

const [register, methods] = useForm({
  labelWidth: 120,
  schemas: []
})
```

## 示例：调用实例方法

<Preview comp-name="PdForm" demo-name="api">
  <api/>
</Preview>

示例中演示了这些能力：

- `validateFields()`：手动校验表单
- `clearValidate()`：清空校验信息
- `getFieldsValue()`：获取表单值
- `setFieldsValue()`：设置表单值
- `resetFields()`：重置表单

<script setup>
import api from './api.vue'
</script>
