import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LhDrawer from '~/components/drawer/src/index.vue'

describe('LhDrawer', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  const getDrawer = () => document.querySelector('.lh-drawer')
  const getPanel = () => document.querySelector('.lh-drawer__panel')

  it('stays hidden by default', () => {
    mount(LhDrawer, {
      props: {},
      slots: { default: '内容' },
      attachTo: document.body,
    })
    expect(getDrawer()).toBeNull()
  })

  it('renders when the model is true', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, title: '详情' },
      slots: { default: '抽屉内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    const drawer = getDrawer()
    expect(drawer).toBeTruthy()
    expect(drawer?.getAttribute('role')).toBe('dialog')
    expect(drawer?.getAttribute('aria-modal')).toBe('true')
    expect(getPanel()?.textContent).toContain('抽屉内容')
    expect(getPanel()?.classList.contains('lh-drawer__panel--right')).toBe(true)

    wrapper.unmount()
  })

  it('emits close on modelValue change to false', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, title: '详情' },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()

    wrapper.unmount()
  })

  it('closes on mask click by default', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, title: '详情' },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    ;(getDrawer()?.querySelector('.lh-drawer__mask') as HTMLElement)?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toBeTruthy()

    wrapper.unmount()
  })

  it('does not close on mask click when maskClosable is false', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, maskClosable: false },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    ;(getDrawer()?.querySelector('.lh-drawer__mask') as HTMLElement)?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toBeFalsy()

    wrapper.unmount()
  })

  it('closes on Escape', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, title: '详情' },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toBeTruthy()

    wrapper.unmount()
  })

  it('does not close on Escape when closeOnEsc is false', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, closeOnEsc: false },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toBeFalsy()

    wrapper.unmount()
  })

  it('applies the size to the panel', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, size: 480 },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()
    expect(getPanel()?.getAttribute('style')).toContain('width: 480px')

    await wrapper.setProps({ direction: 'bottom', size: '40%' })
    await wrapper.vm.$nextTick()
    const panel = getPanel()
    expect(panel?.getAttribute('style')).toContain('height: 40%')
    expect(panel?.classList.contains('lh-drawer__panel--bottom')).toBe(true)

    wrapper.unmount()
  })

  it('renders the header and footer slots', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true },
      slots: {
        header: '<span class="my-header">自定义头部</span>',
        default: '内容',
        footer: '<span class="my-footer">自定义底部</span>',
      },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    expect(getDrawer()?.querySelector('.my-header')).toBeTruthy()
    expect(getDrawer()?.querySelector('.my-footer')).toBeTruthy()

    wrapper.unmount()
  })

  it('gives the close button an accessible name', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, title: '详情' },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    const close = getDrawer()?.querySelector('.lh-drawer__close') as HTMLElement
    expect(close).toBeTruthy()
    expect(close.getAttribute('aria-label')).toBe('关闭抽屉')

    wrapper.unmount()
  })

  it('hides the close button when showClose is false', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, showClose: false },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    expect(getDrawer()?.querySelector('.lh-drawer__close')).toBeNull()

    wrapper.unmount()
  })

  it('locks and restores body scroll', async () => {
    const wrapper = mount(LhDrawer, {
      props: { modelValue: false },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    await wrapper.setProps({ modelValue: true })
    await wrapper.vm.$nextTick()
    expect(document.body.style.overflow).toBe('hidden')

    await wrapper.setProps({ modelValue: false })
    await wrapper.vm.$nextTick()
    expect(document.body.style.overflow).not.toBe('hidden')

    wrapper.unmount()
  })

  it('moves focus into the panel and returns it on close', async () => {
    const trigger = document.createElement('button')
    trigger.id = 'drawer-trigger'
    document.body.appendChild(trigger)
    trigger.focus()

    const wrapper = mount(LhDrawer, {
      props: { modelValue: false, title: '详情' },
      slots: { default: '<button id="panel-action">动作</button>' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    await wrapper.setProps({ modelValue: true })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    // 焦点只要进入面板即可：面板内 DOM 序的首个可聚焦元素是头部关闭按钮，
    // 不必是插槽里的按钮
    expect(getPanel()?.contains(document.activeElement)).toBe(true)

    await wrapper.setProps({ modelValue: false })
    await wrapper.vm.$nextTick()
    expect(document.activeElement?.id).toBe('drawer-trigger')

    wrapper.unmount()
    trigger.remove()
  })

  it('teleports to the given target', async () => {
    const host = document.createElement('div')
    host.id = 'drawer-host'
    document.body.appendChild(host)

    const wrapper = mount(LhDrawer, {
      props: { modelValue: true, teleportTarget: '#drawer-host' },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    expect(host.querySelector('.lh-drawer')).toBeTruthy()

    wrapper.unmount()
    host.remove()
  })
})
