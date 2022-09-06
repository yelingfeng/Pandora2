import { InjectionKey } from 'vue';
export interface CreateContextOptions {
    readonly?: boolean;
    createProvider?: boolean;
    native?: boolean;
}
export declare function createContext<T>(context: any, key?: InjectionKey<T>, options?: CreateContextOptions): {
    state: any;
};
export declare function useContext<T>(key: InjectionKey<T>, native?: boolean): T;
export declare function useContext<T>(key: InjectionKey<T>, defaultValue?: any, native?: boolean): T;
