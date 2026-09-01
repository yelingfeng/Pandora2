---
name: "pandora-pdform-docs"
description: "Guides PdForm docs and schema-driven form usage. Invoke when editing PdForm demos, useForm flows, schema APIs, or form props/events documentation."
---

# Pandora PdForm Docs Guide

用于 Pandora2 中 PdForm 文档与示例开发的执行规范。

## 何时调用

- 用户要求修改 `src/_docs/PdForm/docs/**`
- 用户要求更新 `useForm`、`schemas`、动态表单行为
- 用户要求补充 PdForm 属性/事件/API 文档

## 关键事实（基于当前仓库）

- 文档目录：`src/_docs/PdForm/docs`
- 主要文档：`README.md`、`props.md`、`api.md`、`custom.md`、`dynamic.md`
- 示例文件：`demo.vue`、`props.vue`、`api.vue`、`custom.vue`、`dynamic.vue`
- README 已说明：`PdForm + useForm + IFormSchema` 的核心用法

## 实施步骤

1. 变更前先对齐 README 中的核心范式：`schemas` 驱动 + `useForm` 实例方法。
2. 变更属性或事件时，同步维护文档表格与 demo 行为，避免描述与代码偏差。
3. 涉及动态 schema 操作时，优先覆盖常见路径：
   - `updateSchema` / `resetSchema`
   - `appendSchemaByField` / `removeSchemaByFiled`
4. 完成后进行 docs 构建验证。

## 输出要求

- 说明修改了哪些文档页与 demo
- 说明受影响的 useForm 方法或 schema 字段
- 提供构建结果

## 示例代码

### 1) useForm + schema 基础示例

```ts
const schemas = [
  { field: 'name', component: 'Input', label: '名称', required: true, colProps: { span: 8 } },
  { field: 'date', component: 'DatePicker', label: '日期', colProps: { span: 8 } }
]

const [register, { updateSchema, setFieldsValue }] = useForm({
  schemas,
  labelWidth: 120
})

updateSchema({ field: 'name', componentProps: { placeholder: '请输入名称' } })
setFieldsValue({ name: 'Pandora' })
```

### 2) 动态增删 schema

```ts
appendSchemaByField(
  { field: 'remark', component: 'Input', label: '备注', colProps: { span: 8 } },
  'date'
)
removeSchemaByFiled('remark')
```

## 属性配置用法（补全）

### 1) PdForm 顶层属性（IFormProps）

- 数据与规则：`model`、`schemas`、`rules`、`mergeDynamicData`
- 布局：`labelWidth`、`labelPosition`、`rowProps`、`baseColProps`、`actionColOptions`
- 行为：`autoSetPlaceHolder`、`autoSubmitOnEnter`、`submitOnReset`、`submitOnChange`
- 折叠：`showAdvancedButton`、`autoAdvancedLine`、`alwaysShowLines`
- 按钮：`showActionButtonGroup`、`showResetButton`、`showSubmitButton`、`resetButtonOptions`、`submitButtonOptions`
- 其它：`size`、`disabled`、`hideRequiredMark`、`hideRequiredAsterisk`、`fieldMapToTime`、`transformDateFunc`

```vue
<PdForm
  :schemas="schemas"
  :label-width="120"
  :show-advanced-button="true"
  :auto-advanced-line="2"
  :show-action-button-group="true"
  :show-submit-button="true"
  :show-reset-button="true"
  @register="register"
  @submit="onSubmit"
/>
```

### 2) Schema 字段（IFormSchema）

- 核心：`field`、`label`、`component`、`componentProps`
- 校验：`required`、`rules`、`dynamicRules`
- 显示：`show`、`ifShow`、`dynamicDisabled`
- 布局：`colProps`、`labelCol`、`wrapperCol`
- 渲染：`render`、`renderColContent`、`renderComponentContent`、`slot`、`colSlot`
- 扩展：`defaultValue`、`helpMessage`、`subLabel`、`valueField`

```ts
const schemas = [
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    required: true,
    componentProps: { options: [{ label: '启用', value: 1 }, { label: '停用', value: 0 }] },
    colProps: { span: 8 }
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    ifShow: ({ values }) => values.status === 0,
    colProps: { span: 8 }
  }
]
```

### 3) useForm 方法用法

- `setProps`、`setFieldsValue`、`getFieldsValue`
- `validate`、`validateFields`、`clearValidate`
- `updateSchema`、`resetSchema`
- `appendSchemaByField`、`removeSchemaByFiled`

```ts
const [register, form] = useForm({ schemas, labelWidth: 120 })
form.setProps({ disabled: false, size: 'default' })
form.updateSchema({ field: 'status', label: '状态(动态)' })
await form.validate()
```
