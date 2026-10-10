import type { Directive } from 'vue'
import { showLoading } from './service'
import type { LhLoadingHandle, LhLoadingOptions } from './types'

interface LoadingElement extends HTMLElement {
  __lhLoading?: LhLoadingHandle
}

/**
 * v-loading 指令：`v-loading="boolean"`，遮罩铺满最近的定位祖先（static 会自动补 relative）。
 * 支持值参数 `v-loading:text`（冒号修饰符，Vite 编译为 arg）传入提示文案。
 */
export const lhLoading: Directive<
  LoadingElement,
  boolean | string | LhLoadingOptions
> = {
  mounted(el, binding) {
    if (!binding.value) return
    el.__lhLoading = showLoading(applyElement(el, binding))
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) return
    if (binding.value && !el.__lhLoading) {
      el.__lhLoading = showLoading(applyElement(el, binding))
    } else if (!binding.value && el.__lhLoading) {
      el.__lhLoading.close()
      el.__lhLoading = undefined
    }
  },
  unmounted(el) {
    el.__lhLoading?.close()
    el.__lhLoading = undefined
  },
}

function applyElement(
  el: LoadingElement,
  binding: { arg?: string; value: boolean | string | LhLoadingOptions },
): LhLoadingOptions {
  const options = typeof binding.value === 'object' && binding.value !== null ? binding.value : {}
  // 字符串值（v-loading="'加载中'"）与 text 修饰符都归一为文案
  const text = typeof binding.value === 'string' ? binding.value : binding.arg ? decodeURIComponent(binding.arg) : options.text
  return { target: el, ...options, text }
}

export default lhLoading
