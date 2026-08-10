import { defineConfig } from 'vite'
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
  root: 'dev',
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
})
