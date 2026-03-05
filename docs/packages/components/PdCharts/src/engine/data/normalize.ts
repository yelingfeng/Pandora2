/**
 * 归一化数据
 * @param data
 * @returns
 */
export const normalizeData = (data: any[]) => {

  const groupsMap = new Map<string, any[]>()
  const xAxisSet = new Set<string>()

  data.forEach(item => {

    const group = item.category || 'default'
    const name = String(item.name)

    xAxisSet.add(name)

    if (!groupsMap.has(group)) {
      groupsMap.set(group, [])
    }

    groupsMap.get(group)!.push({
      name,
      value: item.value ?? 0,
      raw: item
    })

  })

  const groups = Array.from(groupsMap).map(
    ([name, data]) => ({
      name,
      data
    })
  )

  const xAxis = Array.from(xAxisSet)

  return {
    groups,
    xAxis
  }

}
