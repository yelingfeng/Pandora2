import { describe, expect, test, vi } from 'vitest'
import { ref } from 'vue'
import {
  withInstall,
  withInstallDirective,
  withInstallFunction,
  withNoopInstall
} from '../vue'
import { composeRefs } from '../vue/refs'

describe('vue install helpers', () => {
  test('withInstall adds install method', () => {
    const comp: any = { name: 'X' }
    const wrapped: any = withInstall(comp)
    const app: any = { component: vi.fn() }
    wrapped.install(app)
    expect(app.component).toHaveBeenCalledWith('X', comp)
  })

  test('withInstall attaches extra components', () => {
    const comp: any = { name: 'X' }
    const Extra: any = { name: 'E' }
    const wrapped: any = withInstall(comp, { Extra })
    const app: any = { component: vi.fn() }
    wrapped.install(app)
    expect(wrapped.Extra).toBe(Extra)
    expect(app.component).toHaveBeenCalledWith('E', Extra)
  })

  test('withInstallFunction adds install and sets globalProperties', () => {
    const fn: any = () => 1
    const wrapped: any = withInstallFunction(fn, '$x')
    const app: any = { config: { globalProperties: {} } }
    wrapped.install(app)
    expect(app.config.globalProperties.$x).toBe(fn)
  })

  test('withInstallDirective registers directive', () => {
    const directive: any = {}
    const wrapped: any = withInstallDirective(directive, 'focus')
    const app: any = { directive: vi.fn() }
    wrapped.install(app)
    expect(app.directive).toHaveBeenCalledWith('focus', directive)
  })

  test('withNoopInstall provides noop install', () => {
    const A: any = { name: 'A' }
    const wrapped: any = withNoopInstall(A)
    expect(typeof wrapped.install).toBe('function')
    expect(() => wrapped.install()).not.toThrow()
  })

  test('composeRefs sets ref values and calls setters', () => {
    const r = ref<HTMLElement>()
    const setter = vi.fn()
    const set = composeRefs(r as any, setter)
    const el = document.createElement('div')
    set(el)
    expect(r.value).toBe(el)
    expect(setter).toHaveBeenCalledWith(el)
  })
})
