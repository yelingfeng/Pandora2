import { Slots } from 'vue';
/**
 * @description:  Get slot to prevent empty error
 */
export declare function getSlot(slots: Slots, slot?: string, data?: any): any;
/**
 * extends slots
 * @param slots
 * @param excludeKeys
 */
export declare function extendSlots(slots: Slots, excludeKeys?: string[]): any;
