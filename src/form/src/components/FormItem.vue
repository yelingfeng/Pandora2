<script lang="tsx">
import { defineComponent, PropType, toRefs, unref } from 'vue'
import { ElFormItem } from 'element-plus'
import { componentMap } from '../componentsMap'
import type { FormItemProps, IFormSchema } from '../types'

export default defineComponent({
  name: 'PandoraBasicFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<FormItemProps['schema']>,
      default: () => ({})
    },
    model: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    formProps: {
      type: Object as PropType<FormItemProps['formProps']>,
      default: () => ({})
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null
    }
  },
  setup(props) {
    return () => {
      const { schema } = toRefs(props)

      const { component, label, field } = unref(schema) as IFormSchema
      if (!componentMap.has(component)) {
        console.error(
          `FormItem component:${component} is an unregistered component Key`
        )
        return null
      }

      // props.setFormModel(field, defaultValue)

      const Comp = componentMap.get(component) as ReturnType<
        typeof defineComponent
      >
      // const isCheck = component && ['Switch', 'Checkbox'].includes(component)
      // const bindValue: Recordable = {
      //   modelValue: props.model[field]
      // }
      // console.log(bindValue)
      // const compAttr = {
      //   ...bindValue
      // }
      return (
        <ElFormItem label={label}>
          <Comp v-model={props.model[field]} />
        </ElFormItem>
      )
    }
  }
})
</script>
