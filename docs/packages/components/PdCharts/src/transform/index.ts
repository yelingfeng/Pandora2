import * as echarts from 'echarts/core'
import type { ChartTypes } from '../types/chart'
import { autoFormat } from '../utils/autoformatter'
import { getAxisLabelOpt, getAxisLineOpt, getSplitLineOpt } from '../utils/defaultOpt'
import { hexToRgba } from '../utils/index'
import { getTooltip } from '../utils/tooltip'
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
  chartName: ChartTypes,
  cfg?: Record<string, any>
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
    const themeMode = (cfg && cfg.themeMode === 'dark') ? 'dark' : 'light'
    const splitLine = getSplitLineOpt((cfg && cfg.splitLine) || {}, themeMode)
    const axisLine = getAxisLineOpt((cfg && cfg.axisLine) || {}, themeMode)
    const axisLabel = getAxisLabelOpt((cfg && cfg.axisLabel) || {}, themeMode)

    const afv = cfg && cfg.autoFormatView ? cfg.autoFormatView : null
    const customRow =
      cfg && cfg.tooltip && typeof (cfg.tooltip as any).rowTemplate === 'function'
        ? (cfg.tooltip as any).rowTemplate
        : null
    const customFormatter =
      cfg && cfg.tooltip && typeof (cfg.tooltip as any).formatter === 'function'
        ? (cfg.tooltip as any).formatter
        : null
    let unitForAxis = ''
    let yRange: [number, number] | null = null

    const series = groups.map((groupItem: any) => {
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

      let dataOut = seriesData
      if (afv) {
        const key = String(afv.key || 'value')
        const typeOpt = (afv.type as any) ?? 'num'
        const decimalPlaces = Number(afv.decimalPlaces ?? 2)
        const unitName = String(afv.unitName || '')
        const showUnitLabel = Boolean(afv.showUnitLabel ?? false)
        const arr = dataOut.map((v: any) => ({ [key]: Number(v) }))
        const res = autoFormat(arr, { key, type: typeOpt, decimalPlaces, unitName, showUnitLabel })
        unitForAxis = unitForAxis || res.unit
        yRange = yRange || res.yAxisRange
        dataOut = res.data.map((d: any) => d[`${key}Axis`])
      }

      return {
        type: 'bar',
        name: legendName,
        data: dataOut,
      }
    })

    const xAxis = {
      type: 'category',
      data: xAxisData,
      axisLabel: axisLabel.xAxis,
      axisLine: axisLine.xAxis,
      splitLine: splitLine.xAxis,
      axisTick: { show: false },
    }
    const yAxis = {
      type: 'value',
      axisLabel: unitForAxis
        ? { ...(axisLabel.yAxis || {}), formatter: (value: any) => `${value} ${unitForAxis}` }
        : axisLabel.yAxis,
      axisLine: axisLine.yAxis,
      splitLine: splitLine.yAxis,
      axisTick: { show: false },
      ...(yRange ? { min: yRange[0], max: yRange[1] } : {}),
    }
    const tooltip = unitForAxis
      ? getTooltip(
          {
            axisPointer: { type: 'shadow' },
            formatter(params: any[]) {
              if (typeof customFormatter === 'function') {
                return customFormatter(params, unitForAxis)
              }
              const name = params && params[0] ? params[0].name : ''
              const rows = (params || []).map((p: any) => {
                if (typeof customRow === 'function') {
                  return customRow(p, unitForAxis)
                }
                const v = p && p.value != null ? p.value : ''
                return `<tr><td style="text-align:left;">${p.marker}${p.seriesName}：</td><td style="text-align:left;">${v} ${unitForAxis}</td></tr>`
              })
              return `${name}<br/><table>${rows.join('')}</table>`
            },
          },
          themeMode
        )
      : undefined
    return {
      xAxis,
      yAxis,
      legendData,
      series,
      ...(tooltip ? { tooltip } : {}),
    }
  }

  else if (chartName === 'line') {
    const axisCfg = cfg || {}
    const xAxisData = Array.isArray(result.xAxis)
      ? result.xAxis.map((it: any) => String(it))
      : []
    const groups = Array.isArray(result.series) ? result.series : []
    const legendData = groups
      .map((it: any) => (it && it.name != null ? String(it.name) : ''))
      .filter((it: any) => it)
    const afv = axisCfg && axisCfg.autoFormatView ? axisCfg.autoFormatView : null
    const customRow =
      axisCfg && axisCfg.tooltip && typeof (axisCfg.tooltip as any).rowTemplate === 'function'
        ? (axisCfg.tooltip as any).rowTemplate
        : null
    const customFormatter =
      axisCfg && axisCfg.tooltip && typeof (axisCfg.tooltip as any).formatter === 'function'
        ? (axisCfg.tooltip as any).formatter
        : null
    let unitForAxis = ''
    let yRange: [number, number] | null = null
    const series = groups.map((groupItem: any) => {
      const name = groupItem && groupItem.name != null ? String(groupItem.name) : ''
      const rawData =
        groupItem && Array.isArray(groupItem.data) ? groupItem.data : []
      const seriesData = xAxisData.map((axisName: any) => {
        const hit = rawData.find((d: any) => {
          return d && String(d.name) === String(axisName)
        })
        return hit ? Number(hit.value) || 0 : 0
      })
      let dataOut = seriesData
      if (afv) {
        const key = String(afv.key || 'value')
        const typeOpt = (afv.type as any) ?? 'num'
        const decimalPlaces = Number(afv.decimalPlaces ?? 2)
        const unitName = String(afv.unitName || '')
        const showUnitLabel = Boolean(afv.showUnitLabel ?? false)
        const arr = dataOut.map((v: any) => ({ [key]: Number(v) }))
        const res = autoFormat(arr, { key, type: typeOpt, decimalPlaces, unitName, showUnitLabel })
        unitForAxis = unitForAxis || res.unit
        yRange = yRange || res.yAxisRange
        dataOut = res.data.map((d: any) => d[`${key}Axis`])
      }
      return {
        name,
        type: 'line',
        data: dataOut,
      }
    })
    const themeMode = (axisCfg && axisCfg.themeMode === 'dark') ? 'dark' : 'light'
    const splitLine = getSplitLineOpt(axisCfg.splitLine || {}, themeMode)
    const axisLine = getAxisLineOpt(axisCfg.axisLine || {}, themeMode)
    const axisLabel = getAxisLabelOpt(axisCfg.axisLabel || {}, themeMode)
    const xAxis = [
      {
        type: 'category',
        boundaryGap: false,
        axisLabel: axisLabel.xAxis,
        axisTick: { show: false },
        axisLine: axisLine.xAxis,
        splitLine: splitLine.xAxis,
        data: xAxisData,
      },
    ]
    const yAxis = [
      {
        type: 'value',
        name: '',
        axisLabel: unitForAxis
          ? { ...(axisLabel.yAxis || {}), formatter: (value: any) => `${value} ${unitForAxis}` }
          : axisLabel.yAxis,
        splitLine: splitLine.yAxis,
        axisLine: axisLine.yAxis,
        axisTick: { show: false },
        ...(yRange ? { min: yRange[0], max: yRange[1] } : {}),
      },
    ]
    const tooltip = unitForAxis
      ? getTooltip(
          {
            formatter(params: any[]) {
              if (typeof customFormatter === 'function') {
                return customFormatter(params, unitForAxis)
              }
              const name = params && params[0] ? params[0].name : ''
              const rows = (params || []).map((p: any) => {
                if (typeof customRow === 'function') {
                  return customRow(p, unitForAxis)
                }
                const v = p && p.value != null ? p.value : ''
                return `<tr><td style="text-align:left;">${p.marker}${p.seriesName}：</td><td style="text-align:left;">${v} ${unitForAxis}</td></tr>`
              })
              return `${name}<br/><table>${rows.join('')}</table>`
            },
          },
          themeMode
        )
      : undefined
    return {
      xAxis,
      yAxis,
      legendData,
      series,
      ...(tooltip ? { tooltip } : {}),
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

// line option builder moved into charts/line/line01.ts per design (transform focuses on data mapping)
