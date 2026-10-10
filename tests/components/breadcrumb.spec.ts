import { describe, it, expect } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import LhBreadcrumb, { LhBreadcrumbItem } from '~/components/breadcrumb'
import { lhlocale } from '~/locale'

function mountBreadcrumb(items: { to?: string }[], mountProps = {}) {
  return mount(LhBreadcrumb, {
    ...mountProps,
    slots: {
      default: () =>
        items.map((item, index) =>
          h(LhBreadcrumbItem, { to: item.to }, () => `Item ${index + 1}`),
        ),
    },
  })
}

describe('LhBreadcrumb', () => {
  it('renders nav + ol semantics', () => {
    const wrapper = mountBreadcrumb([{}, {}, {}])
    expect(wrapper.find('nav.lh-breadcrumb').exists()).toBe(true)
    expect(wrapper.find('ol.lh-breadcrumb__list').exists()).toBe(true)
    expect(wrapper.findAll('.lh-breadcrumb__item')).toHaveLength(3)
    wrapper.unmount()
  })

  it('renders separators between items and supports custom char', async () => {
    const wrapper = mountBreadcrumb([{}, {}, {}])
    // 子项注册完成后的微任务批次内序号/总数收敛
    await nextTick()
    expect(wrapper.findAll('.lh-breadcrumb__separator')).toHaveLength(2)
    expect(wrapper.find('.lh-breadcrumb__separator').text()).toBe('/')

    const custom = mountBreadcrumb([{}, {}, {}], { props: { separator: '·' } })
    await nextTick()
    expect(custom.find('.lh-breadcrumb__separator').text()).toBe('·')
    custom.unmount()
    wrapper.unmount()
  })

  it('marks the last item as the current page and keeps it unlinked', async () => {
    const wrapper = mountBreadcrumb([{ to: '/home' }, { to: '/current' }])
    await nextTick()
    const texts = wrapper.findAll('.lh-breadcrumb__text')
    expect(texts).toHaveLength(1)
    expect(texts[0].attributes('aria-current')).toBe('page')
    // 末项即使传了 to 也渲染为文本而非链接
    expect(wrapper.findAll('a.lh-breadcrumb__link')).toHaveLength(1)
    wrapper.unmount()
  })

  it('collapses middle items beyond maxItems with an expandable ellipsis', async () => {
    const wrapper = mountBreadcrumb([{}, {}, {}, {}, {}], { props: { maxItems: 3 } })
    await nextTick()
    // 首项 + 末尾 2 项可见，中间 2 项隐藏
    expect(wrapper.findAll('.lh-breadcrumb__item')).toHaveLength(3)
    const ellipsis = wrapper.find('.lh-breadcrumb__ellipsis-btn')
    expect(ellipsis.exists()).toBe(true)
    expect(ellipsis.attributes('aria-label')).toBe('更多')

    await ellipsis.trigger('click')
    await nextTick()
    expect(wrapper.findAll('.lh-breadcrumb__item')).toHaveLength(5)
    expect(wrapper.find('.lh-breadcrumb__ellipsis-btn').exists()).toBe(false)
    wrapper.unmount()
  })

  it('uses localized labels and reacts to locale switches', async () => {
    const wrapper = mountBreadcrumb([{}])
    expect(wrapper.find('nav').attributes('aria-label')).toBe('面包屑导航')

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Breadcrumb')

    lhlocale.setLocale('zh-CN')
    wrapper.unmount()
  })
})
