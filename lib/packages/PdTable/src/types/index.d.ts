import type { Ref, VNode } from 'vue';
import { TableProps, Table, TableColumnCtx } from './element-type';
export declare type Dictionary<T> = Record<string, T>;
export interface AnyObject {
    [key: string]: any;
}
export interface IPageConfig {
    height?: number;
    currentPage?: number;
    total?: number;
    pageSizes?: number[];
    pageCount?: number;
    pageSize?: number;
    layout?: string;
}
/**
 * 选择列 类型 单选多选
 */
export interface ISelectionMode<T> {
    selectionMode?: string;
    selectionPos?: string;
    selectable?: (row: T, $index: number) => void;
}
/**
 * 自定义table类型
 */
export interface IPandoraTable<T> extends IPandoraTableOption<T> {
    rowClick?: (row: T, column: object, event: any) => void;
    rowChange?: (row: T, index: number) => void;
    selection?: ISelectionMode<T>;
    pagination?: IPageConfig;
    pageOpt?: IPageConfig;
}
/**
 *
 * table 构建属性接口
 */
export interface IPandoraTableProps<T> {
    data: T[];
    columns: IPandoraTableColumn<T>[];
    sortConfig?: IPandoraTableSort<T>;
    tableConfig?: IPandoraTableOption<T>;
}
/**
 *
 */
export declare type IPandoraTableOption<T> = Partial<Omit<TableProps<T>, 'data' | 'column'>>;
export interface IPandoraTableColumn<T> extends TableColumnCtx<T> {
    name?: string;
    value?: string;
    render?: (row: any, column: any, index: number) => VNode;
}
export interface ISortType {
    prop: string;
    order: 'ascending' | 'descending';
}
export interface ISortChangeCb {
    column: object;
    prop: string;
    order: string | null;
}
/**
 * 定义table Sort配置接口
 */
export interface IPandoraTableSort<T = any> {
    sortMode: 'single' | 'multi';
    sortChange?: (row: T) => void;
    defaultSorts?: ISortType[];
    defaultOrder?: 'ascending' | 'descending';
}
/**
 * 排序服务类内部接口
 */
export interface ISortService<T> extends IPandoraTableSort<T> {
    userColumnOrder?: Dictionary<String>;
    tableInstance?: Ref<Table<any>>;
}
export declare type IPandoraTableKeys = keyof IPandoraTable<any>;
