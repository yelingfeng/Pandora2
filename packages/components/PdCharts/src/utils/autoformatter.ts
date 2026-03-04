import {
  ArrayResult,
  AutoFormatOptions,
  RateUnit
} from '../types/formatter';


/* ============================= */
/*       Number Formatting       */
/* ============================= */

export interface NumberUnit {
  value: number
  symbol: string
}

const DEFAULT_NUMBER_UNITS: NumberUnit[] = [
  { value: 1e12, symbol: '万亿' },
  { value: 1e8, symbol: '亿' },
  { value: 1e4, symbol: '万' },
]

function formatNumber(
  value: number,
  units: NumberUnit[] = DEFAULT_NUMBER_UNITS,
  dp = 2
): { label: string; unit: string } {
  if (!Number.isFinite(value)) return { label: '-', unit: '' }
  if (value === 0) return { label: '0', unit: '' }

  for (const u of units) {
    if (value >= u.value) {
      const scaled = value / u.value
      return { label: `${scaled.toFixed(dp)} ${u.symbol}`, unit: u.symbol }
    }
  }

  return { label: String(value), unit: '' }
}


/* ============================= */
/*       Array Formatting        */
/* ============================= */

function getNiceAxisRange(min: number, max: number): [number, number] {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 1]
  if (min === max) return [0, max || 1]

  const range = max - min
  const padding = range * 0.1
  const niceMin = Math.max(0, Math.floor((min - padding) * 10) / 10)
  const niceMax = Math.ceil((max + padding) * 10) / 10

  return [niceMin, niceMax]
}

function computeArrayUnit(
  values: number[],
  isFlow: boolean,
  unitName = ''
) {
  const max = Math.max(...values, 0)

  if (isFlow) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let index = 0
    let temp = max

    while (temp >= 1024 && index < units.length - 1) {
      temp /= 1024
      index++
    }

    return {
      divisor: Math.pow(1024, index),
      unit: units[index],
    }
  }

  // 普通数值单位
  const thresholds = [1, 1e4, 1e8]
  const symbols = unitName
    ? [unitName, `万${unitName}`, `亿${unitName}`]
    : ['条', '万条', '亿条']

  let index = 0
  if (max >= 1e8) index = 2
  else if (max >= 1e4) index = 1

  return {
    divisor: thresholds[index],
    unit: symbols[index],
  }
}


function resolveInputRateUnit(unitName: string): RateUnit {
  const s = String(unitName || '').toLowerCase()
  if (s.includes('tbps')) return 'Tbps'
  if (s.includes('gbps')) return 'Gbps'
  if (s.includes('kbps')) return 'Kbps'
  return 'Mbps'
}

function convertToKbps(value: unknown, unit: RateUnit): number {
  const num = Number(value)
  if (!Number.isFinite(num) || num < 0) return 0
  const map: Record<RateUnit, number> = {
    Kbps: 1,
    Mbps: 1_000,
    Gbps: 1_000_000,
    Tbps: 1_000_000_000,
  }
  return num * map[unit]
}

function resolveBestRateUnit(maxKbps: number) {
  if (maxKbps >= 1_000_000_000) {
    return { unit: 'Tbps' as RateUnit, divisor: 1_000_000_000 }
  }
  if (maxKbps >= 1_000_000) {
    return { unit: 'Gbps' as RateUnit, divisor: 1_000_000 }
  }
  if (maxKbps >= 1_000) {
    return { unit: 'Mbps' as RateUnit, divisor: 1_000 }
  }
  return { unit: 'Kbps' as RateUnit, divisor: 1 }
}

function handleRateArray(
  arr: any[],
  key: any,
  decimalPlaces: number,
  showUnitLabel: boolean,
  unitName: string
): ArrayResult<any> {

  if (!arr.length) {
    return { data: [], unit: '', yAxisRange: [0, 1] }
  }

  const inputUnit = resolveInputRateUnit(unitName)

  // 1️⃣ 转成 kbps
  const kbpsValues = arr.map(item =>
    convertToKbps(item[key], inputUnit)
  )

  const maxKbps = Math.max(...kbpsValues, 0)

  // 2️⃣ 自动选择展示单位
  const { unit: selectedUnit, divisor } =
    resolveBestRateUnit(maxKbps)

  // 3️⃣ 生成结果
  const processed = arr.map((item: any, idx: number) => {
    const axisVal = kbpsValues[idx] / divisor
    const rounded = Number(axisVal.toFixed(decimalPlaces))

    const result: Record<string, any> = {
      ...item,
      [`${String(key)}Axis`]: rounded,
    }

    if (showUnitLabel) {
      result[`${String(key)}AxisLabel`] =
        `${rounded} ${selectedUnit}`
    }

    return result
  })

  const axisValues = processed.map((item: any) => item[`${String(key)}Axis`])

  const [yMin, yMax] = getNiceAxisRange(
    Math.min(...axisValues),
    Math.max(...axisValues)
  )

  return {
    data: processed,
    unit: selectedUnit,
    yAxisRange: [yMin, yMax],
  }
}


/* ============================= */
/*          Main API             */
/* ============================= */

export function autoFormat(input: any, options: AutoFormatOptions<any>): ArrayResult<any> {

  /* ===== array ===== */
  const arr = Array.isArray(input) ? input : []
  const {
    key = 'value',
    type = 'flow',
    decimalPlaces = 2,
    showUnitLabel = true,
    unitName = '',
  } = options

  if (!arr.length) {
    return { data: [], unit: '', yAxisRange: [0, 1] }
  }

  if (type === 'custom') {
    return { data: arr, unit: '', yAxisRange: [0, 1] }
  }

  if (type === 'percent') {
    const processed = arr.map(item => {
      const raw = Number(item[key])
      const v = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0
      const result: any = {
        ...item,
        [`${String(key)}Axis`]: v,
      }
      if (showUnitLabel) {
        result[`${String(key)}AxisLabel`] = `${v} %`
      }
      return result
    })
    return { data: processed, unit: '%', yAxisRange: [0, 100] }
  }

  if (type === 'rate') {
    return handleRateArray(
      arr,
      key,
      decimalPlaces,
      showUnitLabel,
      unitName
    )
  }


  const values = arr.map(item => {
    const num = Number(item[key])
    return Number.isFinite(num) && num >= 0 ? num : 0
  })

  const { divisor, unit } = computeArrayUnit(
    values,
    type === 'flow',
    unitName
  )

  const processed = arr.map(item => {
    const raw = Number(item[key])
    const scaled = raw / divisor
    const rounded = Number(scaled.toFixed(decimalPlaces))

    return {
      ...item,
      [`${String(key)}Axis`]: rounded,
      ...(showUnitLabel && {
        [`${String(key)}AxisLabel`]: `${rounded} ${unit}`,
      }),
    }
  })

  const axisValues = processed.map(
    item => item[`${String(key)}Axis`]
  )

  const range = getNiceAxisRange(
    Math.min(...axisValues),
    Math.max(...axisValues)
  )

  return {
    data: processed,
    unit,
    yAxisRange: range,
  }
}

/* ============================= */
/*    Only Value (No Unit)       */
/* ============================= */

export function formatNumberValueOnly(
  input: number | string,
  decimalPlaces = 2
): string {
  const res = formatNumber(Number(input), undefined, decimalPlaces)
  return res.label
}
