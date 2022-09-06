import { App } from 'vue';
export declare type WithInstall<T> = T & {
    install(app: App): void;
};
export declare function withInstall<T>(options: any): WithInstall<T>;
