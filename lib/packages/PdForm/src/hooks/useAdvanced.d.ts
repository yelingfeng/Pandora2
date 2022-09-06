import type { AdvanceState } from '../types/hooks';
import type { IFormProps, IFormSchema } from '../types/form';
import { ComputedRef, Ref } from 'vue';
interface UseAdvancedContext {
    advanceState: AdvanceState;
    emit: EmitType;
    getProps: ComputedRef<IFormProps>;
    getSchema: ComputedRef<IFormSchema[]>;
    formModel: Recordable;
    defaultValueRef: Ref<Recordable>;
}
export default function ({ advanceState, emit, getProps, getSchema, formModel, defaultValueRef }: UseAdvancedContext): {
    handleToggleAdvanced: () => void;
};
export {};
