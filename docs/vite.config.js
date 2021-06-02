import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
    ],
  },
  plugins: [vueJsx()]
};
