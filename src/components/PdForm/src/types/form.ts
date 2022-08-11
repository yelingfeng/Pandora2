import { ComponentType } from './index'
import type { CSSProperties, VNode } from 'vue'
import type { ValidateFieldsError } from 'async-validator'
import type {
  FormRules,
  FormItemProp,
  RowProps,
  ColProps,
  ButtonProps
} from 'element-plus'
import type { ComputedRef, Ref } from 'vue'
import type { FormItem } from './formItem'
export interface IFormProps {
  name?: string
  model?: Record<string, any>
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  // Internal component size of the form
  size?: 'large' | 'default' | 'small'
  inline?: boolean
  disabled?: boolean
  // Validation rules
  rules?: FormRules[]
  // Compact mode for search forms
  compact?: boolean
  // Blank line span
  emptySpan?: number | Partial<ColProps>
  // Row configuration for the entire form
  rowProps?: RowProps
  // Submit form on reset
  submitOnReset?: boolean
  // Submit form on form changing
  submitOnChange?: boolean
  // Col configuration for the entire form
  labelCol?: Partial<ColProps>
  // Col configuration for the entire form
  wrapperCol?: Partial<ColProps>

  // General row style
  baseRowStyle?: CSSProperties

  // General col configuration
  baseColProps?: Partial<ColProps>

  // Form configuration rules
  schemas?: IFormSchema[]

  // Function values used to merge into dynamic control form items
  mergeDynamicData?: Recordable

  // Placeholder is set automatically
  autoSetPlaceHolder?: boolean
  // Auto submit on press enter on input
  autoSubmitOnEnter?: boolean
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean
  // Whether to show collapse and expand buttons
  showAdvancedButton?: boolean
  // Whether to focus on the first input box, only works when the first form item is input
  autoFocusFirstItem?: boolean
  // Automatically collapse over the specified number of rows
  autoAdvancedLine?: number
  // Always show lines
  alwaysShowLines?: number
  // Whether to show the operation button
  showActionButtonGroup?: boolean

  // Reset button configuration
  resetButtonOptions?: Partial<ButtonProps>

  // Confirm button configuration
  submitButtonOptions?: Partial<ButtonProps>

  // Operation column configuration
  actionColOptions?: Partial<ColProps>

  // Show reset button
  showResetButton?: boolean
  // Show confirmation button
  showSubmitButton?: boolean

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

  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  transformDateFunc?: (date: any) => string
}

export interface RenderCallbackParams {
  schema: IFormSchema
  values: Recordable
  model: Recordable
  field: string
}

export interface HelpComponentProps {
  maxWidth: string
  // Whether to display the serial number
  showIndex: boolean
  // Text list
  text: any
  // colour
  color: string
  // font size
  fontSize: string
  icon: string
  absolute: boolean
  // Positioning
  position: any
}

/**
 * Form Schema
 */
export interface IFormSchema {
  // Field
  field: string
  // label
  label: string

  // Event name triggered by internal value change, default change
  changeEvent?: string
  //  render component
  component: ComponentType
  // component props
  componentProps?:
    | ((opt: { schema: IFormSchema; formModel: Recordable }) => Recordable)
    | any

  // Validation rules
  rules?: FormRules[]

  // Required
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)

  suffix?: string | number | ((values: RenderCallbackParams) => string | number)

  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean

  // Reference formModelItem
  itemProps?: Partial<FormItem>

  // col configuration outside formModelItem
  colProps?: Partial<ColProps>

  // Variable name bound to v-model Default value
  valueField?: string

  subLabel?: string
  // Help text on the right side of the text
  helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams) => string | string[])
  // BaseHelp component props
  helpComponentProps?: Partial<HelpComponentProps>

  // 默认值
  defaultValue?: any
  isAdvanced?: boolean

  // Matching details components
  span?: number

  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)

  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)

  // Render the content in the form-item tag
  render?: (
    renderCallbackParams: RenderCallbackParams
  ) => VNode | VNode[] | string

  // Rendering col content requires outer wrapper form-item
  renderColContent?: (
    renderCallbackParams: RenderCallbackParams
  ) => VNode | VNode[] | string

  renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams) => any)
    | VNode
    | VNode[]
    | string

  // Custom slot, in from-item
  slot?: string

  // Custom slot, similar to renderColContent
  colSlot?: string

  dynamicDisabled?:
    | boolean
    | ((renderCallbackParams: RenderCallbackParams) => boolean)

  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => FormRules[]
}
export interface Callback {
  (isValid?: boolean, invalidFields?: ValidateFieldsError): void
}

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}

export interface IFormActionType {
  submit: () => Promise<void>
  resetFields: () => Promise<void>
  validate: (cb: Callback) => Promise<void>
  validateFields: (
    props?: Array<FormItemProp>,
    callback?: Callback
  ) => Promise<void>

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

  scrollToField: (name: any, options?: ScrollOptions) => Promise<void>
}

export type RegisterFn = (formInstance: IFormActionType) => void

export type UseFormReturnType = [RegisterFn, IFormActionType]

export type FieldMapToTime = [string, [string, string], string?][]
