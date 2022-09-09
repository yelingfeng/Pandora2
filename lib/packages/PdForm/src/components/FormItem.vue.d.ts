import { PropType } from 'vue';
import type { IFormSchema, IFormProps, IFormActionType } from '../types/form';
declare const _sfc_main: import("vue").DefineComponent<{
    schema: {
        type: PropType<IFormSchema>;
        default: () => {};
    };
    formModel: {
        type: PropType<Recordable<any>>;
        default: () => {};
    };
    formProps: {
        type: PropType<IFormProps>;
        default: () => {};
    };
    setFormModel: {
        type: PropType<(key: string, value: any) => void>;
        default: null;
    };
    allDefaultValues: {
        type: PropType<Recordable<any>>;
        default: () => {};
    };
    tableAction: {
        type: PropType<Recordable<any>>;
    };
    formActionType: {
        type: PropType<IFormActionType>;
    };
}, () => JSX.Element | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    schema: {
        type: PropType<IFormSchema>;
        default: () => {};
    };
    formModel: {
        type: PropType<Recordable<any>>;
        default: () => {};
    };
    formProps: {
        type: PropType<IFormProps>;
        default: () => {};
    };
    setFormModel: {
        type: PropType<(key: string, value: any) => void>;
        default: null;
    };
    allDefaultValues: {
        type: PropType<Recordable<any>>;
        default: () => {};
    };
    tableAction: {
        type: PropType<Recordable<any>>;
    };
    formActionType: {
        type: PropType<IFormActionType>;
    };
}>>, {
    schema: IFormSchema;
    formModel: Recordable<any>;
    formProps: IFormProps;
    setFormModel: (key: string, value: any) => void;
    allDefaultValues: Recordable<any>;
}>;
export default _sfc_main;
