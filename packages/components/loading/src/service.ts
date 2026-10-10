import { isLoadingFullscreen, resolveLoadingTarget, ensurePositioned } from '@lh-ui/share/core/loading'
import { supportsInert } from '@lh-ui/share/core/shared/focus-trap'
import { lhlocale } from '~/locale'
import { useLhZIndex } from '~/composables'
import { mountComponent } from '~/imperative'
import LhLoadingMask from './index.vue'
import type { LhLoadingHandle, LhLoadingOptions } from './types'

const { nextZIndex } = useLhZIndex()

let loadingSeq = 0

interface ActiveLoading {
  unmount: () => void
  target: HTMLElement
  lock: boolean
  previousOverflow: string
  restorePosition: () => void
  inertApplied: boolean
}

const activeInstances = new Map<number, ActiveLoading>()

function resolveText(text?: string): string | undefined {
  void lhlocale.version.value
  return text ?? lhlocale.t('loading.text', '加载中…')
}

/**
 * 打开加载遮罩：全屏（不传 target）或指定容器。
 * 返回 close 句柄；lock 时锁目标滚动，inert 可用时让局部目标对交互不可达。
 */
export function showLoading(options: LhLoadingOptions = {}): LhLoadingHandle {
  const target = resolveLoadingTarget(options.target)
  const fullscreen = isLoadingFullscreen(target)
  const id = ++loadingSeq

  const restorePosition = fullscreen ? () => {} : ensurePositioned(target).restore

  const instance = mountComponent(
    LhLoadingMask,
    {
      fullscreen,
      text: resolveText(options.text),
      background: options.background,
      zIndex: nextZIndex(),
      spinner: options.spinner !== false,
      sx: options.sx,
    },
    target,
  )

  const previousOverflow = target.style.overflow
  const lock = !!options.lock
  if (lock) target.style.overflow = 'hidden'

  let inertApplied = false
  if (!fullscreen && supportsInert()) {
    target.setAttribute('inert', '')
    inertApplied = true
  }

  activeInstances.set(id, {
    unmount: instance.unmount,
    target,
    lock,
    previousOverflow,
    restorePosition,
    inertApplied,
  })

  return {
    close: () => closeLoading(id),
  }
}

export function closeLoading(id: number): void {
  const instance = activeInstances.get(id)
  if (!instance) return
  activeInstances.delete(id)
  instance.unmount()
  if (instance.lock) instance.target.style.overflow = instance.previousOverflow
  instance.restorePosition()
  if (instance.inertApplied) instance.target.removeAttribute('inert')
}

/** 关闭该容器上的全部遮罩（指令卸载时兜底） */
export function closeLoadingOn(target: HTMLElement): void {
  for (const [id, instance] of [...activeInstances]) {
    if (instance.target === target) closeLoading(id)
  }
}

/**
 * 加载服务：`LhLoading.show({ target?, text?, background?, lock? })`，返回 `{ close }`。
 * 不传 target 即全屏遮罩；`app.use(LhLoading)` 注册 v-loading 指令。
 */
export const LhLoading = Object.assign(showLoading, {
  show: showLoading,
  close: closeLoading,
})

Object.defineProperty(LhLoading, 'name', { value: 'LhLoading' })
