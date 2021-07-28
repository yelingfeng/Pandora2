<script lang="tsx">
import {
  defineComponent,
  PropType,
  toRefs,
  unref,
  computed,
  onMounted
} from 'vue'
import { ElFormItem } from 'element-plus'
import { componentMap } from '../componentsMap'
import type { IFormSchema, IFormProps } from '../types'
import { upperFirst } from 'lodash-es'
import { isFunction } from '../../../_utils/is'

export default defineComponent({
  name: 'PandoraBasicFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<IFormSchema>,
      default: () => ({})
    },
    formModel: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    formProps: {
      type: Object as PropType<IFormProps>,
      default: () => ({})
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null
    }
  },
  setup(props, { slots }) {
    const { schema } = toRefs(props)

    const {
      component,
      label,
      field,
      changeEvent = 'change',
      defaultValue = ''
    } = unref(schema) as IFormSchema
    if (!componentMap.has(component)) {
      console.error(
        `FormItem component:${component} is an unregistered component Key`
      )
      return null
    }
    onMounted(() => {
      props.setFormModel(field, defaultValue)
    })
    const getComponentsProps = computed(() => {
      const { schema, formModel } = props
      const { componentProps = {} } = schema
      if (!isFunction(componentProps)) {
        return componentProps
      }
      return componentProps({ schema, formModel }) ?? {}
    })

    const getComponentsChild = () => {
      let childNode
      if (component === 'CheckboxGroup') {
        const { componentProps = {} } = unref(schema)
        childNode = componentProps.options.map(
          ({ label, value }: Recordable) => {
            const CheckNode = componentMap.get('Checkbox') as ReturnType<
              typeof defineComponent
            >
            return (
              <CheckNode label={value} key={value}>
                {label}
              </CheckNode>
            )
          }
        )
        return childNode
      } else if (component === 'Select') {
        const { componentProps = {} } = unref(schema)
        childNode = componentProps.options.map(
          ({ label, value }: Recordable) => {
            const OptionNode = componentMap.get('SelectOption') as ReturnType<
              typeof defineComponent
            >
            return (
              <OptionNode label={label} value={value} key={value}>
                {label}
              </OptionNode>
            )
          }
        )
      }
      return childNode
    }
    // props.setFormModel(field, defaultValue)
    const isCheck = component && ['Switch', 'Checkbox'].includes(component)

    const eventKey = `on${upperFirst(changeEvent)}`

    return () => {
      const { size } = props.formProps

      const propsData: Recordable = {
        size,
        ...unref(getComponentsProps)
      }
      const on = {
        [eventKey]: (...args: Nullable<Recordable>[]) => {
          const [e] = args
          if (propsData[eventKey]) {
            propsData[eventKey](...args)
          }
          const target = e ? e.target : null
          const value = target ? (isCheck ? target.checked : target.value) : e
          props.setFormModel(field, value)
        }
      }
      const Comp = componentMap.get(component) as ReturnType<
        typeof defineComponent
      >

      const compAttr = {
        // ...bindValue,
        ...propsData,
        ...on
      }
      // console.log(compAttr)
      return (
        <ElFormItem label={label}>
          <Comp v-model={props.formModel[field]} {...compAttr}>
            {getComponentsChild()}
          </Comp>
        </ElFormItem>
      )
    }
  }
})
</script>
