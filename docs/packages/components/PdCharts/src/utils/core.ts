import { EChartsOption } from 'echarts'
import { isProxy, toRaw } from 'vue'
import Bar from '../charts/bar/index'
import Line from '../charts/line/index'
import Pie from '../charts/pie/index'
import type { IChartConfigType } from '../types/chart'
import {
  ChartTypeEnum,
  ChartTypes,
  SubChartType,
} from '../types/chart'
import { _merge } from '../utils/index'
import { defaultThemeOpt } from './defaultOpt'
import { getTooltip } from './tooltip'
/**
 * echarts 构建 封装
 * build
 */
export const build = (
  data: any,
  chartType: ChartTypes,
  subChartType: SubChartType,
  chartConfig?: IChartConfigType
): EChartsOption => {
  let result: EChartsOption = Object.create(null)
  const cfg = chartConfig && isProxy(chartConfig) ? (toRaw(chartConfig) as IChartConfigType) : chartConfig
  const themeMode: 'light' | 'dark' =
    (cfg && cfg.themeMode === 'dark') ? 'dark' : 'light'
  const baseTitle =
    Array.isArray(data) && data.length <= 0
      ? {
          text: '暂无数据',
          left: 'center',
          top: 'center',
          textStyle: { color: '#fff', fontSize: 20 },
        }
      : { text: '' }
  const baseOpt = _merge(defaultThemeOpt(themeMode), {
    title: baseTitle,
    tooltip: getTooltip(cfg && cfg.tooltip, themeMode),
    grid: {
      left: 10,
      bottom:'10%',
      top: '15%',
      right: 10,
      containLabel: true,
    },
  })
  switch (chartType) {
    case ChartTypeEnum.Pie:
      result = _merge(baseOpt, Pie[subChartType](data, cfg))
      break
    case ChartTypeEnum.Bar:
      result = _merge(baseOpt, Bar[subChartType](data, cfg))
      break
    case ChartTypeEnum.Line:
      result = _merge(baseOpt, Line[subChartType](data, cfg))
      break
    default:
      result = baseOpt
      break
  }
  return result
}
