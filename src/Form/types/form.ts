// 上传类型
export interface UpLoadType {
  buttonText: string
  tipText: string
  limit: number
  // 是否显示已上传文件列表
  showFileList: boolean
  // 是否在选取文件后立即进行上传
  autoUpload: boolean
  fileList: Array<any>
  httpRequest: Function
  beforeUpload: Function
  onPreview: Function
  onRemove: Function
  onFileChange: Function
  onSuccess: Function
}

// 日期类型
export interface DateOptionType {
  pickOptions?: object
  // 设置日期显示格式
  format?: string
  // 范围选择时选中日期所使用的当日内具体时刻
  defaultTime?: string[]
  // 是否显示清除按钮
  clearable?: boolean
  rangeSeparator?: string
  startplaceholder?: string
  endplaceholder?: string
}
// 级联配置类型
export interface CascadeOptionType {
  options?: object[]
  props?: object
  size?: string
  showAllLevels?: boolean
  separator?: string
}

export interface ButtonType {
  size?: string,
  icon?: string
}

export interface IFormItemCompOpt {
  id: string
  value: string | any
  type: string
  width?: string | number
  title?: string
  isAll?: boolean
  disabled?: boolean
  placeholder?: string
  // 是否多选
  multiple?: boolean
  // 设置日期显示格式
  format?: string
  // 日期align
  align?: string
  // formlist items
  items?: any[] | undefined
  data?: any[]
  collapseTags?: boolean
  tooltipDelay: number
  className?: string

  // 按钮类型
  buttonOption?:ButtonType

  // 日期option
  dateOption?: DateOptionType
  // 上传option
  uploadOption?: UpLoadType
  // 级联类型
  cascadeOption?: CascadeOptionType
  click?: (val?: any) => any
  change?: (val?: any, data?: any) => any
  input?: (val?: any) => any
  blur?: (val?: any) => any
  focus?: (val?: any) => any
}
