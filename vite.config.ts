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
      '@lh-ui/vue3': resolve(__dirname, 'src/index.ts'),
      'types': resolve(__dirname, 'types'),
    },
  },
  root: 'dev',
  server:{
    host:'0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 组件 scss 源在 @lh-ui/share 包内，bare specifier 的 @use 走 node_modules 解析
        loadPaths: [resolve(__dirname, 'node_modules')],
      },
    },
  },
})
