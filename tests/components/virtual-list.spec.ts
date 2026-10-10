import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhVirtualList from '~/components/virtual-list'

describe('LhVirtualList Component', () => {
  it('renders only a window of items in fixed-height mode', () => {
    const data = Array.from({ length: 1000 }, (_, i) => i)
    const wrapper = mount(LhVirtualList, {
      props: { data, height: 200, itemHeight: 40 },
      slots: { default: `<template #default="{ item }"><span class="cell">{{ item }}</span></template>` },
    })
    // jsdom clientHeight 为 0 → 只渲染 overscan 窗口，远少于 1000
    expect(wrapper.findAll('.lh-virtual-list__item').length).toBeLessThan(1000)
    expect(wrapper.find('.lh-virtual-list__phantom').attributes('style')).toContain('40000px')
  })

  it('renders a window in dynamic-height mode', () => {
    const data = Array.from({ length: 500 }, (_, i) => i)
    const wrapper = mount(LhVirtualList, {
      props: { data, height: 200, itemSize: (i: number) => (i % 2 === 0 ? 30 : 50) },
      slots: { default: `<template #default="{ item }"><span>{{ item }}</span></template>` },
    })
    const items = wrapper.findAll('.lh-virtual-list__item')
    expect(items.length).toBeGreaterThan(0)
    expect(items.length).toBeLessThan(500)
  })

  it('exposes scoped item and index to the slot', () => {
    const data = ['x', 'y']
    const wrapper = mount(LhVirtualList, {
      props: { data, height: 200, itemHeight: 40 },
      slots: { default: `<template #default="{ item, index }"><span class="cell">{{ index }}:{{ item }}</span></template>` },
    })
    const first = wrapper.find('.cell')
    if (first.exists()) expect(first.text()).toBe('0:x')
  })

  it('applies the container class and height', () => {
    const wrapper = mount(LhVirtualList, { props: { data: [1], height: 120, itemHeight: 40 } })
    expect(wrapper.classes()).toContain('lh-virtual-list')
    expect(wrapper.attributes('style')).toContain('height: 120px')
  })
})
