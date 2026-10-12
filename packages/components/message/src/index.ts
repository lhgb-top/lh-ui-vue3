import { createMessageRecord } from '@lh-ui/share/core/message'
import type { LhMessageType } from '@lh-ui/share/core/message'
import { mountLhComponent } from '~/imperative'
import LhMessageHost from './host.vue'
import {
  closeAllLhMessages,
  closeLhMessage,
  lhMessageConfig,
  nextLhMessageId,
  openLhRecord,
} from './store'
import type { LhMessageConfig, LhMessageHandle, LhMessageOptions } from './types'

let host: { unmount: () => void } | null = null

function resolveContainer(): HTMLElement {
  const target = lhMessageConfig.appendTo
  if (typeof target === 'string') {
    return document.querySelector<HTMLElement>(target) ?? document.body
  }
  return target
}

function ensureHost(): void {
  if (host) return
  host = mountLhComponent(LhMessageHost, {}, resolveContainer())
}

/** 打开一条消息，返回可手动关闭的句柄 */
export function openLhMessage(options: LhMessageOptions | string): LhMessageHandle {
  const normalized: LhMessageOptions = typeof options === 'string' ? { content: options } : options
  ensureHost()
  const record = createMessageRecord(
    {
      type: (normalized.type ?? 'info') as LhMessageType,
      content: normalized.content,
      showClose: !!normalized.showClose,
      sx: normalized.sx,
      onClose: normalized.onClose,
      duration: normalized.duration ?? lhMessageConfig.duration,
      offset: normalized.offset ?? lhMessageConfig.offset,
    },
    nextLhMessageId(),
  )
  openLhRecord(record)
  return { close: () => closeLhMessage(record.id) }
}

// 快捷方法的 content 已由首参传入，options 不应再要求 content
function openTyped(
  type: LhMessageType,
  content: string,
  options?: Omit<LhMessageOptions, 'content'>,
): LhMessageHandle {
  return openLhMessage({ ...options, type, content })
}

/**
 * 全局轻提示服务：`LhMessage.success('已保存')` / `LhMessage({ content, ... })`。
 * 队列渲染在独立 createApp 容器（teleport 语义，默认挂到 body），不依赖组件树。
 */
export const LhMessage = Object.assign(openLhMessage, {
  success: (content: string, options?: Omit<LhMessageOptions, 'content'>) => openTyped('success', content, options),
  info: (content: string, options?: Omit<LhMessageOptions, 'content'>) => openTyped('info', content, options),
  warning: (content: string, options?: Omit<LhMessageOptions, 'content'>) => openTyped('warning', content, options),
  danger: (content: string, options?: Omit<LhMessageOptions, 'content'>) => openTyped('danger', content, options),
  loading: (content: string, options?: Omit<LhMessageOptions, 'content'>) => openTyped('loading', content, options),
  close: closeLhMessage,
  closeAll: closeAllLhMessages,
  /** 全局默认配置（duration / max / offset / appendTo） */
  config: (options: LhMessageConfig) => Object.assign(lhMessageConfig, options),
})

Object.defineProperty(LhMessage, 'name', { value: 'LhMessage' })

;(LhMessage as unknown as { install?: (app: import('vue').App) => void }).install = (app: import('vue').App): void => {
  app.component('LhMessage', LhMessageHost)
}

export default LhMessage
