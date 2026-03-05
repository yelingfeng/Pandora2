export const buildDatasetSeries = (
  seriesNames: string[],
  type: 'bar' | 'line'
) => {
  return seriesNames.map(name => ({
    name,
    type,
    encode: {
      x: 'xAxis',
      y: name
    }
  }))
}
