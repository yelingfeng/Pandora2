import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/markdown.css'

import Preview from './Preview.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Pandora2 from './components/index'

const app = createApp(App)
app.component('Preview', Preview)

app.use(router).use(ElementPlus).use(Pandora2).mount('#app')
