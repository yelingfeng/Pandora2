<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { createNamespace } from '../../_utils/create'
import { ElForm, ElFormItem, ElInput } from 'element-plus'

const [name] = createNamespace('VForm')
export default defineComponent({
  name,
  inheritAttrs: false,
  setup(props, { emit }) {
    const formLabelAlign = ref({
      name: '',
      region: '',
      type: ''
    })

    const name = ref('123')
    const region = ref('xxxx')
    const type = ref('11')
    const formProps = {
      'label-position': 'left',
      'label-width': '100px'
    }
    const items = [
      { label: '名称', value: name.value },
      { label: '活动区域', value: region.value },
      { label: '活动形式', value: type.value }
    ]
    return () => {
      const elItems = items.map((item) => {
        return (
          <ElFormItem label={item.label}>
            <ElInput v-model={item.value} />
          </ElFormItem>
        )
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
