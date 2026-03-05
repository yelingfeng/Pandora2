import { type AutoFormatArrayOptions } from './formatter'
import { type AxisLabelType, type AxisLineType, type BaseLineType, type DataZoomType } from './props'
// 动态生成枚举

export enum ChartTypeEnum {
  Bar = 'bar',
  Pie = 'pie',
  Line = 'line',
  Map = 'map',
  Radar = 'radar',
}

// 图表类型
export interface IChartType {
  Bar: 'bar'
  Pie: 'pie'
  Line: 'line'
  Map: 'map'
  Radar: 'radar'
}

// 图表类型
export type ChartTypes = IChartType[keyof IChartType]
/**
 * 二级图表
 */
export type SubChartType =
  | 'pie01'
  | 'pie02'
  | 'pie03'
  | 'basicBar'
  | 'rankBar'


/**
 */
export interface IChartConfigType {
  themeMode?: 'light' | 'dark'
  colors?: string[]
  smooth?: boolean
  subChartType?: SubChartType
  legend?: Record<string, any>
  axisLabel?: AxisLabelType
  axisLine?: AxisLineType
  splitLine?: BaseLineType
  tooltip?: Record<string, any>
  dataZoom?: DataZoomType,
  bar?: BarConfig,
  autoFormatView?: AutoFormatArrayOptions
}

export interface BarLabelConfig {
  minWidth?: number
  maxWidth?: number
  charWidth?: number
}

export interface BarRankItemStyle {
  backgroundColor?: string
  borderColor?: string
  color?: string
  width?: number
  height?: number
  fontSize?: number
}

export interface BarRankConfig {
  topCount?: number
  topColors?: BarRankItemStyle[]
  backgroundColor?: string
  color?: string
  width?: number
  height?: number
  fontSize?: number
}

export interface BarRightLabelConfig {
  prefix?: string
  suffix?: string
  formatter?: (args: { rawValue: number, value: number, name: string, index: number }) => string
}

export interface BarConfig {
  color?: string
  backgroundColor?: string
  topColors?: string[]
  label?: BarLabelConfig
  rank?: BarRankConfig
  rightLabel?: BarRightLabelConfig
}
