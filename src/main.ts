import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/markdown.css'

import Preview from './Preview.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { PdForm, PdTable, PdContainer } from '@modules/index'

const app = createApp(App)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('Preview', Preview)

app
  .use(router)
  .use(ElementPlus)
  .use(PdForm)
  .use(PdTable)
  .use(PdContainer)
  .mount('#app')
