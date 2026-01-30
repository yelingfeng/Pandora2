import { describe, expect, test, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useAttrs } from '../core/useAttrs'

describe('useAttrs', () => {
  test('returns empty object when called without instance', () => {
    expect(useAttrs()).toEqual({})
  })

  test('filters attrs', async () => {
    const Comp = defineComponent({
      setup() {
        const attrs = useAttrs({ excludeListeners: true, excludeKeys: ['x'], excludeDefaultKeys: true }) as any
        return () => h('div', { id: 'root' }, JSON.stringify(attrs.value))
      }
    })

    const onClick = vi.fn()
    const wrapper = mount(Comp, {
      attrs: {
        class: 'c',
        style: 'color:red',
        x: 1,
        y: 2,
        onClick
      }
    })

    await nextTick()
    const json = wrapper.text()
    expect(json).toContain('"y":2')
    expect(json).not.toContain('"x":')
    expect(json).not.toContain('onClick')
    expect(json).not.toContain('class')
    expect(json).not.toContain('style')
  })
})

