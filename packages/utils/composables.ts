/**
 * lh-ui-plus Shared Composables
 * 
 * 跨组件共享的通用逻辑
 */

import { computed, ref, watch, type Ref, type ComputedRef } from 'vue'
import type { LhSizes } from 'lh-types/components'

/**
 * useLhSize - 尺寸逻辑计算
 * 从 props 和 ConfigProvider 注入中获取有效尺寸
 */
export function useLhSize(
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
 * useLhDisabled - 禁用状态逻辑
 */
export function useLhDisabled(
  props: { disabled?: boolean; loading?: boolean }
) {
  const isDisabled = computed(() => {
    return props.disabled === true || props.loading === true
  })

  return { isDisabled }
}

/**
 * useLhNamespace - 生成 BEM 风格的 class 名
 */
export function useLhNamespace(block: string) {
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
 * useLhVModel - 简化的 v-model 双向绑定
 */
export function useLhVModel<T>(
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
 * useLhZIndex - 递增的 z-index 管理
 */
let _zIndexCounter = 2000
export function useLhZIndex() {
  const zIndex = ref(++_zIndexCounter)

  function nextZIndex() {
    return ++_zIndexCounter
  }

  return { zIndex, nextZIndex }
}

/**
 * useLhComponentTheme - 组件主题层级覆盖
 *
 * 优先级：组件自身 props > ConfigProvider componentTheme[组件名] > ConfigProvider 全局 themeVars
 * patternComponents 白名单控制全局 themeVars 中的 bg-pattern 是否生效
 */
import type { LhThemeableComponent } from '~/components/config-provider/src/types'
import type { LhConfigContextRef } from '~/components/config-provider/src/index'

export function useLhComponentTheme(
  componentName: LhThemeableComponent,
  props: { themeVars?: Record<string, string>; bgPattern?: string },
  configContext: LhConfigContextRef | null
) {
  const componentStyle = computed(() => {
    const result: Record<string, string> = {}
    // ConfigProvider 注入的是 computed 引用，读取 .value 建立响应式依赖
    const ctx = configContext?.value

    // 检查组件是否在 patternComponents 白名单中
    const isPatternAllowed =
      !ctx?.patternComponents || ctx.patternComponents.includes(componentName)

    // 1. 全局 themeVars（仅 bg-pattern 受白名单控制）
    if (ctx?.themeVars) {
      for (const [key, value] of Object.entries(ctx.themeVars)) {
        if (key === 'bg-pattern' && !isPatternAllowed) continue
        result[`--lh-${key}`] = value
      }
    }

    // 2. componentTheme[组件名]（覆盖全局，仅 bg-pattern 受白名单控制）
    const componentTheme = ctx?.componentTheme?.[componentName]
    if (componentTheme) {
      for (const [key, value] of Object.entries(componentTheme)) {
        if (key === 'bg-pattern' && !isPatternAllowed) continue
        result[`--lh-${key}`] = value
      }
    }

    // 3. 组件自身 themeVars（最高优先级，不受白名单限制）
    if (props.themeVars) {
      for (const [key, value] of Object.entries(props.themeVars)) {
        result[`--lh-${key}`] = value
      }
    }

    // 4. 组件自身 bgPattern（最高优先级，不受白名单限制）
    if (props.bgPattern) {
      result['--lh-bg-pattern'] = props.bgPattern
    }

    return result
  })

  return { componentStyle }
}
