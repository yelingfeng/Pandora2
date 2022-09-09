import { ComponentType } from './index';
import type { CSSProperties, VNode, ComputedRef, Ref } from 'vue';
import type { ValidateFieldsError } from 'async-validator';
import type { FormRules, FormItemProp, RowProps, ColProps, ButtonProps } from 'element-plus';
export declare type FieldMapToTime = [string, [string, string], string?][];
export interface IFormProps {
    name?: string;
    model?: Record<string, any>;
    labelPosition?: 'left' | 'right' | 'top';
    labelWidth?: string | number;
    labelSuffix?: string;
    size?: 'large' | 'default' | 'small';
    inline?: boolean;
    disabled?: boolean;
    rules?: FormRules;
    compact?: boolean;
    emptySpan?: number | Partial<ColProps>;
    rowProps?: RowProps;
    submitOnReset?: boolean;
    submitOnChange?: boolean;
    labelCol?: Partial<ColProps>;
    wrapperCol?: Partial<ColProps>;
    baseRowStyle?: CSSProperties;
    baseColProps?: Partial<ColProps>;
    schemas?: IFormSchema[];
    mergeDynamicData?: Recordable;
    autoSetPlaceHolder?: boolean;
    autoSubmitOnEnter?: boolean;
    rulesMessageJoinLabel?: boolean;
    showAdvancedButton?: boolean;
    autoFocusFirstItem?: boolean;
    autoAdvancedLine?: number;
    alwaysShowLines?: number;
    showActionButtonGroup?: boolean;
    fieldMapToTime?: FieldMapToTime;
    resetButtonOptions?: Partial<ButtonProps>;
    submitButtonOptions?: Partial<ButtonProps>;
    actionColOptions?: Partial<ColProps>;
    showResetButton?: boolean;
    showSubmitButton?: boolean;
    hideRequiredAsterisk?: boolean;
    showMessage?: boolean;
    inlineMessage?: boolean;
    statusIcon?: boolean;
    validateOnRuleChange?: boolean;
    resetFunc?: () => Promise<void>;
    submitFunc?: () => Promise<void>;
    transformDateFunc?: (date: any) => string;
}
export interface RenderCallbackParams {
    schema: IFormSchema;
    values: Recordable;
    model: Recordable;
    field: string;
}
export interface HelpComponentProps {
    maxWidth: string;
    showIndex: boolean;
    text: any;
    color: string;
    fontSize: string;
    icon: string;
    absolute: boolean;
    position: any;
}
/**
 * Form Schema
 */
export interface IFormSchema {
    field: string;
    label: string;
    changeEvent?: string;
    component: ComponentType;
    componentProps?: ((opt: {
        schema: IFormSchema;
        formModel: Recordable;
    }) => Recordable) | any;
    rules?: FormRules | FormRules[];
    required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
    suffix?: string | number | ((values: RenderCallbackParams) => string | number);
    rulesMessageJoinLabel?: boolean;
    itemProps?: Partial<FormItemProp>;
    colProps?: Partial<ColProps>;
    labelCol?: Partial<ColProps>;
    wrapperCol?: Partial<ColProps>;
    baseRowStyle?: CSSProperties;
    baseColProps?: Partial<ColProps>;
    valueField?: string;
    subLabel?: string;
    helpMessage?: string | string[] | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
    helpComponentProps?: Partial<HelpComponentProps>;
    defaultValue?: any;
    isAdvanced?: boolean;
    span?: number;
    ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
    show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
    render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;
    renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;
    renderComponentContent?: ((renderCallbackParams: RenderCallbackParams) => any) | VNode | VNode[] | string;
    slot?: string;
    colSlot?: string;
    dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
    dynamicRules?: (renderCallbackParams: RenderCallbackParams) => FormRules[];
}
export interface Callback {
    (isValid?: boolean, invalidFields?: ValidateFieldsError): void;
}
export declare type DynamicProps<T> = {
    [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};
export interface IFormActionType {
    submit: () => Promise<void>;
    resetFields: () => Promise<void>;
    validate: (cb: Callback | undefined) => Promise<void>;
    validateFields: (props?: Array<FormItemProp>, callback?: Callback) => Promise<void>;
    setFieldsValue: <T>(values: T) => Promise<void>;
    getFieldsValue: () => Recordable;
    clearValidate: (name?: string | string[]) => Promise<void>;
    updateSchema: (data: Partial<IFormSchema> | Partial<IFormSchema>[]) => Promise<void>;
    resetSchema: (data: Partial<IFormSchema> | Partial<IFormSchema>[]) => Promise<void>;
    setProps: (formProps: Partial<IFormProps>) => Promise<void>;
    removeSchemaByFiled: (field: string | string[]) => Promise<void>;
    appendSchemaByField?: (schema: IFormSchema, prefixField?: string | undefined, first?: boolean | any) => Promise<void>;
    scrollToField: (name: any, options?: ScrollOptions) => Promise<void>;
}
export declare type RegisterFn = (formInstance: IFormActionType) => void;
export declare type UseFormReturnType = [RegisterFn, IFormActionType];
export declare type NamePath = string | number | (string | number)[];
