export const buildRankBar = (
  data: any[]
) => {

  const names: string[] = []
  const values: number[] = []

  data.forEach(item => {
    names.push(String(item.name))
    values.push(
      Number(item.value) || 0
    )
  })

  const maxVal = values.length
      ? Math.max(...values)
      : 0

  const maxPercent = 100
  const percentData = values.map(v => {
    if (!maxVal) return 0
    const p = (v / maxVal) * 100
    return Number(
      Math.min(100, p).toFixed(2)
    )
  })

  const crossArr = values.map(() => maxPercent)

  return {
    names,
    values,
    percentData,
    crossArr,
    maxPercent
  }
}
