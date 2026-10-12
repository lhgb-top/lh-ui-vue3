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
  LhDivider,
  LhSpace,
  LhCard,
  LhEmpty,
  LhSkeleton,
  LhSkeletonItem,
  LhAlert,
  LhBreadcrumb,
  LhBreadcrumbItem,
  LhPagination,
  LhTabs,
  LhTabPane,
  LhSteps,
  LhStep,
  LhPopover,
  LhPopconfirm,
  LhDrawer,
  LhDropdown,
  LhDropdownItem,
  // Wave D
  LhSpinner,
  LhMessage,
  LhNotification,
  LhLoading,
  // Wave E
  LhTimeline,
  LhTimelineItem,
  LhCollapse,
  LhCollapseItem,
  LhRate,
  LhSegmented,
  LhCalendar,
  LhAffix,
  LhBackTop,
  LhImage,
  LhImageViewer,
  LhMenu,
  LhMenuItem,
  LhSubMenu,
  LhMenuItemGroup,
  LhTable,
  LhLayout,
  LhLayoutHeader,
  LhLayoutAside,
  LhLayoutMain,
  LhLayoutFooter,
  LhRow,
  LhCol,
  LhTree,
  LhTreeSelect,
  LhTransfer,
  LhUpload,
  LhAnchor,
  LhVirtualList,
} from '~/components'

// Locales
import { lhlocale, zhCN, enUS } from '~/locale'

// Composables
import { useLhTheme, useLhPresetTheme } from '~/composables'
import type { LhThemeType } from '~/composables'

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
// LhIconName 由四个公共 prop（LhButton.icon、LhInput.prefixIcon/suffixIcon、
// LhAvatar.icon、LhStep.icon）引用，直接从 share 引入再导出，供使用者约束图标名
import type { LhIconName } from '@lh-ui/share/core/icon'
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
import type { LhLocalePath } from '~/locale'
import type { LhDividerProps } from '~/components/divider'
import type { LhSpaceProps } from '~/components/space'
import type { LhCardProps } from '~/components/card'
import type { LhEmptyProps } from '~/components/empty'
import type { LhSkeletonProps, LhSkeletonItemProps } from '~/components/skeleton'
import type { LhAlertProps } from '~/components/alert'
import type { LhBreadcrumbProps, LhBreadcrumbItemProps } from '~/components/breadcrumb'
import type { LhPaginationProps } from '~/components/pagination'
import type { LhTabsProps, LhTabPaneProps } from '~/components/tabs'
import type { LhStepsProps, LhStepProps } from '~/components/steps'
import type { LhPopoverProps, LhPopoverPlacement, LhPopoverTrigger } from '~/components/popover'
import type { LhPopconfirmProps, LhPopconfirmType, LhPopconfirmPlacement } from '~/components/popconfirm'
import type { LhDrawerProps, LhDrawerDirection } from '~/components/drawer'
import type { LhDropdownProps, LhDropdownItemProps, LhDropdownPlacement, LhDropdownTrigger } from '~/components/dropdown'
import type { LhSpinnerProps } from '~/components/spinner'
import type { LhMessageOptions, LhMessageHandle, LhMessageProps, LhMessageType } from '~/components/message'
import type {
  LhNotificationOptions,
  LhNotificationHandle,
  LhNotificationProps,
  LhNotificationPosition,
  LhNotificationType,
} from '~/components/notification'
import type { LhLoadingOptions, LhLoadingHandle } from '~/components/loading'
import type { LhTimelineProps, LhTimelineItemProps } from '~/components/timeline'
import type { LhCollapseProps, LhCollapseItemProps } from '~/components/collapse'
import type { LhRateProps } from '~/components/rate'
import type { LhSegmentedProps } from '~/components/segmented'
import type { LhCalendarProps } from '~/components/calendar'
import type { LhAffixProps } from '~/components/affix'
import type { LhBackTopProps } from '~/components/backtop'
import type { LhImageProps, LhImageViewerProps } from '~/components/image'
import type { LhMenuProps, LhMenuItemProps, LhSubMenuProps, LhMenuItemGroupProps } from '~/components/menu'
import type { LhTableProps } from '~/components/table'
import type {
  LhLayoutAsideProps,
  LhLayoutProps,
  LhLayoutSectionProps,
} from '~/components/layout'
import type { LhColProps, LhRowProps } from '~/components/grid'
import type { LhTreeProps } from '~/components/tree'
import type { LhTreeSelectProps } from '~/components/tree-select'
import type { LhTransferProps } from '~/components/transfer'
import type { LhUploadProps } from '~/components/upload'
import type { LhAnchorProps } from '~/components/anchor'
import type { LhVirtualListProps } from '~/components/virtual-list'

// Styles
import '@lh-ui/share/styles/button'
import '@lh-ui/share/styles/input'
import '@lh-ui/share/styles/icon'
import '@lh-ui/share/styles/tooltip'
import '@lh-ui/share/styles/dialog'
import '@lh-ui/share/styles/form'
import '@lh-ui/share/styles/select'
import '@lh-ui/share/styles/checkbox'
import '@lh-ui/share/styles/radio'
import '@lh-ui/share/styles/switch'
import '@lh-ui/share/styles/input-number'
import '@lh-ui/share/styles/slider'
import '@lh-ui/share/styles/date-picker'
import '@lh-ui/share/styles/time-picker'
import '@lh-ui/share/styles/cascader'
import '@lh-ui/share/styles/tag'
import '@lh-ui/share/styles/badge'
import '@lh-ui/share/styles/avatar'
import '@lh-ui/share/styles/progress'
import '@lh-ui/share/styles/statistic'
import '@lh-ui/share/styles/descriptions'
import '@lh-ui/share/styles/config-provider'
import '@lh-ui/share/styles/divider'
import '@lh-ui/share/styles/space'
import '@lh-ui/share/styles/card'
import '@lh-ui/share/styles/empty'
import '@lh-ui/share/styles/skeleton'
import '@lh-ui/share/styles/alert'
import '@lh-ui/share/styles/breadcrumb'
import '@lh-ui/share/styles/pagination'
import '@lh-ui/share/styles/tabs'
import '@lh-ui/share/styles/steps'
import '@lh-ui/share/styles/popover'
import '@lh-ui/share/styles/popconfirm'
import '@lh-ui/share/styles/drawer'
import '@lh-ui/share/styles/dropdown'
import '@lh-ui/share/styles/spinner'
import '@lh-ui/share/styles/message'
import '@lh-ui/share/styles/notification'
import '@lh-ui/share/styles/loading'
import '@lh-ui/share/styles/timeline'
import '@lh-ui/share/styles/collapse'
import '@lh-ui/share/styles/rate'
import '@lh-ui/share/styles/segmented'
import '@lh-ui/share/styles/calendar'
import '@lh-ui/share/styles/affix'
import '@lh-ui/share/styles/backtop'
import '@lh-ui/share/styles/image'
import '@lh-ui/share/styles/menu'
import '@lh-ui/share/styles/table'
import '@lh-ui/share/styles/layout'
import '@lh-ui/share/styles/grid'
import '@lh-ui/share/styles/tree'
import '@lh-ui/share/styles/tree-select'
import '@lh-ui/share/styles/transfer'
import '@lh-ui/share/styles/upload'
import '@lh-ui/share/styles/anchor'
import '@lh-ui/share/styles/virtual-list'


/**
 * 组件列表 - 用于全量注册
 */
/**
 * 全量安装所有组件
 * @param app Vue 应用实例
 */
function install(app: App): void {
  lhComponents.forEach((component) => {
    // Wave D 的服务对象（LhMessage / LhNotification / LhLoading）自带 install：
    // 注册配套的 host / 条目组件或指令，而不是把服务函数本身注册成组件
    const installable = component as unknown as { install?: (a: App) => void }
    if (typeof installable.install === 'function') {
      installable.install(app)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

/**
 * @lh-ui/vue3 组件库
 *
 * 使用方式：
 *
 * 1. 全量引入
 * ```ts
 * import { createApp } from 'vue'
 * import lhUiPlus from '@lh-ui/vue3'
 * import '@lh-ui/vue3/dist/index.css'
 *
 * const app = createApp(App)
 * app.use(lhUiPlus)
 * ```
 *
 * 2. 按需引入
 * ```ts
 * import { LhButton, LhInput, LhDialog } from '@lh-ui/vue3'
 * import '@lh-ui/vue3/style/button'
 * import '@lh-ui/vue3/style/dialog'
 *
 * app.component('LhButton', LhButton)
 * app.component('LhDialog', LhDialog)
 * ```
 */
const lhUiPlus: Plugin & { version: string } = {
  install,
  version: '1.1.0',
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
  // Composables
  useLhTheme,
  useLhPresetTheme,
  // Wave A
  LhDivider,
  LhSpace,
  LhCard,
  LhEmpty,
  LhSkeleton,
  LhSkeletonItem,
  LhAlert,
  // Wave B
  LhBreadcrumb,
  LhBreadcrumbItem,
  LhPagination,
  LhTabs,
  LhTabPane,
  LhSteps,
  LhStep,
  // Wave C
  LhPopover,
  LhPopconfirm,
  LhDrawer,
  LhDropdown,
  LhDropdownItem,
  // Wave D
  LhSpinner,
  LhMessage,
  LhNotification,
  LhLoading,
  // Wave E
  LhTimeline,
  LhTimelineItem,
  LhCollapse,
  LhCollapseItem,
  LhRate,
  LhSegmented,
  LhCalendar,
  LhAffix,
  LhBackTop,
  LhImage,
  LhImageViewer,
  LhMenu,
  LhMenuItem,
  LhSubMenu,
  LhMenuItemGroup,
  LhTable,
  LhLayout,
  LhLayoutHeader,
  LhLayoutAside,
  LhLayoutMain,
  LhLayoutFooter,
  LhRow,
  LhCol,
  LhTree,
  LhTreeSelect,
  LhTransfer,
  LhUpload,
  LhAnchor,
  LhVirtualList,
}

// 类型导出
export type {
  // Composables
  LhThemeType,
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
  LhIconName,
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
  // Wave A
  LhDividerProps,
  LhSpaceProps,
  LhCardProps,
  LhEmptyProps,
  LhSkeletonProps,
  LhSkeletonItemProps,
  LhAlertProps,
  // Wave B
  LhBreadcrumbProps,
  LhBreadcrumbItemProps,
  LhPaginationProps,
  LhTabsProps,
  LhTabPaneProps,
  LhStepsProps,
  LhStepProps,
  // Wave C
  LhPopoverProps,
  LhPopoverPlacement,
  LhPopoverTrigger,
  LhPopconfirmProps,
  LhPopconfirmType,
  LhPopconfirmPlacement,
  LhDrawerProps,
  LhDrawerDirection,
  LhDropdownProps,
  LhDropdownItemProps,
  LhDropdownPlacement,
  LhDropdownTrigger,
  // Wave D
  LhSpinnerProps,
  LhMessageOptions,
  LhMessageHandle,
  LhMessageProps,
  LhMessageType,
  LhNotificationOptions,
  LhNotificationHandle,
  LhNotificationProps,
  LhNotificationPosition,
  LhNotificationType,
  LhLoadingOptions,
  LhLoadingHandle,
  // Wave E
  LhTimelineProps,
  LhTimelineItemProps,
  LhCollapseProps,
  LhCollapseItemProps,
  LhRateProps,
  LhSegmentedProps,
  LhCalendarProps,
  LhAffixProps,
  LhBackTopProps,
  LhImageProps,
  LhImageViewerProps,
  LhMenuProps,
  LhMenuItemProps,
  LhSubMenuProps,
  LhMenuItemGroupProps,
  LhTableProps,
  LhLayoutProps,
  LhLayoutSectionProps,
  LhLayoutAsideProps,
  LhRowProps,
  LhColProps,
  LhTreeProps,
  LhTreeSelectProps,
  LhTransferProps,
  LhUploadProps,
  LhAnchorProps,
  LhVirtualListProps,
  // Locale
  LhLocalePath,
}
