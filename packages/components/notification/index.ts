import type { App } from 'vue'
import LhNotification from './src'
import LhNotificationItem from './src/index.vue'
import type {
  LhNotificationConfig,
  LhNotificationHandle,
  LhNotificationOptions,
  LhNotificationPosition,
  LhNotificationProps,
  LhNotificationRecord,
  LhNotificationType,
} from './src/types'

;(LhNotification as unknown as { install?: (app: App) => void }).install = (app: App): void => {
  // 服务对象作为注册入口；声明式使用时注册条目组件
  app.component('LhNotification', LhNotificationItem)
}

export default LhNotification
export { LhNotification }
export type {
  LhNotificationConfig,
  LhNotificationHandle,
  LhNotificationOptions,
  LhNotificationProps,
  LhNotificationPosition,
  LhNotificationRecord,
  LhNotificationType,
}
