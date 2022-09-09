import { ExtractPropTypes } from 'vue';
import { tableProps } from './index';
import { AnyObject, IPandoraTable } from '../types';
import { Table } from '../types/element-type';
/**
 *
 * @param props table Props属性
 * @returns
 */
export declare const useTableProps: (props: ExtractPropTypes<typeof tableProps>) => {
    tableInstance: import("vue").Ref<Table<any> | undefined>;
    tableConfig: IPandoraTable<AnyObject>;
    currentData: any;
    columnsProps: import("vue").Ref<{
        name?: string | undefined;
        value?: string | undefined;
        render?: ((row: any, column: any, index: number) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>) | undefined;
        id: string;
        realWidth: number;
        type: string;
        label: string;
        className: string;
        labelClassName: string;
        property: string;
        prop: string;
        width: string | number;
        minWidth: string | number;
        renderHeader: (data: {
            column: import("../types/element-type").TableColumnCtx<any>;
            $index: number;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        sortable: string | boolean;
        sortMethod: (a: any, b: any) => number;
        sortBy: string | string[] | ((row: any, index: number) => string);
        resizable: boolean;
        columnKey: string;
        rawColumnKey: string;
        align: string;
        headerAlign: string;
        showTooltipWhenOverflow: boolean;
        showOverflowTooltip: boolean;
        fixed: string | boolean;
        formatter: (row: any, column: import("../types/element-type").TableColumnCtx<any>, cellValue: any, index: number) => string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        selectable: (row: any, index: number) => boolean;
        reserveSelection: boolean;
        filterMethod: import("../types/element-type").FilterMethods<any>;
        filteredValue: string[];
        filters: {
            text: string;
            value: string;
        }[];
        filterPlacement: string;
        filterMultiple: boolean;
        index: number | ((index: number) => number);
        sortOrders: ("ascending" | "descending" | null)[];
        renderCell: (data: any) => void;
        colSpan: number;
        rowSpan: number;
        children: {
            id: string;
            realWidth: number;
            type: string;
            label: string;
            className: string;
            labelClassName: string;
            property: string;
            prop: string;
            width: string | number;
            minWidth: string | number;
            renderHeader: (data: {
                column: import("../types/element-type").TableColumnCtx<any>;
                $index: number;
            }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>;
            sortable: string | boolean;
            sortMethod: (a: any, b: any) => number;
            sortBy: string | string[] | ((row: any, index: number) => string);
            resizable: boolean;
            columnKey: string;
            rawColumnKey: string;
            align: string;
            headerAlign: string;
            showTooltipWhenOverflow: boolean;
            showOverflowTooltip: boolean;
            fixed: string | boolean;
            formatter: (row: any, column: import("../types/element-type").TableColumnCtx<any>, cellValue: any, index: number) => string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>;
            selectable: (row: any, index: number) => boolean;
            reserveSelection: boolean;
            filterMethod: import("../types/element-type").FilterMethods<any>;
            filteredValue: string[];
            filters: {
                text: string;
                value: string;
            }[];
            filterPlacement: string;
            filterMultiple: boolean;
            index: number | ((index: number) => number);
            sortOrders: ("ascending" | "descending" | null)[];
            renderCell: (data: any) => void;
            colSpan: number;
            rowSpan: number;
            children: any[];
            level: number;
            filterable: boolean | import("../types/element-type").FilterMethods<any> | {
                text: string;
                value: string;
            }[];
            order: string;
            isColumnGroup: boolean;
            isSubColumn: boolean;
            columns: any[];
            getColumnIndex: () => number;
            no: number;
            filterOpened?: boolean | undefined;
        }[];
        level: number;
        filterable: boolean | import("../types/element-type").FilterMethods<any> | {
            text: string;
            value: string;
        }[];
        order: string;
        isColumnGroup: boolean;
        isSubColumn: boolean;
        columns: {
            id: string;
            realWidth: number;
            type: string;
            label: string;
            className: string;
            labelClassName: string;
            property: string;
            prop: string;
            width: string | number;
            minWidth: string | number;
            renderHeader: (data: {
                column: import("../types/element-type").TableColumnCtx<any>;
                $index: number;
            }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>;
            sortable: string | boolean;
            sortMethod: (a: any, b: any) => number;
            sortBy: string | string[] | ((row: any, index: number) => string);
            resizable: boolean;
            columnKey: string;
            rawColumnKey: string;
            align: string;
            headerAlign: string;
            showTooltipWhenOverflow: boolean;
            showOverflowTooltip: boolean;
            fixed: string | boolean;
            formatter: (row: any, column: import("../types/element-type").TableColumnCtx<any>, cellValue: any, index: number) => string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
                [key: string]: any;
            }>;
            selectable: (row: any, index: number) => boolean;
            reserveSelection: boolean;
            filterMethod: import("../types/element-type").FilterMethods<any>;
            filteredValue: string[];
            filters: {
                text: string;
                value: string;
            }[];
            filterPlacement: string;
            filterMultiple: boolean;
            index: number | ((index: number) => number);
            sortOrders: ("ascending" | "descending" | null)[];
            renderCell: (data: any) => void;
            colSpan: number;
            rowSpan: number;
            children: any[];
            level: number;
            filterable: boolean | import("../types/element-type").FilterMethods<any> | {
                text: string;
                value: string;
            }[];
            order: string;
            isColumnGroup: boolean;
            isSubColumn: boolean;
            columns: any[];
            getColumnIndex: () => number;
            no: number;
            filterOpened?: boolean | undefined;
        }[];
        getColumnIndex: () => number;
        no: number;
        filterOpened?: boolean | undefined;
    }[]>;
    $sortService: import("../sort/sortService").SortService;
    handleHeaderClick: (column: any, e: any) => void;
};
