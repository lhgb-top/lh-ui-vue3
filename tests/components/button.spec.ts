import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhButton from '~/components/button/src/index.vue'

describe('LhButton', () => {
  it('renders button element by default', () => {
    const wrapper = mount(LhButton, { slots: { default: 'Click me' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Click me')
  })

  it('renders anchor when href is provided', () => {
    const wrapper = mount(LhButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Link' },
    })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('applies type class', () => {
    const wrapper = mount(LhButton, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('lh-button--primary')
  })

  it('defaults to default type', () => {
    const wrapper = mount(LhButton)
    expect(wrapper.classes()).toContain('lh-button--default')
  })

  it('applies size class from props', () => {
    const wrapper = mount(LhButton, { props: { size: 'small' } })
    expect(wrapper.classes()).toContain('lh-button--small')
  })

  it('uses medium size as default', () => {
    const wrapper = mount(LhButton)
    expect(wrapper.classes()).toContain('lh-button--medium')
  })

  it('applies plain class', () => {
    const wrapper = mount(LhButton, { props: { plain: true } })
    expect(wrapper.classes()).toContain('lh-button--plain')
  })

  it('applies block class', () => {
    const wrapper = mount(LhButton, { props: { block: true } })
    expect(wrapper.classes()).toContain('lh-button--block')
  })

  it('applies round class', () => {
    const wrapper = mount(LhButton, { props: { round: true } })
    expect(wrapper.classes()).toContain('lh-button--round')
  })

  it('applies circle class', () => {
    const wrapper = mount(LhButton, { props: { circle: true } })
    expect(wrapper.classes()).toContain('lh-button--circle')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(LhButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(LhButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(LhButton, { props: { loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(LhButton, { props: { loading: true } })
    expect(wrapper.find('.lh-button__loading').exists()).toBe(true)
  })

  it('hides loading spinner when loading is false', () => {
    const wrapper = mount(LhButton, { props: { loading: false } })
    expect(wrapper.find('.lh-button__loading').exists()).toBe(false)
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(LhButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('is disabled when loading is true', () => {
    const wrapper = mount(LhButton, { props: { loading: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('renders icon slot when icon prop is provided', () => {
    const wrapper = mount(LhButton, { props: { icon: 'lh-icon-search' } })
    expect(wrapper.find('.lh-button__icon').exists()).toBe(true)
  })

  it('renders text slot', () => {
    const wrapper = mount(LhButton, { slots: { default: 'Submit' } })
    expect(wrapper.find('.lh-button__text').exists()).toBe(true)
    expect(wrapper.find('.lh-button__text').text()).toBe('Submit')
  })

  it('applies nativeType correctly', () => {
    const wrapper = mount(LhButton, { props: { nativeType: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('defaults nativeType to button', () => {
    const wrapper = mount(LhButton)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('renders all type variants', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info', 'default']
    types.forEach((type) => {
      const wrapper = mount(LhButton, { props: { type } })
      expect(wrapper.classes()).toContain(`lh-button--${type}`)
    })
  })

  it('renders anchor with correct target', () => {
    const wrapper = mount(LhButton, {
      props: { href: 'https://example.com', target: '_blank' },
    })
    expect(wrapper.attributes('target')).toBe('_blank')
  })
})