import { describe, expect, test, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import PdForm from '../src/index.vue'
import { useForm } from '../src/hooks/useForm'
import type { IFormSchema } from '../src/types'

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

type FormActions = ReturnType<typeof useForm>[1]

const schemas = [
  { field: 'name', component: 'Input', label: '姓名', defaultValue: 'Alice' },
  { field: 'age', component: 'InputNumber', label: '年龄' }
] as unknown as IFormSchema[]

/**
 * 挂载一个宿主组件，通过 useForm 的 register 拿到 PdForm 的命令式 API。
 * 这是 PdForm 对外暴露实例的标准用法，测试需与业务侧保持一致。
 */
async function mountWithForm() {
  let actions: FormActions | null = null

  const TestComp = defineComponent({
    setup() {
      const [register, formActions] = useForm({ schemas })
      actions = formActions
      return { register }
    },
    render() {
      return <PdForm onRegister={this.register} />
    }
  })

  const wrapper = mount(TestComp)
  // register 在子组件 onMounted 触发，需等两轮 tick 让 props 与 formElRef 就绪
  await nextTick()
  await nextTick()

  return { wrapper, actions: actions as unknown as FormActions }
}

describe('PdForm 表单值读写与 schema 更新', () => {
  test('setFieldsValue / getFieldsValue 读写一致', async () => {
    const { wrapper, actions } = await mountWithForm()

    await actions.setFieldsValue({ name: 'Bob' })
    await nextTick()

    expect(actions.getFieldsValue().name).toBe('Bob')

    wrapper.unmount()
  })

  test('updateSchema 更新指定 field 的属性', async () => {
    const { wrapper, actions } = await mountWithForm()

    await actions.updateSchema({ field: 'name', label: '用户名' })
    await nextTick()
    await nextTick()

    expect(wrapper.text()).toContain('用户名')
    expect(wrapper.text()).not.toContain('姓名')

    wrapper.unmount()
  })

  test('resetFields 恢复到 defaultValue', async () => {
    const { wrapper, actions } = await mountWithForm()

    await actions.setFieldsValue({ name: 'Bob' })
    await nextTick()
    expect(actions.getFieldsValue().name).toBe('Bob')

    await actions.resetFields()
    await nextTick()
    await nextTick()

    expect(actions.getFieldsValue().name).toBe('Alice')

    wrapper.unmount()
  })
})
