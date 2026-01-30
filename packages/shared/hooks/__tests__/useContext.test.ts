import { describe, expect, test } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { createContext, useContext } from '../core/useContext'

describe('useContext', () => {
  test('provides readonly reactive data by default', () => {
    const key = Symbol('k') as any

    const Child = defineComponent({
      setup() {
        const ctx: any = useContext(key)
        return () => h('div', ctx.a)
      }
    })

    const Parent = defineComponent({
      setup() {
        createContext({ a: 1 }, key)
        return () => h(Child)
      }
    })

    const wrapper = mount(Parent)
    expect(wrapper.text()).toBe('1')
  })

  test('native mode provides raw context', () => {
    const key = Symbol('k2') as any
    const raw = { a: 1 }

    const Child = defineComponent({
      setup() {
        const ctx: any = useContext(key)
        ctx.a = 2
        return () => h('div', String(ctx.a))
      }
    })

    const Parent = defineComponent({
      setup() {
        createContext(raw, key, { native: true })
        return () => h(Child)
      }
    })

    const wrapper = mount(Parent)
    expect(wrapper.text()).toBe('2')
    expect(raw.a).toBe(2)
  })

  test('readonly=false provides writable reactive data', () => {
    const key = Symbol('k3') as any

    const Child = defineComponent({
      setup() {
        const ctx: any = useContext(key)
        ctx.a = 2
        return () => h('div', String(ctx.a))
      }
    })

    const Parent = defineComponent({
      setup() {
        createContext({ a: 1 }, key, { readonly: false })
        return () => h(Child)
      }
    })

    const wrapper = mount(Parent)
    expect(wrapper.text()).toBe('2')
  })
})
