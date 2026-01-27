import { EChartsOption } from 'echarts'
import {
  ChartTypeEnum,
  ChartTypes,
  SubChartType,
} from '../types/chart'
import Pie from '../charts/pie/index'
/**
 * echarts 构建 封装
 * build
 */
export const build = (
  data: any,
  chartType: ChartTypes,
  subChartType: SubChartType
): EChartsOption => {
  let result: EChartsOption = Object.create(null)
  const subMainMethod = Pie[subChartType]
  switch (chartType) {
    case ChartTypeEnum.Pie:
      result = subMainMethod(data)
      break
    default:
      result = {}
      break
  }
  console.log(result)
  return result
}
