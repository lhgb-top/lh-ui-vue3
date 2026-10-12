import { reactive } from 'vue'
import { LH_NOTIFICATION_DURATION_DEFAULT } from '@lh-ui/share/core/notification'
import type { LhNotificationPosition, LhNotificationRecord, LhNotificationType } from './types'

/**
 * 服务状态与队列（纯状态模块，不 import host）——
 * host.vue 与服务层都从这里取数据，避免「服务 → host → 服务」的循环依赖。
 */

/** 服务默认值（LhNotification.config 可覆盖） */
export const lhNotificationConfig = reactive({
  duration: undefined as number | undefined,
  offset: 20,
  appendTo: 'body' as string | HTMLElement,
})

/** 服务队列（host 直接消费的响应式数组，时间正序） */
export const lhNotificationRecords = reactive<LhNotificationRecord[]>([])

const timers = new Map<number, ReturnType<typeof setTimeout>>()
let seq = 0

export function nextLhNotificationId(): number {
  return ++seq
}

export function closeLhNotification(id: number): void {
  const index = lhNotificationRecords.findIndex((record) => record.id === id)
  if (index === -1) return
  const [record] = lhNotificationRecords.splice(index, 1)
  const timer = timers.get(id)
  if (timer !== undefined) {
    clearTimeout(timer)
    timers.delete(id)
  }
  record.onClose?.()
}

/** 入队 + 自动关闭计时器 */
export function openLhNotificationRecord(record: LhNotificationRecord): void {
  lhNotificationRecords.push(record)
  if (record.duration > 0) {
    timers.set(record.id, setTimeout(() => closeLhNotification(record.id), record.duration))
  }
}

/** 关闭全部通知 */
export function closeAllLhNotifications(): void {
  for (const record of [...lhNotificationRecords]) closeLhNotification(record.id)
}

/** 构造一条记录（选项归一） */
export function createLhNotificationRecord(options: {
  title: string
  content?: string
  type?: LhNotificationType
  duration?: number
  position?: LhNotificationPosition
  showClose?: boolean
  onClick?: () => void
  onClose?: () => void
}): LhNotificationRecord {
  return {
    id: nextLhNotificationId(),
    type: (options.type ?? 'info') as LhNotificationType,
    title: options.title,
    content: options.content ?? '',
    duration: options.duration ?? lhNotificationConfig.duration ?? LH_NOTIFICATION_DURATION_DEFAULT,
    position: (options.position ?? 'top-right') as LhNotificationPosition,
    showClose: options.showClose !== false,
    onClick: options.onClick,
    onClose: options.onClose,
  }
}
