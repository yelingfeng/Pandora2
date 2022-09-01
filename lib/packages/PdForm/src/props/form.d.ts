import type { FieldMapToTime, IFormSchema } from '../types/form';
import type { CSSProperties } from 'vue';
export declare const FormBasicProps: {
    model: {
        type: PropType<Recordable>;
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
        type: PropType<Recordable>;
        default: null;
    };
    baseRowStyle: {
        type: PropType<CSSProperties>;
    };
    baseColProps: {
        type: PropType<ExtractPropTypes<{
            readonly tag: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
            readonly span: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 24, boolean>;
            readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            readonly pull: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            readonly push: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
            readonly xs: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
            readonly sm: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
            readonly md: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
            readonly lg: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
            readonly xl: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
        }>>;
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
    actionColOptions: PropType<ExtractPropTypes<{
        readonly tag: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
        readonly span: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 24, boolean>;
        readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
        readonly pull: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
        readonly push: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
        readonly xs: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
        readonly sm: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
        readonly md: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
        readonly lg: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
        readonly xl: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize) | ((new (...args: any[]) => import("element-plus").ColSize & {}) | (() => import("element-plus").ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
    }>>;
    showResetButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    autoFocusFirstItem: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    resetButtonOptions: PropType<ExtractPropTypes<{
        readonly size: {
            readonly type: any;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly disabled: BooleanConstructor;
        readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "default" | "text" | "primary" | "success" | "warning" | "info" | "danger", unknown, "", boolean>;
        readonly icon: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => any) | (() => any) | ((new (...args: any[]) => any) | (() => any))[], unknown, unknown, "", boolean>;
        readonly nativeType: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "reset" | "submit" | "button", unknown, "button", boolean>;
        readonly loading: BooleanConstructor;
        readonly loadingIcon: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => any) | (() => any) | ((new (...args: any[]) => any) | (() => any))[], unknown, unknown, () => any, boolean>;
        readonly plain: BooleanConstructor;
        readonly text: BooleanConstructor;
        readonly link: BooleanConstructor;
        readonly bg: BooleanConstructor;
        readonly autofocus: BooleanConstructor;
        readonly round: BooleanConstructor;
        readonly circle: BooleanConstructor;
        readonly color: StringConstructor;
        readonly dark: BooleanConstructor;
        readonly autoInsertSpace: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    }>>;
    showSubmitButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    submitButtonOptions: PropType<ExtractPropTypes<{
        readonly size: {
            readonly type: any;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly disabled: BooleanConstructor;
        readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "default" | "text" | "primary" | "success" | "warning" | "info" | "danger", unknown, "", boolean>;
        readonly icon: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => any) | (() => any) | ((new (...args: any[]) => any) | (() => any))[], unknown, unknown, "", boolean>;
        readonly nativeType: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "reset" | "submit" | "button", unknown, "button", boolean>;
        readonly loading: BooleanConstructor;
        readonly loadingIcon: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => any) | (() => any) | ((new (...args: any[]) => any) | (() => any))[], unknown, unknown, () => any, boolean>;
        readonly plain: BooleanConstructor;
        readonly text: BooleanConstructor;
        readonly link: BooleanConstructor;
        readonly bg: BooleanConstructor;
        readonly autofocus: BooleanConstructor;
        readonly round: BooleanConstructor;
        readonly circle: BooleanConstructor;
        readonly color: StringConstructor;
        readonly dark: BooleanConstructor;
        readonly autoInsertSpace: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    }>>;
    resetFunc: PropType<() => Promise<void>>;
    submitFunc: PropType<() => Promise<void>>;
    hideRequiredMark: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    labelAlign: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    };
    rowProps: PropType<ExtractPropTypes<{
        readonly tag: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
        readonly gutter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
        readonly justify: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown, "start", boolean>;
        readonly align: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "top" | "bottom" | "middle", unknown, "top", boolean>;
    }>>;
    rules: PropType<Partial<Record<string, import("element-plus/es/utils").Arrayable<import("element-plus").FormItemRule>>>>;
};
