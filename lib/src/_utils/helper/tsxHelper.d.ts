import { Slots } from 'vue';
/**
 * @description:  Get slot to prevent empty error
 */
export declare function getSlot(slots: Slots, slot?: string, data?: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | null;
/**
 * extends slots
 * @param slots
 * @param excludeKeys
 */
export declare function extendSlots(slots: Slots, excludeKeys?: string[]): any;
