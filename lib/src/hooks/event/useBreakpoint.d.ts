import { ComputedRef } from 'vue';
import { sizeEnum, screenEnum } from '../../enums/breakpointEnum';
export interface CreateCallbackParams {
    screen: ComputedRef<sizeEnum | undefined>;
    width: ComputedRef<number>;
    realWidth: ComputedRef<number>;
    screenEnum: typeof screenEnum;
    screenMap: Map<sizeEnum, number>;
    sizeEnum: typeof sizeEnum;
}
export declare function useBreakpoint(): {
    screenRef: any;
    widthRef: ComputedRef<number>;
    screenEnum: typeof screenEnum;
    realWidthRef: ComputedRef<number>;
};
export declare function createBreakpointListen(fn?: (opt: CreateCallbackParams) => void): {
    screenRef: ComputedRef<sizeEnum | undefined>;
    screenEnum: typeof screenEnum;
    widthRef: ComputedRef<number>;
    realWidthRef: ComputedRef<number>;
};
