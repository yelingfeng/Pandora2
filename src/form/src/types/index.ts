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
  | 'Radio'
  | 'Switch'
  | 'Rate'

export interface IFormProps {
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  // Internal component size of the form
  size?: 'medium' | 'small' | 'mini'
}

// formItem 属性
export interface IFormItemProps {}

/**
 * Form Schema
 */
export interface IFormSchema {
  // Field
  field: string
  // label
  label: string
  // value 默认值
  defaultValue?: string

  // Event name triggered by internal value change, default change
  changeEvent?: string
  //  render component
  component: ComponentType
  // component props
  componentProps?: (opt: {
    schema: IFormSchema
    formModel: Recordable
  }) => Recordable | object
}

export interface IFormActionType {
  submit: () => Promise<void>
  setFieldsValue: <T>(values: T) => Promise<void>
  resetFields: () => Promise<void>
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
