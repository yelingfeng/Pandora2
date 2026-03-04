import {
  AXIS_LABEL_COLOR,
  AXIS_LINE_COLOR,
  BG_COLOR,
  COMMON_COLORS,
  DARK_AXIS_LABEL_COLOR,
  DARK_AXIS_LINE_COLOR,
  DARK_BG,
  DARK_COLORS,
  DARK_LEGEND_LABEL_COLOR,
  DARK_SPLIT_LINE_COLOR,
  DEAULT_LINE_TYPE,
  LEGEND_LABEL_COLOR,
  SPLIT_LINE_COLOR
} from './../constant'

import {
  AxisLabelType,
  AxisLineType,
  BaseLineType,
  DataZoomType,
} from '../types/props'

/**
 * @param opt
 * @returns
 */
export function getSplitLineOpt(opt: BaseLineType, mode: 'light' | 'dark' = 'light') {
  const {
    color = mode === 'dark' ? DARK_SPLIT_LINE_COLOR : SPLIT_LINE_COLOR,
    lineType = DEAULT_LINE_TYPE,
    xAxis = false,
    yAxis = true,
  } = opt
  const lineStyle = {
    type: lineType,
    color: color,
  }
  return {
    xAxis: {
      show: xAxis,
      lineStyle: lineStyle,
    },
    yAxis: {
      show: yAxis,
      lineStyle: lineStyle,
    },
  }
}

/**
 *
 * @param opt
 * @returns
 */
export function getAxisLineOpt(opt: AxisLineType, mode: 'light' | 'dark' = 'light') {
  const {
    color = mode === 'dark' ? DARK_AXIS_LINE_COLOR : AXIS_LINE_COLOR,
    lineType = DEAULT_LINE_TYPE,
    xAxis = true,
    yAxis = true,
    symbol = ['none', 'arrow'],
    symbolSize = [6, 10],
  } = opt
  const lineStyle = {
    type: lineType,
    color: color,
  }
  return {
    xAxis: {
      show: xAxis,
      symbol,
      symbolSize,
      lineStyle: lineStyle,
    },
    yAxis: {
      show: yAxis,
      symbol,
      symbolSize,
      lineStyle: lineStyle,
    },
  }
}
/**
 *
 * @param opt
 * @returns
 */
export function getAxisLabelOpt(opt: AxisLabelType, mode: 'light' | 'dark' = 'light') {
  const {
    color = mode === 'dark' ? DARK_AXIS_LABEL_COLOR : AXIS_LABEL_COLOR,
    xAxis = true,
    yAxis = true,
    rotate = 0,
    interval = 'auto',
    // formatter = '',
  } = opt
  const textStyle = {
    color: color,
  }
  return {
    xAxis: {
      show: xAxis,
      textStyle: textStyle,
      rotate: rotate,
      interval: interval,
      // formatter,
    },
    yAxis: {
      show: yAxis,
      textStyle: textStyle,
    },
  }
}
/**
 *
 * @param opt
 * @returns
 */
export const getDataZoomOpt = (opt: DataZoomType,mode: 'light' | 'dark' = 'light') => {
  const { show, start } = opt
  const lightCfg = [
    {
      type: 'inside',
      start,
      end: 100,
      xAxisIndex: 0,
    },
    {
      show,
      type: 'slider',
      start,
      rangeMode: 'percent',
      end: 100,
      height: 25,
      xAxisIndex: 0,
    },
  ];
  const darkCfg = [
    {
      show,
      backgroundColor: 'rgba(28,37,75,0.5)', //组件的背景颜色
      borderColor: '#10797D',
      height: 15,
      xAxisIndex: 0,
      radiusAxisIndex: 3, //设置 dataZoom-inside 组件控制的 radius 轴,可以用数组表示多个轴
      bottom: 5,
      brushSelect: false, // 区域控制缩放器可移动区域显示
      start,
      end: 100,
      handleIcon:
        'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
      handleSize: '10',
      fillerColor: 'rgba(42, 123, 150, 0.6)', //选中范围的填充颜色。
      handleStyle: {
        borderColor: '#5AD8A6',
        backgroundColor: '#04A2A8',
        color: '#04A2A8',
      },
      textStyle: {
        color: 'transparent',
      },
    },
  ]
  return mode === 'dark' ? darkCfg : lightCfg;
}


export const getLegendOpt = (
  mode: 'light' | 'dark' = 'light',
  legendCfg: Record<string, any> = {},
  legendData: any[] = []
) => {
  const textColor = mode === 'dark' ? DARK_LEGEND_LABEL_COLOR : LEGEND_LABEL_COLOR
  const base = {
    show: true,
    type: 'scroll',
    data: legendData,
    icon: 'roundRect',
    align: 'left',
    top: 10,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 35,
    textStyle: {
      fontSize: 12,
      color: textColor,
    },
    pageIconColor: '#08BAFF',
  }
  return Object.assign(base, legendCfg || {})
}


export const defaultThemeOpt = (mode: 'light' | 'dark' = 'light') => {
  const palette = mode === 'dark' ? DARK_COLORS : COMMON_COLORS
  const bg = mode === 'dark' ? DARK_BG : BG_COLOR
  return {
    color: palette,
    backgroundColor: bg,
  }
}
