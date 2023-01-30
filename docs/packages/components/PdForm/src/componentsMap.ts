import type { Component } from 'vue'
import type { ComponentType } from './types'
import {
  ElAutocomplete,
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElCascader,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElTimePicker,
  ElTimeSelect,
  ElSlider,
  ElSelect,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSwitch,
  ElRate,
  ElDivider
} from 'element-plus'
import ApiSelect from './components/ApiSelect.vue'
const componentMap = new Map<ComponentType, Component>()

componentMap.set('Autocomplete', ElAutocomplete)
componentMap.set('Button', ElButton)
componentMap.set('Checkbox', ElCheckbox)
componentMap.set('CheckboxGroup', ElCheckboxGroup)
componentMap.set('Cascader', ElCascader)
componentMap.set('DatePicker', ElDatePicker)
componentMap.set('Input', ElInput)
componentMap.set('InputNumber', ElInputNumber)
componentMap.set('TimePicker', ElTimePicker)
componentMap.set('TimeSelect', ElTimeSelect)
componentMap.set('Slider', ElSlider)
componentMap.set('Select', ElSelect)
componentMap.set('SelectOption', ElOption)
componentMap.set('Switch', ElSwitch)
componentMap.set('Radio', ElRadio)
componentMap.set('RadioGroup', ElRadioGroup)
componentMap.set('Rate', ElRate)
componentMap.set('Divider', ElDivider)
componentMap.set('ApiSelect', ApiSelect)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
