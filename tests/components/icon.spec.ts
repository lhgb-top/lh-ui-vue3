import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhIcon from '~/components/icon/src/index.vue'

describe('LhIcon', () => {
  it('renders span element', () => {
    const wrapper = mount(LhIcon)
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('applies lh-icon base class', () => {
    const wrapper = mount(LhIcon)
    expect(wrapper.classes()).toContain('lh-icon')
  })

  it('renders svg when name matches a registered icon', () => {
    const wrapper = mount(LhIcon, { props: { name: 'home' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders slot when name does not match any icon', () => {
    const wrapper = mount(LhIcon, {
      props: { name: 'nonexistent-icon' },
      slots: { default: 'Fallback text' },
    })
    expect(wrapper.find('svg').exists()).toBe(false)
    expect(wrapper.text()).toContain('Fallback text')
  })

  it('renders slot when no name is provided', () => {
    const wrapper = mount(LhIcon, {
      slots: { default: '<i class="my-icon"></i>' },
    })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('applies name class', () => {
    const wrapper = mount(LhIcon, { props: { name: 'home' } })
    expect(wrapper.classes()).toContain('lh-icon--home')
  })

  it('applies default size to svg', () => {
    const wrapper = mount(LhIcon, { props: { name: 'home' } })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    if (svg.exists()) {
      expect(svg.attributes('width')).toBe('16')
      expect(svg.attributes('height')).toBe('16')
    }
  })

  it('applies custom size to svg', () => {
    const wrapper = mount(LhIcon, { props: { name: 'home', size: 24 } })
    const svg = wrapper.find('svg')
    if (svg.exists()) {
      expect(svg.attributes('width')).toBe('24')
      expect(svg.attributes('height')).toBe('24')
    }
  })

  it('applies color style', () => {
    const wrapper = mount(LhIcon, { props: { name: 'home', color: '#ff0000' } })
    expect(wrapper.attributes('style')).toContain('color')
  })

  it('svg has correct viewBox', () => {
    const wrapper = mount(LhIcon, { props: { name: 'home' } })
    const svg = wrapper.find('svg')
    if (svg.exists()) {
      expect(svg.attributes('viewBox')).toBe('0 0 24 24')
    }
  })

  it('passes through attrs', () => {
    const wrapper = mount(LhIcon, {
      props: { name: 'home' },
      attrs: { 'data-icon': 'test' },
    })
    expect(wrapper.attributes('data-icon')).toBe('test')
  })

  it('renders path element inside svg', () => {
    const wrapper = mount(LhIcon, { props: { name: 'home' } })
    expect(wrapper.find('path').exists()).toBe(true)
  })
})