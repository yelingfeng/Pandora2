import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import routes from '~pages'
// const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
// app.use(Elementplus)
app.use(router)
// app.use(Antd)
app.mount('#app')
