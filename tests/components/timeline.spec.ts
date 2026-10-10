import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import LhTimeline, { LhTimelineItem } from '~/components/timeline'

const mountTimeline = (props = {}, items = 3) =>
  mount(LhTimeline, {
    props,
    slots: {
      default: () =>
        Array.from({ length: items }, (_, i) =>
          h(LhTimelineItem, { timestamp: `第${i + 1}天`, type: i === 0 ? 'success' : undefined }, () => `事件${i + 1}`),
        ),
    },
  })

describe('LhTimeline Component', () => {
  it('renders an ordered list with li items', () => {
    const wrapper = mountTimeline()
    expect(wrapper.find('ol').exists()).toBe(true)
    expect(wrapper.findAll('li').length).toBe(3)
  })

  it('applies type and hollow class names', () => {
    const wrapper = mountTimeline()
    expect(wrapper.find('.lh-timeline__item--success').exists()).toBe(true)
    expect(wrapper.find('.lh-timeline__item--last').exists()).toBe(true)
  })

  it('renders timestamp and content', () => {
    const wrapper = mountTimeline()
    expect(wrapper.text()).toContain('第1天')
    expect(wrapper.text()).toContain('事件1')
  })

  it('applies the alternate layout classes', () => {
    const wrapper = mountTimeline({ mode: 'alternate' })
    expect(wrapper.find('.lh-timeline--alternate').exists()).toBe(true)
    expect(wrapper.find('.lh-timeline__item--right').exists()).toBe(true)
  })

  it('propagates dynamic mode changes to item sides', async () => {
    const wrapper = mountTimeline()
    expect(wrapper.find('.lh-timeline--alternate').exists()).toBe(false)

    // 红线 #6：mode 提供的是 computed ref，动态切换要传导给 item 侧向类名
    await wrapper.setProps({ mode: 'alternate' })
    expect(wrapper.find('.lh-timeline--alternate').exists()).toBe(true)
    expect(wrapper.find('.lh-timeline__item--right').exists()).toBe(true)
  })

})
