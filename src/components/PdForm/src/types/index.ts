import type { ComputedRef, Ref } from 'vue'
import type { FormRules } from 'element-plus'
export type ComponentType =
  | 'Autocomplete'
  | 'Button'
  | 'Checkbox'
  | 'Cascader'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'Input'
  | 'InputNumber'
  | 'TimePicker'
  | 'TimeSelect'
  | 'Slider'
  | 'Select'
  | 'SelectOption'
  | 'Radio'
  | 'Switch'
  | 'Rate'

export interface IFormProps {
  model: Record<string, any>
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  // 是否显示必填字段的标签旁边的红色星号
  hideRequiredAsterisk?: boolean
  // 是否显示校验错误信息
  showMessage?: boolean
  // 是否以行内形式展示校验信息
  inlineMessage?: boolean
  // 是否在输入框中显示校验结果反馈图标
  statusIcon?: boolean
  // 是否在 rules 属性改变后立即触发一次验证
  validateOnRuleChange?: boolean

  // Internal component size of the form
  size?: 'large' | 'default' | 'small'
  inline?: false
  disabled?: boolean
  rules?: FormRules

  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
}

export interface IColProps {
  span?: number
  offset?: number
}
/**
 * Form Schema
 */
export interface IFormSchema {
  // Field
  field: string
  // label
  label: string
  // value 默认值
  defaultValue?: string | string[] | number
  colProps?: IColProps
  // Event name triggered by internal value change, default change
  changeEvent?: string
  //  render component
  component: ComponentType
  // component props
  componentProps?:
    | ((opt: { schema: IFormSchema; formModel: Recordable }) => Recordable)
    | any
}

interface Callback {
  (isValid?: boolean, invalidFields?: any): void
}

export interface IFormActionType {
  submit: () => Promise<void>
  resetFields: () => Promise<void>
  validate?: (cb: Callback) => Promise<void>

  setFieldsValue: <T>(values: T) => Promise<void>
  getFieldsValue: () => Recordable
  clearValidate: (name?: string | string[]) => Promise<void>
  updateSchema: (
    data: Partial<IFormSchema> | Partial<IFormSchema>[]
  ) => Promise<void>
  resetSchema: (
    data: Partial<IFormSchema> | Partial<IFormSchema>[]
  ) => Promise<void>
  setProps: (formProps: Partial<IFormProps>) => Promise<void>
  removeSchemaByFiled: (field: string | string[]) => Promise<void>
  appendSchemaByField?: (
    schema: IFormSchema,
    prefixField?: string | undefined,
    first?: boolean | any
  ) => Promise<void>
}

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}

export type RegisterFn = (formInstance: IFormActionType) => void

export type UseFormReturnType = [RegisterFn, IFormActionType]
