import { defineConfig } from 'vite'
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
  root: 'dev',
  server:{
    host:'0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
})
