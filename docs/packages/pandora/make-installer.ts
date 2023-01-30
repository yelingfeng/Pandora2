import type { App, Plugin } from 'vue'

const version = '0.0.23'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach((c) => app.use(c))
    // if (options) provideGlobalConfig(options, app, true)
  }

  return {
    version,
    install
  }
}
