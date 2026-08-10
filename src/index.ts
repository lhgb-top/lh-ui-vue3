import type { App, Plugin, Component } from 'vue'

// Components
import LhButton from '../packages/components/button'
import LhInput from '../packages/components/input'
import LhConfigProvider from '../packages/components/config-provider'
import LhIcon from '../packages/components/icon'
import LhTooltip from '../packages/components/tooltip'
import LhDialog from '../packages/components/dialog'

// Locales
import { lhlocale, zhCN, enUS } from '../packages/locales'

// Types
import type { LhButtonProps, LhButtonType, LhButtonSize } from '../packages/components/button'
import type { LhInputProps, LhInputType, LhInputSize, LhInputState } from '../packages/components/input'
import type { LhConfigProviderProps, LhConfigContext } from '../packages/components/config-provider'
import type { LhIconProps, LhIconSize } from '../packages/components/icon'
import type { LhTooltipProps, LhTooltipPlacement, LhTooltipTrigger, LhTooltipEffect } from '../packages/components/tooltip'
import type { LhDialogProps, LhDialogEmits } from '../packages/components/dialog'

/**
 * 组件列表 - 用于全量注册
 */
const components: (Component & { name?: string })[] = [
  LhButton,
  LhInput,
  LhIcon,
  LhTooltip,
  LhDialog,
  LhConfigProvider,
]

/**
 * 全量安装所有组件
 * @param app Vue 应用实例
 */
function install(app: App): void {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

/**
 * lh-ui-plus 组件库
 *
 * 使用方式：
 *
 * 1. 全量引入
 * ```ts
 * import { createApp } from 'vue'
 * import lhUiPlus from 'lh-ui-plus'
 * import 'lh-ui-plus/packages/theme/src/index.scss'
 *
 * const app = createApp(App)
 * app.use(lhUiPlus)
 * ```
 *
 * 2. 按需引入
 * ```ts
 * import { LhButton, LhInput, LhDialog } from 'lh-ui-plus'
 * import 'lh-ui-plus/packages/components/button/style/index.scss'
 * import 'lh-ui-plus/packages/components/dialog/style/index.scss'
 *
 * app.component('LhButton', LhButton)
 * app.component('LhDialog', LhDialog)
 * ```
 */
const lhUiPlus: Plugin & { version: string } = {
  install,
  version: '1.0.0',
}

// 默认导出（支持 app.use(lhUiPlus)）
export default lhUiPlus

// 命名导出（支持按需引入）
export {
  // Components
  LhButton,
  LhInput,
  LhIcon,
  LhTooltip,
  LhDialog,
  LhConfigProvider,
  
  // Locale
  lhlocale,
  zhCN,
  enUS,
}

// 类型导出
export type {
  // Button
  LhButtonProps,
  LhButtonType,
  LhButtonSize,
  // Input
  LhInputProps,
  LhInputType,
  LhInputSize,
  LhInputState,
  // ConfigProvider
  LhConfigProviderProps,
  LhConfigContext,
  // Icon
  LhIconProps,
  LhIconSize,
  // Tooltip
  LhTooltipProps,
  LhTooltipPlacement,
  LhTooltipTrigger,
  LhTooltipEffect,
  // Dialog
  LhDialogProps,
  LhDialogEmits,
}
