import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'

describe('useTable hook', () => {
  test('register binds instance and methods delegate', async () => {
    vi.resetModules()
    vi.doMock('@pandora/shared/_utils/env', () => ({ isProdMode: () => true }))
    const { useTable } = await import('../src/hooks/useTable')
    const instance: any = {
      setProps: vi.fn(),
      setColumns: vi.fn(),
      setData: vi.fn(),
      reload: vi.fn(() => 1),
      clearSelection: vi.fn(),
      getSelectRows: vi.fn(() => [{ id: 1 }])
    }

    const Comp = defineComponent({
      setup() {
        const [register, methods] = useTable({ tableConfig: { border: true } } as any)
        register(instance)
        return { methods, register }
      },
      render() {
        return null
      }
    })

    const wrapper = mount(Comp)
    await nextTick()
    expect(instance.setProps).toHaveBeenCalled()

    await (wrapper.vm as any).methods.setColumns([{ value: 'id' }])
    expect(instance.setColumns).toHaveBeenCalled()

    await (wrapper.vm as any).methods.setData([{ id: 2 }])
    expect(instance.setData).toHaveBeenCalled()

    const reloadRet = await (wrapper.vm as any).methods.reload({ a: 1 })
    expect(reloadRet).toBe(1)

    await (wrapper.vm as any).methods.clearSelection()
    expect(instance.clearSelection).toHaveBeenCalled()

    expect((wrapper.vm as any).methods.getSelectRows()).toEqual([{ id: 1 }])
    expect(instance.setProps).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  test('methods throw when instance missing', async () => {
    vi.resetModules()
    vi.doMock('@pandora/shared/_utils/env', () => ({ isProdMode: () => true }))
    const { useTable } = await import('../src/hooks/useTable')
    const [, methods] = useTable()
    await expect(methods.setProps({} as any)).rejects.toThrow()
  })
})
