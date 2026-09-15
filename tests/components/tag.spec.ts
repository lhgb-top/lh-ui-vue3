import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhTag from '~/components/tag/src/index.vue'

describe('LhTag', () => {
  it('should render correctly', () => {
    const wrapper = mount(LhTag, {
      slots: { default: 'Test Tag' },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Tag')
  })

  it('should apply type class', () => {
    const wrapper = mount(LhTag, {
      props: { type: 'primary' },
    })
    expect(wrapper.classes()).toContain('lh-tag--primary')
  })

  it('should apply size class', () => {
    const wrapper = mount(LhTag, {
      props: { size: 'small' },
    })
    expect(wrapper.classes()).toContain('lh-tag--small')
  })

  it('should render close button when closable', () => {
    const wrapper = mount(LhTag, {
      props: { closable: true },
    })
    expect(wrapper.find('.lh-tag__close').exists()).toBe(true)
  })

  it('should not render close button when not closable', () => {
    const wrapper = mount(LhTag)
    expect(wrapper.find('.lh-tag__close').exists()).toBe(false)
  })

  it('should emit close event when close button is clicked', async () => {
    const wrapper = mount(LhTag, {
      props: { closable: true },
    })
    await wrapper.find('.lh-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should not emit close when disabled', async () => {
    const wrapper = mount(LhTag, {
      props: { closable: true, disabled: true },
    })
    await wrapper.find('.lh-tag__close').trigger('click')
    expect(wrapper.emitted('close')).toBeFalsy()
  })

  it('should emit click event when tag is clicked', async () => {
    const wrapper = mount(LhTag)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('should apply round class', () => {
    const wrapper = mount(LhTag, {
      props: { round: true },
    })
    expect(wrapper.classes()).toContain('lh-tag--round')
  })

  it('should apply hit class', () => {
    const wrapper = mount(LhTag, {
      props: { hit: true },
    })
    expect(wrapper.classes()).toContain('lh-tag--hit')
  })
})