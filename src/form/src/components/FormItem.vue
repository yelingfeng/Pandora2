<script lang="tsx">
import { defineComponent, PropType, toRefs, unref, computed } from 'vue'
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
    model: {
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
    return () => {
      const { schema } = toRefs(props)

      const { component, label, field, changeEvent = 'change' } = unref(
        schema
      ) as IFormSchema
      if (!componentMap.has(component)) {
        console.error(
          `FormItem component:${component} is an unregistered component Key`
        )
        return null
      }

      const getComponentsProps = computed(() => {
        const { schema, model } = props
        const { componentProps = {} } = schema
        if (!isFunction(componentProps)) {
          return componentProps
        }
        return componentProps({ schema, model }) ?? {}
      })

      const getComponentsChild = () => {
        let childNode
        if (component === 'CheckboxGroup') {
          const { componentProps = {} } = unref(schema)
          childNode = componentProps.options.map((item: Recordable) => {
            const Check = componentMap.get('Checkbox') as ReturnType<
              typeof defineComponent
            >
            return <Check label={item.label} key={item.value} />
          })
          return childNode
        }
        return childNode
      }

      // props.setFormModel(field, defaultValue)
      const isCheck = component && ['Switch', 'Checkbox'].includes(component)

      const eventKey = `on${upperFirst(changeEvent)}`

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
      const { size } = props.formProps

      const propsData: Recordable = {
        // allowClear: true,
        // getPopupContainer: (trigger: Element) => trigger.parentNode,
        size,
        ...unref(getComponentsProps)
        // disabled: false
      }

      const Comp = componentMap.get(component) as ReturnType<
        typeof defineComponent
      >
      // const isCheck = component && ['Switch', 'Checkbox'].includes(component)
      const bindValue: Recordable = {
        [isCheck ? 'checked' : 'value']: props.model[field]
      }

      const compAttr = {
        ...bindValue,
        ...propsData,
        ...on
      }
      console.log(compAttr)
      return (
        <ElFormItem label={label}>
          <Comp v-model={props.model[field]} {...compAttr}>
            {getComponentsChild()}
          </Comp>
        </ElFormItem>
      )
    }
  }
})
</script>
