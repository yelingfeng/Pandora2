import type { FieldMapToTime, IFormSchema } from '../types/form';
import type { CSSProperties, PropType } from 'vue';
import type { ButtonProps, ColProps, RowProps } from 'element-plus';
export declare const FormBasicProps: {
    model: {
        type: PropType<Recordable<any>>;
        default: {};
    };
    labelWidth: {
        type: PropType<string | number>;
        default: number;
    };
    fieldMapToTime: {
        type: PropType<FieldMapToTime>;
        default: () => never[];
    };
    schemas: {
        type: PropType<IFormSchema[]>;
        default: () => never[];
    };
    mergeDynamicData: {
        type: PropType<Recordable<any>>;
        default: null;
    };
    baseRowStyle: {
        type: PropType<CSSProperties>;
    };
    baseColProps: {
        type: PropType<Partial<ColProps>>;
    };
    autoSetPlaceHolder: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    autoSubmitOnEnter: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    submitOnReset: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    submitOnChange: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    size: import("vue-types").VueTypeDef<string> & {
        default: string;
    };
    disabled: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    emptySpan: {
        type: PropType<number>;
        default: number;
    };
    showAdvancedButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    transformDateFunc: {
        type: PropType<Fn>;
        default: (date: any) => any;
    };
    rulesMessageJoinLabel: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    autoAdvancedLine: import("vue-types").VueTypeValidableDef<number> & {
        default: number;
    } & {
        default: number;
    };
    alwaysShowLines: import("vue-types").VueTypeValidableDef<number> & {
        default: number;
    } & {
        default: number;
    };
    showActionButtonGroup: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    actionColOptions: PropType<Partial<ColProps>>;
    showResetButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    autoFocusFirstItem: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    resetButtonOptions: PropType<Partial<ButtonProps>>;
    showSubmitButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    submitButtonOptions: PropType<Partial<ButtonProps>>;
    resetFunc: PropType<() => Promise<void>>;
    submitFunc: PropType<() => Promise<void>>;
    hideRequiredMark: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    labelAlign: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    };
    rowProps: PropType<RowProps>;
    rules: PropType<Partial<Record<string, import("element-plus/es/utils").Arrayable<import("element-plus").FormItemRule>>>>;
};
