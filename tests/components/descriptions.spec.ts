import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhDescriptions from '~/components/descriptions/src/index.vue'

const items = [
  { label: '名称', value: '青花瓷' },
  { label: '年代', value: '元代' },
  { label: '釉色', value: '青白釉' },
  { label: '窑口', value: '景德镇' },
]

describe('LhDescriptions', () => {
  it('renders base class and items', () => {
    const wrapper = mount(LhDescriptions, { props: { items } })
    expect(wrapper.classes()).toContain('lh-descriptions')
    expect(wrapper.findAll('.lh-descriptions__label')).toHaveLength(4)
    expect(wrapper.text()).toContain('青花瓷')
  })

  it('renders title', () => {
    const wrapper = mount(LhDescriptions, {
      props: { title: '藏品档案', items },
    })
    expect(wrapper.find('.lh-descriptions__header').text()).toBe('藏品档案')
  })

  it('applies border class', () => {
    const wrapper = mount(LhDescriptions, {
      props: { items, border: true },
    })
    expect(wrapper.classes()).toContain('lh-descriptions--border')
  })

  it('wraps rows by column and renders filler for the last row', () => {
    const wrapper = mount(LhDescriptions, {
      props: { items, column: 3 },
    })
    const rows = wrapper.findAll('.lh-descriptions__row')
    expect(rows).toHaveLength(2)
    // 第二行 1 个条目 + 1 个补位
    expect(rows[1].findAll('.lh-descriptions__content')).toHaveLength(1)
    expect(rows[1].find('.lh-descriptions__filler').exists()).toBe(true)
  })

  it('renders item value through named slot', () => {
    const wrapper = mount(LhDescriptions, {
      props: { items },
      slots: { 'item-0': '<b>定制内容</b>' },
    })
    expect(wrapper.find('.lh-descriptions__content b').text()).toBe('定制内容')
  })

  it('honors span in width calculation', () => {
    const wrapper = mount(LhDescriptions, {
      props: {
        items: [
          { label: '简介', value: '长文本', span: 2 },
          { label: '年代', value: '元' },
        ],
        column: 3,
      },
    })
    const contents = wrapper.findAll('.lh-descriptions__content')
    expect(contents).toHaveLength(2)
    // span=2 的内容宽度约 (2*100/3 - 100/6)% ≈ 50%
    expect(contents[0].attributes('style')).toContain('50%')
  })

  it('renders nothing when items is empty', () => {
    const wrapper = mount(LhDescriptions, { props: { items: [] } })
    expect(wrapper.find('.lh-descriptions__row').exists()).toBe(false)
  })
})
