# @lh-ui/vue3

A Vue 3 UI Component Library - Enterprise-grade open-source framework.

基于 Vue 3 + TypeScript 的企业级 UI 组件库，采用中式「国风/水墨」视觉语言。

## Features

- Built with Vue 3 + TypeScript
- Composition API support
- Tree-shaking ready (ESM/CJS/UMD)
- Theme customization via CSS variables
- Internationalization (i18n)
- ConfigProvider for global configuration

## Installation

```bash
pnpm install @lh-ui/vue3
# or
npm install @lh-ui/vue3
# or
yarn add @lh-ui/vue3
```

## Quick Start

### Full Import

```ts
import { createApp } from 'vue'
import lhUiPlus from '@lh-ui/vue3'
import '@lh-ui/vue3/dist/index.css'

const app = createApp(App)
app.use(lhUiPlus)
app.mount('#app')
```

### On-demand Import

```ts
import { createApp } from 'vue'
import { LhButton, LhInput } from '@lh-ui/vue3'
import '@lh-ui/vue3/style/button'
import '@lh-ui/vue3/style/input'

const app = createApp(App)
app.component(LhButton.name, LhButton)
app.component(LhInput.name, LhInput)
app.mount('#app')
```

## Components

- **LhButton** - Button with type, size, loading, plain, round, circle variants
- **LhInput** - Input with v-model, clearable, textarea, prefix/suffix support
- **LhConfigProvider** - Global config via provide/inject
- **LhIcon** - SVG icon component
- **LhTooltip** - Tooltip with Popper.js positioning
- **LhDialog** - Modal dialog
- **LhForm / LhFormItem** - Form with validation
- **LhSelect** - Selectable dropdown
- **LhCheckbox / LhCheckboxGroup** - Checkbox
- **LhRadio / LhRadioGroup** - Radio
- **LhSwitch** - Toggle switch
- **LhInputNumber** - Numeric input with stepper
- **LhSlider** - Draggable slider
- **LhDatePicker** - Date picker
- **LhTimePicker** - Time picker
- **LhCascader** - Cascade selection
- **LhTag** - Tag label
- **LhBadge** - Status badge
- **LhAvatar** - User avatar
- **LhProgress** - Progress bar
- **LhStatistic** - Statistic display
- **LhDescriptions** - Descriptive list
- **LhDivider** - Section divider
- **LhSpace** - Layout spacing
- **LhCard** - Card container
- **LhEmpty** - Empty state
- **LhSkeleton / LhSkeletonItem** - Loading skeleton
- **LhAlert** - Alert message
- **LhBreadcrumb / LhBreadcrumbItem** - Breadcrumb navigation
- **LhPagination** - Pagination
- **LhTabs / LhTabPane** - Tabbed panels
- **LhSteps / LhStep** - Step progress
- **LhPopover** - Floating popover
- **LhPopconfirm** - Confirmation popover
- **LhDrawer** - Slide-out drawer
- **LhDropdown / LhDropdownItem** - Dropdown menu
- **LhSpinner** - Loading spinner
- **LhMessage** - Global message toast
- **LhNotification** - Notification toast
- **LhLoading** - Loading overlay directive
- **LhTimeline / LhTimelineItem** - Vertical timeline
- **LhCollapse / LhCollapseItem** - Collapsible panel
- **LhRate** - Star rating
- **LhSegmented** - Segmented control
- **LhCalendar** - Calendar
- **LhAffix** - Fixed positioning
- **LhBackTop** - Back to top button
- **LhImage / LhImageViewer** - Image with preview
- **LhTable** - Data table
- **LhLayout / LhLayoutHeader / LhLayoutAside / LhLayoutMain / LhLayoutFooter** - Layout container
- **LhRow / LhCol** - Grid system
- **LhTree** - Tree view
- **LhTreeSelect** - Tree-structured select
- **LhTransfer** - List transfer
- **LhUpload** - File upload
- **LhAnchor** - Anchor navigation
- **LhVirtualList** - Virtual scrolling list
- **LhMenu / LhMenuItem / LhSubMenu / LhMenuItemGroup** - Navigation menu

完整组件文档见 [https://www.lhgb.top/lhui/plus/](https://www.lhgb.top/lhui/plus/)

## Development

```bash
pnpm install
pnpm dev  # Start Vite preview server
```

## Build

```bash
pnpm build      # Full build (ESM + CJS + UMD)
pnpm build:esm  # ESM only
pnpm build:cjs  # CJS only
pnpm build:umd  # UMD only
```

## Internationalization

```ts
import { lhlocale, zhCN, enUS } from '@lh-ui/vue3'

// Set locale
lhlocale.setLocale('zh-CN')

// Translate
const text = lhlocale.t('common.ok')
```

## License

[Apache License 2.0](./LICENSE)
