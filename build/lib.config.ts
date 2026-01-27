import baseConfig from './base.config'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 打包入口文件夹
const entryDir = resolve(__dirname, '../packages')
// 出口文件
const outputDir = resolve(__dirname, '../dist')

export default defineConfig({
  ...baseConfig,
  publicDir: false,
  build: {
    outDir: outputDir,
    lib: {
      entry: resolve(entryDir, 'index.ts'),
      name: 'pandora2',
      fileName: (format) => `pandora2.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      treeshake: true,
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        },
        exports: 'named'
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      skipDiagnostics: true,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'packages/**/*.ts', 'packages/**/*.tsx'],
      exclude: ['**/*.vue', 'src/_docs/**']
    })
  ]
})
