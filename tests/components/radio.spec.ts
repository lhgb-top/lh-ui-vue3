import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import LhRadio, { LhRadioGroup } from '~/components/radio'

describe('LhRadio', () => {
  it('supports standalone radio with v-model', async () => {
    const wrapper = mount(LhRadio, {
      props: { value: 'a', modelValue: 'a', label: 'Option A' },
    })

    expect(wrapper.classes()).toContain('lh-radio--checked')
  })

  it('emits change event when clicked', async () => {
    const wrapper = mount(LhRadio, {
      props: { value: 'a', label: 'Option A' },
    })

    await wrapper.find('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['a'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['a'])
  })

  it('shows disabled state', () => {
    const wrapper = mount(LhRadio, {
      props: { value: 'a', disabled: true, label: 'Disabled' },
    })

    expect(wrapper.classes()).toContain('lh-radio--disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('supports group single-selection semantics', async () => {
    const wrapper = mount(LhRadioGroup, {
      props: { modelValue: 'a' },
      slots: {
        default: () => [
          hRadio({ value: 'a', label: 'A' }),
          hRadio({ value: 'b', label: 'B' }),
        ],
      },
    })

    const inputs = wrapper.findAll('input')
    expect(inputs[0].element.checked).toBe(true)
    expect(inputs[1].element.checked).toBe(false)

    await inputs[1].setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('inherits group disabled state', () => {
    const wrapper = mount(LhRadioGroup, {
      props: { modelValue: 'a', disabled: true },
      slots: {
        default: () => hRadio({ value: 'a', label: 'A' }),
      },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('respects size prop', () => {
    const wrapper = mount(LhRadio, {
      props: { value: 'a', size: 'small', label: 'Small' },
    })

    expect(wrapper.classes()).toContain('lh-radio--small')
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhRadio, { props: { label: '选项', sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })

  it('propagates dynamic group disabled/size changes to items', async () => {
    const wrapper = mount(LhRadioGroup, {
      props: { modelValue: 'a', disabled: false, size: 'medium' },
      slots: {
        default: () => [hRadio({ value: 'a', label: 'A' })],
      },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()

    await wrapper.setProps({ disabled: true, size: 'large' })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.lh-radio--large').exists()).toBe(true)
  })

})

function hRadio(props: Record<string, unknown>) {
  return h(LhRadio, props)
}