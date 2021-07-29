import { ComputedRef, Ref, toRaw, unref } from 'vue'
import { IFormProps, IFormSchema, IFormActionType } from './../types'
import { isFunction } from '../../../_utils/is'

interface UseFormActionContext {
  emit: EmitType
  getProps: ComputedRef<IFormProps>
  getSchema: ComputedRef<IFormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
  formElRef: Ref<IFormActionType>
  schemaRef: Ref<IFormSchema[]>
  handleFormValues: Fn
}

export function useFormAction({
  emit,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef,
  schemaRef,
  handleFormValues
}: UseFormActionContext) {
  // reset Form
  async function resetFields(): Promise<void> {
    const { resetFunc } = unref(getProps)
    if (resetFunc && isFunction(resetFunc)) {
      await resetFunc()
      return
    }
    const formEl = unref(formElRef)
    console.log(formEl)
    if (!formEl) return

    formEl?.resetFields()
    emit('reset', toRaw(formModel))
  }

  async function validate(callback: Fn) {
    return await unref(formElRef)?.validate(callback)
  }

  /**
   * @description: Form submission
   */
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault()
    const { submitFunc } = unref(getProps)
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc()
      return
    }
    const formEl = unref(formElRef)
    if (!formEl) return
    try {
      const values = await validate()
      const res = handleFormValues(values)
      emit('submit', res)
    } catch (error) {
      throw new Error(error)
    }
  }
  return {
    resetFields,
    handleSubmit
  }
}
