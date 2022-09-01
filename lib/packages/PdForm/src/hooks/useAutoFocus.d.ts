import type { ComputedRef, Ref } from 'vue';
import type { IFormSchema, IFormActionType, IFormProps } from '../types/form';
interface UseAutoFocusContext {
    getSchema: ComputedRef<IFormSchema[]>;
    getProps: ComputedRef<IFormProps>;
    isInitedDefault: Ref<boolean>;
    formElRef: Ref<IFormActionType>;
}
export declare function useAutoFocus({ getSchema, getProps, formElRef, isInitedDefault }: UseAutoFocusContext): Promise<void>;
export {};
