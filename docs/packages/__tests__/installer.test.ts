import { describe, expect, test, vi } from 'vitest'
import { makeInstaller } from '../pandora/make-installer'

describe('pandora installer', () => {
  test('makeInstaller installs plugins', () => {
    const pluginA: any = { install: vi.fn() }
    const pluginB: any = { install: vi.fn() }
    const installer: any = makeInstaller([pluginA, pluginB])
    const app: any = { use: vi.fn() }
    installer.install(app)
    expect(app.use).toHaveBeenCalledWith(pluginA)
    expect(app.use).toHaveBeenCalledWith(pluginB)
  })
})
