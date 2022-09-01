import { SortService } from './sortService';
import type { Table } from '../types/element-type';
import type { Ref } from 'vue';
import type { IPandoraTableColumn, ISortService, ISortChangeCb } from '../types';
/**
 *
 * @param sortConfig
 * @param columns
 * @param tableInstance
 * @returns
 */
export declare function useSortService<T>(sortConfig: ISortService<ISortChangeCb>, columns: IPandoraTableColumn<T>[], tableInstance?: Ref<Table<T>> | any): SortService;
