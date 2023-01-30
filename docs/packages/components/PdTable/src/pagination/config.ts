import type { IPageConfig } from '../types'
import { cloneDeep } from 'lodash-es'
import { PropType } from 'vue'
const PAGE_HEIGHT = 50
const defaultOption: IPageConfig = {
  height: PAGE_HEIGHT,
  currentPage: 1,
  total: 200,
  pageCount: 7,
  pageSizes: [10, 20, 30, 40, 50],
  pageSize: 10,
  layout: 'total, sizes, prev, pager, next, jumper'
}

export const getPagerProps = () => {
  return {
    option: {
      type: Object as PropType<IPageConfig>,
      default() {
        return cloneDeep(defaultOption)
      }
    }
  }
}
