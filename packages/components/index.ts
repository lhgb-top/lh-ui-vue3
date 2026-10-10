import type { Component } from 'vue'

import LhButton from './button'
import LhInput from './input'
import LhConfigProvider from './config-provider'
import LhIcon from './icon'
import LhTooltip from './tooltip'
import LhDialog from './dialog'
import LhForm, { LhFormItem } from './form'
import LhSelect from './select'
import LhCheckbox, { LhCheckboxGroup } from './checkbox'
import LhRadio, { LhRadioGroup } from './radio'
import LhSwitch from './switch'
import LhInputNumber from './input-number'
import LhSlider from './slider'
import LhDatePicker from './date-picker'
import LhTimePicker from './time-picker'
import LhCascader from './cascader'
import LhTag from './tag'
import LhBadge from './badge'
import LhAvatar from './avatar'
import LhProgress from './progress'
import LhStatistic from './statistic'
import LhDescriptions from './descriptions'
import LhDivider from './divider'
import LhSpace from './space'
import LhCard from './card'
import LhEmpty from './empty'
import LhSkeleton, { LhSkeletonItem } from './skeleton'
import LhAlert from './alert'
import LhBreadcrumb, { LhBreadcrumbItem } from './breadcrumb'
import LhPagination from './pagination'
import LhTabs, { LhTabPane } from './tabs'
import LhSteps, { LhStep } from './steps'
import LhPopover from './popover'
import LhPopconfirm from './popconfirm'
import LhDrawer from './drawer'
import LhDropdown, { LhDropdownItem } from './dropdown'
import LhSpinner from './spinner'
import LhMessage from './message'
import LhNotification from './notification'
import LhLoading from './loading'
import LhTimeline, { LhTimelineItem } from './timeline'
import LhCollapse, { LhCollapseItem } from './collapse'
import LhRate from './rate'
import LhSegmented from './segmented'
import LhCalendar from './calendar'
import LhAffix from './affix'
import LhBackTop from './backtop'
import LhImage, { LhImageViewer } from './image'
import LhTable from './table'
import LhLayout, {
  LhLayoutAside,
  LhLayoutFooter,
  LhLayoutHeader,
  LhLayoutMain,
} from './layout'
import { LhCol, LhRow } from './grid'
import LhTree from './tree'
import LhTreeSelect from './tree-select'
import LhTransfer from './transfer'
import LhUpload from './upload'
import LhAnchor from './anchor'
import LhVirtualList from './virtual-list'
import LhMenu, {
  LhMenuItem,
  LhMenuItemGroup,
  LhSubMenu,
} from './menu'

export const lhComponents: (Component & { name?: string })[] = [
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
  LhRadio,
  LhRadioGroup,
  LhSwitch,
  LhInputNumber,
  LhConfigProvider,
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
  LhSpinner,
  LhMessage as unknown as Component,
  LhNotification as unknown as Component,
  LhLoading as unknown as Component,
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
]

export {
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
  LhSpinner,
  LhMessage,
  LhNotification,
  LhLoading,
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
