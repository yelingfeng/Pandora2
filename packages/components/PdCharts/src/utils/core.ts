import { EChartsOption } from 'echarts'
import Bar from '../charts/bar/index'
import Pie from '../charts/pie/index'
import {
  ChartTypeEnum,
  ChartTypes,
  SubChartType,
} from '../types/chart'
/**
 * echarts 构建 封装
 * build
 */
export const build = (
  data: any,
  chartType: ChartTypes,
  subChartType: SubChartType,
  chartConfig?: Record<string, any>
): EChartsOption => {
  let result: EChartsOption = Object.create(null)
  switch (chartType) {
    case ChartTypeEnum.Pie:
      result = Pie[subChartType](data, chartConfig)
      break
    case ChartTypeEnum.Bar:
      result = Bar[subChartType](data, chartConfig)
      break
    default:
      result = {}
      break
  }
  return result
}
