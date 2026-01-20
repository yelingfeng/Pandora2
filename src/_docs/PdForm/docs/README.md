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


## 属性

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
