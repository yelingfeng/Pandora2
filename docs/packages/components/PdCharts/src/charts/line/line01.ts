import type { EChartsOption } from 'echarts'
import { COMMON_COLORS, DARK_COLORS } from '../../constant/index'
import { transformGroupDataToSeries } from '../../transform'
import type { IChartConfigType } from '../../types'
import { getDataZoomOpt, getLegendOpt } from '../../utils/defaultOpt'
import { hexToRgba } from '../../utils/index'

export const build = (originData: any, chartConfig?: IChartConfigType): EChartsOption => {
  const cfg = (chartConfig || {}) as IChartConfigType
  const { xAxis = [], yAxis = [], series: rawSeries = [], tooltip } = transformGroupDataToSeries(originData, 'line', cfg) || {}

  const { colors = [] ,smooth,legend={}, themeMode='light', dataZoom } = chartConfig || {}

  const legendData = Array.isArray(rawSeries) ? rawSeries.map((s: any) => String(s?.name || '')).filter(Boolean) : []
  const defaultLegend = getLegendOpt(themeMode as any, legend, legendData)


  let curColors = colors
  if(colors.length == 0){
    curColors = themeMode === 'light'? COMMON_COLORS : DARK_COLORS
  }

  const series = rawSeries.map((s: any, index: number) => {
    const seriesData = Array.isArray(s.data) ? s.data : []
    const name = s && s.name != null ? String(s.name) : legendData[index] || ''
    return {
      name,
      type: 'line',
      smooth,
      areaStyle: curColors.length
        ? {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: hexToRgba(curColors[index % curColors.length], 0.2),
                },
                {
                  offset: 0.8,
                  color: hexToRgba(curColors[index % curColors.length], 0.05),
                },
              ],
              global: false,
            },
          }
        : undefined,
      symbol: 'emptyCircle',
      showSymbol: legendData.length > 1 ? false : true,
      symbolSize: 5,
      zlevel: 3,
      lineStyle: {
        color: curColors.length ? curColors[index % curColors.length] : undefined,
      },
      data: seriesData,
    }
  })

  const opt = {
    color: colors,
    legend: defaultLegend,
    xAxis,
    yAxis,
    series,
    ...(tooltip ? { tooltip } : {}),
    ...(dataZoom ? { dataZoom: getDataZoomOpt(dataZoom,themeMode) } : {})
  }

  console.log('opt',opt)

  return opt as EChartsOption
}
