import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import LhMenu, { LhMenuItem, LhSubMenu, LhMenuItemGroup } from '~/components/menu'

const mountVertical = (props = {}) =>
  mount(LhMenu, {
    props: { ...props },
    slots: {
      default: () => [
        h(LhMenuItem, { index: 'a' }, () => '首页'),
        h(
          LhSubMenu,
          { index: 'b', title: '设置' },
          () => [h(LhMenuItem, { index: 'b-1' }, () => '基本'), h(LhMenuItem, { index: 'b-2' }, () => '安全')],
        ),
        h(LhMenuItem, { index: 'c', disabled: true }, () => '禁用'),
      ],
    },
  })

describe('LhMenu Component', () => {
  it('renders a vertical menu with menu role', () => {
    const wrapper = mountVertical()
    expect(wrapper.find('ul.lh-menu').exists()).toBe(true)
    expect(wrapper.attributes('role')).toBe('menu')
    // 叶子项：a、b-1、b-2（内联子菜单内）、c
    expect(wrapper.findAll('.lh-menu-item').length).toBe(4)
    expect(wrapper.text()).toContain('首页')
  })

  it('activates an item and emits update:modelValue / select', async () => {
    const wrapper = mountVertical()
    await wrapper.find('.lh-menu-item').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['a'])
    expect(wrapper.emitted('select')?.[0]).toEqual(['a', ['a']])
    expect(wrapper.find('.lh-menu-item--active').exists()).toBe(true)
  })

  it('blocks disabled items', async () => {
    const wrapper = mountVertical()
    const disabled = wrapper.findAll('.lh-menu-item')[3]
    await disabled.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(disabled.classes()).toContain('lh-menu-item--disabled')
  })

  it('expands a sub-menu inline in vertical mode', async () => {
    const wrapper = mountVertical()
    await wrapper.find('.lh-sub-menu__title').trigger('click')
    expect(wrapper.find('.lh-sub-menu--opened').exists()).toBe(true)
    expect(wrapper.find('.lh-sub-menu__title').attributes('aria-expanded')).toBe('true')
    const inline = wrapper.find('.lh-sub-menu__inline')
    expect(inline.exists()).toBe(true)
  })

  it('enforces uniqueOpened accordion constraint', async () => {
    const wrapper = mount(LhMenu, {
      props: { uniqueOpened: true },
      slots: {
        default: () => [
          h(LhSubMenu, { index: 'a', title: '甲' }, () => h(LhMenuItem, { index: 'a-1' }, () => 'A1')),
          h(LhSubMenu, { index: 'b', title: '乙' }, () => h(LhMenuItem, { index: 'b-1' }, () => 'B1')),
        ],
      },
    })
    const titles = wrapper.findAll('.lh-sub-menu__title')
    await titles[0].trigger('click')
    await titles[1].trigger('click')
    expect(wrapper.findAll('.lh-sub-menu--opened').length).toBe(1)
    expect(wrapper.findAll('.lh-sub-menu--opened')[0].text()).toContain('乙')
  })

  it('renders a horizontal menu as menubar with popper sub-menu', async () => {
    const wrapper = mount(LhMenu, {
      props: { mode: 'horizontal' },
      slots: {
        default: () => [
          h(LhMenuItem, { index: 'a' }, () => '首页'),
          h(LhSubMenu, { index: 'b', title: '设置' }, () => h(LhMenuItem, { index: 'b-1' }, () => '基本')),
        ],
      },
    })
    expect(wrapper.attributes('role')).toBe('menubar')
    await wrapper.find('.lh-sub-menu__title').trigger('mouseenter')
    // 飞出面板 teleport 到 body
    expect(document.querySelector('.lh-sub-menu__popper')).toBeTruthy()
    wrapper.unmount()
  })

  it('renders item groups with presentation role', () => {
    const wrapper = mount(LhMenu, {
      slots: {
        default: () =>
          h(LhMenuItemGroup, { title: '分组一' }, () => h(LhMenuItem, { index: 'a' }, () => '项')),
      },
    })
    const group = wrapper.find('.lh-menu-item-group')
    expect(group.attributes('role')).toBe('presentation')
    expect(group.text()).toContain('分组一')
    expect(wrapper.findAll('.lh-menu-item').length).toBe(1)
  })

  it('opens sub-menu via keyboard and moves focus', async () => {
    const wrapper = mountVertical()
    const title = wrapper.find('.lh-sub-menu__title')
    await title.trigger('keydown', { key: 'Enter' })
    expect(wrapper.find('.lh-sub-menu--opened').exists()).toBe(true)
  })
  it('traverses across submenu boundaries with arrow keys', async () => {
    const wrapper = mount(LhMenu, {
      props: { defaultOpeneds: ['b'] },
      slots: {
        default: () => [
          h(LhMenuItem, { index: 'a' }, () => '首页'),
          h(
            LhSubMenu,
            { index: 'b', title: '设置' },
            () => [h(LhMenuItem, { index: 'b-1' }, () => '基本'), h(LhMenuItem, { index: 'b-2' }, () => '安全')],
          ),
          h(LhMenuItem, { index: 'c', disabled: true }, () => '禁用'),
        ],
      },
      attachTo: document.body,
    })
    // 可见项 DOM 序：a → 标题 b → b-1 → b-2（c 禁用被跳过）
    const menuitems = () => wrapper.findAll('[role="menuitem"]').map((w) => w.element as HTMLElement)
    const list = menuitems()
    // a → ↓ → 子菜单标题（跨出叶子项边界）
    await wrapper.findAll('.lh-menu-item')[0].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(list[1])
    // 标题 → ↓ → 面板首项（跨入子菜单面板边界）
    await list[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(document.activeElement).toBe(list[2])
    wrapper.unmount()
  })

  it('wraps focus around skipping disabled and closed panels', async () => {
    const wrapper = mount(LhMenu, {
      props: {},
      slots: {
        default: () => [
          h(LhMenuItem, { index: 'a' }, () => '首页'),
          h(
            LhSubMenu,
            { index: 'b', title: '设置' },
            () => [h(LhMenuItem, { index: 'b-1' }, () => '基本')],
          ),
          h(LhMenuItem, { index: 'c', disabled: true }, () => '禁用'),
        ],
      },
      attachTo: document.body,
    })
    const a = wrapper.findAll('.lh-menu-item').filter((w) => w.text() === '首页')[0]
    // 子菜单未展开：面板内项 aria-hidden 被跳过；禁用 c 跳过；↑ 从 a 回绕到标题 b
    await a.trigger('keydown', { key: 'ArrowUp' })
    const title = wrapper.find('.lh-sub-menu__title').element as HTMLElement
    expect(document.activeElement).toBe(title)
    wrapper.unmount()
  })
})
