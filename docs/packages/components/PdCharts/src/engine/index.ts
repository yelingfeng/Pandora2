import type { ChartTypes, IChartConfigType } from '../types/chart'
import { getAxisLabelOpt, getAxisLineOpt, getSplitLineOpt } from '../utils/defaultOpt'
import { buildXAxis, buildYAxis } from './builder/axis'
import { buildPieSeries } from './builder/pie'
import { buildRankBar } from './builder/rankBar'
import { buildSeries } from './builder/series'
import { buildTooltip } from './builder/tooltip'
import { normalizeData } from './data/normalize'

export const buildChartOption = (
  rawData: any[],
  chartType: ChartTypes,
  config: IChartConfigType
) => {

  const {
    colors,
    subChartType,
    axisLabel = {},
    axisLine = {},
    splitLine = {},
    tooltip = {},
    autoFormatView = false,
    themeMode = 'light'
  } = config


  if (chartType === 'pie') {
    return buildPieSeries(
      rawData,
      colors || []
    )
  }

  if (chartType === 'bar' && subChartType === 'rankBar') {
    return buildRankBar(rawData)
  }

  const normalized = normalizeData(rawData)

  const {
    xAxis,
    groups
  } = normalized

  const {
    series,
    unit,
    yRange
  } = buildSeries(groups, xAxis, chartType, autoFormatView)

  const axisLabelOpt = getAxisLabelOpt(axisLabel as any, themeMode as any)
  const axisLineOpt = getAxisLineOpt(axisLine as any, themeMode as any)
  const splitLineOpt = getSplitLineOpt(splitLine as any, themeMode as any)

  return {

    tooltip: buildTooltip(
      tooltip,
      unit,
      themeMode
    ),

    xAxis: buildXAxis(
      xAxis,
      axisLabelOpt,
      axisLineOpt,
      splitLineOpt,
      chartType
    ),

    yAxis: buildYAxis(
      axisLabelOpt,
      axisLineOpt,
      splitLineOpt,
      unit,
      yRange
    ),

    series
  }
}
