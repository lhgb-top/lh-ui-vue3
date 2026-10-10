import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, withDirectives } from 'vue'
import { mount } from '@vue/test-utils'
import { LhLoading, loadingDirective } from '~/components/loading'

describe('LhLoading Component', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('shows a fullscreen mask mounted to the body by default', () => {
    const handle = LhLoading.show()
    const mask = document.querySelector('.lh-loading--fullscreen') as HTMLElement
    expect(mask).toBeTruthy()
    expect(mask.getAttribute('role')).toBe('status')
    expect(mask.getAttribute('aria-busy')).toBe('true')
    expect(mask.getAttribute('aria-label')).toBe('加载中…')
    expect(mask.querySelector('.lh-loading__spinner')).toBeTruthy()
    handle.close()
    expect(document.querySelector('.lh-loading')).toBeNull()
  })

  it('mounts into the given target and restores its positioning on close', () => {
    const target = document.createElement('div')
    target.style.position = 'static'
    document.body.appendChild(target)
    const handle = LhLoading.show({ target, text: '拼命加载中' })
    const mask = target.querySelector('.lh-loading') as HTMLElement
    expect(mask).toBeTruthy()
    expect(mask.classList.contains('lh-loading--fullscreen')).toBe(false)
    expect(mask.textContent).toContain('拼命加载中')
    expect(target.style.position).toBe('relative')
    handle.close()
    expect(target.querySelector('.lh-loading')).toBeNull()
    expect(target.style.position).toBe('static')
  })

  it('locks scrolling while open and restores it on close', () => {
    const target = document.createElement('div')
    target.style.overflow = 'auto'
    document.body.appendChild(target)
    const handle = LhLoading.show({ target, lock: true })
    expect(target.style.overflow).toBe('hidden')
    handle.close()
    expect(target.style.overflow).toBe('auto')
  })

  it('supports the v-loading directive (mount and unmount)', async () => {
    const Host = defineComponent({
      props: { busy: { type: Boolean, default: false } },
      setup: (props) => () =>
        withDirectives(h('div', { class: 'zone' }, [h('p', '内容')]), [
          [loadingDirective, props.busy],
        ]),
    })
    const wrapper = mount(Host, { props: { busy: true } })
    expect(wrapper.find('.zone .lh-loading').exists()).toBe(true)
    expect(wrapper.find('.zone p').exists()).toBe(true)
    await wrapper.setProps({ busy: false })
    expect(wrapper.find('.zone .lh-loading').exists()).toBe(false)
    wrapper.unmount()
  })

  it('customizes the background', () => {
    const handle = LhLoading.show({ background: 'rgba(0,0,0,0.5)' })
    const mask = document.querySelector('.lh-loading') as HTMLElement
    expect(mask.style.background).toContain('0.5')
    handle.close()
  })
})
