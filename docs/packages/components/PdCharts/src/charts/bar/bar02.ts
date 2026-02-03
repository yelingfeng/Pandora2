import type { EChartsOption } from 'echarts'
import { transformGroupDataToSeries } from '../../transform'
import { defaultThemeOpt } from '../../utils/defaultOpt'
import { _merge } from '../../utils/index'

export const build = (originData: any): EChartsOption => {
  const list = Array.isArray(originData) ? originData : []
  const cfg: any = transformGroupDataToSeries(originData, 'bar')
  const xAxisData: any[] = cfg && Array.isArray(cfg.xAxisData) ? cfg.xAxisData : []
  const legendData: any[] = cfg && Array.isArray(cfg.legendData) ? cfg.legendData : []
  const series: any[] = cfg && Array.isArray(cfg.series) ? cfg.series : []

  const titleObj =
    list.length <= 0
      ? {
          text: '暂无数据',
          left: 'center',
          top: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 20,
          },
        }
      : {
          text: '',
        }

  const opt = _merge(defaultThemeOpt(), {
    title: titleObj,
    legend: {
      show: true,
      data: legendData,
      icon: 'stack',
      align: 'left',
      right: 10,
      top: 0,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 35,
    },
    grid: {
      bottom: 20,
      left: 70,
      right: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      confine: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        show: list.length > 0,
        lineStyle: {
          color: '#f4f4f4',
        },
      },
      axisLabel: {
        color: '#fff',
        interval: 0,
        textStyle: {
          color: '#666',
          margin: 15,
        },
      },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        textStyle: {
          color: '#666',
          margin: 15,
        },
      },
      axisLine: {
        lineStyle: {
          color: '#666',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#f4f4f4',
        },
      },
    },
    series,
  })

  return opt as EChartsOption
}
