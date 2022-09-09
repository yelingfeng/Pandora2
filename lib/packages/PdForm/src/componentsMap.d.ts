import type { Component } from 'vue';
import type { ComponentType } from './types';
declare const componentMap: Map<ComponentType, Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
export declare function add(compName: ComponentType, component: Component): void;
export declare function del(compName: ComponentType): void;
export { componentMap };
