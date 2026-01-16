import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'unplugin-vue-markdown/vite'
import { configMockPlugin } from './plugin/mock'

// 文档: https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 8989
    // proxy: {
    //   '/api': {
    //     // target: 'http://localhost:7001',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/api/v1')
    //   }
    // }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@pandora': resolve(__dirname, '../packages'),
      '#/': resolve(__dirname, '../types')
    }
  },
  plugins: [
    Markdown(),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    configMockPlugin()
  ]
})
