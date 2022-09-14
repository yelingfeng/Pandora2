import baseConfig from './base.config'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 打包入口文件夹
const entryDir = resolve(__dirname, '../packages/pandora')
// 出口文件
const outputDir = resolve(__dirname, '../lib')
// rollup 配置
const rollupOptions = {
  // 确保外部化处理那些你不想打包进库的依赖
  external: ['vue'],
  output: {
    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    globals: {
      vue: 'Vue'
    }
  }
}

export default defineConfig({
  ...baseConfig,
  publicDir: false,
  build: {
    // target: 'esnext',
    lib: {
      entry: resolve(entryDir, 'index.ts'),
      name: 'pandora2',
      fileName: (format) => `pandora2.${format}.js`
    },
    rollupOptions,
    outDir: outputDir
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      include: ['packages', 'typings']
    })
  ]
})
