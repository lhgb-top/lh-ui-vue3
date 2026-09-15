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
    ])
  })

  // 上面的清单是显式契约，容易在新增组件时漏改；
  // 这里按目录反查，确保 packages/components 下的组件都已挂到注册清单。
  it('covers every component directory', () => {
    const componentsDir = path.resolve(__dirname, '../../packages/components')
    const registeredBlocks = lhComponents.map(
      (component) => (component.name ?? '').replace(/^Lh/, '').toLowerCase(),
    )

    const missing = fs
      .readdirSync(componentsDir)
      .filter((name) => fs.statSync(path.join(componentsDir, name)).isDirectory())
      // cascader -> cascader、input-number -> inputnumber、config-provider -> config-provider
      .filter((dir) => !registeredBlocks.includes(dir.replace(/-/g, '')))

    expect(missing).toEqual([])
  })
})
