import type { IPageConfig } from '../types';
import { PropType } from 'vue';
export declare const getPagerProps: () => {
    option: {
        type: PropType<IPageConfig>;
        default(): IPageConfig;
    };
};
