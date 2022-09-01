import { App, Plugin } from 'vue'
import Table from './docs/demo.vue'

export const PdTablePlugin: Plugin = {
  install(app: App) {
    app.component('my-table', Table)
  }
}

export { Table }
