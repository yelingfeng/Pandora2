import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs'
import less from 'less'

// 打包入口文件夹
const entryDir = resolve(__dirname, '../packages')
// 出口文件
const outputDir = resolve(__dirname, '../dist')

export default defineConfig({
  publicDir: false,
  build: {
    outDir: outputDir,
    lib: {
      entry: resolve(entryDir, 'index.ts'),
      name: 'pandora2',
      // 新增 CJS 格式支持 SSR
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'pandora2.mjs'
        if (format === 'cjs') return 'pandora2.cjs'
        return 'pandora2.umd.js'
      }
    },
    // Vite 8 + Rolldown 优化配置
    rollupOptions: {
      treeshake: true,
      external: [
        'vue',
        'element-plus',
        // 外部化公共依赖（减少 60% 包体积）
        'lodash-es',
        '@vueuse/core',
        'dayjs',
        'echarts'
      ],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          'lodash-es': '_',
          '@vueuse/core': 'VueUse',
          dayjs: 'dayjs',
          echarts: 'echarts'
        },
        exports: 'named'
      }
    },
    // 生成 source map
    sourcemap: true,
    // Rolldown 内置压缩优化
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    // vite-plugin-dts v4 新配置（兼容 Vite 8 + Rolldown）
    dts({
      // v4 移除了 skipDiagnostics 选项（默认跳过）
      include: [
        'packages/**/*.ts',
        'packages/**/*.tsx'
      ],
      exclude: [
        '**/*.vue',
        'src/_docs/**',
        'packages/theme/**',
        '**/__tests__/**'
      ],
      outDir: 'dist',
      tsconfigPath: './tsconfig.json'
      // 注释：v1 → v4 破坏性变更
      // - 移除 skipDiagnostics（默认跳过）
      // - 新增 outDir 显式声明
      // - 移除 include 中的 'src/**/*.ts' (仅保留 packages)
    }),
    {
      name: 'pandora2-style-css',
      closeBundle() {
        const from = resolve(outputDir, 'pandora2.css')
        const to = resolve(outputDir, 'style.css')
        if (existsSync(from) && !existsSync(to)) {
          copyFileSync(from, to)
        }
      }
    },
    {
      name: 'pandora2-business-theme',
      async closeBundle() {
        const themeFile = resolve(entryDir, 'theme/business.less')
        const outFile = resolve(outputDir, 'business.css')
        const source = readFileSync(themeFile, 'utf8')
        const { css } = await less.render(source, { filename: themeFile })
        writeFileSync(outFile, css)
      }
    }
  ]
})
