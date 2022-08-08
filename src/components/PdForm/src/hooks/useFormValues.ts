import { IFormProps, IFormSchema } from '../types'
import { unref, Ref, ComputedRef } from 'vue'
import {
  isObject,
  isArray,
  isFunction,
  isString,
  isNullOrUnDef
} from '@/_utils/is'
import { set } from 'lodash-es'
interface UseFormValuesContext {
  defaultValueRef: Ref<any>
  getSchema: ComputedRef<IFormSchema[]>
  getProps: ComputedRef<IFormProps>
  formModel: Recordable
}
export function useFormValues({
  defaultValueRef,
  getSchema,
  // getProps,
  formModel
}: UseFormValuesContext) {
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {}
    }
    const res: Recordable = {}
    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue
      }
      if (isString(value)) {
        value = value.trim()
      }
      set(res, key, value)
    }
    return res
  }

  function initDefault() {
    const schemas = unref(getSchema)
    const obj: Recordable = {}
    schemas.forEach((item) => {
      const { defaultValue } = item
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue
        formModel[item.field] = defaultValue
      }
    })
    console.log(formModel)
    defaultValueRef.value = obj
  }

  return { handleFormValues, initDefault }
}
