import { PropType } from 'vue';
declare type OptionsItem = {
    label: string;
    value: string;
    disabled?: boolean;
};
declare const _sfc_main: import("vue").DefineComponent<{
    value: (ObjectConstructor | NumberConstructor | StringConstructor | ArrayConstructor)[];
    numberToString: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    api: {
        type: PropType<(arg?: Recordable<any> | undefined) => Promise<OptionsItem[]>>;
        default: null;
    };
    params: {
        type: PropType<Recordable<any>>;
        default: () => {};
    };
    resultField: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    } & {
        default: string;
    };
    labelField: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    } & {
        default: string;
    };
    valueField: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    } & {
        default: string;
    };
    immediate: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    alwaysLoad: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
}, {
    state: import("vue").WritableComputedRef<string | number | unknown[] | Record<string, any> | undefined>;
    attrs: {} | import("vue").Ref<Recordable<any>>;
    getOptions: import("vue").ComputedRef<OptionsItem[]>;
    loading: import("vue").Ref<boolean>;
    handleFetch: (visible: any) => Promise<void>;
    handleChange: (_: any, ...args: any[]) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "options-change")[], "change" | "options-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: (ObjectConstructor | NumberConstructor | StringConstructor | ArrayConstructor)[];
    numberToString: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    api: {
        type: PropType<(arg?: Recordable<any> | undefined) => Promise<OptionsItem[]>>;
        default: null;
    };
    params: {
        type: PropType<Recordable<any>>;
        default: () => {};
    };
    resultField: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    } & {
        default: string;
    };
    labelField: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    } & {
        default: string;
    };
    valueField: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    } & {
        default: string;
    };
    immediate: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    alwaysLoad: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onOptions-change"?: ((...args: any[]) => any) | undefined;
}, {
    numberToString: boolean;
    api: (arg?: Recordable<any> | undefined) => Promise<OptionsItem[]>;
    params: Recordable<any>;
    resultField: string;
    labelField: string;
    valueField: string;
    immediate: boolean;
    alwaysLoad: boolean;
}>;
export default _sfc_main;
