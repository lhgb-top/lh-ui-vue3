import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhImage from '~/components/image'

const src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='

describe('LhImage Component', () => {
  it('renders an img with alt and lazy loading', () => {
    const wrapper = mount(LhImage, { props: { src, alt: '水墨山水', lazy: true } })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('水墨山水')
    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('decoding')).toBe('async')
  })

  it('applies the fit class', () => {
    const wrapper = mount(LhImage, { props: { src, alt: 'x', fit: 'contain' } })
    expect(wrapper.find('.lh-image__inner--contain').exists()).toBe(true)
  })

  it('switches to the error slot on load failure', async () => {
    const wrapper = mount(LhImage, { props: { src: 'http://localhost/broken.png', alt: 'x' } })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('.lh-image__error').exists()).toBe(true)
    expect(wrapper.emitted('error')).toBeTruthy()
  })

  it('opens the viewer on click when preview is enabled', async () => {
    const wrapper = mount(LhImage, { props: { src, alt: 'x', preview: true } })
    await wrapper.find('img').trigger('click')
    // 预览器 Teleport 到 body，要从 document 查
    expect(document.querySelector('.lh-image-viewer')).toBeTruthy()
    expect(document.querySelector('[role="dialog"]')?.getAttribute('aria-modal')).toBe('true')
    // Esc 关闭
    document.querySelector('.lh-image-viewer')?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    )
    await wrapper.vm.$nextTick()
    expect(document.querySelector('.lh-image-viewer')).toBeNull()
    wrapper.unmount()
  })

  it('does not open a viewer without preview', async () => {
    const wrapper = mount(LhImage, { props: { src, alt: 'x' } })
    await wrapper.find('img').trigger('click')
    expect(wrapper.find('.lh-image-viewer').exists()).toBe(false)
  })
})
