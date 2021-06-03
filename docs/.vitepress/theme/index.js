import DefaultTheme from 'vitepress-for-component/dist/client/theme-default'
import 'element-plus/lib/theme-chalk/index.css';
import './css/table.css'
import ElementPlus from 'element-plus'
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.use(ElementPlus)
  }
}