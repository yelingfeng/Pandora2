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
      name: '',
      region: '',
      type: []
    })
    const formRef = ref<Nullable<IFormActionType>>(null)
    function setFormModel(key: string, value: any) {
      formModel[key] = value
    }
    const formProps = {
      ref: formRef,
      // size: 'mini',
      labelPosition: 'left',
      labelWidth: '100px',
      model: formModel
    }
    const items = [
      {
        field: 'name',
        component: 'Input',
        label: '名称',
        model: formModel,
        defaultValue: '斗罗大陆'
      },
      {
        field: 'region',
        component: 'Input',
        label: '活动区域',
        model: formModel,
        defaultValue: '海神岛'
      },
      {
        field: 'type',
        component: 'CheckboxGroup',
        label: '活动形式',
        model: formModel,
        defaultValue: ['1', '2'],
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1'
            },
            {
              label: '选项2',
              value: '2'
            },
            {
              label: '选项3',
              value: '3'
            },
            {
              label: '选项4',
              value: '4'
            }
          ]
        }
      }
    ] as any[]
    return () => {
      const elItems = items.map(
        ({ field, component, label, model, ...args }) => {
          const schema = {
            field,
            component,
            label,
            ...args
          }
          const itemAttr = {
            schema,
            model,
            setFormModel
          }
          return <FormItem {...itemAttr}></FormItem>
        }
      )

      return (
        <div class="vpandora-form">
          <ElForm {...formProps}>{elItems}</ElForm>
        </div>
      )
    }
  }
})
</script>
