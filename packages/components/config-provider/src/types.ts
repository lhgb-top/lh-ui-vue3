import type { InjectionKey } from 'vue'
import type { LhSizes } from 'types/components'
import type { LhLocaleType as LocaleType } from 'types/locale'

/**
 * ConfigProvider 配置项
 */
export interface LhConfigProviderProps {
  /** 全局尺寸 */
  size?: LhSizes
  /** 全局语言 */
  locale?: LocaleType
  /** 全局主题变量 */
  themeVars?: Record<string, string>
}

/**
 * ConfigProvider 通过 provide/inject 传递的配置上下文
 */
export interface LhConfigContext {
  size: LhSizes | undefined
  locale: LocaleType | undefined
  themeVars: Record<string, string> | undefined
}

/**
 * ConfigProvider 注入 key
 */
export const CONFIG_PROVIDER_KEY: InjectionKey<LhConfigContext> = Symbol('LhConfigProviderKey')