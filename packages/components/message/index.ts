import type { App } from 'vue'
import LhMessage from './src'
import LhMessageItem from './src/index.vue'
import type { LhMessageConfig, LhMessageHandle, LhMessageOptions, LhMessageProps, LhMessageRecord, LhMessageType } from './src/types'

;(LhMessage as unknown as { install?: (app: App) => void }).install = (app: App): void => {
  // 服务对象作为注册入口；声明式使用时注册条目组件
  app.component('LhMessage', LhMessageItem)
}

export default LhMessage
export { LhMessage }
export type { LhMessageConfig, LhMessageHandle, LhMessageOptions, LhMessageProps, LhMessageRecord, LhMessageType }
