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
  LhTimePicker,
  LhCascader,
  LhTag,
  LhBadge,
  LhAvatar,
  LhProgress,
  LhStatistic,
  LhDescriptions,
} from '~/components'

// Locales
import { lhlocale, zhCN, enUS } from '~/locales'

// Types
import type { LhButtonProps, LhButtonType, LhButtonSize } from '~/components/button'
import type {
  LhInputProps,
  LhInputType,
  LhInputSize,
  LhInputState,
} from '~/components/input'
import type { LhConfigProviderProps, LhConfigContext } from '~/components/config-provider'
import type { LhIconProps, LhIconSize } from '~/components/icon'
import type {
  LhTooltipProps,
  LhTooltipPlacement,
  LhTooltipTrigger,
  LhTooltipEffect,
} from '~/components/tooltip'
import type { LhDialogProps, LhDialogEmits } from '~/components/dialog'
import type { LhFormItemProps, LhFormProps, LhFormRule } from '~/components/form'
import type { LhSelectOption, LhSelectProps, LhSelectSize } from '~/components/select'
import type {
  LhCheckboxGroupProps,
  LhCheckboxProps,
  LhCheckboxSize,
} from '~/components/checkbox'
import type { LhRadioGroupProps, LhRadioProps, LhRadioSize } from '~/components/radio'
import type { LhSwitchProps, LhSwitchSize } from '~/components/switch'
import type { LhInputNumberProps, LhInputNumberSize } from '~/components/input-number'
import type { LhSliderProps, LhSliderSize } from '~/components/slider'
import type { LhDatePickerProps } from '~/components/date-picker'
import type { LhTimePickerProps } from '~/components/time-picker'
import type { LhCascaderProps } from '~/components/cascader'
import type { LhTagProps, LhTagSize } from '~/components/tag'
import type { LhBadgeProps, LhBadgeSize } from '~/components/badge'
import type { LhAvatarProps, LhAvatarSize, LhAvatarShape } from '~/components/avatar'
import type {
  LhProgressProps,
  LhProgressStatus,
  LhProgressType,
} from '~/components/progress'
import type { LhStatisticProps } from '~/components/statistic'
import type {
  LhDescriptionsProps,
  LhDescriptionsItem,
} from '~/components/descriptions'

// Styles
import '~/components/button/style/index.scss'
import '~/components/input/style/index.scss'
import '~/components/icon/style/index.scss'
import '~/components/tooltip/style/index.scss'
import '~/components/dialog/style/index.scss'
import '~/components/form/style/index.scss'
import '~/components/select/style/index.scss'
import '~/components/checkbox/style/index.scss'
import '~/components/radio/style/index.scss'
import '~/components/switch/style/index.scss'
import '~/components/input-number/style/index.scss'
import '~/components/slider/style/index.scss'
import '~/components/date-picker/style/index.scss'
import '~/components/time-picker/style/index.scss'
import '~/components/cascader/style/index.scss'
import '~/components/tag/style/index.scss'
import '~/components/badge/style/index.scss'
import '~/components/avatar/style/index.scss'
import '~/components/progress/style/index.scss'
import '~/components/statistic/style/index.scss'
import '~/components/descriptions/style/index.scss'
import '~/components/config-provider/style/index.scss'


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
  LhTimePicker,
  LhCascader,
  LhTag,
  LhBadge,
  LhAvatar,
  LhProgress,
  LhStatistic,
  LhDescriptions,
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
  // TimePicker
  LhTimePickerProps,
  // Cascader
  LhCascaderProps,
  // Tag
  LhTagProps,
  LhTagSize,
  // Badge
  LhBadgeProps,
  LhBadgeSize,
  // Avatar
  LhAvatarProps,
  LhAvatarSize,
  LhAvatarShape,
  // Progress
  LhProgressProps,
  LhProgressStatus,
  LhProgressType,
  // Statistic
  LhStatisticProps,
  // Descriptions
  LhDescriptionsProps,
  LhDescriptionsItem,
}
