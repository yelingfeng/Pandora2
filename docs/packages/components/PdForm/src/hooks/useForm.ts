import type {
  IFormProps,
  IFormSchema,
  DynamicProps,
  UseFormReturnType,
  IFormActionType
} from '../types'
import { ref, watch, onUnmounted, unref, nextTick } from 'vue'
import { isProdMode } from '@/_utils/env'
import { getDynamicProps, error } from '@/_utils'
type Props = Partial<DynamicProps<IFormProps>>
export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<IFormActionType>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)

  async function getForm() {
    const form = unref(formRef)
    if (!form) {
      error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      )
    }
    await nextTick()
    return form as IFormActionType
  }

  const register = (instance: IFormActionType) => {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null
        loadedRef.value = null
      })
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return

    formRef.value = instance
    loadedRef.value = true

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: IFormActionType = {
    setProps: async (formProps: Partial<IFormProps>) => {
      const form = await getForm()
      form.setProps(formProps)
    },

    updateSchema: async (
      data: Partial<IFormSchema> | Partial<IFormSchema>[]
    ) => {
      const form = await getForm()
      form.updateSchema(data)
    },

    resetSchema: async (
      data: Partial<IFormSchema> | Partial<IFormSchema>[]
    ) => {
      const form = await getForm()
      form.resetSchema(data)
    },

    clearValidate: async (name?: string | string[]) => {
      const form = await getForm()
      form.clearValidate(name)
    },

    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields()
      })
    },

    removeSchemaByFiled: async (field: string | string[]) => {
      unref(formRef)?.removeSchemaByFiled(field)
    },

    // TODO promisify
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T
    },

    setFieldsValue: async <T>(values: T) => {
      const form = await getForm()
      form.setFieldsValue<T>(values)
    },

    appendSchemaByField: async (
      schema: IFormSchema,
      prefixField: string | undefined,
      first: boolean
    ) => {
      const form = await getForm()
      form?.appendSchemaByField!(schema, prefixField, first)
    },

    submit: async (): Promise<any> => {
      const form = await getForm()
      return form.submit()
    }
  }

  return [register, methods]
}
