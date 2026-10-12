import type { App } from 'vue'
import { h, computed, watchEffect } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { EnhanceAppContext, Theme, useData } from 'vitepress'
import DemoBlock from '../components/DemoBlock.vue'
import ApiStyleToggle from '../components/ApiStyleToggle.vue'
import PresetThemeSwitcher from '../components/PresetThemeSwitcher.vue'
import ThemeStudio from '../components/ThemeStudio.vue'
import LhHome from '../components/LhHome.vue'
import { lhlocale } from '~/locale'
import {
  LhButton, LhInput, LhIcon, LhTooltip, LhDialog,
  LhForm, LhFormItem, LhSelect, LhCheckbox, LhCheckboxGroup,
  LhRadio, LhRadioGroup, LhConfigProvider, LhSwitch,
  LhInputNumber, LhSlider, LhDatePicker, LhTimePicker,
  LhCascader, LhTag, LhBadge, LhAvatar, LhProgress,
  LhStatistic, LhDescriptions,
  LhDivider, LhSpace, LhCard, LhEmpty, LhSkeleton, LhSkeletonItem, LhAlert,
  LhBreadcrumb, LhBreadcrumbItem, LhPagination, LhTabs, LhTabPane, LhSteps, LhStep,
  LhPopover, LhPopconfirm, LhDrawer, LhDropdown, LhDropdownItem,
  LhSpinner, LhMessage, LhNotification, LhLoading,
  LhTimeline, LhTimelineItem, LhCollapse, LhCollapseItem,
  LhRate, LhSegmented, LhCalendar, LhAffix, LhBackTop, LhImage,
  LhMenu, LhMenuItem, LhSubMenu, LhMenuItemGroup,
  LhTable,
  LhLayout, LhLayoutHeader, LhLayoutAside, LhLayoutMain, LhLayoutFooter,
  LhRow, LhCol,
  LhTree, LhTreeSelect, LhTransfer, LhUpload,
  LhAnchor, LhVirtualList,
} from '~/components'
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
import '@lh-ui/share/styles/theme/common/var.scss'
import '@lh-ui/share/styles/theme/common/var-dark.scss'
import './style.css'

const customTheme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    const { page, lang } = useData()

    // 文案语言跟随 VitePress 的 lang（en 站点 lang 为 'en-US'）。
    // 语言包 share 已内置注册，setLocale 直接切换即可；watchEffect 在 SSG 期同步执行一次，
    // 保证每页渲染时文案与页面语言一致（之前组件文案始终是默认中文）
    watchEffect(() => {
      lhlocale.setLocale(lang.value === 'en-US' ? 'en-US' : 'zh-CN')
    })

    const isComponentDoc = computed(() => {
      const path = page.value?.relativePath || ''
      return path.startsWith('components/') || path.startsWith('en/components/')
    })

    return h(DefaultTheme.Layout, null, {
      'doc-top': () =>
        isComponentDoc.value
          ? h('div', { class: 'api-toggle-wrapper' }, [h(ApiStyleToggle)])
          : null,
      'nav-bar-content-after': () => h(PresetThemeSwitcher),
      'nav-screen-content-after': () => h(PresetThemeSwitcher),
    })
  },
  enhanceApp({ app }:EnhanceAppContext) {
    app.component('DemoBlock', DemoBlock)
    app.component('ThemeStudio', ThemeStudio)
    app.component('LhHome', LhHome)
    app.component('LhButton', LhButton)
    app.component('LhInput', LhInput)
    app.component('LhIcon', LhIcon)
    app.component('LhTooltip', LhTooltip)
    app.component('LhDialog', LhDialog)
    app.component('LhForm', LhForm)
    app.component('LhFormItem', LhFormItem)
    app.component('LhSelect', LhSelect)
    app.component('LhCheckbox', LhCheckbox)
    app.component('LhCheckboxGroup', LhCheckboxGroup)
    app.component('LhRadio', LhRadio)
    app.component('LhRadioGroup', LhRadioGroup)
    app.component('LhConfigProvider', LhConfigProvider)
    app.component('LhSwitch', LhSwitch)
    app.component('LhInputNumber', LhInputNumber)
    app.component('LhSlider', LhSlider)
    app.component('LhDatePicker', LhDatePicker)
    app.component('LhTimePicker', LhTimePicker)
    app.component('LhCascader', LhCascader)
    app.component('LhTag', LhTag)
    app.component('LhBadge', LhBadge)
    app.component('LhAvatar', LhAvatar)
    app.component('LhProgress', LhProgress)
    app.component('LhStatistic', LhStatistic)
    app.component('LhDescriptions', LhDescriptions)
    app.component('LhDivider', LhDivider)
    app.component('LhSpace', LhSpace)
    app.component('LhCard', LhCard)
    app.component('LhEmpty', LhEmpty)
    app.component('LhSkeleton', LhSkeleton)
    app.component('LhSkeletonItem', LhSkeletonItem)
    app.component('LhAlert', LhAlert)
    app.component('LhBreadcrumb', LhBreadcrumb)
    app.component('LhBreadcrumbItem', LhBreadcrumbItem)
    app.component('LhPagination', LhPagination)
    app.component('LhTabs', LhTabs)
    app.component('LhTabPane', LhTabPane)
    app.component('LhSteps', LhSteps)
    app.component('LhStep', LhStep)
    app.component('LhPopover', LhPopover)
    app.component('LhPopconfirm', LhPopconfirm)
    app.component('LhDrawer', LhDrawer)
    app.component('LhDropdown', LhDropdown)
    app.component('LhDropdownItem', LhDropdownItem)
    app.component('LhSpinner', LhSpinner)
    app.component('LhMessage', LhMessage)
    app.component('LhNotification', LhNotification)
    app.component('LhLoading', LhLoading)
    app.component('LhTimeline', LhTimeline)
    app.component('LhTimelineItem', LhTimelineItem)
    app.component('LhCollapse', LhCollapse)
    app.component('LhCollapseItem', LhCollapseItem)
    app.component('LhRate', LhRate)
    app.component('LhSegmented', LhSegmented)
    app.component('LhCalendar', LhCalendar)
    app.component('LhAffix', LhAffix)
    app.component('LhBackTop', LhBackTop)
    app.component('LhImage', LhImage)
    app.component('LhMenu', LhMenu)
    app.component('LhMenuItem', LhMenuItem)
    app.component('LhSubMenu', LhSubMenu)
    app.component('LhMenuItemGroup', LhMenuItemGroup)
    app.component('LhTable', LhTable)
    app.component('LhLayout', LhLayout)
    app.component('LhLayoutHeader', LhLayoutHeader)
    app.component('LhLayoutAside', LhLayoutAside)
    app.component('LhLayoutMain', LhLayoutMain)
    app.component('LhLayoutFooter', LhLayoutFooter)
    app.component('LhRow', LhRow)
    app.component('LhCol', LhCol)
    app.component('LhTree', LhTree)
    app.component('LhTreeSelect', LhTreeSelect)
    app.component('LhTransfer', LhTransfer)
    app.component('LhUpload', LhUpload)
    app.component('LhAnchor', LhAnchor)
    app.component('LhVirtualList', LhVirtualList)
  },
}

export default customTheme
