import { PropType } from 'vue'
import {
  IPandoraTableColumn,
  IPandoraTableSort,
  IPandoraTableOption
} from '../types'
export const tableProps = {
  // 数据
  data: {
    type: Array as PropType<any>,
    default() {
      return []
    }
  },
  // 列
  columns: {
    type: Array as PropType<IPandoraTableColumn<any>[]>,
    default() {
      return []
    }
  },
  // 排序配置
  sortConfig: {
    type: Object as PropType<IPandoraTableSort<any>>,
    default() {
      return {}
    }
  },
  // table本身配置（element-plus属性）
  tableConfig: {
    type: Object as PropType<IPandoraTableOption<any>>,
    default() {
      return {}
    }
  }
}
