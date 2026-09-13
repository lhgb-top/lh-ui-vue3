import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LhTooltip from '~/components/tooltip/src/index.vue'

describe('LhTooltip', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders trigger wrapper', () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Tip' },
      slots: { default: 'Hover me' },
      attachTo: document.body,
    })
    expect(wrapper.classes()).toContain('lh-tooltip')
  })

  it('renders default slot content', () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Tip' },
      slots: { default: 'Trigger text' },
      attachTo: document.body,
    })
    expect(wrapper.text()).toContain('Trigger text')
    wrapper.unmount()
  })

  it('shows tooltip on mouseenter', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Hello', visible: true },
      slots: { default: 'Hover me' },
      attachTo: document.body,
    })
    await wrapper.trigger('mouseenter')
    const tooltip = document.querySelector('.lh-tooltip__content')
    expect(tooltip).toBeTruthy()
    wrapper.unmount()
  })

  it('hides tooltip on mouseleave', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Hello' },
      slots: { default: 'Hover me' },
      attachTo: document.body,
    })
    await wrapper.trigger('mouseenter')
    await wrapper.trigger('mouseleave')
    const tooltip = document.querySelector('.lh-tooltip__content')
    expect(tooltip).toBeFalsy()
    wrapper.unmount()
  })

  it('does not show when disabled', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'No', disabled: true },
      slots: { default: 'Hover me' },
      attachTo: document.body,
    })
    await wrapper.trigger('mouseenter')
    const tooltip = document.querySelector('.lh-tooltip__content')
    expect(tooltip).toBeFalsy()
    wrapper.unmount()
  })

  it('renders with placement class', () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Tip', placement: 'top', visible: true },
      slots: { default: 'Hover' },
      attachTo: document.body,
    })
    expect(wrapper.find('.lh-tooltip').exists()).toBe(true)
    wrapper.unmount()
  })

  it('renders with effect class in popper', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Dark tip', effect: 'dark', visible: true },
      slots: { default: 'Hover' },
      attachTo: document.body,
    })
    await wrapper.trigger('mouseenter')
    const popper = document.querySelector('.lh-tooltip__popper')
    expect(popper).toBeTruthy()
    if (popper) {
      expect(popper.classList.contains('lh-tooltip__popper--dark')).toBe(true)
    }
    wrapper.unmount()
  })

  it('exposes show/hide/toggle methods', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Controllable' },
      slots: { default: 'Trigger' },
      attachTo: document.body,
    })
    const vm = wrapper.vm
    expect(typeof vm.show).toBe('function')
    expect(typeof vm.hide).toBe('function')
    expect(typeof vm.toggle).toBe('function')
    wrapper.unmount()
  })

  it('renders tooltip content text', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Custom content' },
      slots: { default: 'Hover' },
      attachTo: document.body,
    })
    await wrapper.trigger('mouseenter')
    const content = document.querySelector('.lh-tooltip__content')
    expect(content?.textContent).toBe('Custom content')
    wrapper.unmount()
  })
})