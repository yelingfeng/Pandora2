import baseConfig from './base.config'
import { defineConfig } from 'vite'

export default defineConfig({
  ...baseConfig,
  base: '/Pandora2',
  build: {
    outDir: 'docs'
  }
})
