import { resolve } from 'path'
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
};
