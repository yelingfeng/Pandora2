// @ts-nocheck
import { mount } from '@vue/test-utils'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { beforeAll, describe, expect, test } from 'vitest'
import { createApp, defineComponent, h, nextTick } from 'vue'

let dist
const require = createRequire(import.meta.url)

beforeAll(async () => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  const distEntry = path.resolve(process.cwd(), 'dist/pandora2.cjs')
  if (!fs.existsSync(distEntry)) {
    execSync('pnpm run build:npm', { stdio: 'inherit' })
  }
  expect(
    fs.existsSync(distEntry),
    `dist entry not found: ${distEntry}. Please run "yarn build:lib" first.`
  ).toBe(true)
  dist = require(distEntry)
}, 30000)

describe('dist 产物依赖测试', () => {
  test('dist 导出与 install 可用', () => {
    expect(dist).toBeTruthy()
    expect(dist.default).toBeTruthy()
    expect(typeof dist.default.install).toBe('function')
    expect(typeof dist.install).toBe('function')

    expect(dist.PdForm).toBeTruthy()
    expect(dist.PdTable).toBeTruthy()
    expect(dist.PdPageLayout).toBeTruthy()
  })

  test('install 后组件可被注册', () => {
    const app = createApp({})
    app.use(dist.default)
    expect(app.component('PdForm')).toBeTruthy()
    expect(app.component('PdTable')).toBeTruthy()
    expect(app.component('PdPageLayout')).toBeTruthy()
  })

  test('PdForm + useForm（对应 _docs/PdForm）可工作', async () => {
    const TestComp = defineComponent({
      setup() {
        const [register] = dist.useForm({
          schemas: [{ field: 'name', component: 'Input', label: 'Name' }],
          showActionButtonGroup: false
        })
        return () => h(dist.PdForm, { onRegister: register })
      }
    })

    const wrapper = mount(TestComp)
    await nextTick()
    expect(wrapper.find('.vpandora-form').exists()).toBe(true)
    wrapper.unmount()
  })

  test('PdTable + useTable（对应 _docs/PdTable）可工作', async () => {
    const TestComp = defineComponent({
      setup() {
        const [register] = dist.useTable({
          columns: [{ label: 'Name', prop: 'name' }],
          data: [{ name: 'Alice' }]
        })
        return () => h(dist.PdTable, { onRegister: register })
      }
    })

    const wrapper = mount(TestComp)
    await nextTick()
    expect(wrapper.find('.vpandora-table').exists()).toBe(true)
    wrapper.unmount()
  })

  test('PdPageLayout（对应 _docs/PdPageLayout）可工作', async () => {
    const TestComp = defineComponent({
      setup() {
        return () =>
          h(
            dist.PdPageLayout,
            {
              height: 300,
              baseTableHeight: 200,
              tableLoading: false
            },
            {
              form: () => h('div', { 'data-testid': 'form-slot' }, 'form'),
              table: (slotProps) =>
                h(
                  'div',
                  { 'data-testid': 'table-slot' },
                  `table:${String(slotProps?.height)}`
                )
            }
          )
      }
    })

    const wrapper = mount(TestComp, { attachTo: document.body })
    await nextTick()

    expect(wrapper.find('.pandora-page-layout').exists()).toBe(true)
    expect(wrapper.find('[data-testid="form-slot"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="table-slot"]').exists()).toBe(true)
    wrapper.unmount()
  })
})
