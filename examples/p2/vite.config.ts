import { UserConfigExport, ConfigEnv,Plugin } from 'vite';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
// import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`
          }
        }
      ]
    })
  ];

  return {
    plugins:vitePlugins
  }
}
