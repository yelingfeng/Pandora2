import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 8888
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
      '@': resolve(__dirname, './src'),
      '@pandora': resolve(__dirname, './packages')
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    dts(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: [
        'vue',          // 自动导入 ref, reactive, computed, watch...
        'vue-router' ,  // 可选：useRoute, useRouter
        'piniy'
      ],
      include: [
        /\.[tj]sx?$/,        // ✅ 让 .tsx / .jsx 生效
        /\.vue$/,
        /\.vue\?vue/,
      ],
      dts: 'src/auto-imports.d.ts', // 生成类型声明，TS 必备
      eslintrc: {
        enabled: true, // 解决 eslint no-undef
        filepath: '.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    outDir: './dist',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'Pandora2',
      fileName: (format) => `pandora2.${format}.js`
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }
})
