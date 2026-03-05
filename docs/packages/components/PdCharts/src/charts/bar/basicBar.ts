import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { COMMON_COLORS, DARK_COLORS } from '../../constant'
import { transformGroupDataToSeries } from '../../transform'
import type { IChartConfigType } from '../../types'
import { getDataZoomOpt, getLegendOpt } from '../../utils/defaultOpt'
import { hexToRgba } from '../../utils/index'

export const build = (originData: any, chartConfig?: IChartConfigType): EChartsOption => {
  const cfg = (chartConfig || {}) as IChartConfigType
  const { xAxis = {} , yAxis = {}, series:rawSeries = [], tooltip } = transformGroupDataToSeries(originData, 'bar', cfg)

  const { colors = [], legend = {}, themeMode = 'light', dataZoom } = chartConfig || {}
  const curColors = colors.length ? colors : (themeMode === 'light' ? COMMON_COLORS : DARK_COLORS)

  const series = rawSeries.map((s: any, index: number) => {
    const color = curColors[index % curColors.length]
    return {
      ...s,
      barWidth: 15,
      itemStyle: {
        normal: {
          color: new (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: hexToRgba(color, 1) },
            { offset: 1, color: hexToRgba(color, 0.5) },
          ]),
        },
      },
    }
  })

  const legendData = Array.isArray(rawSeries) ? rawSeries.map((s: any) => String(s?.name || '')).filter(Boolean) : []
  const opt = {
    color: curColors,
    legend: getLegendOpt(themeMode as any, legend || {}, legendData),
    xAxis,
    yAxis,
    series,
    ...(tooltip ? { tooltip } : {}),
    ...(dataZoom ? { dataZoom: getDataZoomOpt(dataZoom, themeMode) } : {})
  }

  return opt as EChartsOption
}
