import type { ComputedRef, Ref } from 'vue'
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
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  // Internal component size of the form
  size?: 'medium' | 'small' | 'mini'
  inline?: false
  rules?: any[]

  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
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

  // Event name triggered by internal value change, default change
  changeEvent?: string
  //  render component
  component: ComponentType
  // component props
  componentProps?:
    | ((opt: { schema: IFormSchema; formModel: Recordable }) => Recordable)
    | object
}

interface Callback {
  (isValid?: boolean, invalidFields?: any): void
}

export interface IFormActionType {
  submit: () => Promise<void>
  resetFields: () => Promise<void>
  validate: (cb: Callback) => Promise<void>

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
  appendSchemaByField: (
    schema: IFormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined
  ) => Promise<void>
}

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}

export type RegisterFn = (formInstance: IFormActionType) => void

export type UseFormReturnType = [RegisterFn, IFormActionType]
