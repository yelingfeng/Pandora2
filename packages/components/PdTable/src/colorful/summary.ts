import { Bottom, Top } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'
import { h, type VNodeChild } from 'vue'

export interface SummaryMeta {
  prop: string
  valueText: string
  color?: string
  tooltip?: string
  udFlag?: string
  clickable: boolean
}

export interface DataCellMeta {
  prop: string
  valueText: string
  color?: string
  tooltip?: string
  udFlag?: string
  clickable?: boolean
}

export function isTimeString(v: unknown): boolean {
  if (typeof v !== 'string') return false
  return /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?)?$/.test(v.trim())
}

export function shouldUnderlineText(text: string): boolean {
  const trimmed = String(text || '').trim()
  if (!trimmed) return false
  if (trimmed === '-' || trimmed === 'null' || trimmed === 'undefined') return false
  if (isTimeString(trimmed)) return false
  return true
}

export function formatNumberValueOnly(input: unknown, decimalPlaces = 2): string {
  const num = Number(input)
  if (!Number.isFinite(num)) return '-'
  if (num === 0) return '0'
  const units = [
    { value: 1e12, symbol: '万亿' },
    { value: 1e8, symbol: '亿' },
    { value: 1e4, symbol: '万' }
  ]
  for (let i = 0; i < units.length; i += 1) {
    const u = units[i]
    if (num >= u.value) {
      const scaled = num / u.value
      const fixed = scaled.toFixed(decimalPlaces)
      return `${fixed} ${u.symbol}`
    }
  }
  return String(num)
}

export function formatTrafficRate(
  input: unknown,
  inputUnit: 'kbps' | 'mbps' | 'gbps' = 'mbps',
  decimalPlaces = 2
): string {
  const num = Number(input)
  if (!Number.isFinite(num)) return '-'
  if (num === 0) return '0'

  let value = num
  let unit = inputUnit === 'kbps' ? 'Kbps' : inputUnit === 'gbps' ? 'Gbps' : 'Mbps'

  if (unit === 'Kbps') {
    if (value >= 1000) {
      value /= 1000
      unit = 'Mbps'
    }
  }
  if (unit === 'Mbps') {
    if (value >= 1000) {
      value /= 1000
      unit = 'Gbps'
    }
  }
  if (unit === 'Gbps') {
    if (value >= 1000) {
      value /= 1000
      unit = 'Tbps'
    }
  }

  return `${value.toFixed(decimalPlaces)} ${unit}`
}

export function inferTrafficUnit(prop: string): 'kbps' | 'mbps' | 'gbps' {
  const gbpsKeys = ['d_input_traffic', 'd_output_traffic', 'd_load_traffic']
  const mbpsKeys = ['link_traffic', 'pro_traffic']
  const kbpsKeys = ['rx_byte', 'tx_byte']

  if (gbpsKeys.includes(prop)) return 'gbps'
  if (mbpsKeys.includes(prop)) return 'mbps'
  if (kbpsKeys.includes(prop)) return 'kbps'
  return 'mbps'
}

export function formatValueByProp(prop: string, rawVal: any): string {
  const isEmptyVal = rawVal === '' || rawVal === null || typeof rawVal === 'undefined'
  if (isEmptyVal) return ''
  if (isTimeString(rawVal)) return String(rawVal)

  const isNumFormatProp = prop.includes('_num')
  const isFlowFormatProp = prop.includes('_traffic') || prop.includes('_byte')
  const isRateFormatProp = prop.includes('_rate')

  if (isFlowFormatProp) {
    const unit = inferTrafficUnit(prop)
    return formatTrafficRate(rawVal, unit, 2)
  }
  if (isNumFormatProp) {
    return formatNumberValueOnly(rawVal, 2)
  }
  if (isRateFormatProp) {
    return `${rawVal}%`
  }
  return String(rawVal)
}

export function buildSummaryMeta(
  row: Record<string, any>,
  prop: string,
  valueText: string,
  clickable: boolean
): SummaryMeta {
  const type = row && prop ? row[`${prop}_type`] : ''
  const tooltip = type ? String(type) : ''
  const color = row && prop ? row[`${prop}_color`] : ''
  const udFlag = row && prop ? row[`${prop}_udFlag`] : ''
  return {
    prop,
    valueText,
    tooltip,
    color: color ? String(color) : undefined,
    udFlag: udFlag ? String(udFlag) : undefined,
    clickable
  }
}

export function buildDataCellMeta(
  row: Record<string, any>,
  prop: string,
  valueText: string
): DataCellMeta {
  const type = row && prop ? row[`${prop}_type`] : ''
  const tooltip = type ? String(type) : ''
  const color = row && prop ? row[`${prop}_color`] : ''
  const udFlag = row && prop ? row[`${prop}_udFlag`] : ''
  return {
    prop,
    valueText,
    tooltip,
    color: color ? String(color) : undefined,
    udFlag: udFlag ? String(udFlag) : undefined
  }
}

export function renderSummaryCell(meta: SummaryMeta, onClick?: (prop: string) => void): VNodeChild {
  const valueClass = shouldUnderlineText(meta.valueText)
    ? ['colorful-summary-value', 'colorful-underline']
    : ['colorful-summary-value']

  const children: any[] = []
  if (meta.tooltip) {
    children.push(
      h(
        ElTooltip as any,
        { content: meta.tooltip, placement: 'top' },
        {
          default: () => h('i', { class: 'colorful-summary-info' }, 'i')
        }
      )
    )
  }

  children.push(
    h(
      'span',
      {
        class: valueClass,
        style: meta.color ? { color: meta.color } : undefined
      },
      meta.valueText
    )
  )

  if (meta.udFlag === 'up' || meta.udFlag === 'down') {
    const arrowIcon = meta.udFlag === 'up' ? Top : Bottom
    const arrowColor =
      meta.color || (meta.udFlag === 'up' ? '#218939' : '#F9170B')
    children.push(
      h(
        ElIcon as any,
        { class: ['colorful-summary-arrow', `is-${meta.udFlag}`], style: { color: arrowColor } },
        { default: () => h(arrowIcon as any) }
      )
    )
  }

  return h(
    'div',
    {
      class: meta.clickable ? ['colorful-summary-cell', 'is-clickable'] : ['colorful-summary-cell'],
      'data-prop': meta.prop,
      onClick: () => {
        if (meta.clickable && onClick) onClick(meta.prop)
      }
    },
    children
  )
}

export function renderDataCell(meta: DataCellMeta, onClick?: (prop: string) => void): VNodeChild {
  const valueClass = shouldUnderlineText(meta.valueText)
    ? ['colorful-cell-value', 'colorful-underline']
    : ['colorful-cell-value']

  const children: any[] = []
  if (meta.tooltip) {
    children.push(
      h(
        ElTooltip as any,
        { content: meta.tooltip, placement: 'top' },
        {
          default: () => h('i', { class: 'colorful-cell-info' }, 'i')
        }
      )
    )
  }

  children.push(
    h(
      'span',
      {
        class: valueClass,
        style: meta.color ? { color: meta.color } : undefined
      },
      meta.valueText
    )
  )

  if (meta.udFlag === 'up' || meta.udFlag === 'down') {
    const arrowIcon = meta.udFlag === 'up' ? Top : Bottom
    const arrowColor =
      meta.color || (meta.udFlag === 'up' ? '#218939' : '#F9170B')
    children.push(
      h(
        ElIcon as any,
        { class: ['colorful-cell-arrow', `is-${meta.udFlag}`], style: { color: arrowColor } },
        { default: () => h(arrowIcon as any) }
      )
    )
  }

  return h(
    'div',
    {
      class: meta.clickable ? ['colorful-cell', 'is-clickable'] : 'colorful-cell',
      'data-prop': meta.prop
      ,
      onClick: () => {
        if (meta.clickable && onClick) onClick(meta.prop)
      }
    },
    children
  )
}
