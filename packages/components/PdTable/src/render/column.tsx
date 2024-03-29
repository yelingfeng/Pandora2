import { SortService } from '../sort/sortService'
import { ElTableColumn } from 'element-plus'
import type { IPandoraTableColumn } from '../types'
import { isFunction } from '@/_utils/is'
import { toRaw } from 'vue'
import { createVNode } from 'vue'
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
          <div relId={column.property}>
            {column.label}
            <span class="caret-wrapper">
              <i
                class="sort-caret ascending"
                on-click={(e: any) =>
                  $sortService.sortIconClick(e, column, 'ascending')
                }
              ></i>
              <i
                class="sort-caret descending"
                on-click={(e: any) =>
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
  if (childNode) {
    return <ElTableColumn {...columnProps}>{childNode}</ElTableColumn>
  }
  const _childSlots = slots && (slots.default || slots.header) ? slots : ''
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
