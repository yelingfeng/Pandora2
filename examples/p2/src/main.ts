import { createApp } from 'vue'
import App from './App.vue'
import Elementplus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";

const app =createApp(App)
app.use(Elementplus)
app.use(Antd);
app.mount('#app')


