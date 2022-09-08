import type { UnwrapRef, Ref, WritableComputedRef, DeepReadonly } from 'vue';
export declare function useRuleFormItem<T extends Recordable, K extends keyof T, V = UnwrapRef<T[K]>>(props: T, key?: K, changeEvent?: any, emitData?: Ref<any[]>): [WritableComputedRef<V>, (val: V) => void, DeepReadonly<V>];
