// import type { FormRules } from 'element-plus'
import type { ComponentType } from './types/index'
// import { useI18n } from '@/hooks/web/useI18n'
import { dateUtil } from '@pandora/shared/_utils/dateUtil'
import { isNumber, isObject } from '@pandora/shared/_utils/is'
import { FormRules } from 'element-plus'

// const { t } = useI18n()

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('Complete')) {
    return '请输入内容'
  }
  if (component.includes('Picker')) {
    return '请选择内容'
  }
  if (
    component.includes('Select') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    // return `请选择${label}`;
    return '请选择内容'
  }
  return ''
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker']

function genType() {
  return [...DATE_TYPE, 'RangePicker']
}

export function setComponentRuleType(
  rule: FormRules,
  component: ComponentType,
  valueFormat: string
) {
  if (
    ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(
      component
    )
  ) {
    rule.type = (valueFormat ? 'string' : 'object') as any
  } else if (
    ['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)
  ) {
    rule.type = 'array' as any
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number' as any
  }
}

export function processDateValue(attr: Recordable, component: string) {
  const { valueFormat, value } = attr
  if (valueFormat) {
    attr.value = isObject(value) ? dateUtil(value as any).format(valueFormat) : value
  } else if (DATE_TYPE.includes(component) && value) {
    attr.value = dateUtil(attr.value)
  }
}

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val
  if (
    ['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(
      component
    )
  ) {
    return val && isNumber(val) ? `${val}` : val
  }
  return val
}
/**
 * 时间字段
 */
export const dateItemType = genType()

export const defaultValueComponents = [
  'Input',
  'InputPassword',
  'InputSearch',
  'InputTextArea'
]
