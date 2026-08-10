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
  /** 全局主题变量
   * 支持键（会自动添加 --lh- 前缀）：
   * - `primary-color`, `success-color`, `warning-color`, `danger-color`, `info-color`
   * - `gold-color`, `vermilion-color`, `jade-color`
   * - `bg-color`, `text-color`, `border-color`
   * - `bg-pattern` — 花纹背景 URL（如 `var(--lh-pattern-willow)`）
   * - `bg-pattern-opacity` — 花纹透明度
   * - `bg-pattern-color` — 花纹颜色
   * - `decoration-color` — 装饰色 */
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