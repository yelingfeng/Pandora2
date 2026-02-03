import { transformRankBarData } from '../../transform'
import { defaultThemeOpt } from '../../utils/defaultOpt'
import { _merge } from '../../utils/index'

export const build = (originData: any, chartConfig?: Record<string, any>) => {
  const cfg: any = transformRankBarData(originData)
  const names: any[] = cfg && Array.isArray(cfg.names) ? cfg.names : []
  const values: any[] = cfg && Array.isArray(cfg.values) ? cfg.values : []
  const percentData: any[] = cfg && Array.isArray(cfg.percentData) ? cfg.percentData : []
  const crossArr: any[] = cfg && Array.isArray(cfg.crossArr) ? cfg.crossArr : []
  const maxPercent = cfg && cfg.maxPercent != null ? cfg.maxPercent : 100
  const maxLabelLength = names.reduce((acc: number, cur: any) => {
    return Math.max(acc, String(cur || '').length)
  }, 0)
  const cfgLabel = chartConfig && typeof chartConfig.label === 'object' ? chartConfig.label : {}
  const labelMinWidth = typeof cfgLabel.minWidth === 'number' ? cfgLabel.minWidth : 48
  const labelMaxWidth = typeof cfgLabel.maxWidth === 'number' ? cfgLabel.maxWidth : 160
  const labelCharWidth = typeof cfgLabel.charWidth === 'number' ? cfgLabel.charWidth : 14
  const labelWidth = Math.min(labelMaxWidth, Math.max(labelMinWidth, Math.ceil(maxLabelLength * labelCharWidth)))

  const cfgRank = chartConfig && typeof chartConfig.rank === 'object' ? chartConfig.rank : {}
  const topRankCount = typeof cfgRank.topCount === 'number' ? cfgRank.topCount : 3
  const topRankColors = Array.isArray(cfgRank.topColors) ? cfgRank.topColors : []
  const rankStyles: any = {}
  for (let i = 1; i <= topRankCount; i++) {
    const c = topRankColors[i - 1] || {}
    rankStyles[`rank${i}`] = {
      backgroundColor: c.backgroundColor || (i === 1 ? 'rgba(242, 99, 123, 0.20)' : i === 2 ? 'rgba(251, 212, 55, 0.20)' : 'rgba(78, 203, 115, 0.20)'),
      borderColor: c.borderColor || (i === 1 ? 'rgba(242, 99, 123, 1)' : i === 2 ? 'rgba(251, 212, 55, 1)' : 'rgba(78, 203, 115, 1)'),
      borderWidth: '1px',
      align: 'center',
      color: c.color || '#4D4D4D',
      width: typeof cfgRank.width === 'number' ? cfgRank.width : 24,
      height: typeof cfgRank.height === 'number' ? cfgRank.height : 24,
      fontSize: typeof cfgRank.fontSize === 'number' ? cfgRank.fontSize : 14,
      lineHeight: typeof cfgRank.height === 'number' ? cfgRank.height : 24,
      borderRadius: 0,
    }
  }
  const normalRankStyle = {
    backgroundColor: cfgRank.backgroundColor || 'rgba(51, 121, 255, 0.20)',
    borderWidth: '1px',
    align: 'center',
    color: cfgRank.color || '#4D4D4D',
    width: typeof cfgRank.width === 'number' ? cfgRank.width : 24,
    height: typeof cfgRank.height === 'number' ? cfgRank.height : 24,
    fontSize: typeof cfgRank.fontSize === 'number' ? cfgRank.fontSize : 14,
    lineHeight: typeof cfgRank.height === 'number' ? cfgRank.height : 24,
    borderRadius: 0,
  }

  const barCfg = chartConfig && typeof chartConfig.bar === 'object' ? chartConfig.bar : {}
  const barColor = barCfg.color || 'rgba(26, 213, 152, 1)'
  const barBgColor = barCfg.backgroundColor || 'rgba(26, 213, 152, 0.20)'
  const topBarColors = Array.isArray(barCfg.topColors) ? barCfg.topColors : []

  const rightLabelCfg = chartConfig && typeof chartConfig.rightLabel === 'object' ? chartConfig.rightLabel : {}
  const rightLabelPrefix = rightLabelCfg.prefix != null ? String(rightLabelCfg.prefix) : '总数'
  const rightLabelSuffix = rightLabelCfg.suffix != null ? String(rightLabelCfg.suffix) : ''
  const rightLabelFormatter = typeof rightLabelCfg.formatter === 'function' ? rightLabelCfg.formatter : null

  const titleObj =
    names.length <= 0
      ? {
          text: '暂无数据',
          left: 'center',
          top: 'center',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 16,
          },
        }
      : {
          text: '',
        }

  const opt = _merge(defaultThemeOpt(), {
    title: titleObj,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      confine: true,
      formatter(params: any) {
        const first = params && params[0] ? params[0] : null
        if (!first) return ''
        const index = typeof first.dataIndex === 'number' ? first.dataIndex : 0
        const name = names[index] || ''
        const value = values[index] || 0
        return `${name}<br/>数量：${value}`
      },
    },
    grid: {
      top: '8%',
      left: '15%',
      right: '6%',
      bottom: '1%',
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: 'value',
      max: maxPercent,
    },
    yAxis: [
      {
        type: 'category',
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        data: names,
        inverse: true,
        axisLabel: {
          textStyle: {
            color: '#333333',
          },
          formatter: (val: any, i: number) => {
            if (i < topRankCount) {
              return `{rank${i + 1}|${i + 1}}{name|${val}}`
            }
            return `{num|${i + 1}}{name|${val}}`
          },
          rich: {
            num: {
              ...normalRankStyle,
            },
            name: {
              padding: [0, 0, 0, 8],
              width: labelWidth,
              overflow: 'truncate',
              ellipsis: '…',
              fontSize: 14,
              lineHeight: 24,
              color: '#1A1A1A',
            },
            ...rankStyles,
          },
        },
      },
      {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          formatter: (val: any, index: number) => {
            if (rightLabelFormatter) {
              return rightLabelFormatter({
                value: val,
                index,
                name: names[index],
                rawValue: values[index],
              })
            }
            return `${rightLabelPrefix}${val}${rightLabelSuffix}`
          },
          textStyle: {
            color: 'rgba(26, 26, 26, 1)',
            fontSize: '14',
          },
        },
        data: values,
      },
    ],
    series: [
      {
        name: '值',
        type: 'bar',
        zlevel: 1,
        itemStyle: {
          normal: {
            color: (params: any) => {
              const idx = params && typeof params.dataIndex === 'number' ? params.dataIndex : 0
              const topColor = topBarColors[idx]
              return topColor || barColor
            },
            barBorderRadius: 5,
          },
        },
        barWidth: 10,
        data: percentData,
      },
      {
        name: '背景',
        type: 'bar',
        barWidth: 10,
        barGap: '-100%',
        data: crossArr,
        itemStyle: {
          normal: {
            color: barBgColor,
            barBorderRadius: 5,
          },
        },
      },
    ],
  })

  return opt
}
