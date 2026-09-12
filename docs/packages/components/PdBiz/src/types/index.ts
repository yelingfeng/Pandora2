import type { ExtractPropTypes } from 'vue'

/**
 * CommonCard 组件 Props
 */
export interface ICommonCardProps {
  /** 标题 */
  title?: string
  /** 是否显示标题提示图标 */
  showTips?: boolean
  /** 标题提示内容 */
  titleTip?: string
  /** 是否显示跳转图标 */
  showIcon?: boolean
  /** 加载状态 */
  loading?: boolean
}

/**
 * ButtonPicker 选项类型
 */
export interface IButtonPickerOption {
  /** 显示标签 */
  label: string
  /** 值 */
  value: string | number | boolean
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * ButtonPicker 组件 Props
 */
export interface IButtonPickerProps {
  /** 当前选中值 */
  value?: string | number | boolean
  /** 选项列表 */
  options: IButtonPickerOption[]
}

/**
 * Stats 数据项类型
 */
export interface IStatsItem {
  /** 标签 */
  label: string
  /** 值 */
  value: number
  /** 图标类名 */
  icon?: string
  /** 小数位数 */
  decimals?: number
  /** 后缀 */
  suffix?: string
}

/**
 * Stats 组件 Props
 */
export interface IStatsProps {
  /** 统计数据 */
  renderData: IStatsItem[]
  /** 布局方式 flex | auto */
  layout?: 'flex' | 'auto'
}

/**
 * TabSwitcher 选项类型
 */
export interface ITabSwitcherOption {
  /** 显示标签 */
  label: string
  /** 值 */
  value: string | number
  /** 数量角标（可选） */
  count?: number
  /** 是否禁用 */
  disabled?: boolean
  /** 图标 class（可选） */
  icon?: string
}

/** @deprecated 使用 ITabSwitcherOption，兼容 docs / 业务侧命名 */
export type ITabItem = ITabSwitcherOption

/**
 * TabSwitcher 组件 Props
 */
export interface ITabSwitcherProps {
  /** 当前选中值 */
  modelValue?: string | number | null
  /** 选项列表（与 tabs 二选一，tabs 优先） */
  options?: ITabSwitcherOption[]
  /** 选项列表（业务侧 / docs 常用命名） */
  tabs?: ITabSwitcherOption[]
  /** 整体禁用 */
  disabled?: boolean
  /** 宽度，数字按 px */
  width?: string | number
}

/**
 * IspStatsCard 数据项类型
 */
export interface IIspStatItem {
  /** 运营商标识 */
  isp: string | number
  /** 数量 */
  count: number
  /** 标记 */
  flag: string
}

/**
 * IspStatsCard 组件 Props
 */
export interface IIspStatsCardProps {
  /** 统计数据 */
  data?: IIspStatItem[]
  /** 运营商名称映射 */
  ispMap?: Record<string, string>
  /** 运营商显示顺序 */
  ispOrder?: string[]
}

/**
 * DynamicCheckboxSelector 选项类型
 */
export interface ICheckboxOption {
  /** 值 */
  value: string
  /** 标签 */
  label?: string
  /** 分组类型（可选，用于分组展示） */
  type?: string
}

/**
 * DynamicCheckboxSelector 组件 Props
 */
export interface IDynamicCheckboxSelectorProps {
  /** 是否显示（v-model:visible） */
  visible?: boolean
  /** 扁平选项列表（docs API） */
  options?: ICheckboxOption[]
  /** 当前选中值（v-model:selected） */
  selected?: string[]
  /** 抽屉标题 */
  title?: string
  /** 确认按钮文案 */
  confirmText?: string
  /** 取消/重置按钮文案 */
  cancelText?: string
  /** @deprecated 旧 API：选中值映射 */
  value?: Record<string, string[]>
  /** @deprecated 旧 API：所有选项 */
  allOptions?: ICheckboxOption[]
  /** @deprecated 旧 API：分组类型列表 */
  typeList?: string[]
  /** @deprecated 旧 API：默认选中的分组 */
  defaultType?: string
}

/**
 * DateFilterDialog 时间范围类型
 */
export interface ITimeRange {
  /** 开始时间 */
  start: string
  /** 结束时间 */
  end: string
}

/**
 * DateFilterDialog 日期范围选项类型
 */
export interface IDateRangeOption {
  /** 标签 */
  label: string
  /** 值 */
  value: number | string
  /** 描述 */
  desc: string
  /** 天数 */
  days: number
}

/**
 * DateFilterDialog 组件 Props
 */
export interface IDateFilterDialogProps {
  /** 是否显示 */
  visible?: boolean
  /** 日期范围选项 */
  options?: IDateRangeOption[]
  /** 确认按钮文本 */
  confirmText?: string
  /** 取消按钮文本 */
  cancelText?: string
}

/**
 * RoomSelector 机房项类型
 */
export interface IRoomItem {
  /** 机房编码 */
  value: string | number
  /** 机房名称 */
  name: string
  /** 运营商 */
  isp?: string | number
  /** 省份 */
  province?: string
}

/**
 * RoomSelector 组件 Props
 */
export interface IRoomSelectorProps {
  /** 当前选中值（v-model） */
  modelValue?: string | number
  /** 占位符 */
  placeholder?: string
  /** 运营商 */
  isp?: string | number
  /** 机房列表 */
  roomList?: IRoomItem[]
}

/**
 * AdvancedQuery 查询字段类型（兼容 docs 简化结构与业务完整结构）
 */
export interface IQueryField {
  /** 显示标签 */
  label: string
  /** docs：字段 key */
  value?: string
  /** docs：控件类型 input / number / select / date */
  type?: string
  /** docs：select 选项 */
  options?: Array<{ label: string; value: string | number }>
  /** 业务：字段名 */
  fieldName?: string
  /** 业务：数据类型 */
  dataType?: string
  /** 业务：是否可筛选，默认 true */
  isFilterable?: boolean
  /** 业务：条件列表 */
  conditions?: string[]
}

/**
 * AdvancedQuery 查询条件（docs @confirm 返回）
 */
export interface IQueryCondition {
  field: string
  fieldLabel: string
  condition: string
  conditionLabel: string
  value: any
}

/**
 * AdvancedQuery 查询结果类型（业务 @save）
 */
export interface IQueryResult {
  /** 字段名 */
  fieldName: string
  /** 条件 */
  condition: string
  /** 查询值 */
  queryValue: any
  /** 原始字段数据 */
  originData?: IQueryField
}

/**
 * AdvancedQuery 组件 Props
 */
export interface IAdvancedQueryProps {
  /** 是否显示 */
  visible?: boolean
  /** 查询字段列表 */
  fields?: IQueryField[]
  /** 确认按钮文案 */
  confirmText?: string
  /** 取消按钮文案 */
  cancelText?: string
}

export type CommonCardProps = ExtractPropTypes<ICommonCardProps>
export type ButtonPickerProps = ExtractPropTypes<IButtonPickerProps>
export type StatsProps = ExtractPropTypes<IStatsProps>
export type TabSwitcherProps = ExtractPropTypes<ITabSwitcherProps>
export type IspStatsCardProps = ExtractPropTypes<IIspStatsCardProps>
export type DynamicCheckboxSelectorProps = ExtractPropTypes<IDynamicCheckboxSelectorProps>
export type DateFilterDialogProps = ExtractPropTypes<IDateFilterDialogProps>
export type RoomSelectorProps = ExtractPropTypes<IRoomSelectorProps>
export type AdvancedQueryProps = ExtractPropTypes<IAdvancedQueryProps>
