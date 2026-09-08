import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

/**
 * 测试专用 Vite 配置
 *
 * 与 build/base.config.ts 的差异（请勿合并回 base）：
 * - 移除 `configMockPlugin`（vite-plugin-mock）：它会为每个 worker 挂载 mock
 *   中间件，使单文件测试开销从毫秒级上升到 30s 级，并导致 Vite server 不退出。
 * - 移除 `unplugin-vue-markdown`：单测不消费 .md，属于纯额外 transform 成本。
 * - 移除 server.open / port：避免测试进程抢占 dev server 端口。
 *
 * 注意：这里必须保留与 base.config 一致的 alias，否则 `@pandora` 等别名解析失败。
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '@pandora': resolve(__dirname, '../packages'),
      '#/': resolve(__dirname, '../types')
    }
  },
  plugins: [vue(), vueJsx()]
})
