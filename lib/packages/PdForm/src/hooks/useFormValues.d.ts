import { IFormProps, IFormSchema } from '../types/form';
import { Ref, ComputedRef } from 'vue';
interface UseFormValuesContext {
    defaultValueRef: Ref<any>;
    getSchema: ComputedRef<IFormSchema[]>;
    getProps: ComputedRef<IFormProps>;
    formModel: Recordable;
}
export declare function useFormValues({ defaultValueRef, getSchema, getProps, formModel }: UseFormValuesContext): {
    handleFormValues: (values: Recordable) => Recordable<any>;
    initDefault: () => void;
};
export {};
