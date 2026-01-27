import { defaultThemeOpt } from '../../utils/defaultOpt'
import { transformOriginDataToSeries } from '../../transform'
import type { EChartsOption } from 'echarts'
import { _merge } from '../../utils/index'
/**
 *
 * @param originData 原始数据
 */
export const build = (originData: any): EChartsOption => {
  const { category, series } = transformOriginDataToSeries(
    originData,
    'pie'
  )
  console.log(category, series)
  const formatNumber = function (num: any) {
    const reg = /(?=(\B)(\d{3})+$)/g
    return num.toString().replace(reg, ',')
  }

  const createSeriesData = (data: any) => {
    return {
      type: 'pie',
      roseType: 'radius',
      radius: ['25%', '60%'],
      center: ['50%', '50%'],
      data: data,
      // hoverAnimation: false,
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 2,
        },
      },
      labelLine: {
        noraml: {
          length: 20,
          length2: 120,
          lineStyle: {
            // color: '#e6e6e6'
          },
        },
      },
      label: {
        normal: {
          formatter: (params: any) => {
            return (
              '{icon|●}{name|' +
              params.name +
              '}\n{value|' +
              formatNumber(params.value) +
              '}'
            )
          },
          // padding: [0 , -100, 25, -100],
          rich: {
            icon: {
              fontSize: 16,
              color: 'inherit',
            },
            name: {
              fontSize: 18,
              padding: [0, 0, 0, 10],
              color: '#000',
            },
            value: {
              fontSize: 14,
              fontWeight: 'bolder',
              padding: [10, 0, 0, 20],
              color: 'inherit',
              // color: '#333333'
            },
          },
        },
      },
    }
  }

  const title = '总量'

  const total = originData.reduce((a: any, b: any) => {
    return a + b.value * 1
  }, 0)

  const opt = _merge(defaultThemeOpt(), {
    tooltip: {
      trigger: 'item',
    },
    title: [
      {
        text:
          '{name|' +
          title +
          '}\n{val|' +
          formatNumber(total) +
          '}',
        top: 'center',
        left: 'center',
        textStyle: {
          rich: {
            name: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#000',
              padding: [10, 0],
            },
            val: {
              fontSize: 32,
              fontWeight: 'bolder',
              color: '#000',
            },
          },
        },
      },
      {
        text: '单位：个',
        top: 20,
        left: 20,
        textStyle: {
          fontSize: 14,
          color: '#666666',
          fontWeight: 400,
        },
        show: false,
      },
    ],
    series: [createSeriesData(series.data)],
  })

  return opt as EChartsOption
}
