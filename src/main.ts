import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/docs-theme.less'
import './assets/markdown.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Preview from './Preview.vue'

// 引入全局样式主题
import '../packages/shared/styles/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Pandora2 from '../packages'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app
  .component('Preview', Preview)
  .use(router)
  .use(ElementPlus)
  .use(Pandora2)
  .mount('#app')
