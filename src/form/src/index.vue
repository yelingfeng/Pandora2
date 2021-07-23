<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'
import { createNamespace } from '../../_utils/create'
import { ElForm } from 'element-plus'
import FormItem from './components/FormItem.vue'
import type { IFormActionType } from './types'
const [name] = createNamespace('VForm')
export default defineComponent({
  name,
  inheritAttrs: false,
  setup(props, { emit }) {
    const formModel = reactive<Recordable>({
      name: '战三',
      region: '北京',
      type: '1'
    })
    const formRef = ref<Nullable<IFormActionType>>(null)
    function setFormModel(key: string, value: any) {
      formModel[key] = value
    }
    const formProps = {
      ref: formRef,
      'label-position': 'left',
      'label-width': '100px',
      model: formModel
    }
    const items = [
      {
        field: 'name',
        component: 'Input',
        label: '名称',
        model: formModel,
        defaultValue: '1'
      },
      {
        field: 'region',
        component: 'Input',
        label: '活动区域',
        model: formModel,
        defaultValue: '2'
      },
      {
        field: 'type',
        component: 'Input',
        label: '活动形式',
        model: formModel,
        defaultValue: '3'
      }
    ] as any[]
    return () => {
      const elItems = items.map(({ field, component, label, model }) => {
        const schema = {
          field,
          component,
          label
        }
        const itemAttr = {
          schema,
          model,
          setFormModel
        }
        return <FormItem {...itemAttr}></FormItem>
      })

      return (
        <div class="vpandora-form">
          <div class="vpandora-form-items">
            <ElForm {...formProps}>{elItems}</ElForm>
          </div>
        </div>
      )
    }
  }
})
</script>
