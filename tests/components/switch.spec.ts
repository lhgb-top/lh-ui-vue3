import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhSwitch from '~/components/switch/src/index.vue'

describe('LhSwitch', () => {
  it('should render correctly', () => {
    const wrapper = mount(LhSwitch)
    expect(wrapper.exists()).toBe(true)
  })

  it('should emit update:modelValue on click', async () => {
    const wrapper = mount(LhSwitch, {
      props: { modelValue: false },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('should emit change event on click', async () => {
    const wrapper = mount(LhSwitch, {
      props: { modelValue: false },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('should not toggle when disabled', async () => {
    const wrapper = mount(LhSwitch, {
      props: { modelValue: false, disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should not toggle when loading', async () => {
    const wrapper = mount(LhSwitch, {
      props: { modelValue: false, loading: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should have correct accessibility attributes', () => {
    const wrapper = mount(LhSwitch, {
      props: { modelValue: true, disabled: false },
    })
    expect(wrapper.attributes('role')).toBe('switch')
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhSwitch, { props: { sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })
})