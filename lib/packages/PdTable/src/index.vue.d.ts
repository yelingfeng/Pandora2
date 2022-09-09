declare const _sfc_main: import("vue").DefineComponent<{
    data: {
        type: import("vue").PropType<any>;
        default(): never[];
    };
    columns: {
        type: import("vue").PropType<import("./types").IPandoraTableColumn<any>[]>;
        default(): never[];
    };
    sortConfig: {
        type: import("vue").PropType<import("./types").IPandoraTableSort<any>>;
        default(): {};
    };
    tableConfig: {
        type: import("vue").PropType<Partial<Omit<import("./types/element-type").TableProps<any>, "data" | "column">>>;
        default(): {};
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: import("vue").PropType<any>;
        default(): never[];
    };
    columns: {
        type: import("vue").PropType<import("./types").IPandoraTableColumn<any>[]>;
        default(): never[];
    };
    sortConfig: {
        type: import("vue").PropType<import("./types").IPandoraTableSort<any>>;
        default(): {};
    };
    tableConfig: {
        type: import("vue").PropType<Partial<Omit<import("./types/element-type").TableProps<any>, "data" | "column">>>;
        default(): {};
    };
}>>, {
    data: any;
    columns: import("./types").IPandoraTableColumn<any>[];
    sortConfig: import("./types").IPandoraTableSort<any>;
    tableConfig: Partial<Omit<import("./types/element-type").TableProps<any>, "data" | "column">>;
}>;
export default _sfc_main;
