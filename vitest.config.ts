import { defineConfig } from 'vitest/config'
import baseConfig from './build/base.config'

export default defineConfig({
  ...baseConfig,
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage'
    }
  }
})
