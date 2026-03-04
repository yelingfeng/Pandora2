/* ========================================= */
/*               Mode Type                   */
/* ========================================= */

export type FormatMode = 'array'

/* ========================================= */
/*               Rate Mode                   */
/* ========================================= */

export const RATE_UNITS = ['Kbps', 'Mbps', 'Gbps', 'Tbps'] as const

export type RateUnit = typeof RATE_UNITS[number]

// 速率模式已融合到数组模式的 type: 'rate' 之中

export interface RateResult {
  label: string
  unit: RateUnit | ''
}

/* ========================================= */
/*              Number Mode                  */
/* ========================================= */

export interface NumberUnit {
  value: number
  symbol: string
}

// 数字中文单位已融合到数组模式（type: 'num' 或自定义单位名）

export interface NumberResult {
  label: string
  unit: string
}

/* ========================================= */
/*               Array Mode                  */
/* ========================================= */

export type ArrayFormatType = 'flow' | 'num' | 'percent' | 'custom' | 'rate'

export interface AutoFormatArrayOptions<T = any> {
  key?: keyof T
  type?: ArrayFormatType
  decimalPlaces?: number
  showUnitLabel?: boolean
  unitName?: string
}

export interface ArrayResult<T = any> {
  data: T[]
  unit: string
  yAxisRange: [number, number]
}

/* ========================================= */
/*           Overload Union Type             */
/* ========================================= */

export type AutoFormatOptions<T = any> = AutoFormatArrayOptions<T>

export type AutoFormatReturn<T = any> = ArrayResult<T>
