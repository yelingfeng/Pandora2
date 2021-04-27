import { resolve } from 'path'
// import styleImport from 'vite-plugin-style-import';
// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
/**
 * @type {import('vite').UserConfig}
 */
 export default {
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
  },
  optimizeDeps: {
    include: [
      'vitepress-for-component/dist/client/theme-default',
      'element-plus'
    ],
  },
  // plugins:[
  //   vue(),
  //   vueJsx(),
  //   styleImport({
  //     libs: [
  //       {
  //         libraryName: "element-plus",
  //         esModule: true,
  //         ensureStyleFile: true,
  //         resolveStyle: (name) => {
  //           return `element-plus/lib/theme-chalk/${name}.css`;
  //         },
  //         resolveComponent: (name) => {
  //           return `element-plus/lib/${name}`;
  //         }
  //       }
  //     ]
  //   })
  // ]
};
