import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { defineComponent, nextTick, reactive } from 'vue'
import { useRuleFormItem } from '../component/useFormItem'

describe('useRuleFormItem', () => {
  test('emits change event when value changes', async () => {
    const Comp = defineComponent({
      setup() {
        const props = reactive({ value: 1 })
        const [state, setState] = useRuleFormItem(props, 'value', 'change')
        return { state, setState }
      },
      render() {
        return null
      }
    })

    const wrapper = mount(Comp)
    ;(wrapper.vm as any).state = 1
    await nextTick()
    expect(wrapper.emitted('change')).toBeUndefined()

    ;(wrapper.vm as any).setState(1)
    await nextTick()
    expect((wrapper.vm as any).state).toBe(1)

    ;(wrapper.vm as any).state = 2
    await nextTick()
    await nextTick()
    const emitted: any = wrapper.emitted('change')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBe(2)
  })
})
