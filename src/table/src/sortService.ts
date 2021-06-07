import { Ref } from 'vue'
import { removeClass, addClass, trim } from "../../_utils/helper";
import { isFunction } from '../../_utils/is'
import { Table } from "element-plus/packages/table/src/table/defaults"
const ASC = "ascending";
const DESC = "descending";
const DEFAULT_SORT = "descending";
const SINGLE = "single";
const MULTI = "multi";
// 排序字段集合
const SORT_ARR: string[] = [ASC, DESC];
type Dictionary<T> = Record<string, T>


// 排序配置类型
export interface SortType {
  prop: string;
  order: "ascending" | "descending";
}
// 排序回调类型
export interface ISortChangeCb {
  column: object;
  prop: string;
  order: string | null;
}
/**
 * 定义table Sort配置接口
 */
export interface IPandoraTableSort<T = any> {
  // 排序模式 single 独立排序 ,multi 多项排序
  sortMode: "single" | "multi";
  // 排序回调事件
  sortChange?: (row: T) => void;
  // 排序
  defaultSorts?: SortType[];
  // 用户定义的列
  userColumnOrder?:Dictionary<String>,
  // elementplus table实例
  tableInstance? :Ref<Table<any>>
}


/**
 * 排序服务类
 */
export class SortService {
  private activeSort: Dictionary<any> = {}
  private defaultSortObj: Dictionary<any> = {}
  private _oldActiveSort: Dictionary<any> = {}
  private option: IPandoraTableSort<ISortChangeCb> = {
    sortMode: SINGLE,
  }
  constructor(opt: IPandoraTableSort<ISortChangeCb>) {
    this.option = opt
    console.log(this)
  }
  init() {
    const userColumnOrder = this.option.userColumnOrder 

    this._initDefSortObj();

    for (const column in userColumnOrder) {
      //  设置默认的排序
      if (this.defaultSortObj[column]) {
        userColumnOrder[column] = this.defaultSortObj[column];
      }
    }
    // 存一份副本
    this._oldActiveSort = Object.assign({}, userColumnOrder);
    // 存当前排序
    this.activeSort = Object.assign({}, userColumnOrder);

    this.initIconSort();
  }

  // 初始化 装载默认得排序对象
  _initDefSortObj() {
    if (this.option.defaultSorts) {
      this.option.defaultSorts.forEach((item: any) => {
        this.defaultSortObj[item.prop] = item.order
      })
    }
  }

  /**
   * 获取当前排序列的th Dom
   */
  getSortColDom(order: string) {
    const tableInstance = this.option.tableInstance.value as Table<any>
    const tableEl = tableInstance.$el
    return tableEl.querySelectorAll(`div[relid=${order}]`)
  }

  // 初始化icon按钮状态
  initIconSort() {
    for (const key in this.activeSort) {
      const thNode = this.getSortColDom(key)
      thNode.forEach((item: any) => {
        addClass(item.parentNode.parentNode, this.activeSort[key])
      })
    }
  }


  // 获取指定order的 非当前排序字段
  getTargetSortKey(order: string) {
    const index = SORT_ARR.findIndex((value, index, arr) => {
      return value !== order;
    });
    return SORT_ARR[index];
  }
  /**
   * 取当前th上的className 排序order字段
   */
  getCurrentSortKey(classList: any) {
    let currentOrder = "";
    const reg = `${ASC}|${DESC}`;
    for (let i = 0; i < classList.length; i++) {
      if (new RegExp(reg).test(classList[i])) {
        currentOrder = trim(classList[i]);
      }
    }
    return currentOrder;
  }
  /**
   * 是否是单排模式
   * @param sortMode  
   * @returns 
   */
  _isSingleModel(sortMode: string) {
    return SINGLE === sortMode
  }

  /**
  * 获取目标dom节点
  *
  */
  getTargetNode(e: any) {
    const target = e.target
    let node
    // 点击了span
    if (target.className === 'caret-wrapper') {
      node = target.parentNode.parentNode.parentNode
    }
    // icon触发
    else if (target.nodeName === 'I') {
      node = target.parentNode.parentNode.parentNode.parentNode
    }
    // div rel header触发
    else if (target.nodeName === 'DIV' && target.attributes.getNamedItem('relid')) {
      node = target.parentNode.parentNode
    }
    // div cell
    else if (target.nodeName === 'DIV' && target.className == 'cell') {
      node = target.parentNode
    }
    return node
  }

  /**
   * 是否需要触发列排序  change
   *
   *  判断配置column中是否有指定的配置项sortable
   **/
  isNeedOrderChange(prop: string) {
    return this._oldActiveSort[prop]
  }

  /**
   * 排序处理服务
   * @param {string} column 排序列名
   * @param {string} order 排序字段
   */
  sortOrderService(column: string, order: string): void {
    this.activeSort[column] = order
  }

  // 清除排序activeSort 状态
  _clearSortOrderService() {
    for (const prop in this.activeSort) {
      this.activeSort[prop] = ''
      this.clearSortOrderCls(prop)
    }
  }

  /**
   * 清空所属icon样式
   * @param {string} column 排序列名
   */
  clearSortOrderCls(column: string) {
    const thNode = this.getSortColDom(column)
    thNode.forEach((item: any) => {
      this.removeAllSortOrderCls(item.parentNode.parentNode)
    })
  }

  /**
  * 处理sort icon 样式方法
  * @param {object} node dom节点对象
  * @param {string} order 目标排序order
  */
  changeSortOrderClass(node: any, order: string) {
    this.removeAllSortOrderCls(node)
    addClass(node, order)
  }
  /**
  * 移除所有排序cls样式
  *
  * */
  removeAllSortOrderCls(node: any) {
    SORT_ARR.forEach(item => {
      removeClass(node, item)
    })
  }


  /**
 * icon click事件
 * @param {object} order 排序字段
 * @param {object} column 当前列对象
 * @param {any} e 当前事件
 */
  sortIconClick(e: any, column: any, order: string) {
    const thNode = this.getTargetNode(e)
    // 如果是单排模式
    if (this._isSingleModel(this.option.sortMode)) {
      // 先清空所有activeSort
      this._clearSortOrderService()
    }

    this.changeSortOrderClass(thNode, order)
    this.sortOrderService(column.property, order)
    this.sortChange()
    e.stopPropagation()
    e.preventDefault()
  }

  /**
 * 排序回调
 */
  sortChange() {
    if (this.option.sortChange && isFunction(this.option.sortChange)) {
      // 判断数组curThead中是否存在当前节点的prop
      // console.log('sortChange ---', this.activeSort)
      this.option.sortChange(this.getActiveSortValue())
    }
  }

  // 获取需要返给用户端的 排序值
  getActiveSortValue() {
    const obj = Object.create(null)
    for (const prop in this.activeSort) {
      if (this.activeSort[prop] !== '') {
        obj[prop] = this.activeSort[prop]
      }
    }
    return obj
  }
}