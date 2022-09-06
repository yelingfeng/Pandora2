import type { ComputedRef, Ref, EmitsOptions } from 'vue';
import type { IFormProps, IFormSchema, IFormActionType, Callback } from '../types/form';
import { FormItemProp } from 'element-plus';
interface UseFormActionContext {
    emit: EmitsOptions | [];
    getProps: ComputedRef<IFormProps>;
    getSchema: ComputedRef<IFormSchema[]>;
    formModel: Recordable;
    defaultValueRef: Ref<Recordable>;
    formElRef: Ref<IFormActionType>;
    schemaRef: Ref<IFormSchema[]>;
    handleFormValues: Fn;
}
export declare function useFormEvents({ emit, getProps, formModel, getSchema, defaultValueRef, formElRef, schemaRef, handleFormValues }: UseFormActionContext): {
    handleSubmit: (e?: Event | undefined) => Promise<void>;
    clearValidate: (name?: string | string[] | undefined) => Promise<void>;
    validate: (cb?: Callback | undefined) => Promise<any>;
    validateFields: (props?: FormItemProp[] | undefined, callback?: Callback | undefined) => Promise<any>;
    getFieldsValue: () => Recordable;
    updateSchema: (data: Partial<IFormSchema> | Partial<IFormSchema>[]) => Promise<void>;
    resetSchema: (data: Partial<IFormSchema> | Partial<IFormSchema>[]) => Promise<void>;
    appendSchemaByField: (schema: IFormSchema, prefixField?: string | undefined, first?: boolean) => Promise<void>;
    removeSchemaByFiled: (fields: string | string[]) => Promise<void>;
    resetFields: () => Promise<void>;
    setFieldsValue: (values: Recordable) => Promise<void>;
    scrollToField: (name: string, options?: ScrollOptions | undefined) => Promise<void>;
};
export {};
