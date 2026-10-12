/**
 * Vue 响应式语言适配层
 *
 * share 的 `@lh-ui/share/locales` 导出的是纯事件发射器单例（框架无关，
 * 无任何响应式）；本文件把它包成 Vue 可用的响应式单例：组件内
 * `void lhlocale.version.value` 即可让 computed 订阅语言变更。
 *
 * 其余方法直接转发给 share 单例。行为差异相对旧 packages/locales 均为改进：
 * - `use()` 不再覆写内置语言包（改登记进用户注册表）
 * - `setLocale()` 对未注册语言回退默认语言包，getLocale() 与 t() 不脱节
 * - 新增 `tm()` 取数组文案
 */
import { ref } from 'vue'
import {
  lhlocale as sharedLocale,
  type LhLocaleType,
  type LhLocaleMessages,
  type LhLocalePath,
  type LhTranslate,
  type LhTranslateArray,
} from '@lh-ui/share/locales'

export const lhlocale = {
  /** 响应式版本号：任何语言变更都会自增，触发订阅它的 computed 重算 */
  version: ref(sharedLocale.version),
  /** 翻译文案（箭头函数属性，this 已绑定，可直接解构） */
  t: sharedLocale.t,
  /** 取数组文案（月份名 / 星期名等） */
  tm: sharedLocale.tm,
  /** 当前语言 */
  getLocale: () => sharedLocale.getLocale(),
  /** 注册并切换语言 */
  use: (options: { locale: LhLocaleType; messages: LhLocaleMessages }) => sharedLocale.use(options),
  /** 仅切换语言（不加载新文案） */
  setLocale: (locale: LhLocaleType) => sharedLocale.setLocale(locale),
  /** 追加自定义语言包（深合并到当前生效包） */
  add: (locale: string, messages: LhLocaleMessages) => sharedLocale.add(locale, messages),
}

// 订阅 share 单例的版本变更，同步到响应式 ref（模块级单例，生命周期与应用相同）
sharedLocale.subscribe((v) => {
  lhlocale.version.value = v
})

// 语言包直接源再导出（两段式 import+export 会让按需构建图判定为本模块未使用，
// 在 30 个组件入口各刷一遍 unused external import 告警）
export { zhCN, enUS } from '@lh-ui/share/locales'
export type { LhLocalePath, LhTranslate, LhTranslateArray }
