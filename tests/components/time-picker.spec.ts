import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import LhTimePicker from '~/components/time-picker'

describe('LhTimePicker Component', () => {
  let wrapper: VueWrapper

  it('should render', () => {
    wrapper = mount(LhTimePicker)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with disabled class', async () => {
    wrapper = mount(LhTimePicker, {
      props: { disabled: true, modelValue: null },
    })
    expect(wrapper.classes()).toContain('lh-time-picker--disabled')
  })

  it('should render with size class', async () => {
    wrapper = mount(LhTimePicker, {
      props: { size: 'small', modelValue: null },
    })
    expect(wrapper.classes()).toContain('lh-time-picker--small')
  })

  it('should render the input field', async () => {
    wrapper = mount(LhTimePicker, {
      props: { modelValue: null },
    })
    expect(wrapper.find('.lh-time-picker__input-inner').exists()).toBe(true)
  })

  it('should show clear icon when clearable and has value', async () => {
    wrapper = mount(LhTimePicker, {
      props: {
        clearable: true,
        modelValue: new Date(2024, 0, 15, 9, 30, 0),
      },
      global: {
        stubs: {
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    expect(wrapper.find('.lh-time-picker__clear').exists()).toBe(true)
  })

  it('should not show clear icon when no value', async () => {
    wrapper = mount(LhTimePicker, {
      props: { clearable: true, modelValue: null },
    })
    expect(wrapper.find('.lh-time-picker__clear').exists()).toBe(false)
  })

  it('should emit update:modelValue when clear is clicked', async () => {
    wrapper = mount(LhTimePicker, {
      props: {
        clearable: true,
        modelValue: new Date(2024, 0, 15, 9, 30, 0),
      },
      global: {
        stubs: {
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    const clearIcon = wrapper.find('.lh-time-picker__clear')
    if (clearIcon.exists()) {
      await clearIcon.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('should display formatted time when value is set', async () => {
    wrapper = mount(LhTimePicker, {
      props: {
        modelValue: new Date(2024, 0, 15, 9, 5, 30),
        format: 'HH:mm:ss',
      },
    })
    expect(wrapper.find('.lh-time-picker__value').exists()).toBe(true)
    expect(wrapper.find('.lh-time-picker__value').text()).toContain('09')
  })

  it('should not open panel when disabled', async () => {
    wrapper = mount(LhTimePicker, {
      props: { disabled: true, modelValue: null },
    })
    await wrapper.find('.lh-time-picker__input-inner').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(false)
  })

  it('should open panel when clicked', async () => {
    wrapper = mount(LhTimePicker, {
      props: { disabled: false, modelValue: null },
    })
    await wrapper.find('.lh-time-picker__input-inner').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(true)
  })
})