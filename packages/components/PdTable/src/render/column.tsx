import { isFunction } from '@/_utils/is'
import { ElTableColumn } from 'element-plus'
import { createVNode, toRaw } from 'vue'
import { SortService } from '../sort/sortService'
import type { IPandoraTableColumn } from '../types'
/**
 *
 */
function renderColumnProp<T>(
  item: IPandoraTableColumn<T>,
  $sortService: SortService
) {
  const { prop, value, label, name, sortable, render, ...others } = item
  // 兼容处理1.0的属性
  const columnProps: any = {
    prop: prop || value,
    label: label || name,
    ...others
  }
  let slots
  if (sortable) {
    slots = {
      header: (props: any) => {
        const column = props.column
        const customHeader = (
          <div
            relId={column.property}
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
          >
            {column.label}
            <span class="caret-wrapper">
              <i
                class="sort-caret ascending"
                onClick={(e: any) =>
                  $sortService.sortIconClick(e, column, 'ascending')
                }
              ></i>
              <i
                class="sort-caret descending"
                onClick={(e: any) =>
                  $sortService.sortIconClick(e, column, 'descending')
                }
              ></i>
            </span>
          </div>
        )
        return customHeader
      }
    }
  }

  // 动态渲染
  if (render && isFunction(render)) {
    slots = {
      default: (props: any) => {
        return render(toRaw(props.row), props.column, props.$index)
      }
    }
  }

  return { columnProps, slots }
}

/**
 *
 * @param columnProp
 * @param sortService
 * @param childNode
 * @returns
 */
function getColumnVNode<T>(
  columnProp: IPandoraTableColumn<T>,
  sortService: SortService,
  childNode = null
) {
  const { columnProps, slots } = renderColumnProp<T>(columnProp, sortService)
  // 确保 columnProps 有 key，优先使用 id, prop, type, label
  if (!columnProps.key) {
    columnProps.key = columnProps.prop || columnProps.type || columnProps.label || Math.random().toString(36).slice(2)
  }

  if (childNode) {
    return <ElTableColumn {...columnProps}>{childNode}</ElTableColumn>
  }
  const _childSlots = (slots?.default || slots?.header) ? slots : ''
  return createVNode(ElTableColumn, { ...columnProps }, _childSlots)
}

/**
 *
 * @param column 列构建对象
 * @param sortService 排序service
 * @returns
 */
export function useColumnRender<T>(
  columnProps: IPandoraTableColumn<T>[],
  sortService: SortService
) {
  // 创建column
  const columnsVNode = columnProps.map((items: IPandoraTableColumn<T>) => {
    let childColumn: any
    // 嵌套列
    if (items?.columns && items?.columns.length) {
      childColumn = items?.columns.map((it: IPandoraTableColumn<T>) => {
        return getColumnVNode(it, sortService)
      })
      return getColumnVNode(items, sortService, childColumn)
    }
    return getColumnVNode(items, sortService)
  })
  return columnsVNode
}
