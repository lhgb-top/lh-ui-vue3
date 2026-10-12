import { defineConfig } from 'vite'
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
  root: 'dev',
  server: {
    host: '0.0.0.0',
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
