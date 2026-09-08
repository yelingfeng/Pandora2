import { defaultThemeOpt } from '../../utils/defaultOpt'
import { transformPieDataToSeries } from '../../transform'
import type { EChartsOption } from 'echarts'
import { _merge } from '../../utils/index'

const createSeriesData = (data: any[]) => {
  return {
    name: '',
    type: 'pie',
    roseType: false,
    center: ['35%', '50%'],
    radius: ['45%', '60%'],
    avoidLabelOverlap: true,
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        color: '#333',
        fontSize: 12,
        fontWeight: 700,
        formatter: (params: any) => {
          return `{a|${params.percent}%}\n{b|${params.name}}`
        },
        rich: {
          a: {
            fontWeight: 700,
            fontSize: 22,
            lineHeight: 28
          },
          b: {
            fontWeight: 700,
            fontSize: 14,
            lineHeight: 22
          }
        }
      }
    },
    data
  }
}

/**
 * 环形饼图（右侧图例）
 */
export const build = (originData: any, _config?: Record<string, any>): EChartsOption => {
  const colors = [
    '#67C8FF',
    '#FF6666',
    '#669AFF',
    '#F4A54E',
    '#F284F3',
    '#41C8FF',
    '#FF2366',
    '#749AFF',
    '#F4A22E',
    '#F124F3',
    '#FF6767',
    '#FF9D6B',
    '#D3C95A',
    '#55CA69',
    '#16D8B8',
    '#67CCFF',
    '#6895FF',
    '#B095FF',
    '#D05CFF',
    '#FF63AD'
  ]

  const result = transformPieDataToSeries(originData || [], colors)
  const category = result?.category || []
  // buildPieSeries 返回 series: [{ type:'pie', data: [...] }]
  const pieData = result?.series?.[0]?.data || []

  const legend = {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 'center',
    bottom: 20,
    itemWidth: 8,
    itemHeight: 8,
    align: 'left' as const,
    textStyle: {
      fontSize: 12,
      padding: [0, 0, 0, 5],
      rich: {
        value: {
          fontSize: 14,
          fontWeight: 400
        }
      }
    },
    formatter: (name: string) => {
      const item = pieData.find((i: any) => i.name === name)
      const value = item ? item.value : ''
      return `${name}  {value|${value}}`
    },
    data: category
  }

  const title = {
    left: 'center',
    top: 'top',
    textStyle: {
      fontSize: 16,
      color: '#333',
      fontWeight: 400
    }
  }

  const tooltip = {
    trigger: 'item' as const,
    extraCssText:
      'box-shadow: 0px 0px 5px 0px rgba(139, 146, 190, 0.2); color:rgba(77, 77, 77, 0.9); font-size:14px; padding:12px',
    backgroundColor: 'rgba(236, 242, 255, 0.9)',
    formatter: '{b}<br/>占比：{d}%<br/>数量：{c}'
  }

  return _merge(defaultThemeOpt(), {
    color: colors,
    tooltip,
    title,
    legend,
    series: [createSeriesData(pieData)]
  }) as EChartsOption
}
