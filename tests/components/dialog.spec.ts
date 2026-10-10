import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LhDialog from '~/components/dialog/src/index.vue'

describe('LhDialog', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders nothing when modelValue is false', () => {
    mount(LhDialog, { props: { modelValue: false } })
    expect(document.querySelector('.lh-dialog__container')).toBeNull()
  })

  it('renders dialog when modelValue is true', () => {
    mount(LhDialog, { props: { modelValue: true } })
    expect(document.querySelector('.lh-dialog')).toBeTruthy()
  })

  it('renders title in header', () => {
    mount(LhDialog, {
      props: { modelValue: true, title: 'Test Dialog' },
    })
    expect(document.querySelector('.lh-dialog__title')?.textContent).toBe('Test Dialog')
  })

  it('renders default slot content', () => {
    mount(LhDialog, {
      props: { modelValue: true },
      slots: { default: 'Dialog body content' },
    })
    expect(document.querySelector('.lh-dialog__body')?.textContent).toBe('Dialog body content')
  })

  it('renders footer slot when provided', () => {
    mount(LhDialog, {
      props: { modelValue: true },
      slots: { footer: 'OK | Cancel' },
    })
    expect(document.querySelector('.lh-dialog__footer')).toBeTruthy()
  })

  it('does not render footer slot when empty', () => {
    mount(LhDialog, { props: { modelValue: true } })
    expect(document.querySelector('.lh-dialog__footer')).toBeNull()
  })

  it('shows close button by default', () => {
    mount(LhDialog, { props: { modelValue: true } })
    expect(document.querySelector('.lh-dialog__close')).toBeTruthy()
  })

  it('hides close button when showClose is false', () => {
    mount(LhDialog, {
      props: { modelValue: true, showClose: false },
    })
    expect(document.querySelector('.lh-dialog__close')).toBeNull()
  })

  it('emits update:modelValue when close button is clicked', async () => {
    const wrapper = mount(LhDialog, { props: { modelValue: true } })
    await document.querySelector('.lh-dialog__close')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('emits update:modelValue when overlay is clicked', async () => {
    const wrapper = mount(LhDialog, {
      props: { modelValue: true, closeOnClickModal: true },
    })
    await document.querySelector('.lh-dialog__overlay')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('does not close when overlay clicked and closeOnClickModal is false', async () => {
    const wrapper = mount(LhDialog, {
      props: { modelValue: true, closeOnClickModal: false },
    })
    await document.querySelector('.lh-dialog__overlay')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('applies fullscreen class', () => {
    mount(LhDialog, {
      props: { modelValue: true, fullscreen: true },
    })
    expect(document.querySelector('.lh-dialog')?.classList.contains('lh-dialog--fullscreen')).toBe(true)
  })

  it('applies position class', () => {
    mount(LhDialog, {
      props: { modelValue: true, position: 'top' },
    })
    expect(document.querySelector('.lh-dialog__wrapper')?.classList.contains('lh-dialog__wrapper--top')).toBe(true)
  })

  it('applies draggable header class', () => {
    mount(LhDialog, {
      props: { modelValue: true, draggable: true },
    })
    expect(document.querySelector('.lh-dialog__header')?.classList.contains('lh-dialog__header--draggable')).toBe(true)
  })

  it('renders header slot', () => {
    mount(LhDialog, {
      props: { modelValue: true },
      slots: { header: 'Custom Header' },
    })
    expect(document.querySelector('.lh-dialog__header')?.textContent).toContain('Custom Header')
  })

  it('has role dialog and aria-modal', () => {
    mount(LhDialog, {
      props: { modelValue: true, title: 'Test' },
    })
    expect(document.querySelector('.lh-dialog')?.getAttribute('role')).toBe('dialog')
    expect(document.querySelector('.lh-dialog')?.getAttribute('aria-modal')).toBe('true')
  })

  it('sets aria-label from title', () => {
    mount(LhDialog, {
      props: { modelValue: true, title: 'Important' },
    })
    expect(document.querySelector('.lh-dialog')?.getAttribute('aria-label')).toBe('Important')
  })

  it('applies center class when center is true', () => {
    mount(LhDialog, {
      props: { modelValue: true, center: true },
    })
    expect(document.querySelector('.lh-dialog')?.classList.contains('lh-dialog--center')).toBe(true)
  })

  it('does not apply center class by default', () => {
    mount(LhDialog, { props: { modelValue: true } })
    expect(document.querySelector('.lh-dialog')?.classList.contains('lh-dialog--center')).toBe(false)
  })

  it('moves focus into the dialog and returns it on close', async () => {
    const trigger = document.createElement('button')
    trigger.id = 'dialog-trigger'
    document.body.appendChild(trigger)
    trigger.focus()

    const wrapper = mount(LhDialog, {
      props: { modelValue: false, title: '详情' },
      slots: { default: '<button id="dialog-action">动作</button>' },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()

    await wrapper.setProps({ modelValue: true })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    // 焦点只要进入对话框即可：容器内 DOM 序的首个可聚焦元素是头部关闭按钮
    expect(document.querySelector('.lh-dialog')?.contains(document.activeElement)).toBe(true)

    await wrapper.setProps({ modelValue: false })
    await wrapper.vm.$nextTick()
    expect(document.activeElement?.id).toBe('dialog-trigger')

    wrapper.unmount()
    trigger.remove()
  })
})