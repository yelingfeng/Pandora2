import type { Ref } from 'vue';
export declare type RemoveEventFn = () => void;
export interface UseEventParams {
    el?: Element | Ref<Element | undefined> | Window | any;
    name: string;
    listener: EventListener;
    options?: boolean | AddEventListenerOptions;
    autoRemove?: boolean;
    isDebounce?: boolean;
    wait?: number;
}
export declare function useEventListener({ el, name, listener, options, autoRemove, isDebounce, wait }: UseEventParams): {
    removeEvent: RemoveEventFn;
};
