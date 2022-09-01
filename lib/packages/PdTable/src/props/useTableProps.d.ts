import { AnyObject, IPandoraTable } from '../types';
/**
 *
 * @param props table Props属性
 * @returns
 */
export declare const useTableProps: (props: ExtractPropTypes<{
    data: {
        type: PropType<any>;
        default(): never[];
    };
    columns: {
        type: PropType<import("../types").IPandoraTableColumn<any>[]>;
        default(): never[];
    };
    sortConfig: {
        type: PropType<import("../types").IPandoraTableSort<any>>;
        default(): {};
    };
    tableConfig: {
        type: PropType<Partial<Omit<import("../types/element-type").TableProps<any>, "data" | "column">>>;
        default(): {};
    };
}>) => {
    tableInstance: any;
    tableConfig: IPandoraTable<AnyObject>;
    currentData: any;
    columnsProps: any;
    $sortService: import("../sort/sortService").SortService;
    handleHeaderClick: (column: any, e: any) => void;
};
