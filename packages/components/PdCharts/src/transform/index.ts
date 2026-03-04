import * as echarts from 'echarts/core'
import type { ChartTypes } from '../types/chart'
import { getAxisLabelOpt, getAxisLineOpt, getSplitLineOpt } from '../utils/defaultOpt'
import { hexToRgba } from '../utils/index'
import { buildBarXAxis, buildLineXAxis, buildSeries, buildTooltip, buildYAxis, getGroupSeriesObj, getNormalSeriesObj, normalizeXAxis } from './seriesHelper'
/**
 * 转换数据 生成 echarts Series 对象
 * @param data
 * @param chartName
 */
export const transformOriginDataToSeries = (
  data: any,
  chartName: ChartTypes
) : any => {
  // 转换原始数据
  const normalRes: any = getNormalSeriesObj(data, chartName)
  const seriesObj: any = normalRes.seriesObj
  const category: any = normalRes.category
  return {
    series: seriesObj,
    category,
  }
}

/**
 *
 * 转化饼图数据 生成 echarts Series 对象
 */
export const transformPieDataToSeries = (
  data: any,
  colors: any
) : any => {
  const category: any = []
  const seriesObj = data.map((item: any, index: number) => {
    category.push(item.name)
    return {
      name: item.name,
      value: parseInt(item.value, 10),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          1,
          1,
          0,
          0,
          [
            {
              offset: 0,
              color: hexToRgba(colors[index], 1),
            },
            {
              offset: 1,
              color: hexToRgba(colors[index], 0.5),
            },
          ]
        ),
      },
    }
  })
  return {
    category,
    series: seriesObj,
  }
}



export const transformGroupDataToSeries = (
  data: any,
  chartName: ChartTypes,
  cfg: Record<string, any> = {}
): any => {
  const result = getGroupSeriesObj(data, chartName)

  if (!['bar', 'line'].includes(chartName)) {
    return {
      xAxis: result.xAxis,
      series: result.series,
    }
  }

  const xAxisData = normalizeXAxis(result.xAxis)
  const groups = Array.isArray(result.series) ? result.series : []
  const legendData = groups
    .map((it: any) => (it?.name != null ? String(it.name) : ''))
    .filter(Boolean)

  const themeMode: 'light' | 'dark' =
    cfg.themeMode === 'dark' ? 'dark' : 'light'

  const splitLine = getSplitLineOpt(cfg.splitLine || {}, themeMode)
  const axisLine = getAxisLineOpt(cfg.axisLine || {}, themeMode)
  const axisLabel = getAxisLabelOpt(cfg.axisLabel || {}, themeMode)

  const { series, unitForAxis, yRange } = buildSeries(
    groups,
    xAxisData,
    cfg.autoFormatView
  )

  const tooltip = buildTooltip(cfg.tooltip, unitForAxis, themeMode)

  if (chartName === 'bar') {
    return {
      xAxis: buildBarXAxis(xAxisData, axisLabel, axisLine, splitLine),
      yAxis: buildYAxis(axisLabel, axisLine, splitLine, unitForAxis, yRange),
      legendData,
      series: series.map(s => ({ ...s, type: 'bar' })),
      ...(tooltip ? { tooltip } : {}),
    }
  }

  return {
    xAxis: [
      buildLineXAxis(xAxisData, axisLabel, axisLine, splitLine),
    ],
    yAxis: [
      buildYAxis(axisLabel, axisLine, splitLine, unitForAxis, yRange),
    ],
    legendData,
    series: series.map(s => ({ ...s, type: 'line' })),
    ...(tooltip ? { tooltip } : {}),
  }
}

export const transformRankBarData = (data: any): any => {
  const res = transformOriginDataToSeries(data, 'bar')
  const category = res && Array.isArray(res.category) ? res.category : []
  const series = res && res.series ? res.series : {}
  const list = series && Array.isArray(series.data) ? series.data : []

  const names = category.map((it: any) => String(it))
  const values = list.map((it: any) => {
    const n = Number(it && it.value)
    return Number.isFinite(n) ? n : 0
  })

  const maxVal = values.length ? Math.max.apply(null, values) : 0
  const maxPercent = 100
  const percentData = values.map((v: any) => {
    if (!maxVal) return 0
    const p = (v / maxVal) * 100
    return Math.max(0, Math.min(maxPercent, Number(p.toFixed(2))))
  })
  const crossArr = values.map(() => maxPercent)

  return {
    names,
    values,
    percentData,
    crossArr,
    maxPercent,
  }
}

// line option builder moved into charts/line/line01.ts per design (transform focuses on data mapping)
