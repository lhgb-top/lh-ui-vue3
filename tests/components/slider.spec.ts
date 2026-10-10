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

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhSlider, { props: { sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })

  it('gives the thumb slider semantics and a tab stop', () => {
    const wrapper = mount(LhSlider, { props: { modelValue: 30 } })
    const thumb = wrapper.find('.lh-slider__button-wrapper')
    expect(thumb.attributes('role')).toBe('slider')
    expect(thumb.attributes('tabindex')).toBe('0')
    expect(thumb.attributes('aria-valuenow')).toBe('30')
    expect(thumb.attributes('aria-valuemin')).toBe('0')
    expect(thumb.attributes('aria-valuemax')).toBe('100')
    expect(thumb.attributes('aria-orientation')).toBe('horizontal')
    wrapper.unmount()
  })

  it('removes the thumb from the tab order when disabled', async () => {
    const wrapper = mount(LhSlider, { props: { modelValue: 30, disabled: true } })
    const thumb = wrapper.find('.lh-slider__button-wrapper')
    expect(thumb.attributes('tabindex')).toBe('-1')
    // 按键不应改变值
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(thumb.attributes('aria-valuenow')).toBe('30')
    wrapper.unmount()
  })

  it('moves the value by step on arrow keys and emits change', async () => {
    const wrapper = mount(LhSlider, { props: { modelValue: 30, step: 10 } })
    const thumb = wrapper.find('.lh-slider__button-wrapper')
    await thumb.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([40])
    expect(wrapper.emitted('change')?.[0]).toEqual([40])
    expect(thumb.attributes('aria-valuenow')).toBe('40')
    await thumb.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([30])
    wrapper.unmount()
  })

  it('jumps to the extremes on Home / End', async () => {
    const wrapper = mount(LhSlider, { props: { modelValue: 30, step: 10 } })
    const thumb = wrapper.find('.lh-slider__button-wrapper')
    await thumb.trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
    await thumb.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([100])
    wrapper.unmount()
  })

  it('steps by pageStep on PageUp / PageDown', async () => {
    // 量程 0-100，step 5 → pageStep = max(5, 10) = 10
    const wrapper = mount(LhSlider, { props: { modelValue: 50, min: 0, max: 100, step: 5 } })
    const thumb = wrapper.find('.lh-slider__button-wrapper')
    await thumb.trigger('keydown', { key: 'PageUp' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([60])
    await thumb.trigger('keydown', { key: 'PageDown' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([50])
    wrapper.unmount()
  })

  it('ignores non-navigation keys', async () => {
    const wrapper = mount(LhSlider, { props: { modelValue: 30 } })
    const thumb = wrapper.find('.lh-slider__button-wrapper')
    await thumb.trigger('keydown', { key: 'Tab' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('clamps each range thumb to its own range without swapping', async () => {
    const wrapper = mount(LhSlider, { props: { modelValue: [20, 80], range: true, step: 10 } })
    const thumbs = wrapper.findAll('.lh-slider__button-wrapper')
    expect(thumbs).toHaveLength(2)
    expect(thumbs[0].attributes('aria-valuenow')).toBe('20')
    expect(thumbs[1].attributes('aria-valuenow')).toBe('80')
    // 起始端右移逼近结束端，不越过
    await thumbs[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[30, 80]])
    // 结束端右移到极值
    await thumbs[1].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([[30, 90]])
    wrapper.unmount()
  })
})