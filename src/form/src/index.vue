<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { createNamespace } from '../../_utils/create'
import { ElForm } from 'element-plus'
import FormItem from './components/FormItem.vue'

const [name] = createNamespace('VForm')
export default defineComponent({
  name,
  inheritAttrs: false,
  setup(props, { emit }) {
    const name = ref('123')
    const region = ref('xxxx')
    const type = ref('11')
    const formProps = {
      'label-position': 'left',
      'label-width': '100px'
    }
    const items = [
      { component: 'Input', label: '名称', value: name.value },
      { component: 'Input', label: '活动区域', value: region.value },
      { component: 'Input', label: '活动形式', value: type.value }
    ]
    return () => {
      const elItems = items.map((item) => {
        return <FormItem option={item}></FormItem>
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
