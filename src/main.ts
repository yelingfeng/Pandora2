import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/markdown.css'

import Preview from './Preview.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
// import 'dayjs/locale/zh-cn'

import { PdForm, PdTable, PdContainer } from '../dist/pandora2.es'

const app = createApp(App)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app
  .component('Preview', Preview)
  .use(router)
  .use(ElementPlus)
  .use(PdForm)
  .use(PdTable)
  .use(PdContainer)
  .mount('#app')
