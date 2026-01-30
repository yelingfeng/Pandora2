import dayjs from 'dayjs'

export function isTimeString(v) {
  if (typeof v !== 'string') return false
  const s = v.trim()
  return /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?)?$/.test(s)
}

/**
 * 智能单位换算（B / KB / MB / GB / TB）。
 * 生成 flowAxis 字段，供 ECharts yAxis 展示使用。
 * 动态设置最大最小值，避免因为一个值太小或太大导致图表展示不美观。
 * 支持设置图表最小单位粒度（如总是显示到"MB"，避免出现太小的单位）。
 * @param {*} arr
 * @param {String} key  'flow' = 流量（1024），'num' = 数值（1000） ,'percent'=百分比 ， 'custom' = 不处理
 * @returns
 */
export function processDataWithUnit(arr, key = 'value', options = {}) {
  if (arr == undefined)
    return {
      data: arr,
      unit: '',
    }
  const {
    type = 'flow', // 'flow' = 流量（1024），'num' = 数值（1000）
    decimalPlaces = 2, // 保留小数位数
    showUnitLabel = true, // 是否添加 xxxAxisLabel 字段
    unitName = '',
  } = options

  console.log('processDataWithUnit options->>>', options)

  // 不处理
  if (type === 'custom') {
    return {
      data: arr,
      unit: '',
      yAxisRange: [],
    }
  }

  if (type === 'percent') {
    return {
      data: arr,
      unit: '%',
      yAxisRange: [],
    }
  }
  const isFlowType = type === 'flow'
  const factor = isFlowType ? 1024 : 1000
  const unit = unitName == '' ? ['条', '万条', '亿条'] : [unitName, '万' + unitName, '亿' + unitName]
  const units = isFlowType ? ['B', 'KB', 'MB', 'G', 'T'] : unit

  const decimalSteps = isFlowType ? [] : [1, 10000, 100000000]

  // Step 1: 提取并清洗数值
  const values = arr.map((item, idx) => {
    const raw = item[key]
    const num = Number(raw)
    if (raw === null || raw === undefined || raw === '' || isNaN(num) || num < 0) {
      console.error(`第 ${idx + 1} 条数据 ${key} 异常:`, item)
      return 0
    }
    return num
  })
  const max = Math.max(...values)

  // Step 2: 确定单位索引 - 修改逻辑优先选择合适的单位
  let unitIndex = 0
  if (isFlowType) {
    let tmp = max
    while (tmp >= factor && unitIndex < units.length - 1) {
      tmp /= factor
      unitIndex++
    }
  } else {
    // 修改单位选择逻辑，确保数值显示合理
    if (max >= 100000000) {
      // >= 1亿，使用亿
      unitIndex = 2
    } else if (max >= 10000) {
      // >= 1万，使用万
      unitIndex = 1
    } else {
      // < 1万，使用条
      unitIndex = 0
    }
  }

  const divisor = isFlowType ? Math.pow(factor, unitIndex) : decimalSteps[unitIndex] || 1

  const selectedUnit = units[unitIndex]

  // Step 3: 计算美观的 yAxis 范围
  function getNiceAxisRange(minVal, maxVal) {
    const range = maxVal - minVal || 1
    const padding = range * 0.1
    const niceMin = Math.max(0, Math.floor((minVal - padding) * 10) / 10)
    const niceMax = Math.ceil((maxVal + padding) * 10) / 10
    return [niceMin, niceMax]
  }
  function hasNonZeroAfterThreeZeros(num) {
    const str = Number(num).toFixed(10) // 防止科学计数法
    const match = str.match(/^0\.0{3}([1-9]\d*)/)
    return match !== null
  }

  // Step 4: 生成新字段 xxxAxis 和 xxxAxisLabel
  const processed = arr.map((item, idx) => {
    const val = values[idx] / divisor
    const isshow0 = hasNonZeroAfterThreeZeros(val)
    const rounded = decimalPlaces > 1 && !isshow0 ? val.toFixed(decimalPlaces) : val
    const result = {
      ...item,
      [`${key}Axis`]: rounded,
    }
    if (showUnitLabel) {
      result[`${key}AxisLabel`] = `${rounded} ${selectedUnit}`
    }
    return result
  })

  const axisValues = processed.map((d) => parseFloat(d[`${key}Axis`]))
  const [yMin, yMax] = getNiceAxisRange(Math.min(...axisValues), Math.max(...axisValues))

  return {
    data: processed, // 原始数据 + Axis字段
    unit: selectedUnit, // 最终单位（如 MB、万、亿）
    yAxisRange: [yMin, yMax],
  }
}

/**
 * 快速排序
 * @param {*} arr
 * @param {*} key
 * @param {*} order
 * @returns
 */
export function quickSortByKey(arr, key, order = 'asc') {
  if (!Array.isArray(arr) || arr.length <= 1) return arr

  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr[pivotIndex]
  const pivotValue = Number(pivot[key])

  const left = []
  const right = []

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue

    const currentValue = Number(arr[i][key])

    if (isNaN(currentValue)) {
      console.error(`非法字段值: ${arr[i][key]}`, arr[i])
      continue
    }

    if ((order === 'asc' && currentValue < pivotValue) || (order === 'desc' && currentValue > pivotValue)) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSortByKey(left, key, order), pivot, ...quickSortByKey(right, key, order)]
}

/**
 *
 * @param {*} dateString
 * @returns
 */
export function extractMonthAndDay(dateString) {
  // 确保日期字符串是有效的并且格式正确
  if (!dateString || !/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
    return null // 或者抛出一个错误
  }
  // 提取日期部分（去掉时间部分）
  const datePart = dateString.split(' ')[0]
  // 截取年份后的字符串，即月份和日期部分
  const monthAndDay = datePart.split('-').slice(1).join('-')

  return monthAndDay
}

export function formatNumberWithUnit(input) {
  const num = Number(input)
  // 非法数字处理
  if (isNaN(num)) return '-'
  if (num === 0) return '0'
  const units = [
    { value: 1e8, symbol: '亿' },
    { value: 1e7, symbol: '千万' },
    { value: 1e6, symbol: '百万' },
    { value: 1e5, symbol: '十万' },
    { value: 1e4, symbol: '万' },
    { value: 1e3, symbol: '千' },
    { value: 1e2, symbol: '百' },
  ]
  for (let i = 0; i < units.length; i++) {
    if (num >= units[i].value) {
      const scaled = num / units[i].value
      const rounded = parseFloat(scaled.toPrecision(4))
      return `${rounded} ${units[i].symbol}`
    }
  }
  return parseFloat(num.toPrecision(4)).toString()
}

/**
 * 按formatNumberWithUnit逻辑转换数字，只保留亿和万，返回转换后的数字不带单位
 * @param {number|string} input - 输入的数字
 * @returns {string} 转换后的数字字符串（不带单位）
 */
export function formatNumberValueOnly(input, decimalPlaces = 2) {
  // console.log('decimalPlaces->', decimalPlaces)
  const num = Number(input)
  // 非法数字处理
  if (isNaN(num)) return '-'
  if (num === 0) return '0'

  const units = [
    { value: 1e12, symbol: '万亿' },
    { value: 1e8, symbol: '亿' },
    { value: 1e4, symbol: '万' },
  ]
  for (let i = 0; i < units.length; i++) {
    if (num >= units[i].value) {
      const scaled = num / units[i].value
      const rounded = decimalPlaces === 2 ? scaled.toFixed(2) : scaled
      return `${rounded} ${units[i].symbol}`
    }
  }

  return num
}

/**
 * 格式化带宽/流量速率并带单位返回（Kbps/Mbps/Gbps/Tbps）。
 * @param {number|string} val - 数值
 * @param {string|boolean} inputUnit - 输入单位：'kbps'/'mbps'/'gbps' 或布尔值（兼容旧用法）
 * @param {number} decimalPlaces - 保留小数位
 * @returns {string} 形如 "123.45Kbps"、"123.45Mbps"、"123.45Gbps" 或 "1.23Tbps"
 */
export function formatTrafficRate(val, inputUnit = 'mbps', decimalPlaces = 2) {
  const num = Number(val)
  if (isNaN(num)) return '-'

  // 兼容旧用法：布尔值 true/false -> 'gbps'/'mbps'
  const unitTag = typeof inputUnit === 'string' ? inputUnit.toLowerCase() : inputUnit === true ? 'gbps' : 'mbps'

  let value = 0
  let unit = ''

  if (unitTag === 'kbps') {
    // 输入为 Kbps
    value = num
    unit = 'Kbps'

    // 转换为更大单位
    if (num >= 1000) {
      value = num / 1000
      unit = 'Mbps'
      if (value >= 1000) {
        value = value / 1000
        unit = 'Gbps'
        if (value >= 1000) {
          value = value / 1000
          unit = 'Tbps'
        }
      }
    }
  } else if (unitTag === 'gbps') {
    // 输入为 Gbps
    value = num
    unit = 'Gbps'
    if (num >= 1000) {
      value = num / 1000
      unit = 'Tbps'
    }
  } else {
    // 输入为 Mbps：默认小于1000 Mbps时保持Mbps单位
    value = num
    unit = 'Mbps'
    if (num >= 1000) {
      const gbps = num / 1000
      value = gbps
      unit = 'Gbps'
      if (gbps >= 1000) {
        value = gbps / 1000
        unit = 'Tbps'
      }
    }
  }

  // 0 值也带单位，保持展示一致性
  if (num === 0) return '0'
  const dp = Number(decimalPlaces)
  const fixed = Number.isFinite(dp) ? dp : 2
  return Number(value).toFixed(fixed) + ' ' + unit
}

/**
 * 根据 1 2 3 4 转换 后端需要的值
 */
export function getIspValueByTab(val) {
  var result = ''
  if (val == 2) {
    result = 0
  } else if (val == 3) {
    result = 1
  } else if (val == 4) {
    result = 3
  }
  return result
}

/**
 * IP+分钟分组聚合工具类
 * 用于硬件状态监控界面的数据分组和跨行合并
 */

/**
 * 处理数据为IP+分钟分组的嵌套结构
 * @param {Array} list - 原始数据列表
 * @param {Object} options - 配置选项
 * @param {Array} options.timeFields - 时间字段优先级数组，默认['start_time', 'startTime', 'create_time', 'update_time', 'time']
 * @param {String} options.ipField - IP字段名，默认'ip_address'
 * @param {String} options.timeFormat - 时间格式，默认'YYYY-MM-DD HH:mm'
 * @returns {Array} 处理后的数据列表
 */
export function processGroupedData(list, options = {}) {
  if (!list) return []
  const {
    timeFields = ['start_time', 'startTime', 'create_time', 'update_time', 'time'],
    ipField = 'ip_address',
    timeFormat = 'YYYY-MM-DD HH:mm',
  } = options

  // 按 ip_address + 时间分钟 分组
  const groupedData = {}
  list.forEach((item) => {
    const ipAddress = item[ipField]
    // 提取时间到分钟级别
    let timeStr = ''
    for (const field of timeFields) {
      if (item[field]) {
        timeStr = item[field]
        break
      }
    }
    const minuteTime = timeStr ? dayjs(timeStr).format(timeFormat) : ''
    const groupKey = `${ipAddress}_${minuteTime}`

    if (!groupedData[groupKey]) {
      groupedData[groupKey] = []
    }
    groupedData[groupKey].push(item)
  })

  // 转换为平铺结构，添加分组信息
  const result = []
  let groupNumber = 1
  Object.keys(groupedData).forEach((groupKey) => {
    const items = groupedData[groupKey]
    // 按时间排序
    const sortedItems = items.sort((a, b) => {
      let timeA = ''
      let timeB = ''
      for (const field of timeFields) {
        if (a[field]) {
          timeA = a[field]
          break
        }
      }
      for (const field of timeFields) {
        if (b[field]) {
          timeB = b[field]
          break
        }
      }
      return new Date(timeB) - new Date(timeA)
    })

    // 为每个项目添加分组信息
    sortedItems.forEach((item, index) => {
      result.push({
        ...item,
        groupKey: groupKey,
        groupSize: sortedItems.length,
        groupIndex: index,
        groupNumber: groupNumber,
      })
    })
    groupNumber++
  })
  return result
}

/**
 * 序号格式化方法
 * @param {Object} row - 行数据
 * @returns {Number} 分组序号
 */
export function groupIndexFormatter(row) {
  return row.groupNumber
}

/**
 * 表格跨行合并方法
 * @param {Object} params - 参数对象
 * @param {Object} params.row - 行数据
 * @param {Number} params.columnIndex - 列索引
 * @param {Array} spanColumns - 需要跨行合并的列索引数组，默认[0, 1, 2]
 * @returns {Object} 跨行合并配置
 */
export function createSpanMethod(spanColumns = [0, 1, 2]) {
  return function ({ row, columnIndex }) {
    // 检查是否为需要跨行合并的列
    if (spanColumns.includes(columnIndex)) {
      if (row.groupIndex === 0) {
        return {
          rowspan: row.groupSize,
          colspan: 1,
        }
      } else {
        return {
          rowspan: 0,
          colspan: 0,
        }
      }
    }
  }
}

/**
 * 获取接口类型与网元类型的映射关系
 * @returns {Object} 接口类型与网元类型的映射对象
 */
export function getInterfaceToNetElementMap() {
  return {
    Gn: ['GGSN', 'SGSN'],
    S11: ['MME', 'SGW'],
    'S1-MME': ['MME'],
    S1MME: ['MME'],
    S6a: ['MME'],
    N2: ['AMF'],
    N11: ['AMF', 'SMF'],
    N12: ['AMF', 'AUSF'],
    N8: ['AMF', 'UDM'],
    N14: ['AMF'],
    GM: ['P_CSCF'],
  }
}

/**
 * 根据接口类型获取对应的网元类型数组
 * @param {String} interfaceType - 接口类型
 * @returns {Array} 对应的网元类型数组，如果没有匹配则返回空数组
 */
export function getNetElementTypesByInterface(interfaceType) {
  const map = getInterfaceToNetElementMap()
  return map[interfaceType] || []
}

/**
 * 通用表格分组工具
 * 提供完整的分组、格式化和跨行合并功能
 */
export const commonTableGroupUtil = {
  /**
   * 处理数据分组
   */
  processData: processGroupedData,

  /**
   * 序号格式化
   */
  indexFormatter: groupIndexFormatter,

  /**
   * 创建跨行合并方法
   */
  createSpanMethod: createSpanMethod,

  /**
   * 获取默认配置
   */
  getDefaultConfig() {
    return {
      timeFields: ['start_time', 'startTime', 'create_time', 'update_time', 'time'],
      ipField: 'ip_address',
      timeFormat: 'YYYY-MM-DD HH:mm',
      spanColumns: [0, 1, 2], // 序号、IP、时间列
    }
  },
}
// utils/formatBytes.js
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0 || bytes === null || bytes === undefined) {
    return '0 B'
  }
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 根据业务类型字典列表获取显示名称
 * 兼容两种数据结构：
 * - { dictKey, dictValue }
 * - { value, name }
 * @param {Array} list 字典列表
 * @param {string|number} type 业务类型值
 * @returns {string} 显示名称
 */
export function getServiceTypeName(list, type) {
  const arr = Array.isArray(list) ? list : []
  const t = String(type)
  let item = arr.find((it) => String(it.value) === t)
  if (item && (item.name || item.label)) return item.name || item.label
  return '-'
}
