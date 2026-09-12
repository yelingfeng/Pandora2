import { describe, expect, test, beforeAll, vi } from 'vitest'
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

const requiredSchemas = [
  { field: 'name', component: 'Input', label: '姓名', required: true }
] as unknown as IFormSchema[]

describe('PdForm 必填校验', () => {
  test('required: true 的字段在提交前触发校验', async () => {
    let actions: FormActions | null = null

    const TestComp = defineComponent({
      setup() {
        const [register, formActions] = useForm({ schemas: requiredSchemas })
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

    // PdForm 在 setup 阶段即通过 formElRef 持有 ElForm 实例，
    // 因此需要在提交前替换该实例上的 validate，以确认校验确实被触发。
    const formVm: any = wrapper.findComponent(PdForm).vm
    const elFormInstance = formVm.formRef
    expect(elFormInstance).toBeTruthy()

    const realValidate = elFormInstance.validate
    const validateSpy = vi.fn((cb?: any) => {
      // 桥接 element-plus 的 Promise 风格与 PdForm 使用的回调风格
      return Promise.resolve(realValidate ? true : false).then((valid) => {
        cb?.(valid, {})
        return valid
      })
    })
    elFormInstance.validate = validateSpy

    try {
      await (actions as unknown as FormActions).submit()
      await nextTick()

      expect(validateSpy).toHaveBeenCalled()

      wrapper.unmount()
    } finally {
      elFormInstance.validate = realValidate
    }
  })
})
