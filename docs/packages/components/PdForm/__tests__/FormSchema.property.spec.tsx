import { describe, test, beforeAll, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import fc from 'fast-check'
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

/**
 * 挂载一个宿主组件，通过 useForm 的 register 拿到 PdForm 的命令式 API
 */
async function mountWithForm(schemas: IFormSchema[]) {
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
  await nextTick()
  await nextTick()

  return { wrapper, actions: actions as unknown as FormActions }
}

describe('PdForm 属性测试（Property-Based Tests）', () => {
  test('Property 3: setFieldsValue / getFieldsValue 读写一致性', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 20 }).map(s => s.trim()).filter(s => s.length > 0),
          age: fc.integer({ min: 1, max: 150 }),
          email: fc.emailAddress()
        }),
        async (values) => {
          const schemas: IFormSchema[] = [
            { field: 'name', component: 'Input', label: '姓名' },
            { field: 'age', component: 'InputNumber', label: '年龄' },
            { field: 'email', component: 'Input', label: '邮箱' }
          ] as unknown as IFormSchema[]

          const { wrapper, actions } = await mountWithForm(schemas)

          // 写入任意值
          await actions.setFieldsValue(values)
          await nextTick()

          // 读取应与写入一致
          const readValues = actions.getFieldsValue()
          expect(readValues.name).toBe(values.name)
          expect(readValues.age).toBe(values.age)
          expect(readValues.email).toBe(values.email)

          wrapper.unmount()
        }
      ),
      { numRuns: 20 }
    )
  })

  test('Property 4: updateSchema 字段属性更新生效', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          field: fc.constantFrom('name', 'age', 'email'),
          newLabel: fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0)
        }),
        async ({ field, newLabel }) => {
          const schemas: IFormSchema[] = [
            { field: 'name', component: 'Input', label: '原始姓名' },
            { field: 'age', component: 'InputNumber', label: '原始年龄' },
            { field: 'email', component: 'Input', label: '原始邮箱' }
          ] as unknown as IFormSchema[]

          const { wrapper, actions } = await mountWithForm(schemas)

          // 更新指定字段的 label
          await actions.updateSchema({ field, label: newLabel })
          await nextTick()
          await nextTick()

          // 新 label 应出现在 DOM 中
          expect(wrapper.text()).toContain(newLabel.trim())

          wrapper.unmount()
        }
      ),
      { numRuns: 20 }
    )
  })

  test('Property 5: resetFields 恢复 defaultValue', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          defaultName: fc.string({ minLength: 1, maxLength: 20 }).map(s => s.trim()).filter(s => s.length > 0),
          defaultAge: fc.integer({ min: 1, max: 150 }),
          newName: fc.string({ minLength: 1, maxLength: 20 }).map(s => s.trim()).filter(s => s.length > 0),
          newAge: fc.integer({ min: 1, max: 150 })
        }),
        async ({ defaultName, defaultAge, newName, newAge }) => {
          const schemas: IFormSchema[] = [
            { field: 'name', component: 'Input', label: '姓名', defaultValue: defaultName },
            { field: 'age', component: 'InputNumber', label: '年龄', defaultValue: defaultAge }
          ] as unknown as IFormSchema[]

          const { wrapper, actions } = await mountWithForm(schemas)

          // 修改值
          await actions.setFieldsValue({ name: newName, age: newAge })
          await nextTick()

          // 重置后应恢复到 defaultValue
          await actions.resetFields()
          await nextTick()
          await nextTick()

          const values = actions.getFieldsValue()
          expect(values.name).toBe(defaultName)
          expect(values.age).toBe(defaultAge)

          wrapper.unmount()
        }
      ),
      { numRuns: 20 }
    )
  })
})
