import { Ref } from 'vue';
import type { IFormSchema, IFormProps } from './types/form';
declare const _sfc_main: import("vue").DefineComponent<{
    model: {
        type: import("vue").PropType<Recordable<any>>;
        default: {};
    };
    labelWidth: {
        type: import("vue").PropType<string | number>;
        default: number;
    };
    fieldMapToTime: {
        type: import("vue").PropType<import("./types/form").FieldMapToTime>;
        default: () => never[];
    };
    schemas: {
        type: import("vue").PropType<IFormSchema[]>;
        default: () => never[];
    };
    mergeDynamicData: {
        type: import("vue").PropType<Recordable<any>>;
        default: null;
    };
    baseRowStyle: {
        type: import("vue").PropType<import("vue").CSSProperties>;
    };
    baseColProps: {
        type: import("vue").PropType<Partial<import("element-plus").ColProps>>;
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
        type: import("vue").PropType<number>;
        default: number;
    };
    showAdvancedButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    transformDateFunc: {
        type: import("vue").PropType<Fn>;
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
    actionColOptions: import("vue").PropType<Partial<import("element-plus").ColProps>>;
    showResetButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    autoFocusFirstItem: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    resetButtonOptions: import("vue").PropType<Partial<import("element-plus").ButtonProps>>;
    showSubmitButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    submitButtonOptions: import("vue").PropType<Partial<import("element-plus").ButtonProps>>;
    resetFunc: import("vue").PropType<() => Promise<void>>;
    submitFunc: import("vue").PropType<() => Promise<void>>;
    hideRequiredMark: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    labelAlign: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    };
    rowProps: import("vue").PropType<import("element-plus").RowProps>;
    rules: import("vue").PropType<Partial<Record<string, import("element-plus/es/utils").Arrayable<import("element-plus").FormItemRule>>>>;
}, {
    submit?: (() => Promise<void>) | undefined;
    resetFields?: (() => Promise<void>) | undefined;
    validate?: ((cb: import("./types/form").Callback | undefined) => Promise<void>) | undefined;
    validateFields?: ((props?: import("element-plus").FormItemProp[] | undefined, callback?: import("./types/form").Callback | undefined) => Promise<void>) | undefined;
    setFieldsValue?: (<T>(values: T) => Promise<void>) | undefined;
    getFieldsValue?: (() => Recordable<any>) | undefined;
    clearValidate?: ((name?: string | string[] | undefined) => Promise<void>) | undefined;
    updateSchema?: ((data: Partial<IFormSchema> | Partial<IFormSchema>[]) => Promise<void>) | undefined;
    resetSchema?: ((data: Partial<IFormSchema> | Partial<IFormSchema>[]) => Promise<void>) | undefined;
    setProps?: ((formProps: Partial<IFormProps>) => Promise<void>) | undefined;
    removeSchemaByFiled?: ((field: string | string[]) => Promise<void>) | undefined;
    appendSchemaByField?: ((schema: IFormSchema, prefixField?: string | undefined, first?: any) => Promise<void>) | undefined;
    scrollToField?: ((name: any, options?: ScrollOptions | undefined) => Promise<void>) | undefined;
    getBindValue: import("vue").ComputedRef<Recordable<any>>;
    handleToggleAdvanced: () => void;
    handleEnterPress: (e: KeyboardEvent) => void;
    formModel: Recordable<any>;
    defaultValueRef: Ref<Recordable<any>>;
    advanceState: {
        isAdvanced: boolean;
        hideAdvanceBtn: boolean;
        isLoad: boolean;
        actionSpan: number;
    };
    getRow: import("vue").ComputedRef<Recordable<any>>;
    getProps: import("vue").ComputedRef<IFormProps>;
    getRules: import("vue").ComputedRef<Partial<Record<string, import("element-plus/es/utils").Arrayable<import("element-plus").FormItemRule>>>>;
    formRef: Ref<{
        submit: () => Promise<void>;
        resetFields: () => Promise<void>;
        validate: (cb: import("./types/form").Callback | undefined) => Promise<void>;
        validateFields: (props?: import("element-plus").FormItemProp[] | undefined, callback?: import("./types/form").Callback | undefined) => Promise<void>;
        setFieldsValue: <T>(values: T) => Promise<void>;
        getFieldsValue: () => Recordable<any>;
        clearValidate: (name?: string | string[] | undefined) => Promise<void>;
        updateSchema: (data: Partial<IFormSchema> | Partial<IFormSchema>[]) => Promise<void>;
        resetSchema: (data: Partial<IFormSchema> | Partial<IFormSchema>[]) => Promise<void>;
        setProps: (formProps: Partial<IFormProps>) => Promise<void>;
        removeSchemaByFiled: (field: string | string[]) => Promise<void>;
        appendSchemaByField?: ((schema: IFormSchema, prefixField?: string | undefined, first?: any) => Promise<void>) | undefined;
        scrollToField: (name: any, options?: ScrollOptions | undefined) => Promise<void>;
    } | null>;
    getSchema: import("vue").ComputedRef<IFormSchema[]>;
    formActionType: any;
    setFormModel: (key: string, value: any) => void;
    getFormActionBindProps: import("vue").ComputedRef<Recordable<any>>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("submit" | "reset" | "advanced-change" | "register" | "field-value-change")[], "submit" | "reset" | "advanced-change" | "register" | "field-value-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    model: {
        type: import("vue").PropType<Recordable<any>>;
        default: {};
    };
    labelWidth: {
        type: import("vue").PropType<string | number>;
        default: number;
    };
    fieldMapToTime: {
        type: import("vue").PropType<import("./types/form").FieldMapToTime>;
        default: () => never[];
    };
    schemas: {
        type: import("vue").PropType<IFormSchema[]>;
        default: () => never[];
    };
    mergeDynamicData: {
        type: import("vue").PropType<Recordable<any>>;
        default: null;
    };
    baseRowStyle: {
        type: import("vue").PropType<import("vue").CSSProperties>;
    };
    baseColProps: {
        type: import("vue").PropType<Partial<import("element-plus").ColProps>>;
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
        type: import("vue").PropType<number>;
        default: number;
    };
    showAdvancedButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    transformDateFunc: {
        type: import("vue").PropType<Fn>;
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
    actionColOptions: import("vue").PropType<Partial<import("element-plus").ColProps>>;
    showResetButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    autoFocusFirstItem: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    resetButtonOptions: import("vue").PropType<Partial<import("element-plus").ButtonProps>>;
    showSubmitButton: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    } & {
        default: boolean;
    };
    submitButtonOptions: import("vue").PropType<Partial<import("element-plus").ButtonProps>>;
    resetFunc: import("vue").PropType<() => Promise<void>>;
    submitFunc: import("vue").PropType<() => Promise<void>>;
    hideRequiredMark: import("vue-types").VueTypeValidableDef<boolean> & {
        default: boolean;
    };
    labelAlign: import("vue-types").VueTypeValidableDef<string> & {
        default: string;
    };
    rowProps: import("vue").PropType<import("element-plus").RowProps>;
    rules: import("vue").PropType<Partial<Record<string, import("element-plus/es/utils").Arrayable<import("element-plus").FormItemRule>>>>;
}>> & {
    onSubmit?: ((...args: any[]) => any) | undefined;
    onReset?: ((...args: any[]) => any) | undefined;
    "onAdvanced-change"?: ((...args: any[]) => any) | undefined;
    onRegister?: ((...args: any[]) => any) | undefined;
    "onField-value-change"?: ((...args: any[]) => any) | undefined;
}, {
    size: string;
    disabled: boolean;
    model: Recordable<any>;
    labelWidth: string | number;
    showActionButtonGroup: boolean;
    showResetButton: boolean;
    showSubmitButton: boolean;
    showAdvancedButton: boolean;
    fieldMapToTime: import("./types/form").FieldMapToTime;
    schemas: IFormSchema[];
    mergeDynamicData: Recordable<any>;
    autoSetPlaceHolder: boolean;
    autoSubmitOnEnter: boolean;
    submitOnReset: boolean;
    submitOnChange: boolean;
    emptySpan: number;
    transformDateFunc: Fn;
    rulesMessageJoinLabel: boolean;
    autoAdvancedLine: number;
    alwaysShowLines: number;
    autoFocusFirstItem: boolean;
    hideRequiredMark: boolean;
    labelAlign: string;
}>;
export default _sfc_main;
