import { createApp } from 'vue'
import App from './App.vue'
import Elementplus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
const app =createApp(App)
app.use(Elementplus)
app.mount('#app')


