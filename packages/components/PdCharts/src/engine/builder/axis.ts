/**
 * 构建X轴
 * @param data
 * @param axisLabel
 * @param axisLine
 * @param splitLine
 * @param chartType
 * @returns
 */
export const buildXAxis = (
  data: string[],
  axisLabel: any,
  axisLine: any,
  splitLine: any,
  chartType: string
) => {
  return {
    type: 'category',
    boundaryGap: chartType === 'bar',
    data,
    axisLabel:axisLabel.xAxis,
    axisLine: axisLine.xAxis,
    splitLine:splitLine.xAxis,
    axisTick: {
      show: false
    }
  }
}

/**
 * 构建Y轴
 * @param axisLabel
 * @param axisLine
 * @param splitLine
 * @param unit
 * @param yRange
 * @returns
 */
export const buildYAxis = (
  axisLabel: any,
  axisLine: any,
  splitLine: any,
  unit: string,
  yRange: any
) => {

  return {
    type: 'value',
    axisLabel: unit
      ? {
          ...(axisLabel.yAxis || {}),
          formatter:(v: number) =>`${v} ${unit}`
        }
      : axisLabel.yAxis,
    axisLine: axisLine.yAxis,
    splitLine: splitLine.yAxis,
    axisTick: {
      show: false
    },
    ...(yRange
      ? {
          min: yRange[0],
          max: yRange[1]
        }
      : {})
  }
}
