import { App, Plugin } from 'vue'
import Form from './docs/demo.vue'

export const PdFormPlugin: Plugin = {
  install(app: App) {
    app.component('pd-form,', Form)
  }
}

export { Form }
