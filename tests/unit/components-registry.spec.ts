import { describe, expect, it } from 'vitest'
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
      'LhConfigProvider',
    ])
  })
})
