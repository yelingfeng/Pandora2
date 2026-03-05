export interface TooltipConfig {
  containerClass?: string
  itemClass?: string
  extraCssText?: string

  formatter?: (params: any[], ctx: TooltipContext) => string
  rowTemplate?: (row: TooltipRow, ctx: TooltipContext) => string
  valueFormatter?: (val: any, ctx: TooltipContext) => string
}

export interface TooltipContext {
  unit?: string
  themeMode: 'light' | 'dark'
}

export interface TooltipRow {
  marker: string
  name: string
  value: any
}

const defaultValueFormatter = (v: any) => {
  if (v === null || v === undefined) return '-'
  if (typeof v === 'number') {
    return v.toLocaleString()
  }
  return v
}

export const buildTooltip = (
  tooltipCfg: TooltipConfig = {},
  unit: string = '',
  themeMode: 'light' | 'dark' = 'light'
) => {

  const ctx: TooltipContext = {
    unit,
    themeMode
  }

  const baseTheme = {
    dark: {
      trigger: 'axis',
      textStyle: { color: '#ffffff' },
      extraCssText:
        'background: linear-gradient(180deg, rgba(38, 64, 99, 0.95) 0%, rgba(15, 67, 84, 0.95) 100%);border:1px solid rgba(53,197,255,0.6);border-radius:6px;'
    },

    light: {
      trigger: 'axis',
      textStyle: { color: '#1A1A1A' },
      extraCssText:
        'background:#fff;border:1px solid rgba(0,0,0,0.06);box-shadow:0 6px 16px rgba(0,0,0,0.08);border-radius:6px;'
    }
  }

  const theme = baseTheme[themeMode]

  return {
    ...theme,

    axisPointer: { type: 'shadow' },

    extraCssText:
      tooltipCfg.extraCssText || theme.extraCssText,

    formatter(params: any[]) {

      if (!params?.length) return ''

      // ===== custom formatter =====
      if (typeof tooltipCfg.formatter === 'function') {
        return tooltipCfg.formatter(params, ctx)
      }

      const title = params[0]?.axisValueLabel || params[0]?.name || ''

      const rows = params.map(p => {

        const value =
          tooltipCfg.valueFormatter
            ? tooltipCfg.valueFormatter(p.value, ctx)
            : defaultValueFormatter(p.value)

        const row: TooltipRow = {
          marker: p.marker,
          name: p.seriesName,
          value
        }

        if (typeof tooltipCfg.rowTemplate === 'function') {
          return tooltipCfg.rowTemplate(row, ctx)
        }

        return `
          <tr class="${tooltipCfg.itemClass || ''}">
            <td class="tt-name">
              ${row.marker}
              ${row.name}
            </td>
            <td class="tt-value">
              ${row.value}
              ${ctx.unit ? `<span class="tt-unit">${ctx.unit}</span>` : ''}
            </td>
          </tr>
        `
      })

      return `
        <div class="chart-tooltip chart-tooltip--${themeMode} ${tooltipCfg.containerClass || ''}">
          <div class="tt-title">${title}</div>
          <table class="tt-table">
            ${rows.join('')}
          </table>
        </div>
      `
    }
  }
}
