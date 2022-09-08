import type { ComponentType } from './types/index';
import { FormRules } from 'element-plus';
/**
 * @description: 生成placeholder
 */
export declare function createPlaceholderMessage(component: ComponentType): "" | "请输入内容" | "请选择内容";
export declare function setComponentRuleType(rule: FormRules, component: ComponentType, valueFormat: string): void;
export declare function processDateValue(attr: Recordable, component: string): void;
export declare function handleInputNumberValue(component?: ComponentType, val?: any): any;
/**
 * 时间字段
 */
export declare const dateItemType: string[];
export declare const defaultValueComponents: string[];
