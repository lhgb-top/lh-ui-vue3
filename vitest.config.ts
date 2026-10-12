import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createLocalShareAliases } from './scripts/local-share-alias.mjs'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      // 与 tsconfig.json compilerOptions.paths 保持一致
      { find: '~', replacement: resolve(__dirname, 'packages') },
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@lh-ui/vue3', replacement: resolve(__dirname, 'src/index.ts') },
      { find: 'types', replacement: resolve(__dirname, 'types') },
      // 本地联动：家族布局下解析到同级 share 仓源码，无则回退 npm 包（见 scripts/local-share-alias.mjs）
      ...createLocalShareAliases(__dirname),
    ],
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
      // 覆盖率阈值暂不设线：旧基线（含 packages/core）已随迁移失效，
      // 需先跑 pnpm test:coverage 取实测基线再回填（拍脑袋设线会把 CI 打红）
    },
  },
})
