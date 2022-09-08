import type { Ref } from 'vue';
interface Params {
    excludeListeners?: boolean;
    excludeKeys?: string[];
    excludeDefaultKeys?: boolean;
}
export declare function entries<T>(obj: Recordable<T>): [string, T][];
export declare function useAttrs(params?: Params): Ref<Recordable> | {};
export {};
