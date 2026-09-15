import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhSlider from '~/components/slider'

describe('LhSlider Component', () => {
  it('should render', () => {
    const wrapper = mount(LhSlider)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with disabled class', async () => {
    const wrapper = mount(LhSlider, {
      props: { disabled: true },
    })
    expect(wrapper.classes()).toContain('lh-slider--disabled')
  })

  it('should render with range class', async () => {
    const wrapper = mount(LhSlider, {
      props: { range: true, modelValue: [0, 50] },
    })
    expect(wrapper.classes()).toContain('lh-slider--range')
  })

  it('should render two buttons in range mode', async () => {
    const wrapper = mount(LhSlider, {
      props: { range: true, modelValue: [0, 50] },
    })
    const buttons = wrapper.findAll('.lh-slider__button-wrapper')
    expect(buttons.length).toBe(2)
  })

  it('should render one button in single mode', async () => {
    const wrapper = mount(LhSlider, {
      props: { modelValue: 50 },
    })
    const buttons = wrapper.findAll('.lh-slider__button-wrapper')
    expect(buttons.length).toBe(1)
  })

  it('should render marks when provided', async () => {
    const wrapper = mount(LhSlider, {
      props: { marks: { 0: 'Low', 50: 'Mid', 100: 'High' } },
    })
    expect(wrapper.find('.lh-slider__marks').exists()).toBe(true)
  })

  it('should not render marks when not provided', async () => {
    const wrapper = mount(LhSlider, {
      props: {},
    })
    expect(wrapper.find('.lh-slider__marks').exists()).toBe(false)
  })

  it('should render input when showInput is true', async () => {
    const wrapper = mount(LhSlider, {
      props: { modelValue: 50, showInput: true },
    })
    expect(wrapper.find('.lh-slider__input').exists()).toBe(true)
  })

  it('should responsive to size change', async () => {
    const wrapper = mount(LhSlider, {
      props: { modelValue: 50, size: 'small' },
    })
    expect(wrapper.classes()).toContain('lh-slider--small')
  })

  it('should initialize local value from modelValue', async () => {
    const wrapper = mount(LhSlider, {
      props: { modelValue: [20, 80], range: true },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.lh-slider__button-wrapper').exists()).toBe(true)
  })

  it('should not be draggable when disabled', async () => {
    const wrapper = mount(LhSlider, {
      props: { disabled: true },
    })
    expect(wrapper.classes()).toContain('lh-slider--disabled')
  })
})