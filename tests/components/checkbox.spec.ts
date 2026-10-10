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

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhCheckbox, { props: { label: '同意', sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })

  it('propagates dynamic group disabled/size changes to items', async () => {
    const wrapper = mount(LhCheckboxGroup, {
      props: { modelValue: [], disabled: false, size: 'medium' },
      slots: {
        default: () => [hCheckbox({ value: 'a', label: 'A' })],
      },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()

    // 红线 #6：group 上下文必须是 ref 本体——动态禁用/改尺寸要传导给子项
    await wrapper.setProps({ disabled: true, size: 'large' })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.lh-checkbox--large').exists()).toBe(true)
  })

})

function hCheckbox(props: Record<string, unknown>) {
  return h(LhCheckbox, props)
}
