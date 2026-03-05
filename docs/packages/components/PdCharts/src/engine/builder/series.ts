import { alignSeriesData } from '../data/align'
import { formatSeriesData } from '../utils/formatter'

export const buildSeries = (
  groups: any[],
  xAxis: string[],
  chartType: string,
  autoFormatCfg: any
) => {

  let unit = ''
  let yRange: [number, number] | null = null

  const series = groups.map(group => {

    let data = alignSeriesData(
      xAxis,
      group.data
    )

    if (autoFormatCfg) {

      const formatted =
        formatSeriesData(
          data,
          autoFormatCfg
        )

      unit ||= formatted.unit
      yRange ||= formatted.yAxisRange

      data = formatted.data

    }

    return {
      name: group.name,
      type: chartType,
      data,
      smooth: chartType === 'line'
    }

  })

  return {
    series,
    unit,
    yRange
  }

}
