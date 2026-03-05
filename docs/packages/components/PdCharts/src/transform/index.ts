import { buildChartOption } from '../engine/index'
import type { ChartTypes, IChartConfigType } from '../types/chart'
import { getNormalSeriesObj } from './seriesHelper'

/**
 * 转换数据 生成 echarts Series 对象
 * @param data
 * @param chartName
 */
export const transformOriginDataToSeries = (
  data: any,
  chartType: ChartTypes
) : any => {
  // 转换原始数据
  const normalRes: any = getNormalSeriesObj(data, chartType)
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
  const config = buildChartOption(data,'pie', {
    colors
  })
  console.log('transformPieDataToSeries -> config',config)
  return config
}


/**
 * 转换分组数据 生成 echarts Series 对象 （柱状图、折线图）
 * @param data  元数据
 * @param chartName 图表类型
 * @param cfg 图表配置项类型
 * @returns
 */
export const transformGroupDataToSeries = (
  data: any,
  chartType: ChartTypes,
  cfg:IChartConfigType
): any => {

  const { axisLabel , axisLine, splitLine, tooltip , autoFormatView,themeMode } = cfg
  const config  =  buildChartOption(data,chartType, {
    axisLabel,
    axisLine,
    splitLine,
    tooltip,
    autoFormatView,
    themeMode
  })
  console.log('transformGroupDataToSeries -> config ',config)
  return config
}

/**
 * 转换排名柱状图数据 生成 echarts Series 对象
 * @param data
 * @returns
 */
export const transformRankBarData = (data: any): any => {
  const config = buildChartOption(data,'bar', {
    subChartType: 'rankBar'
  })
  return config
}

