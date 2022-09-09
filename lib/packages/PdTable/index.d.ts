export declare const PdTable: import('../../src/_utils').WithInstall<import("vue").DefineComponent<{
    data: {
        type: import("vue").PropType<any>;
        default(): never[];
    };
    columns: {
        type: import("vue").PropType<import("./src/types").IPandoraTableColumn<any>[]>;
        default(): never[];
    };
    sortConfig: {
        type: import("vue").PropType<import("./src/types").IPandoraTableSort<any>>;
        default(): {};
    };
    tableConfig: {
        type: import("vue").PropType<Partial<Omit<import("./src/types/element-type").TableProps<any>, "data" | "column">>>;
        default(): {};
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: import("vue").PropType<any>;
        default(): never[];
    };
    columns: {
        type: import("vue").PropType<import("./src/types").IPandoraTableColumn<any>[]>;
        default(): never[];
    };
    sortConfig: {
        type: import("vue").PropType<import("./src/types").IPandoraTableSort<any>>;
        default(): {};
    };
    tableConfig: {
        type: import("vue").PropType<Partial<Omit<import("./src/types/element-type").TableProps<any>, "data" | "column">>>;
        default(): {};
    };
}>>, {
    data: any;
    columns: import("./src/types").IPandoraTableColumn<any>[];
    sortConfig: import("./src/types").IPandoraTableSort<any>;
    tableConfig: Partial<Omit<import("./src/types/element-type").TableProps<any>, "data" | "column">>;
}>>;
export default PdTable;
