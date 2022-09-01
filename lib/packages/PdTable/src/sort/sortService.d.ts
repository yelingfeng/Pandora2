import { ISortService, ISortChangeCb } from '../types';
export declare const ASC = "ascending";
export declare const DESC = "descending";
export declare const DEFAULT_SORT = "descending";
export declare const SINGLE = "single";
export declare const MULTI = "multi";
export declare const SORT_ARR: string[];
/**
 * 排序服务类
 */
export declare class SortService {
    private activeSort;
    private defaultSortObj;
    private _oldActiveSort;
    private option;
    constructor(opt: ISortService<ISortChangeCb>);
    init(): void;
    initSort(): void;
    _initDefSortObj(): void;
    _getDefaultOrder(prop: string): string;
    /**
     * 获取当前排序列的th Dom
     */
    getSortColDom(order: string): any;
    initIconSort(): void;
    getTargetSortKey(order: string): string;
    /**
     * 取当前th上的className 排序order字段
     */
    getCurrentSortKey(classList: any): string;
    /**
     * 是否是单排模式
     * @param sortMode
     * @returns
     */
    _isSingleModel(sortMode: string): boolean;
    /**
     * 获取目标dom节点
     *
     */
    getTargetNode(e: any): any;
    /**
     * 是否需要触发列排序  change
     *
     *  判断配置column中是否有指定的配置项sortable
     **/
    isNeedOrderChange(prop: string): any;
    /**
     * 排序处理服务
     * @param {string} column 排序列名
     * @param {string} order 排序字段
     */
    sortOrderService(column: string, order: string): void;
    _clearSortOrderService(): void;
    /**
     * 清空所属icon样式
     * @param {string} column 排序列名
     */
    clearSortOrderCls(column: string): void;
    /**
     * 处理sort icon 样式方法
     * @param {object} node dom节点对象
     * @param {string} order 目标排序order
     */
    changeSortOrderClass(node: any, order: string): void;
    /**
     * 移除所有排序cls样式
     *
     * */
    removeAllSortOrderCls(node: any): void;
    /**
     * icon click事件
     * @param {object} order 排序字段
     * @param {object} column 当前列对象
     * @param {any} e 当前事件
     */
    sortIconClick(e: any, column: any, order: string): void;
    /**
     * 排序回调
     */
    sortChange(): void;
    /**
     * 获取需要返给用户端的 排序值
     * @returns { key1:'desc',key2:'asc'}
     */
    getActiveSortValue(): any;
    /**
     * 执行header Click处理
     */
    executeHeaderClick(column: any, e: any): void;
}
