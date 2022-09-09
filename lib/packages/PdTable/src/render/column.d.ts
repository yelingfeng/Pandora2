import { SortService } from '../sort/sortService';
import type { IPandoraTableColumn } from '../types';
/**
 *
 * @param column 列构建对象
 * @param sortService 排序service
 * @returns
 */
export declare function useColumnRender<T>(columnProps: IPandoraTableColumn<T>[], sortService: SortService): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[];
