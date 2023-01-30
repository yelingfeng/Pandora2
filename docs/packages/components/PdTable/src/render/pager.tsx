import { ref } from 'vue'
import { IPageConfig } from '../types'
import Pagination from '../pagination/index.vue'
/**
 * 构建分页
 */
export const usePagerRender = (
  pageOpt: IPageConfig | any,
  handleSizeChange: Function,
  handleCurrentChange: Function
) => {
  let pageVNode: any = null
  const pageRef = ref(null)
  const PagerProps = {
    ref: pageRef,
    option: pageOpt,
    onHandleSizeChange: handleSizeChange,
    onHandleCurrentChange: handleCurrentChange
  }
  pageVNode = <Pagination {...PagerProps}></Pagination>
  return pageVNode
}
