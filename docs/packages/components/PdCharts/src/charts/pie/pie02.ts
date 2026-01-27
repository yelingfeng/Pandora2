import { defaultThemeOpt } from '../../utils/defaultOpt'
import { transformPieDataToSeries } from '../../transform'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { _merge, hexToRgba } from '../../utils/index'

const createSeriesData = (data: any) => {
  return {
    name: '',
    type: 'pie',
    roseType: false,
    center: ['35%', '50%'],
    radius: ['45%', '60%'],
    avoidLabelOverlap: true,
    label: {
      normal: {
        show: false,
        position: 'center',
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#333',
          fontSize: 12,
        },
      },
    },
    selected: {},
    data,
  }
}
/**
 *
 * @param originData 原始数据
 */
export const build = (originData: any): EChartsOption => {
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
    '#FF63AD',
  ]
  const { category, series } = transformPieDataToSeries(
    originData,
    colors
  )
  // console.log(category, series)

  const label = {
    show: true,
    position: 'center',
    rich: {
      a: {
        fontWeight: 700,
        fontSize: 22,
        lineHeight: 20,
      },
      b: {
        fontWeight: 700,
        fontSize: 16,
        lineHeight: 24,
      },
    },
    formatter: function (params: any) {
      return [
        '{a|' +
          params.percent +
          '}' +
          '\n' +
          '{b|' +
          params.name +
          '}',
      ]
    },
  }
  const legend = {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 'center',
    bottom: 20,
    itemWidth: 8,
    itemHeight: 8,
    align: 'left',
    textStyle: {
      fontSize: 12,
      padding: [0, 0, 0, 5],
      rich: {
        value: {
          fontSize: 14,
          fontWeight: 400,
        },
      },
    },
    formatter: (name: any) => {
      const item = series.find((i: any) => {
        return i.name === name
      })
      return name + '  {value|' + item.value + '}'
    },
    data: category,
  }
  const title = {
    left: 'center',
    top: 'top',
    textStyle: {
      fontSize: '16px',
      color: '#333',
      fontWeight: 400,
    },
  }
  const tooltip = {
    trigger: 'item',
    extraCssText:
      'box-shadow:  0px 0px 5px 0px rgba(139, 146, 190, 0.2); color:rgba(77, 77, 77, 0.9); fontSize:14px; padding:12px',
    backgroundColor: 'rgba(236, 242, 255, 0.9)',
    formatter: '{b}</br>占比：{d}%</br>数量：{c}',
  }
  const seriesData = [createSeriesData(series)]

  const opt = _merge(defaultThemeOpt(), {
    tooltip,
    title,
    legend,
    label,
    colors,
    series: seriesData,
  })

  return opt as EChartsOption
}
