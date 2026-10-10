import type { App } from 'vue'
import { lhLoading } from './src/directive'
import { LhLoading, showLoading, closeLoading } from './src/service'

/**
 * 加载服务 + 指令入口：
 * - `LhLoading.show({ target?, text?, lock? })` 服务式
 * - `app.use(LhLoading)` 注册 `v-loading` 指令
 */
const LhLoadingService = Object.assign(LhLoading, {
  install: (app: App): void => {
    app.directive('loading', lhLoading)
  },
})

Object.defineProperty(LhLoadingService, 'name', { value: 'LhLoading' })

export default LhLoadingService
export { LhLoadingService as LhLoading }
export { showLoading, closeLoading, lhLoading as loadingDirective }
export type { LhLoadingHandle, LhLoadingMaskProps, LhLoadingOptions } from './src/types'
