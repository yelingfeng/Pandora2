import type { IPageConfig } from '../types';
export declare const getPagerProps: () => {
    option: {
        type: PropType<IPageConfig>;
        default(): IPageConfig;
    };
};
