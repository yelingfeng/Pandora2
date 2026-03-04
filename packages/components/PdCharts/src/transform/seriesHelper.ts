import { chain, cloneDeep } from 'lodash-es'
import type { ChartTypes } from '../types/chart'
import { autoFormat } from '../utils/autoformatter'
import { getTooltip } from '../utils/tooltip'
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


export const normalizeXAxis = (xAxis: any): string[] => {
  return Array.isArray(xAxis)
    ? xAxis.map((it: any) => String(it))
    : []
}

export const buildSeries = (
  groups: any[],
  xAxisData: string[],
  afv: any
) => {
  let unitForAxis = ''
  let yRange: [number, number] | null = null

  const series = groups.map(groupItem => {
    const name =
      groupItem?.name != null ? String(groupItem.name) : ''

    const rawData = Array.isArray(groupItem?.data)
      ? groupItem.data
      : []

    const alignedData = xAxisData.map(axisName => {
      const hit = rawData.find(
        (d: any) => String(d?.name) === axisName
      )
      return hit ? Number(hit.value) || 0 : 0
    })

    let dataOut = alignedData

    if (afv) {
      const key = String(afv.key || 'value')
      const typeOpt = afv.type ?? 'num'
      const decimalPlaces = Number(afv.decimalPlaces ?? 2)
      const unitName = String(afv.unitName || '')
      const showUnitLabel = Boolean(afv.showUnitLabel ?? false)

      const arr = dataOut.map(v => ({
        [key]: Number(v),
      }))

      const res = autoFormat(arr, {
        key,
        type: typeOpt,
        decimalPlaces,
        unitName,
        showUnitLabel,
      })

      unitForAxis ||= res.unit
      yRange ||= res.yAxisRange
      dataOut = res.data.map(
        (d: any) => d[`${key}Axis`]
      )
    }

    return {
      name,
      data: dataOut,
    }
  })

  return { series, unitForAxis, yRange }
}


export const buildYAxis = (
  axisLabel: any,
  axisLine: any,
  splitLine: any,
  unit: string,
  yRange: [number, number] | null
) => {
  return {
    type: 'value',
    axisLabel: unit
      ? {
          ...(axisLabel.yAxis || {}),
          formatter: (value: any) =>
            `${value} ${unit}`,
        }
      : axisLabel.yAxis,
    axisLine: axisLine.yAxis,
    splitLine: splitLine.yAxis,
    axisTick: { show: false },
    ...(yRange
      ? { min: yRange[0], max: yRange[1] }
      : {}),
  }
}


export const buildBarXAxis = (
  data: string[],
  axisLabel: any,
  axisLine: any,
  splitLine: any
) => ({
  type: 'category',
  data,
  axisLabel: axisLabel.xAxis,
  axisLine: axisLine.xAxis,
  splitLine: splitLine.xAxis,
  axisTick: { show: false },
})

export const buildLineXAxis = (
  data: string[],
  axisLabel: any,
  axisLine: any,
  splitLine: any
) => ({
  type: 'category',
  boundaryGap: false,
  data,
  axisLabel: axisLabel.xAxis,
  axisLine: axisLine.xAxis,
  splitLine: splitLine.xAxis,
  axisTick: { show: false },
})

export const buildTooltip = (
  tooltipCfg: any,
  unit: string,
  themeMode: 'light' | 'dark'
) => {
  if (!unit) return undefined

  const customRow =
    typeof tooltipCfg?.rowTemplate === 'function'
      ? tooltipCfg.rowTemplate
      : null

  const customFormatter =
    typeof tooltipCfg?.formatter === 'function'
      ? tooltipCfg.formatter
      : null

  return getTooltip(
    {
      axisPointer: { type: 'shadow' },
      formatter(params: any[]) {
        if (customFormatter) {
          return customFormatter(params, unit)
        }

        const name = params?.[0]?.name || ''

        const rows = (params || []).map(p => {
          if (customRow) {
            return customRow(p, unit)
          }

          const v = p?.value ?? ''

          return `
            <tr>
              <td style="text-align:left;">
                ${p.marker}${p.seriesName}：
              </td>
              <td style="text-align:left;">
                ${v} ${unit}
              </td>
            </tr>
          `
        })

        return `${name}<br/><table>${rows.join(
          ''
        )}</table>`
      },
    },
    themeMode
  )
}
