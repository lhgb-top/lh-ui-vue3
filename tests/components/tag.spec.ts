import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
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

  it('stays out of the tab order without a click listener', () => {
    const wrapper = mount(LhTag)
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('becomes a keyboard-activatable button when a click listener is bound', async () => {
    const onClick = vi.fn()
    const wrapper = mount(LhTag, { attrs: { onClick } })
    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('tabindex')).toBe('0')
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(onClick).toHaveBeenCalledTimes(1)
    await wrapper.trigger('keydown', { key: ' ' })
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('is not keyboard-activatable when disabled', async () => {
    const onClick = vi.fn()
    const wrapper = mount(LhTag, { attrs: { onClick }, props: { disabled: true } })
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBeUndefined()
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(onClick).not.toHaveBeenCalled()
  })

  it('reacts to a dynamically bound click listener', async () => {
    const Parent = defineComponent({
      data() {
        return { on: false }
      },
      render() {
        return h(LhTag, this.on ? { onClick: () => {} } : null)
      },
    })
    const wrapper = mount(Parent)
    const tag = () => wrapper.find('.lh-tag')
    expect(tag().attributes('role')).toBeUndefined()
    ;(wrapper.vm as unknown as { on: boolean }).on = true
    await wrapper.vm.$nextTick()
    expect(tag().attributes('role')).toBe('button')
    expect(tag().attributes('tabindex')).toBe('0')
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

  it('names the close button and hides its decorative icon', () => {
    const wrapper = mount(LhTag, { props: { closable: true } })
    const close = wrapper.find('.lh-tag__close')
    // 纯图标按钮必须有名称：aria-label 取语言包 tag.close
    expect(close.attributes('aria-label')).toBe('关闭')
    expect(close.find('svg').attributes('aria-hidden')).toBe('true')
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhTag, { slots: { default: '标签' }, props: { sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })
})