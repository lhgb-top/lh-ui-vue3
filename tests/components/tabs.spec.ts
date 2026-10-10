import { describe, it, expect } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import LhTabs, { LhTabPane } from '~/components/tabs'
import { lhlocale } from '~/locale'

function mountTabs(extraProps = {}) {
  return mount(LhTabs, {
    props: { ...extraProps },
    slots: {
      default: () => [
        h(LhTabPane, { name: 'a', label: 'Tab A' }, () => 'Content A'),
        h(LhTabPane, { name: 'b', label: 'Tab B', disabled: true }, () => 'Content B'),
        h(LhTabPane, { name: 'c', label: 'Tab C' }, () => 'Content C'),
      ],
    },
    // 键盘导航用例依赖真实 focus()，树必须挂进文档，否则 jsdom 的
    // isFocusableAreaElement 会因 isConnected 为假直接跳过聚焦
    attachTo: document.body,
  })
}

describe('LhTabs', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders tablist / tab / tabpanel roles with aria wiring', () => {
    const wrapper = mountTabs()
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs).toHaveLength(3)

    const active = tabs[0]
    expect(active.attributes('aria-selected')).toBe('true')
    const panelId = active.attributes('aria-controls')
    expect(panelId).toBeTruthy()
    const panel = wrapper.find(`[id="${panelId}"]`)
    expect(panel.exists()).toBe(true)
    expect(panel.attributes('role')).toBe('tabpanel')
    // aria-labelledby 指向为其命名的页签，不是面板自身的 id
    expect(panel.attributes('aria-labelledby')).toBe(active.attributes('id'))
    wrapper.unmount()
  })

  it('activates the first enabled tab and hides other panels', () => {
    const wrapper = mountTabs()
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels).toHaveLength(3)
    expect(panels[0].element.style.display).not.toBe('none')
    expect(panels[1].element.style.display).toBe('none')
    expect(wrapper.text()).toContain('Content A')
    wrapper.unmount()
  })

  it('respects the controlled modelValue', () => {
    const wrapper = mountTabs({ modelValue: 'c' })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[2].attributes('aria-selected')).toBe('true')
    expect(tabs[2].text()).toContain('Tab C')
    wrapper.unmount()
  })

  it('uses roving tabindex across enabled tabs', () => {
    const wrapper = mountTabs()
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[0].attributes('tabindex')).toBe('0')
    expect(tabs[1].attributes('tabindex')).toBe('-1')
    expect(tabs[2].attributes('tabindex')).toBe('-1')
    expect(tabs[1].attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })

  it('emits tab-change and update:modelValue on click', async () => {
    const wrapper = mountTabs()
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['c']])
    expect(wrapper.emitted('tab-change')).toEqual([['c']])
    expect(tabs[2].attributes('aria-selected')).toBe('true')
    wrapper.unmount()
  })

  it('ignores clicks on disabled tabs', async () => {
    const wrapper = mountTabs()
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    wrapper.unmount()
  })

  it('moves selection with arrow keys, skipping disabled tabs', async () => {
    const wrapper = mountTabs()
    const tabs = wrapper.findAll('[role="tab"]')
    // 从 a 向右：跳过禁用的 b 直达 c
    await tabs[0].trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toEqual([['c']])
    // 焦点移动到 c（自动激活）
    expect(document.activeElement?.getAttribute('data-name')).toBe('c')

    // Home 回到首个可用页签
    await wrapper.find('[data-name="c"]').trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')).toEqual([['c'], ['a']])
    wrapper.unmount()
  })

  it('closes tabs via the close button and the Delete key', async () => {
    const wrapper = mountTabs({ closable: true, modelValue: 'c' })
    const tabs = wrapper.findAll('[role="tab"]')
    // 非激活页签点关闭
    await tabs[0].find('.lh-tabs__tab-close').trigger('click')
    expect(wrapper.emitted('tab-remove')).toEqual([['a']])
    // 激活页签按 Delete 关闭
    await tabs[2].trigger('keydown', { key: 'Delete' })
    expect(wrapper.emitted('tab-remove')).toEqual([['a'], ['c']])
    // 关闭激活页签后联动到相邻可用页签（剩余 a、c 中 c 移除 → a）
    wrapper.unmount()
  })

  it('does not close tabs when closable is off', async () => {
    const wrapper = mountTabs()
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[0].trigger('keydown', { key: 'Delete' })
    expect(wrapper.emitted('tab-remove')).toBeFalsy()
    wrapper.unmount()
  })

  it('renders the add button with a localized aria-label', async () => {
    const wrapper = mountTabs({ addable: true })
    const add = wrapper.find('.lh-tabs__add')
    expect(add.attributes('aria-label')).toBe('新增标签页')
    await add.trigger('click')
    expect(wrapper.emitted('tab-add')).toHaveLength(1)

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.find('.lh-tabs__add').attributes('aria-label')).toBe('Add tab')
    lhlocale.setLocale('zh-CN')
    wrapper.unmount()
  })
})
