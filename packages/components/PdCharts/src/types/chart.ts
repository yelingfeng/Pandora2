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
export type SubChartType = 'pie01' | 'pie02' | 'pie03'
