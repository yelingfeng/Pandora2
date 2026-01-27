export type LineType = 'solid' | 'dashed' | 'dotted'

export interface BaseLineType {
  // line Type
  lineType?: LineType
  // 线color
  color?: string
  // 是否显示xAxis方向线
  xAxis?: boolean
  // 是否显示yAxis方向线
  yAxis?: boolean
  // 自定义opt
  originOpt?: any
}

/**
 * AxisLine Type
 */
export interface AxisLineType extends BaseLineType {
  symbol?: string | Array<any>
  symbolSize?: Array<any>
}

/**
 * AxisLable Type
 */
export interface AxisLabelType extends BaseLineType {
  rotate?: number
  interval?: string
  formatter?: Fn | string
}

/**
 * DataZoom
 */
export interface DataZoomType {
  show?: boolean
  start?: number
}
