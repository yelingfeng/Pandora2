# PdForm

Pandora2 的form组件

<!-- 加载 demo 组件 end -->

<script setup>
import demo from './demo.vue'
</script>

<!-- 加载 demo 组件 start -->

## 基础使用
<Preview comp-name="PdForm" demo-name="demo">
  <demo />
</Preview>

## 快速开始

PdForm 通过 `schemas` 描述表单项，通过 `useForm()` 获取表单实例方法（校验、取值、动态改 schema 等），适合“配置化表单 / 动态表单”场景。

```vue
<template>
  <PdForm :schemas="schemas" @register="register" @submit="onSubmit" />
</template>

<script setup lang="ts">
import { PdForm, useForm, type IFormSchema } from '@pandora/components/PdForm'

const schemas: IFormSchema[] = [
  { field: 'name', component: 'Input', label: '名称', required: true, colProps: { span: 8 } },
  { field: 'date', component: 'DatePicker', label: '日期', colProps: { span: 8 } }
]

const [register] = useForm({ schemas, labelWidth: 120 })

function onSubmit(values: Record<string, any>) {
  console.log(values)
}
</script>
```

## useForm / 表单实例

`useForm()` 返回 `[register, methods]`：

- `register`：绑定到 `<PdForm @register="register" />`，用于拿到实例
- `methods`：表单实例方法（可用于按钮事件、接口联动、动态增减表单项）

常用方法（完整类型以 `IFormActionType` 为准）：

- `submit()`：触发表单提交（内部会校验并触发 `submit` 事件）
- `validate(cb?)` / `validateFields(fields?)` / `clearValidate(name?)`
- `getFieldsValue()` / `setFieldsValue(values)`
- `setProps(formProps)`：动态设置表单 props（包含 Element Plus Form 原生 props）
- `updateSchema(partial)` / `resetSchema(partial)`：动态更新 schema
- `removeSchemaByFiled(field)` / `appendSchemaByField(schema, prefixField?, first?)`
- `scrollToField(name, options?)`

## 事件

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| register | (instance: IFormActionType) | 表单实例注册（配合 useForm） |
| submit | (values: Recordable) | 点击提交或调用 `submit()` 后触发 |
| reset | () | 点击重置或调用 `resetFields()` 后触发 |
| advanced-change | (isAdvanced: boolean) | 展开/收起状态变化 |
| field-value-change | (data: { key: string; value: any; values: Recordable }) | 任意字段值变化（受 `submitOnChange`/watch 逻辑影响） |

## 属性

PdForm 的属性由两部分构成：

- **组件扩展属性**：下表列出（schemas、折叠、按钮组等）
- **Element Plus Form 原生属性**：可直接作为 `<PdForm ... />` 传入，也可用 `setProps()` 动态设置（例如 `labelPosition/inline/rules/hideRequiredAsterisk` 等）

| 属性 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| model | 表单数据对象 | `Object` | `{}` |
| labelWidth | 标签宽度，固定宽度 | `Number \| String` | `0` |
| fieldMapToTime | 时间字段映射，用于将时间数组解构为两个字段 | `Array` | `[]` |
| schemas | 表单配置规则数组 | `IFormSchema[]` | `[]` |
| mergeDynamicData | 合并到动态数据的对象 | `Object` | `null` |
| baseRowStyle | 基础行样式 | `Object` | - |
| baseColProps | 基础列配置 (Element Plus ColProps) | `Object` | - |
| autoSetPlaceHolder | 是否自动设置占位符 | `Boolean` | `true` |
| autoSubmitOnEnter | 在Input组件上回车是否自动提交 | `Boolean` | `false` |
| submitOnReset | 重置时是否提交 | `Boolean` | `false` |
| submitOnChange | 表单值变化时是否自动提交 | `Boolean` | `false` |
| size | 表单尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用表单 | `Boolean` | `false` |
| emptySpan | 空白占位格数 | `Number \| Object` | `0` |
| showAdvancedButton | 是否显示收起/展开按钮 | `Boolean` | `false` |
| transformDateFunc | 时间转换函数 | `Function` | `(date) => date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date` |
| rulesMessageJoinLabel | 验证消息是否包含标签名 | `Boolean` | `true` |
| autoAdvancedLine | 超过多少行自动折叠 | `Number` | `3` |
| alwaysShowLines | 始终显示的行数（不受折叠影响） | `Number` | `1` |
| showActionButtonGroup | 是否显示操作按钮组 | `Boolean` | `true` |
| actionColOptions | 操作列布局配置 (Element Plus ColProps) | `Object` | - |
| showResetButton | 是否显示重置按钮 | `Boolean` | `true` |
| autoFocusFirstItem | 是否自动聚焦第一个输入框 | `Boolean` | `false` |
| resetButtonOptions | 重置按钮配置 (Element Plus ButtonProps) | `Object` | - |
| showSubmitButton | 是否显示提交按钮 | `Boolean` | `true` |
| submitButtonOptions | 提交按钮配置 (Element Plus ButtonProps) | `Object` | - |
| resetFunc | 自定义重置函数 | `() => Promise<void>` | - |
| submitFunc | 自定义提交函数 | `() => Promise<void>` | - |
| hideRequiredMark | 是否隐藏必填标记 | `Boolean` | `false` |
| labelAlign | 标签对齐方式 | `String` | - |
| rowProps | 行组件配置 (Element Plus RowProps) | `Object` | - |
| rules | 表单验证规则 | `Object` | - |

### 常用 Element Plus Form 原生属性（透传）

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| labelPosition | label 位置 | `'left' \| 'right' \| 'top'` |
| labelSuffix | label 后缀 | `string` |
| inline | 行内表单 | `boolean` |
| showMessage | 是否显示校验信息 | `boolean` |
| inlineMessage | 行内显示校验信息 | `boolean` |
| statusIcon | 输入框状态图标 | `boolean` |
| validateOnRuleChange | 规则变化时是否触发校验 | `boolean` |
| hideRequiredAsterisk | 是否隐藏必填星号 | `boolean` |

## FormSchema

| 属性 | 说明 | 类型 |
| :--- | :--- | :--- |
| field | 字段名 | `string` |
| label | 标签名 | `string` |
| changeEvent | 内部值变化触发的事件名，默认为 change | `string` |
| component | 渲染的组件类型 | `ComponentType` |
| componentProps | 组件属性 | `Object \| Function` |
| rules | 验证规则 | `FormRules \| FormRules[]` |
| required | 是否必填 | `boolean \| Function` |
| suffix | 后缀 | `string \| number \| Function` |
| rulesMessageJoinLabel | 验证消息是否包含标签名 | `boolean` |
| itemProps | 参考 FormItem 的 props | `object` |
| colProps | 表单项外层的 Col 配置 | `object` |
| labelCol | 标签 Col 配置 | `object` |
| wrapperCol | 控件 Col 配置 | `object` |
| valueField | 绑定到 v-model 的变量名 | `string` |
| subLabel | 子标签 | `string` |
| helpMessage | 帮助信息 | `string \| string[] \| Function` |
| helpComponentProps | 帮助组件属性 | `object` |
| defaultValue | 默认值 | `any` |
| ifShow | 是否显示 (DOM 层面控制) | `boolean \| Function` |
| show | 是否显示 (CSS 层面控制) | `boolean \| Function` |
| render | 自定义渲染内容 (在 form-item 内部) | `Function` |
| renderColContent | 自定义渲染 Col 内容 (需要外层包裹 form-item) | `Function` |
| renderComponentContent | 自定义渲染组件内容 | `Function \| VNode \| string` |
| slot | 自定义插槽 (在 form-item 内部) | `string` |
| colSlot | 自定义 Col 插槽 | `string` |
| dynamicDisabled | 动态禁用 | `boolean \| Function` |
| dynamicRules | 动态验证规则 | `Function` |

## ComponentType

| 组件名 | 说明 |
| :--- | :--- |
| Autocomplete | 自动补全输入框 |
| Button | 按钮 |
| Checkbox | 多选框 |
| CheckboxGroup | 多选框组 |
| Cascader | 级联选择器 |
| DatePicker | 日期选择器 |
| Input | 输入框 |
| InputNumber | 数字输入框 |
| TimePicker | 时间选择器 |
| TimeSelect | 时间选择 |
| Slider | 滑块 |
| Select | 选择器 |
| SelectOption | 选择器选项 |
| Radio | 单选框 |
| RadioGroup | 单选框组 |
| Switch | 开关 |
| Rate | 评分 |
| Divider | 分割线 |
| ApiSelect | 远程下拉选择器 |
