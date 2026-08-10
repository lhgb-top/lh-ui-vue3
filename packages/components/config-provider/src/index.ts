import { computed, provide, reactive, inject } from 'vue'
import type { LhConfigProviderProps, LhConfigContext } from './types'
import { CONFIG_PROVIDER_KEY } from './types'
import { lhlocale } from '~/locales/index'

/**
 * ConfigProvider 核心逻辑
 * @param props 组件 props
 */
export function useConfigProvider(props: LhConfigProviderProps) {
  /** 将 themeVars 转为 CSS 变量对象 */
  const cssVars = computed(() => {
    if (!props.themeVars) return {}
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(props.themeVars)) {
      result[`--lh-${key}`] = value
    }
    return result
  })

  /** 构建 provide 的上下文对象 */
  const configContext: LhConfigContext = reactive({
    size: props.size,
    locale: props.locale,
    themeVars: props.themeVars,
  })

  // 注入 provide
  provide(CONFIG_PROVIDER_KEY, configContext)

  // 如果设置了 locale，同步更新全局 locale
  if (props.locale) {
    lhlocale.setLocale(props.locale)
  }

  return {
    configContext,
    cssVars,
  }
}

/**
 * 子组件中注入 ConfigProvider 配置
 * @returns 配置上下文，如果未找到 provider 则返回 undefined
 */
export function useConfigContext(): LhConfigContext | null {
  return inject(CONFIG_PROVIDER_KEY, null)
}