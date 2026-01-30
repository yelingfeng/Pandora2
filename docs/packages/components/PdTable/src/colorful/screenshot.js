import dayjs from 'dayjs'
import html2canvas from 'html2canvas'

/**
 * 表格截图工具类
 */
class TableScreenshot {
  /**
   * 获取表格元素
   * @param {Object} tableRef - 表格组件引用
   * @returns {HTMLElement|null} 表格DOM元素
   */
  static getTableElement(tableRef) {
    const legacy =
      tableRef && tableRef.$refs && tableRef.$refs.innerTable && tableRef.$refs.innerTable.$el
    return legacy || this.resolveTableElement(tableRef)
  }

  static resolveTableElement(source) {
    if (!source) return null
    const el =
      source instanceof HTMLElement
        ? source
        : source.$el instanceof HTMLElement
          ? source.$el
          : null
    if (!el) return null
    if (el.classList && el.classList.contains('el-table')) return el
    return el.querySelector ? el.querySelector('.el-table') : null
  }

  /**
   * 识别并处理固定右侧区域的操作列
   * @param {Element} tableElement - 表格元素
   * @param {Array} actionColumnElements - 操作列元素数组
   * @param {Array} actionColumnDisplays - 操作列显示状态数组
   */
  static processFixedRightActionColumns(tableElement, actionColumnElements, actionColumnDisplays) {
    const fixedRightWrapper = tableElement.querySelector('.el-table__fixed-right')
    if (!fixedRightWrapper) return

    const fixedActionColumns = fixedRightWrapper.querySelectorAll('.el-table__fixed-header-wrapper th')
    fixedActionColumns.forEach((th) => {
      const cellContent = th.querySelector('.cell')
      const label = cellContent ? cellContent.textContent.trim() : th.textContent.trim()

      // 首先检查是否为业务数据列
      const businessDataKeywords = [
        '率',
        '数据',
        '统计',
        '计数',
        '总数',
        '平均',
        '最大',
        '最小',
        '百分比',
        '%',
        '比例',
        '时间',
        '日期',
        '状态',
        '类型',
        '名称',
        '编号',
        'ID',
        'id',
      ]
      const isBusinessDataColumn = businessDataKeywords.some((keyword) => label.includes(keyword))

      if (isBusinessDataColumn) {
        return // 跳过业务数据列
      }

      // 检查表头是否为纯粹的操作列
      const isOperationHeader = label === '操作' || label === '操作列' || label === 'Action' || label === 'Actions'

      if (!isOperationHeader) {
        return // 跳过非操作列
      }

      // 检查固定列的表体是否包含操作按钮
      const colIndex = Array.from(th.parentNode.children).indexOf(th)
      const firstBodyCell = fixedRightWrapper.querySelector(`.el-table__fixed-body-wrapper tbody tr td:nth-child(${colIndex + 1})`)
      const hasActionButton =
        firstBodyCell &&
        (firstBodyCell.querySelector('.el-button') ||
          firstBodyCell.querySelector('button') ||
          firstBodyCell.querySelector('[class*="button"]') ||
          firstBodyCell.querySelector('a[href]') ||
          firstBodyCell.querySelector('[class*="link"]') ||
          firstBodyCell.querySelector('a'))

      // 检查是否包含操作相关关键字
      const operationKeywords = ['跳转', '编辑', '删除', '查看', '详情', '操作', '修改', '新增', '添加', '移除', '管理', '设置', '配置']
      const cellText = firstBodyCell ? firstBodyCell.textContent.trim() : ''
      const hasOperationKeyword = operationKeywords.some((keyword) => cellText.includes(keyword))

      // 必须同时满足表头为操作列且数据包含操作内容
      if (isOperationHeader && (hasActionButton || hasOperationKeyword)) {
        // 获取固定列的表头和表体列
        const headerCol = th
        const bodyCols = fixedRightWrapper.querySelectorAll(`.el-table__fixed-body-wrapper tbody tr td:nth-child(${colIndex + 1})`)

        actionColumnElements.push({
          header: headerCol,
          bodyCells: Array.from(bodyCols),
          type: 'fixed-right',
          fixedWrapper: fixedRightWrapper,
        })

        // 保存原始显示状态
        actionColumnDisplays.push({
          headerDisplay: headerCol.style.display,
          bodyDisplays: Array.from(bodyCols).map((cell) => cell.style.display),
          fixedWrapperDisplay: fixedRightWrapper.style.display,
          type: 'fixed-right',
        })
      }
    })
  }

  /**
   * 处理固定右侧区域的操作列
   * @param {Element} tableElement - 表格元素
   */
  static hideFixedRightActionColumns(tableElement) {
    const fixedRightWrapper = tableElement.querySelector('.el-table__fixed-right')
    if (!fixedRightWrapper) {
      return
    }

    // 获取固定右侧区域的表头行（可能有多行）
    const fixedHeaderRows = fixedRightWrapper.querySelectorAll('.el-table__fixed-header-wrapper thead tr')

    if (fixedHeaderRows.length === 0) {
      return
    }

    // 获取固定右侧区域的表体行
    const fixedBodyRows = fixedRightWrapper.querySelectorAll('.el-table__fixed-body-wrapper tbody tr')

    if (fixedBodyRows.length === 0) {
      return
    }

    // 获取第一行表体的所有单元格，用于确定实际列数
    const firstBodyRow = fixedBodyRows[0]
    const firstRowCells = firstBodyRow.querySelectorAll('td')
    const actualColumnCount = firstRowCells.length

    // 检查每一列是否为操作列
    let hasOperationColumn = false

    for (let colIndex = 0; colIndex < actualColumnCount; colIndex++) {
      // 查找对应的表头单元格
      const headerCell = TableScreenshot.findHeaderCellForColumn(fixedHeaderRows, colIndex)
      if (!headerCell) {
        continue
      }

      const label = headerCell.textContent.trim()

      // 首先检查是否为业务数据列
      const businessDataKeywords = [
        '率',
        '数据',
        '统计',
        '计数',
        '总数',
        '平均',
        '最大',
        '最小',
        '百分比',
        '%',
        '比例',
        '时间',
        '日期',
        '状态',
        '类型',
        '名称',
        '编号',
        'ID',
        'id',
      ]
      const isBusinessDataColumn = businessDataKeywords.some((keyword) => label.includes(keyword))

      if (isBusinessDataColumn) {
        continue
      }

      // 检查表头是否为纯粹的操作列
      const isOperationHeader = label === '操作' || label === '操作列' || label === 'Action' || label === 'Actions'

      if (!isOperationHeader) {
        continue
      }

      // 检查固定列的表体是否包含操作按钮
      const firstBodyCell = firstRowCells[colIndex]

      const hasActionButton =
        firstBodyCell &&
        (firstBodyCell.querySelector('.el-button') ||
          firstBodyCell.querySelector('button') ||
          firstBodyCell.querySelector('[class*="button"]') ||
          firstBodyCell.querySelector('a[href]') ||
          firstBodyCell.querySelector('[class*="link"]') ||
          firstBodyCell.querySelector('a'))

      // 检查是否包含操作相关关键字
      const operationKeywords = ['跳转', '编辑', '删除', '查看', '详情', '操作', '修改', '新增', '添加', '移除', '管理', '设置', '配置']
      const cellText = firstBodyCell ? firstBodyCell.textContent.trim() : ''
      const hasOperationKeyword = operationKeywords.some((keyword) => cellText.includes(keyword))

      // 必须同时满足表头为操作列且数据包含操作内容
      if (isOperationHeader && (hasActionButton || hasOperationKeyword)) {
        hasOperationColumn = true
        break // 找到一个操作列就足够了
      }
    }

    // 如果找到操作列，隐藏整个固定右侧区域
    if (hasOperationColumn) {
      fixedRightWrapper.style.display = 'none'
    }
  }

  /**
   * 识别并收集操作列信息
   * @param {HTMLElement} tableElement - 表格元素
   * @returns {Array} 操作列信息数组
   */
  /**
   * 查找指定列对应的表头单元格（考虑跨行跨列）
   * @param {NodeList} headerRows - 表头行集合
   * @param {number} targetColIndex - 目标列索引
   * @returns {HTMLElement|null} 对应的表头单元格
   */
  static findHeaderCellForColumn(headerRows, targetColIndex) {
    // 从最后一行表头开始查找（通常是叶子节点表头）
    for (let rowIndex = headerRows.length - 1; rowIndex >= 0; rowIndex--) {
      const headerRow = headerRows[rowIndex]
      const headerCells = headerRow.querySelectorAll('th')

      let currentColIndex = 0

      for (let cellIndex = 0; cellIndex < headerCells.length; cellIndex++) {
        const cell = headerCells[cellIndex]
        const colspan = parseInt(cell.getAttribute('colspan') || '1')
        const rowspan = parseInt(cell.getAttribute('rowspan') || '1')

        // 检查目标列是否在当前单元格的跨列范围内
        if (targetColIndex >= currentColIndex && targetColIndex < currentColIndex + colspan) {
          // 如果是跨行单元格，需要检查是否跨到了最后一行
          if (rowspan > 1) {
            const cellEndRow = rowIndex + rowspan - 1
            const lastHeaderRowIndex = headerRows.length - 1

            // 如果跨行单元格延伸到最后一行，则认为找到了对应的表头
            if (cellEndRow >= lastHeaderRowIndex) {
              return cell
            }
          } else if (rowIndex === headerRows.length - 1) {
            // 如果是最后一行的普通单元格，直接返回
            return cell
          }
        }

        currentColIndex += colspan
      }
    }

    return null
  }

  static identifyActionColumns(tableElement) {
    const actionColumns = []

    // 获取表头行（可能有多行表头）
    const headerRows = tableElement.querySelectorAll('.el-table__header-wrapper thead tr')

    if (headerRows.length === 0) {
      return actionColumns
    }

    // 获取表体行
    const bodyRows = tableElement.querySelectorAll('.el-table__body-wrapper tbody tr')
    if (bodyRows.length === 0) {
      return actionColumns
    }

    // 获取第一行表体的所有单元格，用于确定实际列数
    const firstBodyRow = bodyRows[0]
    const firstRowCells = firstBodyRow.querySelectorAll('td')
    const actualColumnCount = firstRowCells.length

    // 遍历每一列，检查是否为操作列
    for (let colIndex = 0; colIndex < actualColumnCount; colIndex++) {
      // 步骤1: 查找对应的表头单元格，检查是否包含"操作"
      let headerCell = null
      let headerText = ''
      let hasOperationHeader = false

      // 改进的表头查找逻辑：考虑跨行跨列的情况
      headerCell = TableScreenshot.findHeaderCellForColumn(headerRows, colIndex)
      if (headerCell) {
        headerText = headerCell.textContent.trim()
      }

      if (!headerText) {
        continue
      }

      // 首先检查是否为业务数据列，如果是则直接跳过
      const businessDataKeywords = [
        '率',
        '数据',
        '统计',
        '计数',
        '总数',
        '平均',
        '最大',
        '最小',
        '百分比',
        '%',
        '比例',
        '时间',
        '日期',
        '状态',
        '类型',
        '名称',
        '编号',
        'ID',
        'id',
      ]
      const isBusinessDataColumn = businessDataKeywords.some((keyword) => headerText.includes(keyword))

      if (isBusinessDataColumn) {
        continue
      }

      // 检查表头是否为纯粹的"操作"列（更严格的判断）
      hasOperationHeader = headerText === '操作' || headerText === '操作列' || headerText === 'Action' || headerText === 'Actions'

      if (!hasOperationHeader) {
        continue
      }

      // 步骤2: 表头存在操作列，验证数据内容（优化：从第1行开始，但优先检查后面的行）
      let hasOperationData = false

      // 优化：检查所有行，但从后面的行开始（更可能包含实际数据）
      const checkRowIndices = []

      // 如果有足够的行，优先检查第3行之后的数据
      if (bodyRows.length >= 3) {
        // 从第3行开始检查
        for (let i = 2; i < Math.min(bodyRows.length, 7); i++) {
          checkRowIndices.push(i)
        }
      }

      // 如果前面没有找到，再检查前面的行
      if (checkRowIndices.length === 0 || bodyRows.length < 3) {
        for (let i = 0; i < Math.min(bodyRows.length, 5); i++) {
          if (!checkRowIndices.includes(i)) {
            checkRowIndices.push(i)
          }
        }
      }

      for (const rowIndex of checkRowIndices) {
        const bodyRow = bodyRows[rowIndex]
        const bodyCells = bodyRow.querySelectorAll('td')
        const correspondingBodyCell = bodyCells[colIndex]

        if (correspondingBodyCell) {
          const cellText = correspondingBodyCell.textContent.trim()

          // 检查是否包含操作按钮
          const hasButton =
            correspondingBodyCell.querySelector('.el-button') ||
            correspondingBodyCell.querySelector('button') ||
            correspondingBodyCell.querySelector('[class*="button"]') ||
            correspondingBodyCell.querySelector('a[href]') ||
            correspondingBodyCell.querySelector('[class*="link"]') ||
            correspondingBodyCell.querySelector('a') // 添加普通链接检查

          // 检查是否包含操作相关关键字（扩展关键字列表）
          const operationKeywords = ['跳转', '编辑', '删除', '查看', '详情', '操作', '修改', '新增', '添加', '移除', '管理', '设置', '配置']
          const hasOperationKeyword = operationKeywords.some((keyword) => cellText.includes(keyword))

          if (hasButton || hasOperationKeyword) {
            hasOperationData = true
            break
          }
        }
      }

      // 步骤3: 必须同时满足表头为操作列且数据内容确实包含操作相关内容，才认为是操作列
      if (hasOperationHeader && hasOperationData) {
        // 获取所有对应的表体列（所有行的该列）
        const allBodyCells = []
        bodyRows.forEach((row) => {
          const cells = row.querySelectorAll('td')
          const cell = cells[colIndex]
          if (cell) {
            allBodyCells.push(cell)
          }
        })

        actionColumns.push({
          header: headerCell,
          bodyCells: allBodyCells,
          headerIndex: colIndex,
          type: 'normal',
        })
      }
    }

    return actionColumns
  }

  /**
   * 保存表格原始样式
   * @param {HTMLElement} tableElement - 表格元素
   * @param {HTMLElement} tableWrapper - 表格包装器
   * @param {HTMLElement} tableBody - 表格主体
   * @param {HTMLElement} tableHeader - 表格头部
   * @returns {Object} 原始样式对象
   */
  static saveOriginalStyles(tableElement, tableWrapper, tableBody, tableHeader) {
    const actionColumnDisplays = []

    // 使用封装的方法识别操作列
    const actionColumnElements = this.identifyActionColumns(tableElement)

    // 只保存操作列的原始样式，不在这里隐藏
    actionColumnElements.forEach((columnInfo) => {
      // 保存原始显示状态
      actionColumnDisplays.push({
        headerDisplay: columnInfo.header.style.display,
        bodyDisplays: columnInfo.bodyCells.map((cell) => cell.style.display),
        type: columnInfo.type,
      })
    })

    // 处理固定右侧区域的操作列
    this.processFixedRightActionColumns(tableElement, actionColumnElements, actionColumnDisplays)

    return {
      tableHeight: tableElement.style.height,
      tableMaxHeight: tableElement.style.maxHeight,
      tableWidth: tableElement.style.width,
      tableMaxWidth: tableElement.style.maxWidth,
      wrapperHeight: tableWrapper && tableWrapper.style.height,
      wrapperMaxHeight: tableWrapper && tableWrapper.style.maxHeight,
      wrapperWidth: tableWrapper && tableWrapper.style.width,
      wrapperMaxWidth: tableWrapper && tableWrapper.style.maxWidth,
      bodyHeight: tableBody && tableBody.style.height,
      bodyMaxHeight: tableBody && tableBody.style.maxHeight,
      bodyWidth: tableBody && tableBody.style.width,
      bodyMaxWidth: tableBody && tableBody.style.maxWidth,
      bodyOverflow: tableBody && tableBody.style.overflow,
      bodyOverflowX: tableBody && tableBody.style.overflowX,
      bodyOverflowY: tableBody && tableBody.style.overflowY,
      headerOverflow: tableHeader && tableHeader.style.overflow,
      headerOverflowX: tableHeader && tableHeader.style.overflowX,
      scrollTop: (tableBody && tableBody.scrollTop) || 0,
      scrollLeft: (tableBody && tableBody.scrollLeft) || 0,
      headerScrollLeft: (tableHeader && tableHeader.scrollLeft) || 0,
      // 保存操作列信息
      actionColumnElements,
      actionColumnDisplays,
    }
  }

  /**
   * 计算表格实际内容尺寸
   * @param {HTMLElement} tableElement - 表格元素
   * @returns {Object} 尺寸信息
   */
  static calculateTableDimensions(tableElement) {
    const tableInner = tableElement.querySelector('.el-table__body tbody')
    const headerElement = tableElement.querySelector('.el-table__header')
    const footerElement = tableElement.querySelector('.el-table__footer')

    const actualContentHeight = tableInner ? tableInner.scrollHeight : 0
    const actualContentWidth = tableInner ? tableInner.scrollWidth : tableElement.scrollWidth
    const headerHeight = headerElement ? headerElement.offsetHeight : 0
    const footerHeight = footerElement ? footerElement.offsetHeight : 0

    const totalHeight = headerHeight + actualContentHeight + footerHeight + 20
    const totalWidth = Math.max(actualContentWidth, tableElement.offsetWidth)

    return {
      actualContentHeight,
      actualContentWidth,
      headerHeight,
      footerHeight,
      totalHeight,
      totalWidth,
    }
  }

  /**
   * 设置表格展开样式
   * @param {HTMLElement} tableElement - 表格元素
   * @param {HTMLElement} tableWrapper - 表格包装器
   * @param {HTMLElement} tableBody - 表格主体
   * @param {HTMLElement} tableHeader - 表格头部
   * @param {Object} dimensions - 尺寸信息
   * @param {Object} originalStyles - 原始样式（包含操作列信息）
   */
  static setExpandedStyles(tableElement, tableWrapper, tableBody, tableHeader, dimensions, originalStyles) {
    const { totalHeight, totalWidth, actualContentHeight } = dimensions

    // 隐藏操作列
    if (originalStyles.actionColumnElements) {
      originalStyles.actionColumnElements.forEach((columnInfo) => {
        if (columnInfo.type === 'fixed-right') {
          // 对于固定右侧列，隐藏整个固定区域
          if (columnInfo.fixedWrapper) {
            columnInfo.fixedWrapper.style.display = 'none'
          }
        } else {
          // 对于普通列，隐藏表头和表体单元格
          if (columnInfo.header) {
            columnInfo.header.style.display = 'none'
          }
          columnInfo.bodyCells.forEach((cell) => {
            cell.style.display = 'none'
          })
        }
      })
    }

    // 强制表格显示所有内容（横向和纵向）
    if (tableElement) {
      tableElement.style.height = totalHeight + 'px'
      tableElement.style.maxHeight = 'none'
      tableElement.style.width = totalWidth + 'px'
      tableElement.style.maxWidth = 'none'
    }

    if (tableWrapper) {
      tableWrapper.style.height = totalHeight + 'px'
      tableWrapper.style.maxHeight = 'none'
      tableWrapper.style.width = totalWidth + 'px'
      tableWrapper.style.maxWidth = 'none'
    }

    if (tableBody) {
      tableBody.style.height = actualContentHeight + 10 + 'px'
      tableBody.style.maxHeight = 'none'
      tableBody.style.width = totalWidth + 'px'
      tableBody.style.maxWidth = 'none'
      tableBody.style.overflow = 'visible'
      tableBody.style.overflowX = 'visible'
      tableBody.style.overflowY = 'visible'
      tableBody.scrollTop = 0
      tableBody.scrollLeft = 0
    }

    if (tableHeader) {
      tableHeader.style.overflow = 'visible'
      tableHeader.style.overflowX = 'visible'
      tableHeader.scrollLeft = 0
    }
  }

  /**
   * 恢复表格原始样式
   * @param {HTMLElement} tableElement - 表格元素
   * @param {HTMLElement} tableWrapper - 表格包装器
   * @param {HTMLElement} tableBody - 表格主体
   * @param {HTMLElement} tableHeader - 表格头部
   * @param {Object} originalStyles - 原始样式
   */
  static restoreOriginalStyles(tableElement, tableWrapper, tableBody, tableHeader, originalStyles) {
    // 恢复操作列显示
    if (originalStyles.actionColumnElements && originalStyles.actionColumnDisplays) {
      originalStyles.actionColumnElements.forEach((columnInfo, index) => {
        const displayInfo = originalStyles.actionColumnDisplays[index]

        if (columnInfo.type === 'fixed-right') {
          // 对于固定右侧列，恢复整个固定区域的显示
          if (columnInfo.fixedWrapper && displayInfo) {
            columnInfo.fixedWrapper.style.display = displayInfo.fixedWrapperDisplay || ''
          }
        } else {
          // 对于普通列，恢复表头和表体单元格显示
          if (columnInfo.header && displayInfo) {
            columnInfo.header.style.display = displayInfo.headerDisplay || ''
          }

          columnInfo.bodyCells.forEach((cell, cellIndex) => {
            if (displayInfo && displayInfo.bodyDisplays && displayInfo.bodyDisplays[cellIndex] !== undefined) {
              cell.style.display = displayInfo.bodyDisplays[cellIndex] || ''
            } else {
              cell.style.display = ''
            }
          })
        }
      })
    }

    if (tableElement) {
      tableElement.style.height = originalStyles.tableHeight || ''
      tableElement.style.maxHeight = originalStyles.tableMaxHeight || ''
      tableElement.style.width = originalStyles.tableWidth || ''
      tableElement.style.maxWidth = originalStyles.tableMaxWidth || ''
    }

    if (tableWrapper) {
      tableWrapper.style.height = originalStyles.wrapperHeight || ''
      tableWrapper.style.maxHeight = originalStyles.wrapperMaxHeight || ''
      tableWrapper.style.width = originalStyles.wrapperWidth || ''
      tableWrapper.style.maxWidth = originalStyles.wrapperMaxWidth || ''
    }

    if (tableBody) {
      tableBody.style.height = originalStyles.bodyHeight || ''
      tableBody.style.maxHeight = originalStyles.bodyMaxHeight || ''
      tableBody.style.width = originalStyles.bodyWidth || ''
      tableBody.style.maxWidth = originalStyles.bodyMaxWidth || ''
      tableBody.style.overflow = originalStyles.bodyOverflow || ''
      tableBody.style.overflowX = originalStyles.bodyOverflowX || ''
      tableBody.style.overflowY = originalStyles.bodyOverflowY || ''
      tableBody.scrollTop = originalStyles.scrollTop
      tableBody.scrollLeft = originalStyles.scrollLeft
    }

    if (tableHeader) {
      tableHeader.style.overflow = originalStyles.headerOverflow || ''
      tableHeader.style.overflowX = originalStyles.headerOverflowX || ''
      tableHeader.scrollLeft = originalStyles.headerScrollLeft
    }
  }

  /**
   * 创建html2canvas配置
   * @param {Object} dimensions - 尺寸信息
   * @returns {Object} html2canvas配置
   */
  static createCanvasConfig(dimensions) {
    const { totalWidth, totalHeight, actualContentHeight } = dimensions

    return {
      useCORS: true,
      allowTaint: true,
      scale: 2, // 提高缩放比例增强像素质量
      backgroundColor: '#ffffff',
      width: totalWidth,
      height: totalHeight,
      scrollX: 0,
      scrollY: 0,
      logging: false,
      removeContainer: false,
      foreignObjectRendering: false,
      imageTimeout: 60000, // 增加超时时间处理高分辨率截图
      onclone: (clonedDoc) => {
        // 在克隆文档中确保表格完全展开
        const clonedTable = clonedDoc.querySelector('.el-table')
        const clonedWrapper = clonedDoc.querySelector('.el-table__wrapper')
        const clonedBody = clonedDoc.querySelector('.el-table__body-wrapper')
        const clonedHeader = clonedDoc.querySelector('.el-table__header-wrapper')

        // 隐藏克隆文档中的操作列
        if (clonedTable) {
          // 使用封装的方法识别操作列
          const actionColumns = TableScreenshot.identifyActionColumns(clonedTable)

          // 隐藏识别出的操作列
          actionColumns.forEach((columnInfo) => {
            // 隐藏表头
            if (columnInfo.header) {
              columnInfo.header.style.display = 'none'
            }

            // 隐藏对应的表体列（所有行的该列）
            const bodyRows = clonedTable.querySelectorAll('.el-table__body-wrapper tbody tr')

            bodyRows.forEach((row) => {
              const cells = row.querySelectorAll('td')
              if (cells[columnInfo.headerIndex]) {
                cells[columnInfo.headerIndex].style.display = 'none'
              }
            })
          })

          // 处理固定右侧区域的操作列
          TableScreenshot.hideFixedRightActionColumns(clonedTable)

          // 额外处理：直接查找并隐藏所有包含"操作"的列（使用优化的判断逻辑）
          const allHeaderCells = clonedTable.querySelectorAll('.el-table__header-wrapper th')
          const bodyRows = clonedTable.querySelectorAll('.el-table__body-wrapper tbody tr')

          allHeaderCells.forEach((th, index) => {
            const label = th.textContent.trim()

            // 首先检查是否为业务数据列
            const businessDataKeywords = [
              '率',
              '数据',
              '统计',
              '计数',
              '总数',
              '平均',
              '最大',
              '最小',
              '百分比',
              '%',
              '比例',
              '时间',
              '日期',
              '状态',
              '类型',
              '名称',
              '编号',
              'ID',
              'id',
            ]
            const isBusinessDataColumn = businessDataKeywords.some((keyword) => label.includes(keyword))

            if (isBusinessDataColumn) {
              return
            }

            // 检查表头是否为纯粹的操作列
            const isOperationHeader = label === '操作' || label === '操作列' || label === 'Action' || label === 'Actions'

            if (!isOperationHeader) {
              return
            }

            // 检查第一行数据是否包含操作内容
            let hasOperationContent = false
            if (bodyRows.length > 0) {
              const firstRowCells = bodyRows[0].querySelectorAll('td')
              if (firstRowCells[index]) {
                const cellElement = firstRowCells[index]
                const cellText = cellElement.textContent.trim()

                // 检查是否包含操作按钮
                const hasActionButton =
                  cellElement.querySelector('.el-button') ||
                  cellElement.querySelector('button') ||
                  cellElement.querySelector('[class*="button"]') ||
                  cellElement.querySelector('a[href]') ||
                  cellElement.querySelector('[class*="link"]') ||
                  cellElement.querySelector('a')

                // 检查是否包含操作相关关键字
                const operationKeywords = ['跳转', '编辑', '删除', '查看', '详情', '操作', '修改', '新增', '添加', '移除', '管理', '设置', '配置']
                const hasOperationKeyword = operationKeywords.some((keyword) => cellText.includes(keyword))

                hasOperationContent = hasActionButton || hasOperationKeyword
              }
            }

            // 必须同时满足表头为操作列且数据包含操作内容
            if (isOperationHeader && hasOperationContent) {
              // 隐藏表头
              th.style.display = 'none'

              // 隐藏对应的表体列
              bodyRows.forEach((row) => {
                const cells = row.querySelectorAll('td')
                if (cells[index]) {
                  cells[index].style.display = 'none'
                }
              })
            }
          })
        }

        if (clonedTable) {
          clonedTable.style.height = totalHeight + 'px'
          clonedTable.style.maxHeight = 'none'
          clonedTable.style.width = totalWidth + 'px'
          clonedTable.style.maxWidth = 'none'
        }

        if (clonedWrapper) {
          clonedWrapper.style.height = totalHeight + 'px'
          clonedWrapper.style.maxHeight = 'none'
          clonedWrapper.style.width = totalWidth + 'px'
          clonedWrapper.style.maxWidth = 'none'
        }

        if (clonedBody) {
          clonedBody.style.height = actualContentHeight + 10 + 'px'
          clonedBody.style.maxHeight = 'none'
          clonedBody.style.width = totalWidth + 'px'
          clonedBody.style.maxWidth = 'none'
          clonedBody.style.overflow = 'visible'
          clonedBody.style.overflowX = 'visible'
          clonedBody.style.overflowY = 'visible'
        }

        if (clonedHeader) {
          clonedHeader.style.overflow = 'visible'
          clonedHeader.style.overflowX = 'visible'
        }

        // 移除固定定位元素
        const fixedElements = clonedDoc.querySelectorAll('[style*="position: fixed"], .el-loading-mask, .el-message')
        fixedElements.forEach((el) => {
          el.style.display = 'none'
        })
      },
    }
  }

  /**
   * 下载截图
   * @param {HTMLCanvasElement} canvas - 画布元素
   * @param {string} filename - 文件名前缀
   */
  static downloadScreenshot(canvas, filename = '表格完整数据') {
    const link = document.createElement('a')
    link.download = `${filename}_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.png`
    link.href = canvas.toDataURL('image/png', 1.0) // 使用最高质量输出

    // 触发下载
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  static async captureTableScreenshot(options) {
    const {
      tableRef,
      tableElement: tableElementInput,
      nextTick,
      filename = '表格完整数据',
      download = false,
      scale,
    } = options || {}

    const tableElement = tableElementInput || this.getTableElement(tableRef)
    if (!tableElement) {
      throw new Error('未找到表格元素')
    }

    const tableWrapper =
      tableElement.querySelector('.el-table__inner-wrapper') ||
      tableElement.querySelector('.el-table__wrapper')
    const tableBody = tableElement.querySelector('.el-table__body-wrapper')
    const tableHeader = tableElement.querySelector('.el-table__header-wrapper')

    const originalStyles = this.saveOriginalStyles(tableElement, tableWrapper, tableBody, tableHeader)
    const dimensions = this.calculateTableDimensions(tableElement)
    this.setExpandedStyles(tableElement, tableWrapper, tableBody, tableHeader, dimensions, originalStyles)

    if (typeof nextTick === 'function') {
      await nextTick()
    }
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const canvasConfig = this.createCanvasConfig(dimensions)
    if (typeof scale !== 'undefined') {
      canvasConfig.scale = scale
    }

    const canvas = await html2canvas(tableElement, canvasConfig)
    this.restoreOriginalStyles(tableElement, tableWrapper, tableBody, tableHeader, originalStyles)

    const dataUrl = canvas.toDataURL('image/png', 1.0)
    if (download) this.downloadScreenshot(canvas, filename)
    return { canvas, dataUrl }
  }

  /**
   * 强制恢复表格样式（错误处理时使用）
   * @param {HTMLElement} tableElement - 表格元素
   * @param {HTMLElement} tableWrapper - 表格包装器
   * @param {HTMLElement} tableBody - 表格主体
   * @param {HTMLElement} tableHeader - 表格头部
   */
  static forceRestoreStyles(tableElement, tableWrapper, tableBody, tableHeader) {
    // 强制恢复操作列显示（查找所有可能被隐藏的操作列）
    if (tableElement) {
      // 处理普通表格区域的操作列
      const actionColumns = tableElement.querySelectorAll('.el-table__header-wrapper th')
      actionColumns.forEach((th) => {
        // 方法1: 检查th内部的文本内容
        const cellContent = th.querySelector('.cell')
        const label = cellContent ? cellContent.textContent.trim() : th.textContent.trim()

        // 方法2: 检查是否包含操作按钮（通过查找对应的表体列）
        const colIndex = Array.from(th.parentNode.children).indexOf(th)
        const firstBodyCell = tableElement.querySelector(`.el-table__body-wrapper tbody tr td:nth-child(${colIndex + 1})`)
        const hasActionButton =
          firstBodyCell &&
          (firstBodyCell.querySelector('.el-button') ||
            firstBodyCell.querySelector('button[type="text"]') ||
            firstBodyCell.querySelector('.el-button[type="text"]') ||
            firstBodyCell.textContent.trim() === '跳转')

        // 如果表头标签是"操作"或者表体包含操作按钮，则认为是操作列
        if (label === '操作' || label.includes('操作') || hasActionButton) {
          // 恢复表头显示
          th.style.display = ''
          // 恢复对应的表体列显示
          const bodyCols = tableElement.querySelectorAll(`.el-table__body-wrapper tbody tr td:nth-child(${colIndex + 1})`)
          bodyCols.forEach((cell) => {
            cell.style.display = ''
          })
        }
      })

      // 处理固定右侧区域的操作列
      const fixedRightWrapper = tableElement.querySelector('.el-table__fixed-right')
      if (fixedRightWrapper) {
        const fixedActionColumns = fixedRightWrapper.querySelectorAll('.el-table__fixed-header-wrapper th')
        fixedActionColumns.forEach((th) => {
          const cellContent = th.querySelector('.cell')
          const label = cellContent ? cellContent.textContent.trim() : th.textContent.trim()

          // 检查固定列的表体是否包含操作按钮
          const colIndex = Array.from(th.parentNode.children).indexOf(th)
          const firstBodyCell = fixedRightWrapper.querySelector(`.el-table__fixed-body-wrapper tbody tr td:nth-child(${colIndex + 1})`)
          const hasActionButton =
            firstBodyCell &&
            (firstBodyCell.querySelector('.el-button') ||
              firstBodyCell.querySelector('button[type="text"]') ||
              firstBodyCell.querySelector('.el-button[type="text"]') ||
              firstBodyCell.textContent.trim() === '跳转')

          if (label === '操作' || label.includes('操作') || hasActionButton) {
            // 恢复整个固定右侧区域的显示
            fixedRightWrapper.style.display = ''
          }
        })
      }
    }

    if (tableElement) {
      tableElement.style.height = ''
      tableElement.style.maxHeight = ''
      tableElement.style.width = ''
      tableElement.style.maxWidth = ''
    }

    if (tableBody) {
      tableBody.style.height = ''
      tableBody.style.maxHeight = ''
      tableBody.style.width = ''
      tableBody.style.maxWidth = ''
      tableBody.style.overflow = ''
      tableBody.style.overflowX = ''
      tableBody.style.overflowY = ''
    }

    if (tableWrapper) {
      tableWrapper.style.height = ''
      tableWrapper.style.maxHeight = ''
      tableWrapper.style.width = ''
      tableWrapper.style.maxWidth = ''
    }

    if (tableHeader) {
      tableHeader.style.overflow = ''
      tableHeader.style.overflowX = ''
    }
  }

  /**
   * 导出表格高清截图
   * @param {Object} options - 配置选项
   * @param {Object} options.tableRef - 表格组件引用
   * @param {Object} options.loadingInstance - 加载实例（Vue的$loading）
   * @param {Object} options.messageInstance - 消息实例（Vue的$message）
   * @param {Function} options.nextTick - Vue的$nextTick方法
   * @param {string} options.filename - 文件名前缀，默认为'表格完整数据'
   * @returns {Promise<void>}
   */
  static async exportTableScreenshot(options) {
    const { tableRef, loadingInstance, messageInstance, nextTick, filename = '表格完整数据' } = options

    try {
      // 显示加载提示
      const loading = loadingInstance({
        lock: true,
        text: '正在生成表格截图...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      await this.captureTableScreenshot({ tableRef, nextTick, filename, download: true })

      loading.close()
      messageInstance.success('表格截图导出成功')
    } catch (error) {
      console.error('表格截图导出失败:', error)
      messageInstance.error(`截图导出失败: ${error.message}`)

      // 确保恢复表格样式
      try {
        const tableElement = this.getTableElement(tableRef)
        const tableBody = tableElement && tableElement.querySelector('.el-table__body-wrapper')
        const tableWrapper = tableElement && tableElement.querySelector('.el-table__wrapper')
        const tableHeader = tableElement && tableElement.querySelector('.el-table__header-wrapper')

        this.forceRestoreStyles(tableElement, tableWrapper, tableBody, tableHeader)
      } catch (e) {
        console.error('恢复表格样式失败:', e)
      }
    }
  }
}

export default TableScreenshot
