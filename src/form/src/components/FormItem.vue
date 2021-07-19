<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { ElFormItem, ElInput } from 'element-plus'
import { componentMap } from '../componentsMap'

export default defineComponent({
  name: 'PandoraBasicFormItem',
  inheritAttrs: false,
  props: {
    option: Object as PropType<any>
  },
  setup(props) {
    return () => {
      const { component, label, value } = props.option
      if (!componentMap.has(component)) {
        console.error(
          `FormItem component:${component} is an unregistered component Key`
        )
        return null
      }
      console.log(component)
      return (
        <ElFormItem label={label}>
          <ElInput v-model={value} />
        </ElFormItem>
      )
    }
  }
})
</script>
