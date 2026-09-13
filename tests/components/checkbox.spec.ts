import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import LhCheckbox, { LhCheckboxGroup } from '~/components/checkbox'

describe('LhCheckbox', () => {
  it('supports standalone boolean v-model', async () => {
    const wrapper = mount(LhCheckbox, { props: { label: 'Accept' } })

    await wrapper.find('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.classes()).toContain('lh-checkbox--checked')
  })

  it('supports group array values and disabled state', async () => {
    const wrapper = mount(LhCheckboxGroup, {
      props: { modelValue: ['a'] },
      slots: {
        default: () => [
          hCheckbox({ value: 'a', label: 'A' }),
          hCheckbox({ value: 'b', label: 'B' }),
        ],
      },
    })

    const inputs = wrapper.findAll('input')
    await inputs[1].setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'b']])
  })
})

function hCheckbox(props: Record<string, unknown>) {
  return h(LhCheckbox, props)
}
