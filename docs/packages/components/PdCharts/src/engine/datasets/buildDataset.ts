import { uniq } from 'lodash-es'

const XAXIS = 'XAIXS'

export const buildDataset = (data: any[]) => {
  if (!Array.isArray(data) || !data.length) {
    return { dataset: { source: [] }, seriesNames: [] }
  }
  const groups = uniq(
    data.filter(d =>
        d.category &&
        d.category.toUpperCase() !== XAXIS
      )
      .map(d => d.category)
  )
  const xAxis = uniq(
    data.map(d => d.name)
  )
  const header = ['xAxis', ...groups]
  const rows = xAxis.map(axis => {
    const row = [axis]
    groups.forEach(group => {
      const hit = data.find(
        d => d.name === axis && d.category === group
      )
      row.push( hit ? Number(hit.value) || 0 : 0 )
    })
    return row
  })

  return {
    dataset: {
      source: [
        header,
        ...rows
      ]
    },
    seriesNames: groups,
    xAxis
  }
}
