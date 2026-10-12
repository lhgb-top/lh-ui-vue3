import { mountLhComponent } from '~/imperative'
import LhNotificationHost from './host.vue'
import {
  closeAllLhNotifications,
  closeLhNotification,
  createLhNotificationRecord,
  lhNotificationConfig,
  openLhNotificationRecord,
} from './store'
import type { LhNotificationConfig, LhNotificationHandle, LhNotificationOptions, LhNotificationType } from './types'

let host: { unmount: () => void } | null = null

function resolveContainer(): HTMLElement {
  const target = lhNotificationConfig.appendTo
  if (typeof target === 'string') {
    return document.querySelector<HTMLElement>(target) ?? document.body
  }
  return target
}

function ensureHost(): void {
  if (host) return
  host = mountLhComponent(LhNotificationHost, {}, resolveContainer())
}

/** 打开一条通知，返回可手动关闭的句柄 */
export function openLhNotification(options: LhNotificationOptions): LhNotificationHandle {
  ensureHost()
  const record = createLhNotificationRecord(options)
  openLhNotificationRecord(record)
  return { close: () => closeLhNotification(record.id) }
}

function openTyped(type: LhNotificationType, options: LhNotificationOptions): LhNotificationHandle {
  return openLhNotification({ ...options, type })
}

/**
 * 通知服务：`LhNotification.success({ title, content })`。
 * 四角独立容器（region + aria-live=polite），堆叠走 flex + gap，不依赖组件树。
 */
export const LhNotification = Object.assign(openLhNotification, {
  success: (options: LhNotificationOptions) => openTyped('success', options),
  info: (options: LhNotificationOptions) => openTyped('info', options),
  warning: (options: LhNotificationOptions) => openTyped('warning', options),
  danger: (options: LhNotificationOptions) => openTyped('danger', options),
  close: closeLhNotification,
  closeAll: closeAllLhNotifications,
  /** 全局默认配置（duration / offset / appendTo） */
  config: (options: LhNotificationConfig) => Object.assign(lhNotificationConfig, options),
})

Object.defineProperty(LhNotification, 'name', { value: 'LhNotification' })

;(LhNotification as unknown as { install?: (app: import('vue').App) => void }).install = (app: import('vue').App): void => {
  app.component('LhNotification', LhNotificationHost)
}

export default LhNotification
