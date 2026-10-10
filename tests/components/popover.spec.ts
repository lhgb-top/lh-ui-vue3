import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LhPopover from '~/components/popover/src/index.vue'

describe('LhPopover', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const getPopper = () => document.querySelector('.lh-popover__popper')

  it('renders the trigger slot', () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click' },
      slots: { default: 'Click me' },
      attachTo: document.body,
    })
    expect(wrapper.classes()).toContain('lh-popover')
    expect(wrapper.text()).toContain('Click me')
    wrapper.unmount()
  })

  it('shows on click trigger and emits update:visible / show', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click', title: '标题' },
      slots: { default: '<button>open</button>' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    expect(getPopper()).toBeTruthy()
    expect(wrapper.emitted('update:visible')?.[0]).toEqual([true])
    expect(wrapper.emitted('show')).toBeTruthy()

    wrapper.unmount()
  })

  it('toggles off on a second click', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click' },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:visible')?.[1]).toEqual([false])
    expect(wrapper.emitted('hide')).toBeTruthy()

    wrapper.unmount()
  })

  it('hides on Escape', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click' },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:visible')?.[1]).toEqual([false])

    wrapper.unmount()
  })

  it('hides on click outside', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click' },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    document.body.insertAdjacentHTML('beforeend', '<div id="far-away">elsewhere</div>')
    document.getElementById('far-away')?.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    )
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('hide')).toBeTruthy()

    wrapper.unmount()
  })

  it('shows on hover trigger without a delay when configured', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'hover', showAfter: 0, hideAfter: 0 },
      slots: { default: 'hover me' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('mouseenter')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    await wrapper.find('.lh-popover').trigger('mouseleave')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeNull()

    wrapper.unmount()
  })

  it('shows on focus trigger', async () => {
    const wrapper = mount(LhPopover, {
      // focus/hover 走延迟通道：showAfter/hideAfter 任一缺省都会拿到 200/100ms
      // 的默认延迟，这里都要显式归零，否则显隐不在同一个微任务里完成
      props: { trigger: 'focus', showAfter: 0, hideAfter: 0 },
      slots: { default: '<input type="text" />' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('focusin')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    await wrapper.find('.lh-popover').trigger('focusout')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeNull()

    wrapper.unmount()
  })

  it('renders role=dialog with aria-labelledby for the title', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click', title: '标题' },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    const popper = getPopper()
    expect(popper?.getAttribute('role')).toBe('dialog')
    const labelledby = popper?.getAttribute('aria-labelledby')
    expect(labelledby).toBeTruthy()
    expect(document.getElementById(labelledby as string)?.textContent).toBe('标题')

    wrapper.unmount()
  })

  it('marks the trigger as aria-expanded and aria-haspopup for click trigger', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click' },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    expect(wrapper.find('.lh-popover').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('.lh-popover').attributes('aria-haspopup')).toBe('dialog')

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.lh-popover').attributes('aria-expanded')).toBe('true')

    wrapper.unmount()
  })

  it('does not respond to trigger events in manual mode', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'manual', visible: false },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.find('.lh-popover').trigger('mouseenter')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeNull()

    wrapper.unmount()
  })

  it('syncs visible from the outside in manual mode', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'manual', visible: false },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.setProps({ visible: true })
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    wrapper.unmount()
  })

  it('exposes show / hide / toggle methods', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'manual', visible: false },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    const vm = wrapper.vm as unknown as {
      show: () => void
      hide: () => void
      toggle: () => void
    }
    vm.show()
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    vm.toggle()
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeNull()

    vm.toggle()
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    wrapper.unmount()
  })

  it('renders the title and content slots', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click' },
      slots: {
        default: 'open',
        title: '<span class="my-title">自定义标题</span>',
        content: '<span class="my-content">自定义内容</span>',
      },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    expect(getPopper()?.querySelector('.my-title')).toBeTruthy()
    expect(getPopper()?.querySelector('.my-content')).toBeTruthy()

    wrapper.unmount()
  })

  it('teleports the popper to the given target', async () => {
    const host = document.createElement('div')
    host.id = 'popper-host'
    document.body.appendChild(host)

    const wrapper = mount(LhPopover, {
      props: { trigger: 'click', teleportTarget: '#popper-host' },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    expect(host.querySelector('.lh-popover__popper')).toBeTruthy()

    wrapper.unmount()
    host.remove()
  })

  it('applies the width prop', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click', width: 240 },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    expect(getPopper()?.getAttribute('style')).toContain('width: 240px')

    wrapper.unmount()
  })

  it('hides the arrow when arrow is false', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click', arrow: false },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    expect(getPopper()?.querySelector('.lh-popover__arrow')).toBeNull()

    wrapper.unmount()
  })

  it('does not show when disabled', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click', disabled: true },
      slots: { default: 'open' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeNull()

    wrapper.unmount()
  })

  it('moves focus into the popper on click trigger', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click' },
      slots: {
        default: 'open',
        content: '<button id="popper-action">动作</button>',
      },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(document.activeElement?.id).toBe('popper-action')

    // Tab 在弹出层内循环（末项 → 首项）
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
    )
    expect(document.activeElement?.id).toBe('popper-action')

    wrapper.unmount()
  })

  it('writes the arrow offset so the arrow tracks the trigger center', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click', placement: 'bottom' },
      slots: { default: '<button>open</button>', content: '长内容'.repeat(30) },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()

    const popper = getPopper() as HTMLElement
    expect(popper).toBeTruthy()
    // 定位后写入 px 偏移；未定位时 SCSS 回退到 50%
    expect(popper.style.getPropertyValue('--lh-arrow-offset')).toMatch(/^-?\d+px$/)

    wrapper.unmount()
  })

  it('closes when the trigger is scrolled out of the viewport', async () => {
    const wrapper = mount(LhPopover, {
      props: { trigger: 'click' },
      slots: { default: '<button>open</button>' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popover').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    // jsdom 无真实布局，直接造一个整体离开视口的 trigger rect
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      top: 5000,
      bottom: 5040,
      left: 0,
      right: 100,
      width: 100,
      height: 40,
      x: 0,
      y: 5000,
      toJSON: () => ({}),
    })
    window.dispatchEvent(new Event('scroll'))

    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeNull()

    vi.restoreAllMocks()
    wrapper.unmount()
  })

  it('closes on scroll-out even in controlled (manual) mode', async () => {
    // 回归：受控模式下面板同样要在触发器滚出视口时收起。弹出层是 fixed 定位，
    // 触发器离开后它仍会以高 z-index 悬浮在页面内容之上，旧实现用
    // if (!isControlled.value) return 把受控面板留在了页面上。
    const wrapper = mount(LhPopover, {
      props: { trigger: 'manual', visible: true },
      slots: { default: '<button>trigger</button>' },
      attachTo: document.body,
    })

    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      top: 5000,
      bottom: 5040,
      left: 0,
      right: 100,
      width: 100,
      height: 40,
      x: 0,
      y: 5000,
      toJSON: () => ({}),
    })
    window.dispatchEvent(new Event('scroll'))

    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeNull()
    // 受控模式必须同步外部状态，否则外部的 visible 会与实际显隐脱节
    expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([false])

    vi.restoreAllMocks()
    wrapper.unmount()
  })
})
