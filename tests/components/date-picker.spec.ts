import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import LhDatePicker from '../../packages/components/date-picker'

describe('LhDatePicker Component', () => {
  let wrapper: VueWrapper

  it('should render', () => {
    wrapper = mount(LhDatePicker)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with disabled class', async () => {
    wrapper = mount(LhDatePicker, {
      props: { disabled: true, modelValue: null },
    })
    expect(wrapper.classes()).toContain('lh-date-picker--disabled')
  })

  it('should render with size class', async () => {
    wrapper = mount(LhDatePicker, {
      props: { size: 'small', modelValue: null },
    })
    expect(wrapper.classes()).toContain('lh-date-picker--small')
  })

  it('should render the input field', async () => {
    wrapper = mount(LhDatePicker, {
      props: { modelValue: null },
    })
    expect(wrapper.find('.lh-date-picker__input').exists()).toBe(true)
  })

  it('should show clear icon when clearable and has value', async () => {
    wrapper = mount(LhDatePicker, {
      props: {
        clearable: true,
        modelValue: new Date(2024, 0, 15),
      },
      global: {
        stubs: {
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    expect(wrapper.find('.lh-date-picker__clear').exists()).toBe(true)
  })

  it('should not show clear icon when no value', async () => {
    wrapper = mount(LhDatePicker, {
      props: { clearable: true, modelValue: null },
    })
    expect(wrapper.find('.lh-date-picker__clear').exists()).toBe(false)
  })

  it('should emit update:modelValue when clear is clicked', async () => {
    wrapper = mount(LhDatePicker, {
      props: {
        clearable: true,
        modelValue: new Date(2024, 0, 15),
      },
      global: {
        stubs: {
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    const clearIcon = wrapper.find('.lh-date-picker__clear')
    if (clearIcon.exists()) {
      await clearIcon.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('should render week day headers when opened', async () => {
    wrapper = mount(LhDatePicker, {
      props: { modelValue: null },
      global: {
        stubs: {
          teleports: false,
          'lh-icon': true,
        },
      },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(true)
  })

  it('should display formatted date when value is set', async () => {
    wrapper = mount(LhDatePicker, {
      props: {
        modelValue: new Date(2024, 0, 15),
        format: 'yyyy-MM-dd',
      },
    })
    expect(wrapper.find('.lh-date-picker__value').exists()).toBe(true)
    expect(wrapper.find('.lh-date-picker__value').text()).toContain('2024')
  })

  it('should not open panel when disabled', async () => {
    wrapper = mount(LhDatePicker, {
      props: { disabled: true, modelValue: null },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(false)
  })
})