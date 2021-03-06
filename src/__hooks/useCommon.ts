import { ref, onBeforeMount, computed } from 'vue'
import { IFormItemCompOpt } from '../types/form'
import { isFunction } from '../_utils/is'
/**
 * formItem 通用方法 hooks
 * @param option
 */
export function useFormItemMethod(option: IFormItemCompOpt) {
  const vmodel = ref('')

  const getValue = () => {
    return { [option.id]: vmodel.value }
  }
  const setValue = (val: string) => {
    if (val !== undefined) vmodel.value = val
  }
  const setDisabled = (val: boolean) => {
    if (val !== undefined) option.disabled = val
  }

  const widthStyle = computed(() => {
    return { width: option.width + 'px' }
  })

  const clickHandler = (...args: any) => {
    if (option.click && isFunction(option.click)) {
      option.click(args)
    }
  }

  onBeforeMount(() => {
    vmodel.value = option.value
  })
  return {
    option,
    vmodel,
    widthStyle,
    getValue,
    setValue,
    setDisabled,
    clickHandler
  }
}
