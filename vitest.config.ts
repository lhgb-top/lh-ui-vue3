import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'packages'),
      'types': resolve(__dirname, 'types'),
      'constants': resolve(__dirname, 'packages/constants'),
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
    },
  },
})