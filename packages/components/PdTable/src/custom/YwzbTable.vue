<template>
  <div class="globalTable">
    <NextLoading :loading="isLoading"></NextLoading>
    <el-table
      ref="innerTable"
      v-bind="$attrs"
      v-on="forwardListeners"
      :data="localData"
      :row-class-name="rowClassName"
      :show-summary="shouldShowSummary"
      :summary-method="localGetSummaries"
      :border="true"
      :height="$attrs.height"
      @sort-change="handleSortChange"
      @row-click="handleRowClick"
      :header-cell-style="localHeaderCellStyle"
      :default-sort="defaultSort"
      style="width: 100%"
    >
      <!-- 若提供 columns，则按配置渲染；否则透传插槽 -->
      <template v-if="hasColumns">
        <el-table-column v-for="(col, idx) in columns" :key="col.key || col.prop || idx" v-bind="getColProps(col)">
          <!-- 支持一层子列 -->
          <template v-if="col.children && col.children.length">
            <el-table-column v-for="(child, cidx) in col.children" :key="child.key || child.prop || cidx" v-bind="getColProps(child)" />
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <slot />
      </template>
    </el-table>
  </div>
</template>
<script>
import { formatNumberValueOnly, formatTrafficRate } from '@/util/biz'
import NextLoading from '@/components/common/NextLoading.vue'
export default {
  name: 'YwzbTable',
  inheritAttrs: false,
  components: { NextLoading },
  props: {
    // 仅保留核心对外属性
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: null },
    // 显式接收父组件汇总行数据，避免不可靠的 $parent 访问
    totalRow: { type: Object, default: null },
    // 表格默认排序配置
    defaultSort: { type: Object, default: () => ({ prop: 'cdr_num', order: 'descending' }) },
  },
  data() {
    return {
      selectedRowIndex: -1,
      localData: [],
      summaryClickHandler: null,
      summaryFooterWrapper: null,
      lastSortKey: '',
      // 记录上次的列数，用于检测列数变化
      lastColumnCount: 0,
      // 记录上次DOM中的列数，用于检测v-if切换
      lastDOMColumnCount: 0,
    }
  },
  computed: {
    hasColumns() {
      return Array.isArray(this.columns) && this.columns.length > 0
    },
    // 过滤透传的事件监听，避免 sort-change 被双重触发
    forwardListeners() {
      const listeners = { ...(this.$listeners || {}) }
      if (listeners['sort-change']) {
        delete listeners['sort-change']
      }
      return listeners
    },
    // 基于数据加载状态的表格 loading：优先使用父组件传入的 loading
    isLoading() {
      if (typeof this.$attrs.loading !== 'undefined') {
        return !!this.$attrs.loading
      }
      return !Array.isArray(this.localData) || this.localData.length === 0
    },
    // 仅在有数据或父组件提供 totalRow 时显示汇总，避免空数据阶段触发
    shouldShowSummary() {
      const hasData = Array.isArray(this.localData) && this.localData.length > 0
      const hasTotalRow = !!this.totalRow && Object.keys(this.totalRow).length > 0
      const result = hasData || hasTotalRow
      // console.log('YwzbTable shouldShowSummary:', {
      //   hasData,
      //   hasTotalRow,
      //   result,
      //   localDataLength: this.localData.length,
      //   totalRow: this.totalRow,
      //   totalRowKeys: this.totalRow ? Object.keys(this.totalRow).length : 0,
      // })
      return result
    },
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(val) {
        this.localData = Array.isArray(val) ? [...val] : []
        // 数据变化后强制更新汇总行并绑定事件
        this.$nextTick(() => {
          this.forceUpdateSummary()
          this.bindSummaryClicks()
        })
      },
    },
    // 监听totalRow变化，当totalRow变化时重新渲染汇总行
    totalRow: {
      immediate: true,
      deep: true,
      handler(newTotalRow, oldTotalRow) {
        console.log('YwzbTable totalRow changed:', { newTotalRow, oldTotalRow })
        // 使用深度比较或者直接触发更新，因为deep:true已经能检测到对象内部变化
        this.$nextTick(() => {
          // 强制重新渲染表格以确保汇总行正确显示
          this.forceUpdateSummary()
          // 延迟绑定汇总行事件
          setTimeout(() => {
            this.bindSummaryClicks()
          }, 200)
        })
      },
    },
    // 监听columns变化，当列数变化时重新渲染summary
    columns: {
      deep: true,
      immediate: true,
      handler(newColumns) {
        const currentColumnCount = Array.isArray(newColumns) ? newColumns.length : 0
        // 如果列数发生变化，触发重新渲染
        if (this.lastColumnCount !== 0 && this.lastColumnCount !== currentColumnCount) {
          this.$nextTick(() => {
            // 强制重新渲染汇总行
            this.forceUpdateSummary()
          })
        }
        this.lastColumnCount = currentColumnCount
      },
    },
    // 监听hasColumns计算属性变化，处理v-if切换列的情况
    hasColumns: {
      immediate: true,
      handler(newHasColumns, oldHasColumns) {
        // 当hasColumns从false变为true或从true变为false时，触发重新渲染
        if (oldHasColumns !== undefined && newHasColumns !== oldHasColumns) {
          this.$nextTick(() => {
            this.forceUpdateSummary()
          })
        }
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.bindSummaryClicks()
      this.setupDynamicUnderline()
    })
  },
  updated() {
    // 组件更新后尝试绑定（有 __bindedSummaryClick 防重）
    this.$nextTick(() => {
      this.bindSummaryClicks()
      this.setupDynamicUnderline()
    })

    // 检测DOM结构变化，处理v-if切换列的情况
    this.checkTableStructureChange()
  },
  beforeDestroy() {
    // 解除合计行点击事件委托
    if (this.summaryFooterWrapper && this.summaryClickHandler) {
      this.summaryFooterWrapper.removeEventListener('click', this.summaryClickHandler)
      this.summaryFooterWrapper.__bindedSummaryClick = false
      this.summaryClickHandler = null
      this.summaryFooterWrapper = null
    }
  },
  methods: {
    formatNumberValueOnly,
    getColProps(col) {
      const props = {}
      // 常用属性映射
      if (col.prop) props.prop = col.prop
      if (col.label) props.label = col.label
      if (col.minWidth) props.minWidth = col.minWidth
      if (col.width) props.width = col.width
      if (col.align) props.align = col.align
      if (col.sortable) props.sortable = col.sortable
      if (col.formatter) props.formatter = col.formatter
      if (col.fixed) props.fixed = col.fixed
      if (col.type) props.type = col.type
      if (col['show-overflow-tooltip'] || col.showOverflowTooltip) props['show-overflow-tooltip'] = true
      return props
    },
    // 暴露内部 el-table 引用方法
    getTableRef() {
      return this.$refs.innerTable
    },
    // 行样式类名（高亮选中行）
    rowClassName({ rowIndex }) {
      return rowIndex === this.selectedRowIndex ? 'row-highlight' : ''
    },
    // 行点击事件，仅负责选中高亮
    handleRowClick(row) {
      const rowIndex = this.localData.findIndex((item) => item === row)
      this.selectedRowIndex = rowIndex
    },
    // 表头样式：使省份列不可点击样式（沿用父组件逻辑）
    localHeaderCellStyle(row) {
      if (row.column && row.column.property === 'provName') {
        return { cursor: 'auto !important;' }
      }
    },
    // 汇总单元的单位生成（沿用父组件规则）
    getUnit(value, index) {
      if (index === 0 && value) {
        return '（' + value + '）'
      } else {
        return ''
      }
    },

    // 检测是否应该显示下划线
    shouldShowUnderline(cellElement) {
      if (!cellElement) return false

      const cellText = cellElement.textContent || ''
      const trimmedText = cellText.trim()

      // // 如果值为0，不显示下划线
      // if (trimmedText === '0' || trimmedText === '0.00') {
      //   return false
      // }

      // 如果是时间格式，不显示下划线
      const isTimeString = /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?)?$/.test(trimmedText)
      if (isTimeString) {
        return false
      }

      // 如果是"-"或空值，不显示下划线
      if (trimmedText === '-' || trimmedText === '' || trimmedText === 'null' || trimmedText === 'undefined') {
        return false
      }

      return true
    },

    // 设置动态下划线
    setupDynamicUnderline() {
      const tableEl = this.$refs.innerTable && this.$refs.innerTable.$el
      if (!tableEl) return

      // 获取所有表格单元格中的span元素
      const spans = tableEl.querySelectorAll('td.el-table__cell .cell span')

      spans.forEach((span) => {
        // 移除之前的类名
        span.classList.remove('show-underline')

        // 根据内容判断是否应该显示下划线
        if (this.shouldShowUnderline(span)) {
          span.classList.add('show-underline')
        }
      })
    },
    // 汇总行计算逻辑（依赖父组件 totalRow 作为来源，兜底首行数据）
    localGetSummaries(param) {
      const { columns, data } = param
      // console.log('YwzbTable localGetSummaries called with:', {
      //   columnsLength: columns ? columns.length : 0,
      //   dataLength: data ? data.length : 0,
      //   totalRow: this.totalRow,
      //   hasColumns: Array.isArray(columns) && columns.length > 0
      // })

      // 如果没有列数据，尝试从表格实例获取列信息
      let actualColumns = columns
      if (!Array.isArray(columns) || columns.length === 0) {
        // 尝试从表格实例获取列配置
        if (this.$refs.innerTable && this.$refs.innerTable.columns) {
          actualColumns = this.$refs.innerTable.columns
          // console.log('YwzbTable: 从表格实例获取列数据，长度:', actualColumns.length)
        } else if (this.columns && Array.isArray(this.columns)) {
          // 使用组件的columns属性
          actualColumns = this.columns
          // console.log('YwzbTable: 使用组件columns属性，长度:', actualColumns.length)
        }
      }

      // 如果仍然没有列数据，返回空数组
      if (!Array.isArray(actualColumns) || actualColumns.length === 0) {
        console.log('YwzbTable: 仍然无列数据，返回空数组')
        return []
      }

      const hasTotalRow = !!this.totalRow
      const hasData = Array.isArray(data) && data.length > 0

      if (!hasTotalRow && !hasData) {
        console.log('YwzbTable: 无汇总行数据且无表格数据，返回空数组')
        return new Array(actualColumns.length).fill('')
      }

      // console.log('YwzbTable: 开始计算汇总行，hasTotalRow:', hasTotalRow, 'hasData:', hasData)
      const sums = []

      // 找到第一个有 property 的列索引作为“综合”列位置，之前的列留空
      const labelIndexRaw = Array.isArray(actualColumns) ? actualColumns.findIndex((c) => !!c.property) : 0
      const labelIndex = labelIndexRaw >= 0 ? labelIndexRaw : 0

      const isNumFormatProp = (p) => typeof p === 'string' && p.includes('_num')

      const isFlowFormatProp = (p) => typeof p === 'string' && (p.includes('_traffic') || p.includes('_byte'))

      const isRateFormatProp = (p) => typeof p === 'string' && p.includes('_rate')

      actualColumns.forEach((column, index) => {
        const prop = column.property

        if (index < labelIndex) {
          sums[index] = ''
          return
        }
        if (index === labelIndex) {
          sums[index] = '全国'
          return
        }
        if (!prop) {
          sums[index] = ''
          return
        }

        // 优先从父组件 totalRow 获取汇总数据，否则用首行数据兜底
        const source = this.totalRow || (hasData ? data[0] : {})
        // console.log('YwzbTable: 使用数据源:', source, '属性:', prop)
        const typeKey = `${prop}_type`
        const unit = this.getUnit(source[typeKey], 0)

        // console.log('ywzbTabl->', unit)

        const rawVal = source[prop]
        const isEmptyVal = rawVal === '' || rawVal === null || typeof rawVal === 'undefined'
        if (isEmptyVal) {
          sums[index] = ''
          return
        }
        // 流量Gbps单位处理
        const GbpsKeys = ['d_input_traffic', 'd_output_traffic', 'd_load_traffic']
        const MbpsKey = ['link_traffic', 'pro_traffic']
        const KbpsKey = ['rx_byte', 'tx_byte']
        // 使用外层已声明的 isFlowFormatProp，避免重复定义

        // 判断是否为时间字符串（YYYY-MM-DD 或带时分秒）
        const isTimeString = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2})?)?$/.test(v)
        if (isTimeString(rawVal)) {
          // console.log('isTimeString->rawval', rawVal)
          sums[index] = '-'
          return
        }

        let valueStr = ''
        // 是流速处理属性
        if (isFlowFormatProp(prop)) {
          const inputUnit = GbpsKeys.includes(prop) ? 'gbps' : MbpsKey.includes(prop) ? 'mbps' : KbpsKey.includes(prop) ? 'kbps' : 'kbps'
          valueStr = formatTrafficRate(rawVal, inputUnit, 2)
        }
        // 是数字类型 添加个 单位逻辑
        else if (isNumFormatProp(prop)) {
          const numVal = parseFloat(rawVal)
          valueStr = Number.isFinite(numVal) ? this.formatNumberValueOnly(numVal, 2) : '-'
        }
        // 是百分比类型 添加%
        else if (isRateFormatProp(prop)) {
          valueStr = rawVal + '%'
        } else {
          valueStr = String(rawVal)
        }
        // console.log(`YwzbTable: 列 ${prop} valueStr:`, valueStr)
        // 仅数值型字段追加单位；流量字段已由 formatTrafficRate 自带单位
        const shouldAppendUnit = isNumFormatProp(prop) && parseFloat(rawVal) >= 0 && unit
        sums[index] = shouldAppendUnit ? `${valueStr}${unit}` : valueStr

        // 标记需要添加图标的列，用于后续DOM操作
        if (((shouldAppendUnit || isRateFormatProp(prop)) && unit) || isFlowFormatProp(prop)) {
          const color = source[`${prop}_color`]
          const udFlag = source[`${prop}_udFlag`] // 获取udFlag信息

          // 添加颜色信息到ICON_MARKER标记中
          // const colorInfo = this.getSummaryColor(color)
          // console.log('colorInfo', colorInfo)
          // 将udFlag信息也添加到标记中：displayText|ICON_MARKER|tooltipText|COLOR|colorInfo|UDFLAG|udFlag
          const udFlagInfo = udFlag || ''
          sums[index] = `${valueStr}|ICON_MARKER|${unit.replace(/[（）]/g, '')}|COLOR|${color}|UDFLAG|${udFlagInfo}`
          // console.log(`YwzbTable: 列 ${prop} 添加ICON_MARKER标记:`, sums[index])
        } else {
          // console.log(`YwzbTable: 列 ${prop} 普通值:`, valueStr)
        }
      })

      // console.log('YwzbTable: 计算完成的汇总行数据:', sums)
      return sums
    },

    // 获取汇总行数据的颜色信息
    getSummaryColor(color) {
      // 参考RenderDataCell的颜色逻辑
      const colors = {
        green: '#218939',
        red: '#F9170B',
        default: '#606266',
      }

      if (colors.green === color) {
        return colors.green
      } else if (colors.red === color) {
        return colors.red
      } else {
        return colors.default
      }
    },

    // 获取箭头信息
    getArrowInfo(value, color, udFlag) {
      const colors = {
        green: '#218939',
        red: '#F9170B',
      }

      const udFlagValues = {
        up: 'up',
        down: 'down',
      }

      // 优先使用udFlag来判断箭头显示和方向
      if (udFlag === udFlagValues.up) {
        return {
          show: true,
          icon: 'el-icon-top',
          color: color || colors.green,
        }
      } else if (udFlag === udFlagValues.down) {
        return {
          show: true,
          icon: 'el-icon-bottom',
          color: color || colors.red,
        }
      }

      // 如果没有udFlag，回退到原有的颜色判断逻辑
      const numVal = parseFloat(value)
      if (!Number.isFinite(numVal) || numVal === 0) {
        return { show: false, icon: '', color: '' }
      }

      // if (color === colors.green) {
      //   return {
      //     show: true,
      //     icon: 'el-icon-bottom',
      //     color: colors.green,
      //   }
      // } else if (color === colors.red) {
      //   return {
      //     show: true,
      //     icon: 'el-icon-top',
      //     color: colors.red,
      //   }
      // }

      return { show: false, icon: '', color: '' }
    },
    // 合计行点击事件绑定：在表格底部汇总行上绑定代理，点击对应列映射到属性并上报
    // 创建tooltip元素
    createTooltipElement(tooltipText) {
      const tooltipDiv = document.createElement('div')
      tooltipDiv.className = 'custom-tooltip'
      tooltipDiv.textContent = tooltipText
      tooltipDiv.style.cssText = `
        position: fixed;
        background-color: #303133;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        line-height: 1.2;
        white-space: nowrap;
        z-index: 99999;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                   visibility 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                   transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      `
      return tooltipDiv
    },

    // 创建tooltip箭头元素
    createTooltipArrow() {
      const arrowDiv = document.createElement('div')
      arrowDiv.className = 'custom-tooltip-arrow'
      arrowDiv.style.cssText = `
        position: fixed;
        border: 6px solid transparent;
        border-top-color: #303133;
        z-index: 99999;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                   visibility 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                   transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      `
      return arrowDiv
    },

    // 更新tooltip位置
    updateTooltipPosition(iconElement, tooltipDiv, arrowDiv) {
      const rect = iconElement.getBoundingClientRect()
      const tooltipRect = tooltipDiv.getBoundingClientRect()

      // 计算tooltip位置
      const left = rect.left + rect.width / 2 - tooltipRect.width / 2
      const top = rect.top - tooltipRect.height - 8

      tooltipDiv.style.left = left + 'px'
      tooltipDiv.style.top = top + 'px'

      // 计算箭头位置
      arrowDiv.style.left = rect.left + rect.width / 2 - 6 + 'px'
      arrowDiv.style.top = rect.top - 8 + 'px'
    },

    // 显示tooltip
    showTooltip(tooltipDiv, arrowDiv) {
      setTimeout(() => {
        tooltipDiv.style.opacity = '1'
        tooltipDiv.style.visibility = 'visible'
        arrowDiv.style.opacity = '1'
        arrowDiv.style.visibility = 'visible'
      }, 10)
    },

    // 隐藏tooltip
    hideTooltip(tooltipDiv, arrowDiv) {
      tooltipDiv.style.opacity = '0'
      tooltipDiv.style.visibility = 'hidden'
      arrowDiv.style.opacity = '0'
      arrowDiv.style.visibility = 'hidden'

      // 延迟移除元素，等待动画完成
      setTimeout(() => {
        if (document.body.contains(tooltipDiv)) {
          document.body.removeChild(tooltipDiv)
        }
        if (document.body.contains(arrowDiv)) {
          document.body.removeChild(arrowDiv)
        }
      }, 300)
    },

    // 为图标元素绑定tooltip事件
    // 清理单元格中的事件监听器和DOM元素
    cleanupCellEvents(cell) {
      // 查找并移除所有图标元素的事件监听器
      const iconElements = cell.querySelectorAll('.header-info')
      iconElements.forEach((icon) => {
        // 克隆节点来移除所有事件监听器
        const newIcon = icon.cloneNode(true)
        if (icon.parentNode) {
          icon.parentNode.replaceChild(newIcon, icon)
        }
      })

      // 清理可能残留在body中的tooltip元素
      const existingTooltips = document.body.querySelectorAll('.custom-tooltip')
      const existingArrows = document.body.querySelectorAll('.custom-tooltip-arrow')

      existingTooltips.forEach((tooltip) => {
        if (document.body.contains(tooltip)) {
          document.body.removeChild(tooltip)
        }
      })

      existingArrows.forEach((arrow) => {
        if (document.body.contains(arrow)) {
          document.body.removeChild(arrow)
        }
      })
    },

    // 清理所有单元格的事件和DOM元素
    cleanupAllCellEvents(cells) {
      if (!cells || !cells.length) return

      cells.forEach((cell) => {
        this.cleanupCellEvents(cell)
      })
    },

    // 设置单元格样式（第2-12列加粗并可点击）
    setCellStyles(cells) {
      if (!cells || !cells.length) return

      cells.forEach((cell, index) => {
        if (index >= 1 && index <= 12) {
          cell.style.fontWeight = 'bold'
          cell.style.cursor = 'pointer'
        }
      })
    },

    // 创建图标元素
    createIconElement() {
      const iconElement = document.createElement('i')
      iconElement.className = 'header-info el-icon-info'
      iconElement.style.marginRight = '4px'
      iconElement.style.color = '#b5b2b2'
      iconElement.style.position = 'relative'
      return iconElement
    },

    // 处理带有ICON_MARKER的单元格
    processIconMarkerCells(cells) {
      // console.log('YwzbTable processIconMarkerCells called with cells:', cells.length)
      if (!cells || !cells.length) return

      cells.forEach((cell) => {
        const cellText = cell.textContent || ''
        // console.log(`YwzbTable 处理单元格:`, cellText)
        if (cellText.includes('|ICON_MARKER|')) {
          // console.log(`YwzbTable 发现ICON_MARKER单元格:`, cellText)
          // 先清理该单元格之前的事件和DOM元素（仅针对已处理过的单元格）
          const hasProcessedIcon = cell.querySelector('.header-info')
          if (hasProcessedIcon) {
            this.cleanupCellEvents(cell)
          }

          // 解析新的格式：displayText|ICON_MARKER|tooltipText|COLOR|colorInfo|UDFLAG|udFlag
          const parts = cellText.split('|ICON_MARKER|')
          const displayText = parts[0]
          const remainingParts = parts[1] ? parts[1].split('|COLOR|') : ['', '']
          const tooltipText = remainingParts[0] || ''

          // 进一步解析COLOR和UDFLAG部分
          const colorAndUdFlagParts = remainingParts[1] ? remainingParts[1].split('|UDFLAG|') : ['', '']
          const colorInfo = colorAndUdFlagParts[0] || '#606266'
          const udFlagInfo = colorAndUdFlagParts[1] || ''

          // 清空原内容并重新构建
          cell.innerHTML = ''

          // 创建主容器，参考RenderDataCell的结构
          const mainContainer = document.createElement('div')
          mainContainer.className = 'render-data-cell'
          mainContainer.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            padding: 0 8px;
          `

          // 创建文本容器
          const textContainer = document.createElement('div')
          textContainer.style.display = 'inline-flex'
          textContainer.style.alignItems = 'center'

          // 创建信息图标元素
          const iconElement = this.createIconElement()
          // 绑定tooltip事件
          this.bindTooltipEvents(iconElement, tooltipText)
          textContainer.appendChild(iconElement)

          // 创建文本节点，应用动态颜色
          const textSpan = document.createElement('span')
          textSpan.className = 'data-value'
          textSpan.textContent = displayText
          textSpan.style.color = colorInfo
          textSpan.style.cursor = 'pointer'
          textContainer.appendChild(textSpan)

          mainContainer.appendChild(textContainer)

          // 获取箭头信息并添加箭头
          const arrowInfo = this.getArrowInfo(displayText, colorInfo, udFlagInfo)
          if (arrowInfo.show) {
            const arrowElement = document.createElement('i')
            arrowElement.className = `arrow-icon ${arrowInfo.icon}`
            arrowElement.style.cssText = `
              position: absolute;
              right: -6px;
              top: 50%;
              transform: translateY(-50%);
              color: ${arrowInfo.color};
            `
            mainContainer.appendChild(arrowElement)
          }

          cell.appendChild(mainContainer)
        }
      })
    },

    // 创建事件处理器
    createSummaryClickHandler(propertyList) {
      return (event) => {
        const targetCell = event.target.closest('.el-table__cell') || event.target.closest('.cell') || event.target.closest('td')
        if (!targetCell) return
        const td = targetCell.closest('td') || targetCell
        const tr = td && td.parentNode
        if (!tr) return
        const columnIndex = Array.from(tr.children).indexOf(td)
        if (columnIndex === -1) return
        const prop = propertyList[columnIndex] || ''
        if (prop) {
          this.$emit('summary-click', prop)
        }
      }
    },

    // 绑定合计行点击事件
    bindSummaryClickEvent(footerWrapper, elTable) {
      // 构建列属性列表用于映射
      const columns = (elTable && elTable.store && elTable.store.states && elTable.store.states.columns) || []
      const propertyList = columns.map((c) => (c && (c.property || c.prop)) || '')

      // 创建事件处理器
      this.summaryClickHandler = this.createSummaryClickHandler(propertyList)

      // 绑定事件
      footerWrapper.addEventListener('click', this.summaryClickHandler)
      footerWrapper.__bindedSummaryClick = true
      this.summaryFooterWrapper = footerWrapper
    },

    // 强制重新渲染汇总行
    forceUpdateSummary() {
      // console.log('YwzbTable: forceUpdateSummary called, totalRow:', this.totalRow)
      // 完全重建summary行，不依赖清理机制
      this.$nextTick(() => {
        if (this.$refs.innerTable) {
          // console.log('YwzbTable: 开始强制更新汇总行')

          // 1. 强制触发表格重新计算汇总行
          this.$refs.innerTable.$forceUpdate()

          // 2. 触发表格的doLayout方法重新计算布局
          this.$refs.innerTable.doLayout()

          // 3. 强制重新设置summary-method
          this.$refs.innerTable.summaryMethod = this.localGetSummaries

          // 4. 延迟重建summary行，确保DOM已更新
          setTimeout(() => {
            // console.log('YwzbTable: 延迟重建汇总行')
            this.rebuildSummaryRow()

            // 5. 再次强制更新确保变更生效
            this.$refs.innerTable.$forceUpdate()
          }, 100)
        }
      })
    },

    // 完全重建summary行
    rebuildSummaryRow() {
      try {
        const elTable = this.getTableRef()
        const tableEl = elTable && elTable.$el
        const footerWrapper = tableEl && tableEl.querySelector('.el-table__footer-wrapper')
        if (!footerWrapper) return

        // 获取所有summary单元格
        const cells = tableEl.querySelectorAll('.el-table__footer-wrapper td .cell')
        if (!cells || !cells.length) return

        // 获取原始的summary数据
        const summaryData = this.getSummaryData()
        if (!summaryData || !summaryData.length) return

        // 使用原始数据重建每个单元格
        cells.forEach((cell, index) => {
          if (index < summaryData.length) {
            const originalText = summaryData[index]
            // console.log('originalText', originalText)
            if (originalText && originalText.includes('|ICON_MARKER|')) {
              this.rebuildIconMarkerCell(cell, originalText)
            } else {
              // 对于不包含ICON_MARKER的单元格，直接设置文本内容
              cell.textContent = originalText || ''
            }
          }
        })

        // 设置单元格样式
        this.setCellStyles(cells)

        // 重新绑定合计行点击事件
        this.rebindSummaryClickEvent(footerWrapper)
      } catch (e) {
        // 静默失败，避免影响正常渲染
        console.warn('rebuildSummaryRow failed:', e)
      }
    },

    // 获取原始的summary数据
    getSummaryData() {
      try {
        // 直接调用localGetSummaries方法获取原始数据
        const elTable = this.getTableRef()
        if (elTable && elTable.store && elTable.store.states) {
          const { data } = elTable.store.states
          if (data && data.length > 0) {
            // 直接调用localGetSummaries获取包含ICON_MARKER的原始数据
            const summaryResult = this.localGetSummaries({ columns: this.columns, data })
            return Array.isArray(summaryResult) ? summaryResult : []
          }
        }

        // 如果无法获取到数据，返回空数组
        return []
      } catch (e) {
        console.warn('getSummaryData failed:', e)
        return []
      }
    },

    // 重建包含ICON_MARKER的单元格
    rebuildIconMarkerCell(cell, cellText) {
      // 解析新的格式：displayText|ICON_MARKER|tooltipText|COLOR|colorInfo|UDFLAG|udFlag
      const parts = cellText.split('|ICON_MARKER|')
      const displayText = parts[0]
      const remainingParts = parts[1] ? parts[1].split('|COLOR|') : ['', '']
      const tooltipText = remainingParts[0] || ''

      // 进一步解析COLOR和UDFLAG部分
      const colorAndUdFlagParts = remainingParts[1] ? remainingParts[1].split('|UDFLAG|') : ['', '']
      const colorInfo = colorAndUdFlagParts[0] || '#606266'
      const udFlagInfo = colorAndUdFlagParts[1] || ''

      // 完全清空并重建单元格内容
      cell.innerHTML = ''

      // 创建主容器，参考RenderDataCell的结构
      const mainContainer = document.createElement('div')
      mainContainer.className = 'render-data-cell'
      mainContainer.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 0 8px;
      `
      // 创建文本容器
      const textContainer = document.createElement('div')
      textContainer.style.display = 'inline-flex'
      textContainer.style.alignItems = 'center'

      // 创建文本节点，应用动态颜色
      const textSpan = document.createElement('span')
      textSpan.className = 'data-value'
      textSpan.textContent = displayText
      textSpan.style.color = colorInfo
      textSpan.style.cursor = 'pointer'
      textContainer.appendChild(textSpan)

      // 创建信息图标元素
      const iconElement = this.createIconElement()
      // 绑定tooltip事件
      this.bindTooltipEvents(iconElement, tooltipText)
      textContainer.appendChild(iconElement)

      mainContainer.appendChild(textContainer)

      // 获取箭头信息并添加箭头
      const arrowInfo = this.getArrowInfo(displayText, colorInfo, udFlagInfo)
      if (arrowInfo.show) {
        const arrowElement = document.createElement('i')
        arrowElement.className = `arrow-icon ${arrowInfo.icon}`
        arrowElement.style.cssText = `
          position: absolute;
          right: -2px;
          top: 50%;
          transform: translateY(-50%);
          color: ${arrowInfo.color};
        `
        mainContainer.appendChild(arrowElement)
      }

      cell.appendChild(mainContainer)
    },

    // 重新绑定summary点击事件
    rebindSummaryClickEvent(footerWrapper) {
      // 移除旧的事件标记和监听器
      if (footerWrapper.__bindedSummaryClick) {
        footerWrapper.removeEventListener('click', footerWrapper.__summaryClickHandler)
        footerWrapper.__bindedSummaryClick = false
      }

      // 获取属性列表
      const propertyList = this.columns.map((col) => col.prop || '')

      // 创建新的事件处理器
      const clickHandler = this.createSummaryClickHandler(propertyList)

      // 绑定新的事件监听器
      footerWrapper.addEventListener('click', clickHandler)
      footerWrapper.__summaryClickHandler = clickHandler
      footerWrapper.__bindedSummaryClick = true
    },

    // 检测表格结构变化
    checkTableStructureChange() {
      if (!this.$refs.innerTable) return

      const elTable = this.$refs.innerTable
      const tableEl = elTable.$el
      if (!tableEl) return

      // 检测当前表格的列数
      const headerCells = tableEl.querySelectorAll('.el-table__header-wrapper th')
      const currentDOMColumnCount = headerCells.length

      // 如果DOM中的列数与记录的不一致，说明发生了v-if切换
      if (this.lastDOMColumnCount !== currentDOMColumnCount) {
        this.$nextTick(() => {
          this.forceUpdateSummary()
        })
      }

      this.lastDOMColumnCount = currentDOMColumnCount
    },

    bindTooltipEvents(iconElement, tooltipText) {
      const tooltipDiv = this.createTooltipElement(tooltipText)
      const arrowDiv = this.createTooltipArrow()

      iconElement.addEventListener('mouseenter', () => {
        // 先添加到body以便计算尺寸
        document.body.appendChild(tooltipDiv)
        document.body.appendChild(arrowDiv)

        // 更新位置
        this.updateTooltipPosition(iconElement, tooltipDiv, arrowDiv)

        // 显示tooltip
        this.showTooltip(tooltipDiv, arrowDiv)
      })

      iconElement.addEventListener('mouseleave', () => {
        this.hideTooltip(tooltipDiv, arrowDiv)
      })
    },

    bindSummaryClicks() {
      try {
        const elTable = this.getTableRef()
        const tableEl = elTable && elTable.$el
        const footerWrapper = tableEl && tableEl.querySelector('.el-table__footer-wrapper')

        if (!footerWrapper) {
          // 如果汇总行DOM还没有渲染，延迟重试
          setTimeout(() => {
            this.bindSummaryClicks()
          }, 100)
          return
        }

        // 避免重复绑定
        if (footerWrapper.__bindedSummaryClick) {
          // console.log('YwzbTable: 已绑定过汇总行事件，跳过')
          return
        }

        // 获取所有单元格
        const cells = tableEl.querySelectorAll('.el-table__footer-wrapper td .cell')
        // console.log('YwzbTable: 找到汇总行单元格数量:', cells.length)

        // 设置单元格样式
        this.setCellStyles(cells)

        // 处理带有图标标记的单元格
        this.processIconMarkerCells(cells)

        // 绑定合计行点击事件
        this.bindSummaryClickEvent(footerWrapper, elTable)
      } catch (e) {
        console.warn('YwzbTable bindSummaryClicks failed:', e)
        // 静默失败，避免影响正常渲染
        // console.warn('bindSummaryClicks failed:', e)
      }
    },
    // 排序变化：沿用父组件服务端排序逻辑
    handleSortChange({ prop, order }) {
      // 排序被清空或无有效字段时不触发
      if (!prop || !order) return
      // const camelToSnake = (str) => str.replace(/([A-Z])/g, '_$1').toLowerCase()

      // console.log('handleSortChange orderFile', camelToSnake(prop), prop)
      const orderFile = String(prop)
      const orderType = order === 'ascending' ? 'asc' : 'desc'
      const key = `${orderFile}_${orderType}`
      if (this.lastSortKey === key) return
      this.lastSortKey = key
      this.$emit('sort-change', { orderFile, orderType })
    },
  },
}
</script>

<style lang="scss" scoped>
// 行高亮样式
::v-deep .row-highlight {
  background-color: #ecf5ff !important;

  &:hover {
    background-color: #d9ecff !important;
  }

  td {
    background-color: inherit !important;
  }
}
// 鼠标悬停单元格时，根据内容动态添加下划线（span）
::v-deep td.el-table__cell:hover .cell span {
  text-decoration: none;
}

::v-deep td.el-table__cell:hover .cell span.show-underline {
  text-decoration: underline;
}

// 汇总行单元格样式统一，确保背景高度一致
::v-deep .el-table__footer-wrapper .el-table__cell {
  height: 36px !important;
  line-height: 24px !important;
  padding: 6px 5px !important;
  vertical-align: middle;
}

// 固定列汇总行tr高度统一
::v-deep .el-table__fixed-footer-wrapper tr {
  height: 36px !important;
}

// 固定列汇总行td高度统一 - 使用更高优先级的选择器
::v-deep .el-table__fixed-footer-wrapper .el-table__cell {
  height: 36px !important;
  line-height: 24px !important;
  padding: 5px !important;
  vertical-align: middle;
  box-sizing: border-box !important;
  max-height: 36px !important;
  min-height: 36px !important;
}

// 固定列汇总行内部cell容器高度限制
::v-deep .el-table__fixed-footer-wrapper .el-table__cell .cell {
  height: 24px !important;
  line-height: 24px !important;
  max-height: 24px !important;
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

// 汇总行单元格flex布局，让内容在一行显示
::v-deep .el-table__footer-wrapper .el-table__cell .cell {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
}

// 汇总行图标样式优化
::v-deep .el-table__footer-wrapper .header-info {
  color: #409eff;
  margin-left: 4px;
  // cursor: help;
  font-size: 14px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: #66b1ff;
  }
}

// 右固定列样式修复，确保完全覆盖到最右侧
::v-deep .el-table__fixed-right {
  right: 0 !important;
  z-index: 3 !important;
}

// ::v-deep .el-table__fixed-right::after,
// .el-table__fixed::after {
//   background-color: #bbc1c6;
// }

// 右固定列表头样式
::v-deep .el-table__fixed-right .el-table__fixed-header-wrapper {
  right: 0 !important;
}

// 右固定列表体样式
::v-deep .el-table__fixed-right .el-table__fixed-body-wrapper {
  right: 0 !important;
}

// 右固定列汇总行样式
::v-deep .el-table__fixed-right .el-table__fixed-footer-wrapper {
  right: 0 !important;
}
</style>
