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

  it('applies sx spacing to the trigger root element', () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Tip', sx: { mt: 2, mx: 1 } },
      slots: { default: 'Hover me' },
      attachTo: document.body,
    })
    // sx 基于 8px 基准：mt:2 -> 16px，mx:1 -> 左右各 8px
    expect(wrapper.element.style.marginTop).toBe('16px')
    expect(wrapper.element.style.marginLeft).toBe('8px')
    expect(wrapper.element.style.marginRight).toBe('8px')
    wrapper.unmount()
  })

  it('does not apply inline styles when sx is not set', () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Tip' },
      slots: { default: 'Hover me' },
      attachTo: document.body,
    })
    expect(wrapper.element.style.cssText).toBe('')
    wrapper.unmount()
  })

  it('popper renders with role tooltip', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Tip' },
      slots: { default: 'Hover' },
      attachTo: document.body,
    })
    await wrapper.trigger('mouseenter')
    const popper = document.querySelector('.lh-tooltip__popper')
    expect(popper?.getAttribute('role')).toBe('tooltip')
    wrapper.unmount()
  })

  it('links trigger to tooltip via aria-describedby while visible', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Tip' },
      slots: { default: 'Hover' },
      attachTo: document.body,
    })
    // 隐藏时不留悬空引用
    expect(wrapper.attributes('aria-describedby')).toBeUndefined()
    await wrapper.trigger('mouseenter')
    const describedBy = wrapper.attributes('aria-describedby')
    expect(describedBy).toBeTruthy()
    // 关联指向实际渲染的弹出层 id
    expect(document.querySelector('.lh-tooltip__popper')?.id).toBe(describedBy)
    wrapper.unmount()
  })

  it('shows tooltip when keyboard focus enters the trigger', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Focus tip' },
      slots: { default: '<button type="button">Focus me</button>' },
      attachTo: document.body,
    })
    await wrapper.trigger('focusin')
    expect(document.querySelector('.lh-tooltip__content')).toBeTruthy()
    await wrapper.trigger('focusout')
    expect(document.querySelector('.lh-tooltip__content')).toBeFalsy()
    wrapper.unmount()
  })

  it('does not show on focus when trigger is click', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Click tip', trigger: 'click' },
      slots: { default: 'Click me' },
      attachTo: document.body,
    })
    await wrapper.trigger('focusin')
    expect(document.querySelector('.lh-tooltip__content')).toBeFalsy()
    wrapper.unmount()
  })

  it('toggles on click when trigger is click', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Click tip', trigger: 'click' },
      slots: { default: 'Click me' },
      attachTo: document.body,
    })

    await wrapper.trigger('click')
    expect(document.querySelector('.lh-tooltip__content')).toBeTruthy()

    await wrapper.trigger('click')
    expect(document.querySelector('.lh-tooltip__content')).toBeFalsy()

    wrapper.unmount()
  })

  it('closes on click outside when trigger is click', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Click tip', trigger: 'click' },
      slots: { default: 'Click me' },
      attachTo: document.body,
    })

    await wrapper.trigger('click')
    expect(document.querySelector('.lh-tooltip__content')).toBeTruthy()

    document.body.insertAdjacentHTML('beforeend', '<div id="far-away">elsewhere</div>')
    document.getElementById('far-away')?.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    )
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.lh-tooltip__content')).toBeFalsy()

    wrapper.unmount()
  })

  it('closes on Escape', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Esc tip' },
      slots: { default: 'Hover me' },
      attachTo: document.body,
    })

    await wrapper.trigger('mouseenter')
    expect(document.querySelector('.lh-tooltip__content')).toBeTruthy()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.lh-tooltip__content')).toBeFalsy()

    wrapper.unmount()
  })

  it('does not respond to hover in manual mode', async () => {
    const wrapper = mount(LhTooltip, {
      props: { content: 'Manual tip', manual: true, visible: false },
      slots: { default: 'Hover me' },
      attachTo: document.body,
    })

    await wrapper.trigger('mouseenter')
    expect(document.querySelector('.lh-tooltip__content')).toBeFalsy()

    await wrapper.setProps({ visible: true })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.lh-tooltip__content')).toBeTruthy()

    wrapper.unmount()
  })

  it('teleports the tooltip to the given target', async () => {
    const host = document.createElement('div')
    host.id = 'tooltip-host'
    document.body.appendChild(host)

    const wrapper = mount(LhTooltip, {
      props: { content: 'Hosted tip', teleportTarget: '#tooltip-host', trigger: 'click' },
      slots: { default: 'Click me' },
      attachTo: document.body,
    })

    await wrapper.trigger('click')
    expect(host.querySelector('.lh-tooltip__popper')).toBeTruthy()

    wrapper.unmount()
    host.remove()
  })
})