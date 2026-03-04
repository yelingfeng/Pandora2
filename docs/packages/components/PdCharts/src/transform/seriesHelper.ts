import { chain, cloneDeep } from 'lodash-es'
import type { ChartTypes } from '../types/chart'

const XAXIS = 'XAIXS'

const EMPTY_DATA = {
  category: [],
  xAxis: [],
  series: [],
}

/**
 * 是否为业务空数据
 */
const isEmptyData = (data: any[]) => {
  return (
    data == null ||
    (data.length === 1 && data[0]?.name === '')
  )
}

/**
 * 获取分类集合
 */
const getCategoryCollection = (data: any[]) => {
  return chain(data)
    .filter(it => {
      const c = it.category
      return (
        c !== '' &&
        c != null &&
        c.toUpperCase() !== XAXIS
      )
    })
    .map(it => it.category)
    .uniq()
    .value()
}

/**
 * 图例对象集合
 */
const getLegendCollection = (group: string[]) => {
  return group.map(name => ({ name }))
}

/**
 * 是否存在约定 xAxis（分组图）
 */
const hasConsensusxAxis = (data: any[]) => {
  return data.some(
    it =>
      it.category &&
      it.category.toUpperCase() === XAXIS
  )
}

/**
 * 是否存在约定 xAxis（基础图）
 */
const hasConsensusxAxisBase = (data: any[]) => {
  return data.some(it => it.xAxis)
}

/**
 * 获取 xAxis 名称集合
 */
const getxAxisName = (
  data: any[],
  hasAxis: boolean
) => {
  const c = chain(data)

  const source = hasAxis
    ? c.filter(
        it =>
          it.category &&
          it.category.toUpperCase() === XAXIS
      )
    : c

  return source
    .map(it => it.name)
    .uniq()
    .value()
}

/**
 * 查找指定 group + xAxis 的 value
 */
const lookGroupValue = (
  groupName: string,
  xAxis: string,
  data: any[]
) => {
  return (
    chain(data)
      .find(
        it =>
          it.name === xAxis &&
          it.category === groupName
      )
      ?.value ?? 0
  )
}

/**
 * 构建 series 集合（分组类）
 */
const createSeriesCollection = (params: any) => {
  const {
    group,
    data,
    xAxis,
    hasxAxis,
    name,
  } = params

  return group.map((g: string) => {
    let seriesData: any[] = []

    if (hasxAxis) {
      seriesData = xAxis.map((axis: string) => {
        const dataObj =
          data.find(
            (d: any) =>
              d.category === g &&
              d.name === axis
          ) || {}

        return {
          name: axis,
          value:
            lookGroupValue(g, axis, data) || 0,
          dataObj,
          xAxis: true,
        }
      })
    } else {
      seriesData = data
        .filter((d:any) => d.category === g)
        .map((d:any) => ({
          name: d.name,
          value: d.value ?? 0,
          dataObj: d,
          tooltip: d.info
            ? { formatter: d.info }
            : undefined,
          group: 'group',
        }))
    }

    return {
      type: name,
      name: g,
      data: seriesData,
    }
  })
}

/**
 * 多分组图表（bar / line / map）
 */
export const getGroupSeriesObj = (
  originData: any[],
  name: ChartTypes
) => {
  if (isEmptyData(originData)) {
    return EMPTY_DATA
  }

  const data = cloneDeep(originData)

  const hasxAxis = hasConsensusxAxis(data)
  const group = getCategoryCollection(data)
  const xAxis = getxAxisName(data, hasxAxis)

  const series = createSeriesCollection({
    group,
    data,
    xAxis,
    hasxAxis,
    name,
  })

  return {
    xAxis,
    series,
  }
}

/**
 * 普通非分组图表
 */
export const getNormalSeriesObj = (
  originData: any[],
  chartName: ChartTypes
) => {
  const category: string[] = []
  let data = cloneDeep(originData)
  const hasxAxis = hasConsensusxAxisBase(data)

  let xAxisArr: string[] = []

  if (hasxAxis) {
    xAxisArr = data
      .filter(it => it.xAxis)
      .map(it => it.name)

    data = data.filter(it => !it.xAxis)
  }

  const seriesData = hasxAxis
    ? xAxisArr.map(x => {
        const it =
          data.find(d => d.name === x) || {}
        category.push(x)
        return {
          name: x,
          value: it.value ?? 0,
          dataObj: it,
          group: 'noGroup',
          info: it.info,
        }
      })
    : data.map(it => {
        category.push(it.name ?? '')
        return {
          name: it.name,
          value: it.value ?? 0,
          dataObj: it,
          info: it.info,
          group: 'noGroup',
        }
      })

  return {
    category,
    seriesObj: {
      type: chartName,
      data: seriesData,
    },
  }
}

/**
 * 获取图例
 */
export const getCategory = (originData: any[]) => {
  const group = getCategoryCollection(originData)
  return getLegendCollection(group)
}
