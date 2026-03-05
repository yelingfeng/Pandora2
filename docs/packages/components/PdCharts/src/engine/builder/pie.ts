import * as echarts from 'echarts/core'
import { hexToRgba } from '../../utils'

export const buildPieSeries = (
  data: any[],
  colors: string[]
) => {

  const category: string[] = []

  const seriesData = data.map(
    (item: any, index: number) => {
      const name = String(item.name)
      const value = Number(item.value) || 0
      category.push(name)
      return {
        name,
        value,
        itemStyle: {
          color: new (echarts as any).graphic.LinearGradient(
            1,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: hexToRgba(colors[index], 1)
              },
              {
                offset: 1,
                color: hexToRgba(colors[index], 0.5)
              }
            ]
          )
        }
      }
    }
  )
  return {
    category,
    series: [
      {
        type: 'pie',
        data: seriesData
      }
    ]
  }
}
