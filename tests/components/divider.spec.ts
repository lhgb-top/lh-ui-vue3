import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhDivider from '~/components/divider'

describe('LhDivider', () => {
  it('renders default horizontal divider as decorative', () => {
    const wrapper = mount(LhDivider)
    expect(wrapper.classes()).toContain('lh-divider')
    expect(wrapper.classes()).toContain('lh-divider--horizontal')
    expect(wrapper.attributes('role')).toBe('presentation')
  })

  it('renders vertical divider', () => {
    const wrapper = mount(LhDivider, { props: { direction: 'vertical' } })
    expect(wrapper.classes()).toContain('lh-divider--vertical')
  })

  it('applies dashed class', () => {
    const wrapper = mount(LhDivider, { props: { dashed: true } })
    expect(wrapper.classes()).toContain('lh-divider--dashed')
  })

  it('applies dashed class from borderStyle even when dashed is false', () => {
    const wrapper = mount(LhDivider, { props: { borderStyle: 'dashed' } })
    expect(wrapper.classes()).toContain('lh-divider--dashed')
  })

  it('applies dotted class from borderStyle', () => {
    const wrapper = mount(LhDivider, { props: { borderStyle: 'dotted' } })
    expect(wrapper.classes()).toContain('lh-divider--dotted')
  })

  it('lets borderStyle solid override the dashed prop', () => {
    const wrapper = mount(LhDivider, { props: { dashed: true, borderStyle: 'solid' } })
    expect(wrapper.classes()).not.toContain('lh-divider--dashed')
  })

  it('exposes labelled content as a separator with aria orientation rules', () => {
    const wrapper = mount(LhDivider, {
      props: { labelPosition: 'left' },
      slots: { default: '章节标题' },
    })
    expect(wrapper.classes()).toContain('lh-divider--with-text')
    expect(wrapper.classes()).toContain('lh-divider--label-left')
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.find('.lh-divider__label').text()).toBe('章节标题')
  })

  it('vertical dividers render label content with separator semantics', () => {
    const wrapper = mount(LhDivider, {
      props: { direction: 'vertical' },
      slots: { default: '分组' },
    })
    expect(wrapper.classes()).toContain('lh-divider--with-text')
    // labelPosition 是横向语义，竖向文案恒居中，不产出修饰类
    expect(wrapper.classes()).not.toContain('lh-divider--label-center')
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.find('.lh-divider__label').text()).toBe('分组')
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhDivider, { props: { sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })
})
