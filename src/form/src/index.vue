<script lang="tsx">
import {
  defineComponent,
  reactive,
  ref,
  Ref,
  PropType,
  computed,
  unref,
  onBeforeMount,
  onMounted
} from 'vue'
import type { IFormActionType, IFormSchema, IFormProps } from './types'
import { ElForm } from 'element-plus'
import FormItem from './components/FormItem.vue'
import { createNamespace } from '../../_utils/create'
import { deepMerge } from '../../_utils/'
import { useFormValues } from './hooks/useFormValues'
import { useFormAction } from './hooks/useFormAction'
import { createFormContext } from './hooks/useFormContext'
const [name] = createNamespace('VForm')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    schemas: {
      type: [Array] as PropType<IFormSchema[]>,
      default: () => {}
    },
    model: {
      type: Object as PropType<Recordable>,
      default: {}
    },
    formProps: {
      type: Object as PropType<IFormProps>,
      default: {}
    }
  },
  setup(props, { emit }) {
    // const { schemas, formProps } = toRefs(props)
    const formModel = reactive<Recordable>({})
    const propsRef = ref<Partial<IFormProps>>({})
    const defaultValueRef = ref<Recordable>({})
    const schemaRef = ref<Nullable<IFormSchema[]>>(null)
    const formRef = ref<Nullable<IFormActionType>>(null)

    const getProps = computed(
      (): IFormProps => {
        return {
          ...props.formProps,
          ...unref(propsRef),
          ref: formRef,
          model: unref(formModel)
        } as IFormProps
      }
    )
    const getSchema = computed((): IFormSchema[] => {
      const schemas: IFormSchema[] = unref(schemaRef) || (props.schemas as any)
      return schemas as IFormSchema[]
    })

    // 初始化Form values
    const { initDefault, handleFormValues } = useFormValues({
      getProps,
      defaultValueRef,
      getSchema,
      formModel
    })

    const { resetFields, handleSubmit } = useFormAction({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef: formRef as Ref<IFormActionType>,
      schemaRef: schemaRef as Ref<IFormSchema[]>,
      handleFormValues
    })

    createFormContext({
      resetAction: resetFields,
      submitAction: handleSubmit
    })

    function setFormModel(key: string, value: any) {
      formModel[key] = value
    }

    onBeforeMount(() => {
      initDefault()
    })

    async function setProps(formProps: Partial<IFormProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    const formActionType: Partial<IFormActionType> = {
      resetFields,
      setProps
    }
    onMounted(() => {
      emit('register', formActionType)
    })

    const elItems = unref(getSchema).map(
      ({ field, component, label, ...args }) => {
        const schema = {
          field,
          component,
          label,
          ...args
        }
        const itemAttr = {
          schema,
          formModel,
          setFormModel
        }
        return <FormItem {...itemAttr}></FormItem>
      }
    )
    return () => {
      return (
        <div class="vpandora-form">
          <ElForm {...getProps.value}>
            <el-row>{elItems}</el-row>
          </ElForm>
        </div>
      )
    }
  }
})
</script>
