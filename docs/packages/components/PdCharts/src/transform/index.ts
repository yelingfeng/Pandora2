import { getNormalSeriesObj } from './seriesHelper'
import type { ChartTypes } from '../types/chart'
import { hexToRgba } from '../utils/index'
import * as echarts from 'echarts/core'
/**
 * 转换数据 生成 echarts Series 对象
 * @param data
 * @param chartName
 */
export const transformOriginDataToSeries = (
  data: any,
  chartName: ChartTypes
) => {
  // 转换原始数据
  const { seriesObj, category } = getNormalSeriesObj(
    data,
    chartName
  )
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
) => {
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
