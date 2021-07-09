import { SortService } from '../sort/sortService'
import type { IPandoraTableColumn } from '../types'
/**
 *
 */
const renderColumnProp = (
  item: IPandoraTableColumn<unknown>,
  $sortService: any
) => {
  const { prop, value, label, name, sortable, ...others } = item
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
  return { columnProps, slots }
}

/**
 *
 * @param column 列构建对象
 * @param sortService 排序service
 * @returns
 */
export const useColumnRender = (
  column: IPandoraTableColumn<any>,
  sortService: SortService
) => {
  return renderColumnProp(column, sortService)
}
