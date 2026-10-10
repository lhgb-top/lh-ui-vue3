import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { lhComponents } from '~/components'

describe('components registry', () => {
  it('contains every component with a unique name', () => {
    const names = lhComponents.map((component) => component.name)

    expect(names).not.toContain(undefined)
    expect(new Set(names).size).toBe(names.length)
    expect(names).toEqual([
      'LhButton',
      'LhInput',
      'LhIcon',
      'LhTooltip',
      'LhDialog',
      'LhForm',
      'LhFormItem',
      'LhSelect',
      'LhCheckbox',
      'LhCheckboxGroup',
      'LhRadio',
      'LhRadioGroup',
      'LhSwitch',
      'LhInputNumber',
      'LhConfigProvider',
      'LhSlider',
      'LhDatePicker',
      'LhTimePicker',
      'LhCascader',
      'LhTag',
      'LhBadge',
      'LhAvatar',
      'LhProgress',
      'LhStatistic',
      'LhDescriptions',
      'LhDivider',
      'LhSpace',
      'LhCard',
      'LhEmpty',
      'LhSkeleton',
      'LhSkeletonItem',
      'LhAlert',
      'LhBreadcrumb',
      'LhBreadcrumbItem',
      'LhPagination',
      'LhTabs',
      'LhTabPane',
      'LhSteps',
      'LhStep',
      'LhPopover',
      'LhPopconfirm',
      'LhDrawer',
      'LhDropdown',
      'LhDropdownItem',
      'LhSpinner',
      'LhMessage',
      'LhNotification',
      'LhLoading',
      'LhTimeline',
      'LhTimelineItem',
      'LhCollapse',
      'LhCollapseItem',
      'LhRate',
      'LhSegmented',
      'LhCalendar',
      'LhAffix',
      'LhBackTop',
      'LhImage',
      'LhMenu',
      'LhMenuItem',
      'LhSubMenu',
      'LhMenuItemGroup',
      'LhTable',
      'LhLayout',
      'LhLayoutHeader',
      'LhLayoutAside',
      'LhLayoutMain',
      'LhLayoutFooter',
      'LhRow',
      'LhCol',
      'LhTree',
      'LhTreeSelect',
      'LhTransfer',
      'LhUpload',
      'LhAnchor',
      'LhVirtualList',
    ])
  })

  // 上面的清单是显式契约，容易在新增组件时漏改；
  // 这里按目录反查，确保 packages/components 下的组件都已挂到注册清单。
  it('covers every component directory', () => {
    const componentsDir = path.resolve(__dirname, '../../packages/components')
    const registeredBlocks = lhComponents.map(
      (component) => (component.name ?? '').replace(/^Lh/, '').toLowerCase(),
    )

    // 目录名与注册块名不一致的特例（grid 由 LhRow/LhCol 提供）
    const dirAliases: Record<string, string> = { grid: 'row' }

    const missing = fs
      .readdirSync(componentsDir)
      .filter((name) => fs.statSync(path.join(componentsDir, name)).isDirectory())
      // cascader -> cascader、input-number -> inputnumber、config-provider -> config-provider
      .filter((dir) => !registeredBlocks.includes(dirAliases[dir] ?? dir.replace(/-/g, '')))

    expect(missing).toEqual([])
  })
})
