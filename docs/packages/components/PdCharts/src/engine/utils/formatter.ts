import type { AutoFormatArrayOptions } from '../../types/formatter'
import { autoFormat } from '../../utils/autoformatter'

export const formatSeriesData = (
  data: number[],
  cfg: AutoFormatArrayOptions | false
) => {
  if (cfg) {
    const key = String(cfg.key || 'value')
    const arr = (data || []).map(v => ({ [key]: Number(v) }))
    const res = autoFormat(arr, {
      key,
      type: cfg.type,
      decimalPlaces: cfg.decimalPlaces,
      showUnitLabel: cfg.showUnitLabel,
      unitName: cfg.unitName,
    })
    const axisData = res.data.map((d: any) => d[`${key}Axis`])
    return {
      data: axisData,
      unit: res.unit,
      yAxisRange: res.yAxisRange as [number, number],
    }
  }
  const formatted = data.map(v => Number(v))
  const min = Math.min(...formatted)
  const max = Math.max(...formatted)
  return {
    data: formatted,
    unit: '',
    yAxisRange: [min, max] as [number, number],
  }
}
