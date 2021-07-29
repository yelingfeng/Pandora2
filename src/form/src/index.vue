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
import { createNamespace } from '../../_utils/create'
import { ElForm } from 'element-plus'
import { useFormValues } from './hooks/useFormValues'
import { useFormAction } from './hooks/useFormAction'
import { createFormContext } from './hooks/useFormContext'
import type { IFormActionType, IFormSchema, IFormProps } from './types'
import FormItem from './components/FormItem.vue'
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
        return { ...props.formProps, ...unref(propsRef) } as IFormProps
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

    const formActionType: Partial<IFormActionType> = {
      resetFields
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
    // const formProps = {
    //   ref: formRef,
    //   // size: 'mini',
    //   inline: true,
    //   labelPosition: 'right',
    //   labelWidth: '100px',
    //   model: formModel
    // }
    // const items = [
    //   {
    //     field: 'name',
    //     component: 'Input',
    //     label: '名称',
    //     model: formModel,
    //     defaultValue: '斗罗大陆'
    //   },
    //   {
    //     field: 'region',
    //     component: 'Input',
    //     label: '活动区域',
    //     model: formModel,
    //     defaultValue: '海神岛'
    //   },
    //   {
    //     field: 'city',
    //     component: 'Select',
    //     label: '活动城市',
    //     model: formModel,
    //     defaultValue: 'beijing',
    //     componentProps: {
    //       placeholder: '请选择城市',
    //       clearable: true,
    //       options: [
    //         {
    //           label: '北京',
    //           value: 'beijing'
    //         },
    //         {
    //           label: '上海',
    //           value: 'shanghai'
    //         },
    //         {
    //           label: '沈阳',
    //           value: 'shenyang'
    //         },
    //         {
    //           label: '广州',
    //           value: 'guangzhou'
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     field: 'type',
    //     component: 'CheckboxGroup',
    //     label: '活动形式',
    //     model: formModel,
    //     defaultValue: ['1', '2'],
    //     componentProps: {
    //       options: [
    //         {
    //           label: '选项1',
    //           value: '1'
    //         },
    //         {
    //           label: '选项2',
    //           value: '2'
    //         },
    //         {
    //           label: '选项3',
    //           value: '3'
    //         },
    //         {
    //           label: '选项4',
    //           value: '4'
    //         }
    //       ]
    //     }
    //   }
    // ] as any[]
    return () => {
      return (
        <div class="vpandora-form">
          <ElForm {...getProps.value}>{elItems}</ElForm>
        </div>
      )
    }
  }
})
</script>
