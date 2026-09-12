import { defineConfig } from 'vitest/config'
import testConfig from './build/test.config'

export default defineConfig({
  ...testConfig,
  test: {
    environment: 'jsdom',
    // jsdom 环境初始化开销约 30s/文件，是整套测试的主要成本。
    // 纯逻辑测试（不碰 document/window、不挂载组件）可在首行声明
    // `// @vitest-environment node` 跳过 jsdom，显著缩短套件耗时。
    // 注意：默认保持 jsdom，新增 node 标注前请确认文件确实不依赖 DOM。
    environmentMatchGlobs: [],
    globals: true,
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    // `docs/packages/**` 是 `pnpm build:docs` 从 `packages/**` 复制产生的副本，
    // 与源目录内容一致，重复执行会使测试数量翻倍并浪费 CI 时间。
    exclude: ['**/node_modules/**', '**/dist/**', 'docs/**'],
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
      ]
      // 覆盖率仅作参考：PdCharts 引擎体量大，暂不设强制 thresholds，避免阻塞发版。
    }
  }
})
