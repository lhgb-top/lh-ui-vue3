import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhInput from '~/components/input/src/index.vue'

describe('LhInput', () => {
  it('renders input element for type text', () => {
    const wrapper = mount(LhInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders textarea when type is textarea', () => {
    const wrapper = mount(LhInput, { props: { type: 'textarea' } })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('applies wrapper class', () => {
    const wrapper = mount(LhInput)
    expect(wrapper.classes()).toContain('lh-input__wrapper')
  })

  it('applies disabled class when disabled', () => {
    const wrapper = mount(LhInput, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('lh-input__wrapper--disabled')
  })

  it('applies size class', () => {
    const wrapper = mount(LhInput, { props: { size: 'small' } })
    expect(wrapper.find('.lh-input').classes()).toContain('lh-input--small')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(LhInput)
    const input = wrapper.find('input')
    await input.setValue('hello')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello'])
  })

  it('emits focus on focus', async () => {
    const wrapper = mount(LhInput)
    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
    expect(wrapper.classes()).toContain('lh-input__wrapper--focused')
  })

  it('emits blur on blur', async () => {
    const wrapper = mount(LhInput)
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('does not show clear button by default', () => {
    const wrapper = mount(LhInput, { props: { modelValue: 'test' } })
    expect(wrapper.find('.lh-input__clear').exists()).toBe(false)
  })

  it('shows clear button when clearable and has value', async () => {
    const wrapper = mount(LhInput, { props: { clearable: true, modelValue: 'test' } })
    expect(wrapper.find('.lh-input__clear').exists()).toBe(true)
  })

  it('clears value when clear button is clicked', async () => {
    const wrapper = mount(LhInput, { props: { clearable: true, modelValue: 'test' } })
    await wrapper.find('.lh-input__clear').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('renders prefix icon when provided', () => {
    const wrapper = mount(LhInput, { props: { prefixIcon: 'lh-icon-search' } })
    expect(wrapper.find('.lh-input__prefix').exists()).toBe(true)
  })

  it('renders suffix icon when provided', () => {
    const wrapper = mount(LhInput, { props: { suffixIcon: 'lh-icon-close' } })
    expect(wrapper.find('.lh-input__suffix').exists()).toBe(true)
  })

  it('shows word limit when showWordLimit and maxlength are set', () => {
    const wrapper = mount(LhInput, {
      props: { showWordLimit: true, maxlength: 50, modelValue: 'abc' },
    })
    expect(wrapper.find('.lh-input__count').exists()).toBe(true)
    expect(wrapper.find('.lh-input__count').text()).toContain('3/50')
  })

  it('applies focused class on focus', async () => {
    const wrapper = mount(LhInput)
    await wrapper.find('input').trigger('focus')
    expect(wrapper.classes()).toContain('lh-input__wrapper--focused')
  })

  it('renders label when provided', () => {
    const wrapper = mount(LhInput, { props: { label: 'Username' } })
    expect(wrapper.find('.lh-input__label').exists()).toBe(true)
    expect(wrapper.find('.lh-input__label').text()).toBe('Username')
  })

  it('applies has-label class when label is present', () => {
    const wrapper = mount(LhInput, { props: { label: 'Email' } })
    expect(wrapper.classes()).toContain('lh-input__wrapper--has-label')
  })

  it('applies has-value class when value is present', async () => {
    const wrapper = mount(LhInput, { props: { modelValue: 'test' } })
    expect(wrapper.classes()).toContain('lh-input__wrapper--has-value')
  })

  it('renders label with float class when having value', () => {
    const wrapper = mount(LhInput, { props: { label: 'Name', modelValue: 'test' } })
    expect(wrapper.find('.lh-input__label').classes()).toContain('lh-input__label--float')
  })

  it('renders textarea with word count', () => {
    const wrapper = mount(LhInput, {
      props: {
        type: 'textarea',
        showWordLimit: true,
        maxlength: 100,
        modelValue: 'hello world',
      },
    })
    expect(wrapper.find('.lh-input__count').text()).toContain('11/100')
  })

  it('emits change event', async () => {
    const wrapper = mount(LhInput)
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('emits keydown event', async () => {
    const wrapper = mount(LhInput)
    await wrapper.find('input').trigger('keydown')
    expect(wrapper.emitted('keydown')).toBeTruthy()
  })
})