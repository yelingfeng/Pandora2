import { UserConfigExport, ConfigEnv, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'

import SVG from 'vite-plugin-vue-svg'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  const prodMock = true
  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    SVG(),
    Inspect(),
    Pages({
      dirs: [
        { dir: resolve(__dirname, './src/pages/admin'), baseRoute: 'admin' },
        { dir: resolve(__dirname, './src/pages/user'), baseRoute: 'user' },
        { dir: resolve(__dirname, './src/components'), baseRoute: 'components' }
      ],
      extensions: ['vue', 'md']
    }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
      prodEnabled: command !== 'serve' && prodMock,
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
      logger: true
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md', 'svg'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
      dts: './src/components.d.ts'
    })
  ]

  return {
    plugins: vitePlugins
  }
}
