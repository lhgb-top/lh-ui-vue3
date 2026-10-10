import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import LhInput from '~/components/input/src/index.vue'
import { lhlocale } from '~/locale'

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
    const wrapper = mount(LhInput, { props: { prefixIcon: 'search' } })
    expect(wrapper.find('.lh-input__prefix').exists()).toBe(true)
    expect(wrapper.find('.lh-input__prefix svg').exists()).toBe(true)
  })

  it('renders suffix icon when provided', () => {
    const wrapper = mount(LhInput, { props: { suffixIcon: 'close' } })
    expect(wrapper.find('.lh-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.lh-input__suffix svg').exists()).toBe(true)
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
describe('LhInput placeholder i18n fallback', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')

  it('falls back to the locale placeholder when none is provided', () => {
    const wrapper = mount(LhInput)
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入')
  })

  it('falls back in textarea mode too', () => {
    const wrapper = mount(LhInput, { props: { type: 'textarea' } })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('请输入')
  })

  it('a custom placeholder takes priority over the locale fallback', () => {
    const wrapper = mount(LhInput, { props: { placeholder: '请输入姓名' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入姓名')
  })

  it('keeps the placeholder empty when a floating label is present', () => {
    const wrapper = mount(LhInput, { props: { label: '姓名' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('')
  })

  it('re-renders the fallback placeholder when the locale switches', async () => {
    const wrapper = mount(LhInput)
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入')

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.find('input').attributes('placeholder')).toBe('Please input')

    restoreLocale()
    await nextTick()
    expect(wrapper.find('input').attributes('placeholder')).toBe('请输入')
  })
})

describe('LhInput native passthrough props', () => {
  it('binds nativeType to the DOM input type attribute', () => {
    const wrapper = mount(LhInput, { props: { nativeType: 'password' } })
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('keeps the component type as the DOM type when nativeType is unset', () => {
    const wrapper = mount(LhInput)
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('binds the form attribute to the native input', () => {
    const wrapper = mount(LhInput, { props: { form: 'myform' } })
    expect(wrapper.find('input').attributes('form')).toBe('myform')
  })

  it('omits the form attribute when not provided', () => {
    const wrapper = mount(LhInput)
    expect(wrapper.find('input').attributes('form')).toBeUndefined()
  })

  it('applies resize as inline style on the textarea', () => {
    const wrapper = mount(LhInput, { props: { type: 'textarea', resize: 'none' } })
    expect(wrapper.find('textarea').attributes('style')).toContain('resize: none')
  })

  it('keeps vertical resize by default, matching the stylesheet default', () => {
    const wrapper = mount(LhInput, { props: { type: 'textarea' } })
    expect(wrapper.find('textarea').attributes('style')).toContain('resize: vertical')
  })

  it('applies inputStyle to the native input', () => {
    const wrapper = mount(LhInput, {
      props: { inputStyle: { 'background-color': 'red' } },
    })
    expect(wrapper.find('input').attributes('style')).toContain('background-color: red')
  })

  it('lets inputStyle override the inline resize value', () => {
    const wrapper = mount(LhInput, {
      props: { type: 'textarea', resize: 'vertical', inputStyle: { resize: 'none' } },
    })
    expect(wrapper.find('textarea').attributes('style')).toContain('resize: none')
  })
})
