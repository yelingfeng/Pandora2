import type { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    /**
   * Help text font size
   * @default: 14px
   */
    fontSize: {
        type: StringConstructor;
        default: string;
    };
    /**
     *
     * Whether to display the serial number
     * @default: false
     */
    tabindex: {
        type: BooleanConstructor;
    };
    /**
     * Help text list
     */
    placement: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Help text list
     */
    content: {
        type: PropType<string | string[]>;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: string;
    };
    /**
   * Help text font size
   * @default: 14px
   */
    fontSize: {
        type: StringConstructor;
        default: string;
    };
    /**
     *
     * Whether to display the serial number
     * @default: false
     */
    tabindex: {
        type: BooleanConstructor;
    };
    /**
     * Help text list
     */
    placement: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Help text list
     */
    content: {
        type: PropType<string | string[]>;
    };
}>>, {
    color: string;
    placement: string;
    tabindex: boolean;
    fontSize: string;
}>;
export default _sfc_main;
