/**
 * lh-ui-plus Shared Composables
 * 
 * 跨组件共享的通用逻辑
 */

import { computed, ref, watch, type Ref, type ComputedRef } from 'vue'
import type { LhSizes } from 'types/components'

/**
 * useSize - 尺寸逻辑计算
 * 从 props 和 ConfigProvider 注入中获取有效尺寸
 */
export function useSize(
  props: { size?: string },
  configSize?: Ref<LhSizes | undefined> | ComputedRef<LhSizes | undefined>,
  defaultSize: string = 'medium'
) {
  const effectiveSize = computed(() => {
    return props.size || configSize?.value || defaultSize
  })

  return { effectiveSize }
}

/**
 * useDisabled - 禁用状态逻辑
 */
export function useDisabled(
  props: { disabled?: boolean; loading?: boolean }
) {
  const isDisabled = computed(() => {
    return props.disabled === true || props.loading === true
  })

  return { isDisabled }
}

/**
 * useNamespace - 生成 BEM 风格的 class 名
 */
export function useNamespace(block: string) {
  const namespace = 'lh'

  const b = () => `${namespace}-${block}`
  const e = (element: string) => `${namespace}-${block}__${element}`
  const m = (modifier: string) => `${namespace}-${block}--${modifier}`
  const em = (element: string, modifier: string) => `${namespace}-${block}__${element}--${modifier}`
  const is = (name: string, state?: boolean | string) => {
    if (state === undefined || state === false) return ''
    if (state === true) return `is-${name}`
    return `is-${state}`
  }

  return { b, e, m, em, is }
}

/**
 * useVModel - 简化的 v-model 双向绑定
 */
export function useVModel<T>(
  props: { modelValue?: T },
  emit: (event: 'update:modelValue', value: T) => void,
  defaultValue?: T
) {
  const model = ref<T>((props.modelValue ?? defaultValue ?? undefined) as T) as Ref<T>

  watch(() => props.modelValue, (val) => {
    if (val !== undefined) {
      model.value = val as T
    }
  })

  function updateModel(value: T) {
    model.value = value
    emit('update:modelValue', value)
  }

  return {
    model,
    updateModel,
  }
}

/**
 * useZIndex - 递增的 z-index 管理
 */
let _zIndexCounter = 2000
export function useZIndex() {
  const zIndex = ref(++_zIndexCounter)

  function nextZIndex() {
    return ++_zIndexCounter
  }

  return { zIndex, nextZIndex }
}
