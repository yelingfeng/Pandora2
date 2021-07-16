import type { Component } from 'vue'
import type { ComponentType } from './types'
import {
  ElAutocomplete,
  ElButton,
  ElCheckbox,
  ElCascader,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElTimePicker,
  ElTimeSelect,
  ElSlider,
  ElSelect,
  ElRadio,
  ElSwitch,
  ElRate
} from 'element-plus'
const componentMap = new Map<ComponentType, Component>()

componentMap.set('Autocomplete', ElAutocomplete)
componentMap.set('Button', ElButton)
componentMap.set('Checkbox', ElCheckbox)
componentMap.set('Cascader', ElCascader)
componentMap.set('DatePicker', ElDatePicker)
componentMap.set('Input', ElInput)
componentMap.set('InputNumber', ElInputNumber)
componentMap.set('TimePicker', ElTimePicker)
componentMap.set('TimeSelect', ElTimeSelect)
componentMap.set('Slider', ElSlider)
componentMap.set('Select', ElSelect)
componentMap.set('Switch', ElSwitch)
componentMap.set('Radio', ElRadio)
componentMap.set('Rate', ElRate)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
