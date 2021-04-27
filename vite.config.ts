import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import';
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
  plugins: [
    vue(), 
    vueJsx(),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          }
        }
      ]
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    outDir: './lib',
    lib: {
      entry: resolve(__dirname, './src/packages/index.ts'),
      name: 'Pandora2'
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
