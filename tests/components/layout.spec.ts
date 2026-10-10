import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import LhLayout, { LhLayoutAside, LhLayoutFooter, LhLayoutHeader, LhLayoutMain } from '~/components/layout'

describe('LhLayout Component', () => {
  it('renders semantic landmark elements', () => {
    const wrapper = mount(LhLayout, {
      slots: {
        default: () => [
          h(LhLayoutHeader, () => '头'),
          h(LhLayoutMain, () => '主'),
          h(LhLayoutFooter, () => '脚'),
        ],
      },
    })
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('switches to vertical when an aside is present', async () => {
    const wrapper = mount(LhLayout, {
      slots: { default: () => h(LhLayoutAside, () => '侧') },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('aside').exists()).toBe(true)
    expect(wrapper.classes()).toContain('lh-layout--vertical')
  })

  it('labels the aside landmark', () => {
    const wrapper = mount(LhLayoutAside, { props: { ariaLabel: '侧边导航' } })
    expect(wrapper.attributes('aria-label')).toBe('侧边导航')
  })
})
