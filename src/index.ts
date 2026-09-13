import type { App, Plugin } from 'vue'

// Components
import {
  lhComponents,
  LhButton,
  LhInput,
  LhConfigProvider,
  LhIcon,
  LhTooltip,
  LhDialog,
  LhForm,
  LhFormItem,
  LhSelect,
  LhCheckbox,
  LhCheckboxGroup,
  LhRadio,
  LhRadioGroup,
  LhSwitch,
  LhInputNumber,
  LhSlider,
  LhDatePicker,
} from '../packages/components'

// Locales
import { lhlocale, zhCN, enUS } from '../packages/locales'

// Types
import type { LhButtonProps, LhButtonType, LhButtonSize } from '../packages/components/button'
import type { LhInputProps, LhInputType, LhInputSize, LhInputState } from '../packages/components/input'
import type { LhConfigProviderProps, LhConfigContext } from '../packages/components/config-provider'
import type { LhIconProps, LhIconSize } from '../packages/components/icon'
import type { LhTooltipProps, LhTooltipPlacement, LhTooltipTrigger, LhTooltipEffect } from '../packages/components/tooltip'
import type { LhDialogProps, LhDialogEmits } from '../packages/components/dialog'
import type { LhFormItemProps, LhFormProps, LhFormRule } from '../packages/components/form'
import type { LhSelectOption, LhSelectProps, LhSelectSize } from '../packages/components/select'
import type {
  LhCheckboxGroupProps,
  LhCheckboxProps,
  LhCheckboxSize,
} from '../packages/components/checkbox'
import type {
  LhRadioGroupProps,
  LhRadioProps,
  LhRadioSize,
} from '../packages/components/radio'
import type {
  LhSwitchProps,
  LhSwitchSize,
} from '../packages/components/switch'
import type { LhInputNumberProps, LhInputNumberSize } from '../packages/components/input-number'
import type { LhSliderProps, LhSliderSize } from '../packages/components/slider'
import type { LhDatePickerProps } from '../packages/components/date-picker'

// Styles
import '../packages/components/button/style/index.scss'
import '../packages/components/input/style/index.scss'
import '../packages/components/icon/style/index.scss'
import '../packages/components/tooltip/style/index.scss'
import '../packages/components/dialog/style/index.scss'
import '../packages/components/form/style/index.scss'
import '../packages/components/select/style/index.scss'
import '../packages/components/checkbox/style/index.scss'
import '../packages/components/radio/style/index.scss'
import '../packages/components/switch/style/index.scss'
import '../packages/components/input-number/style/index.scss'
import '../packages/components/slider/style/index.scss'
import '../packages/components/date-picker/style/index.scss'
import '../packages/components/config-provider/style/index.scss'

/**
 * 组件列表 - 用于全量注册
 */
/**
 * 全量安装所有组件
 * @param app Vue 应用实例
 */
function install(app: App): void {
  lhComponents.forEach((component) => {
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
  LhForm,
  LhFormItem,
  LhSelect,
  LhCheckbox,
  LhCheckboxGroup,
  LhConfigProvider,
  LhRadio,
  LhRadioGroup,
  LhSwitch,
  LhInputNumber,
  LhSlider,
  LhDatePicker,
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
  // Form
  LhFormItemProps,
  LhFormProps,
  LhFormRule,
  // Select
  LhSelectOption,
  LhSelectProps,
  LhSelectSize,
  // Checkbox
  LhCheckboxProps,
  LhCheckboxGroupProps,
  LhCheckboxSize,
  // Radio
  LhRadioProps,
  LhRadioGroupProps,
  LhRadioSize,
  // Switch
  LhSwitchProps,
  LhSwitchSize,
  // InputNumber
  LhInputNumberProps,
  LhInputNumberSize,
  // Slider
  LhSliderProps,
  LhSliderSize,
  // DatePicker
  LhDatePickerProps,
}
