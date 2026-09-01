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
      reportsDirectory: './coverage',
      include: [
        'packages/shared/**/*.{ts,tsx}',
        'packages/pandora/make-installer.ts',
        'packages/components/PdTable/src/**/*.{ts,tsx}',
        'packages/components/PdForm/src/**/*.{ts,tsx}',
        'packages/components/PdPageLayout/**/*.{ts,tsx,vue}',
        'packages/components/PdCharts/src/**/*.{ts,tsx}'
      ],
      exclude: [
        '**/*.d.ts',
        '**/*.vue',
        '**/__tests__/**',
        '**/node_modules/**',
        'dist/**',
        'docs/**',
        'src/_docs/**',
        'mock/**',
        'build/**',
        'script/**',
        'vite.config.ts',
        'packages/shared/_utils/vue/index.ts',
        'packages/shared/_utils/vue/typescript.ts',
        'packages/components/PdTable/src/types/**',
        'packages/components/PdCharts/src/types/**',
        'packages/components/PdPageLayout/types.ts'
      ],
      thresholds: {
        lines: 60
      }
    }
  }
})
