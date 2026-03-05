export const alignSeriesData = (
  xAxis: string[],
  data: any[]
) => {

  return xAxis.map(axis => {
    /**
     * 查找数据中是否有匹配的项
     */
    const hit = data.find(
      d => d.name === axis
    )
    return hit ? Number(hit.value) : 0

  })

}
