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
      '@lh-ui/vue3': resolve(__dirname, 'src/index.ts'),
      'types': resolve(__dirname, 'types'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.spec.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'clover'],
      // core 单测唯一一份在 @lh-ui/share，本仓库只覆盖 Vue 专属层
      include: [
        'packages/components/**',
        'packages/composables/**',
        'packages/imperative/**',
        'packages/locale/**',
      ],
      // 旧基线（含 packages/core）已随迁移失效，需在迁移后由 pnpm test:coverage 重测回填
      thresholds: {},
    },
  },
})
