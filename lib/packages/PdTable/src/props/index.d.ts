import { PropType } from 'vue';
import { IPandoraTableColumn, IPandoraTableSort } from '../types';
export declare const tableProps: {
    data: {
        type: PropType<any>;
        default(): never[];
    };
    columns: {
        type: PropType<IPandoraTableColumn<any>[]>;
        default(): never[];
    };
    sortConfig: {
        type: PropType<IPandoraTableSort<any>>;
        default(): {};
    };
    tableConfig: {
        type: PropType<Partial<Omit<import("../types/element-type").TableProps<any>, "data" | "column">>>;
        default(): {};
    };
};
