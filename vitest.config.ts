import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 与 tsconfig.json compilerOptions.paths 保持一致
      '~': resolve(__dirname, 'packages'),
      '@': resolve(__dirname, 'src'),
      'lh-ui': resolve(__dirname, 'src/index.ts'),
      'types': resolve(__dirname, 'types'),
      'lh-constants': resolve(__dirname, 'packages/constants'),
      '@lh-ui/core': resolve(__dirname, 'packages/core'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.spec.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'clover'],
      include: ['packages/core/**', 'packages/components/**', 'packages/utils/**'],
      // 防回退地板值（低于即失败）。跑一次 `pnpm test:coverage` 记录真实基线后，
      // 再按 ai/项目分析.md §九 的目标逐步上调。
      thresholds: {
        lines: 40,
        statements: 40,
        functions: 35,
        branches: 30,
      },
    },
  },
})
