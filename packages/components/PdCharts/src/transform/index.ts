import * as echarts from 'echarts/core'
import type { ChartTypes } from '../types/chart'
import { hexToRgba } from '../utils/index'
import { getGroupSeriesObj, getNormalSeriesObj } from './seriesHelper'
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
  chartName: ChartTypes
) : any => {
  const result = getGroupSeriesObj(data, chartName)
  if (chartName === 'bar') {
    const xAxisData = Array.isArray(result.xAxis)
      ? result.xAxis.map((it: any) => String(it))
      : []
    const groups = Array.isArray(result.series) ? result.series : []
    const legendData = groups
      .map((it: any) => (it && it.name != null ? String(it.name) : ''))
      .filter((it: any) => it)

    const colorArr = [
      ['#00FFE3', '#4693EC'],
      ['#4693EC', '#00FFE3'],
      ['#FF6767', '#FF9D6B'],
      ['#55CA69', '#16D8B8'],
    ]

    const series = groups.map((groupItem: any, index: number) => {
      const legendName =
        groupItem && groupItem.name != null ? String(groupItem.name) : ''
      const rawData =
        groupItem && Array.isArray(groupItem.data) ? groupItem.data : []
      const seriesData = xAxisData.map((axisName: any) => {
        const hit = rawData.find((d: any) => {
          return d && String(d.name) === String(axisName)
        })
        return hit ? Number(hit.value) || 0 : 0
      })
      const colors = colorArr[index % colorArr.length]

      return {
        type: 'bar',
        name: legendName,
        barWidth: 15,
        data: seriesData,
        itemStyle: {
          normal: {
            color: new (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[0] },
              { offset: 1, color: colors[1] },
            ]),
          },
        },
      }
    })

    return {
      xAxisData,
      legendData,
      series,
    }
  }

  return {
    xAxis: result.xAxis,
    series: result.series,
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
