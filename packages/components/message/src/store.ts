import { reactive } from 'vue'
import { clampMessageQueue } from '@lh-ui/share/core/message'
import type { LhMessageRecord } from './types'

/**
 * 服务状态与队列（纯状态模块，不 import host）——
 * host.vue 与服务层都从这里取数据，避免「服务 → host → 服务」的循环依赖。
 */

/** 服务默认值（LhMessage.config 可覆盖） */
export const messageConfig = reactive({
  duration: undefined as number | undefined,
  max: 5,
  offset: 20,
  appendTo: 'body' as string | HTMLElement,
})

/** 服务队列（host 直接消费的响应式数组，时间正序） */
export const messageRecords = reactive<LhMessageRecord[]>([])

const timers = new Map<number, ReturnType<typeof setTimeout>>()
let seq = 0

export function nextMessageId(): number {
  return ++seq
}

export function closeMessage(id: number): void {
  const index = messageRecords.findIndex((record) => record.id === id)
  if (index === -1) return
  const [record] = messageRecords.splice(index, 1)
  const timer = timers.get(id)
  if (timer !== undefined) {
    clearTimeout(timer)
    timers.delete(id)
  }
  record.onClose?.()
}

/** 入队 + 超限裁剪 + 自动关闭计时器 */
export function openRecord(record: LhMessageRecord): void {
  messageRecords.push(record)

  // 超限移除最早的消息（关闭回调与计时器一并清理）
  const { removed } = clampMessageQueue([...messageRecords], messageConfig.max)
  for (const stale of removed) closeMessage(stale.id)

  if (record.duration > 0) {
    timers.set(record.id, setTimeout(() => closeMessage(record.id), record.duration))
  }
}

/** 关闭全部消息 */
export function closeAllMessages(): void {
  for (const record of [...messageRecords]) closeMessage(record.id)
}
