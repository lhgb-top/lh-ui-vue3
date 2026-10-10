import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LhDropdown from '~/components/dropdown/src/index.vue'
import LhDropdownItem from '~/components/dropdown/src/item.vue'

describe('LhDropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  /** 走完 hover/focus 延迟通道用的真实时间等待 */
  const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

  const getMenu = () => document.querySelector('.lh-dropdown__menu')

  const mountDropdown = (props = {}, trigger = 'click') =>
    mount(LhDropdown, {
      props: { trigger, ...props },
      slots: {
        default: '<LhButton>菜单</LhButton>',
        dropdown: `
          <LhDropdownItem command="a">选项 A</LhDropdownItem>
          <LhDropdownItem command="b">选项 B</LhDropdownItem>
          <LhDropdownItem command="c" disabled>禁用项</LhDropdownItem>
        `,
      },
      global: { components: { LhButton: { template: '<button>菜单</button>' }, LhDropdownItem } },
      attachTo: document.body,
    })

  it('renders the trigger', () => {
    const wrapper = mountDropdown()
    expect(wrapper.classes()).toContain('lh-dropdown')
    wrapper.unmount()
  })

  it('defaults to click trigger without an explicit prop', async () => {
    const wrapper = mount(LhDropdown, {
      slots: {
        default: '<LhButton>菜单</LhButton>',
        dropdown: '<LhDropdownItem command="a">选项 A</LhDropdownItem>',
      },
      global: { components: { LhButton: { template: '<button>菜单</button>' }, LhDropdownItem } },
      attachTo: document.body,
    })
    // 不传 trigger 时默认 click：点击展开，悬停不展开
    await wrapper.find('.lh-dropdown').trigger('mouseenter')
    expect(getMenu()).toBeNull()
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeTruthy()
    wrapper.unmount()
  })

  it('treats an absent visible prop as uncontrolled (Boolean cast)', async () => {
    // 回归：visible 是 Boolean 类型且无默认值，未传递时 Vue 会把它解析为 false
    // 而非 undefined，因此不能用 props.visible !== undefined 判定受控模式，
    // 否则触发器永远被当成受控而拒绝响应点击。
    const wrapper = mount(LhDropdown, {
      slots: {
        default: '<LhButton>菜单</LhButton>',
        dropdown: '<LhDropdownItem command="a">选项 A</LhDropdownItem>',
      },
      global: { components: { LhButton: { template: '<button>菜单</button>' }, LhDropdownItem } },
      attachTo: document.body,
    })
    expect(wrapper.props('visible')).toBe(false)

    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeTruthy()

    wrapper.unmount()
  })

  it('opens on click and renders menu / menuitem roles', async () => {
    const wrapper = mountDropdown()
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()

    const menu = getMenu()
    expect(menu).toBeTruthy()
    expect(menu?.getAttribute('role')).toBe('menu')
    expect(menu?.querySelectorAll('[role="menuitem"]').length).toBe(3)
    expect(wrapper.find('.lh-dropdown').attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('.lh-dropdown').attributes('aria-haspopup')).toBe('menu')

    wrapper.unmount()
  })

  it('emits command on item click and closes', async () => {
    const wrapper = mountDropdown()
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()

    const items = getMenu()?.querySelectorAll('[role="menuitem"]')
    ;(items?.[1] as HTMLElement).click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('command')?.[0]).toEqual(['b'])
    expect(getMenu()).toBeNull()

    wrapper.unmount()
  })

  it('stays open when hideOnClick is false', async () => {
    const wrapper = mountDropdown({ hideOnClick: false })
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()

    const items = getMenu()?.querySelectorAll('[role="menuitem"]')
    ;(items?.[0] as HTMLElement).click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('command')?.[0]).toEqual(['a'])
    expect(getMenu()).toBeTruthy()

    wrapper.unmount()
  })

  it('does not emit command for disabled items', async () => {
    const wrapper = mountDropdown({ hideOnClick: false })
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()

    const items = getMenu()?.querySelectorAll('[role="menuitem"]')
    ;(items?.[2] as HTMLElement).click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('command')).toBeUndefined()

    wrapper.unmount()
  })

  it('marks disabled items with aria-disabled and negative tabindex', async () => {
    const wrapper = mountDropdown()
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()

    const items = getMenu()?.querySelectorAll('[role="menuitem"]')
    expect(items?.[2].getAttribute('aria-disabled')).toBe('true')

    wrapper.unmount()
  })

  it('renders divided items with a divider class', async () => {
    const wrapper = mount(
      LhDropdown,
      {
        props: { trigger: 'click' },
        slots: {
          default: '<button>菜单</button>',
          dropdown: '<LhDropdownItem command="x" divided>分割项</LhDropdownItem>',
        },
        global: { components: { LhDropdownItem } },
        attachTo: document.body,
      }
    )
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()

    expect(getMenu()?.querySelector('.lh-dropdown__item--divided')).toBeTruthy()

    wrapper.unmount()
  })

  it('hides on click outside', async () => {
    const wrapper = mountDropdown()
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeTruthy()

    document.body.insertAdjacentHTML('beforeend', '<div id="far-away">elsewhere</div>')
    document.getElementById('far-away')?.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    )
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeNull()

    wrapper.unmount()
  })

  it('hides on Escape and returns focus to the trigger', async () => {
    const wrapper = mountDropdown()
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(getMenu()).toBeNull()
    // 焦点归还到触发器内的按钮
    expect(document.activeElement?.tagName).toBe('BUTTON')

    wrapper.unmount()
  })

  it('moves focus across items with arrow keys and activates with Enter', async () => {
    const wrapper = mountDropdown({ hideOnClick: false })
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()

    const menu = getMenu() as HTMLElement
    const items = menu.querySelectorAll('[role="menuitem"]')

    // 方向键：首项 → 次项（跳过禁用项）
    menu.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
    )
    expect(document.activeElement).toBe(items[0])

    menu.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
    )
    expect(document.activeElement).toBe(items[1])

    // Enter 触发 command
    menu.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    )
    expect(wrapper.emitted('command')?.[0]).toEqual(['b'])

    // Home / End（禁用项被键盘跳过，End 落在最后一项启用项上）
    menu.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true })
    )
    expect(document.activeElement).toBe(items[1])

    menu.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true })
    )
    expect(document.activeElement).toBe(items[0])

    wrapper.unmount()
  })

  it('supports hover trigger', async () => {
    // hover 走延迟通道（show 200ms / hide 100ms）：显隐由计时器驱动，
    // 必须等真实时间走过延迟才能在 DOM 上看到结果
    const wrapper = mountDropdown({}, 'hover')
    await wrapper.find('.lh-dropdown').trigger('mouseenter')
    await delay(250)
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeTruthy()

    await wrapper.find('.lh-dropdown').trigger('mouseleave')
    await delay(150)
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeNull()

    wrapper.unmount()
  })

  it('supports contextmenu trigger', async () => {
    const wrapper = mountDropdown({}, 'contextmenu')
    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })
    wrapper.find('.lh-dropdown').element.dispatchEvent(event)
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeTruthy()

    wrapper.unmount()
  })

  it('does not respond when disabled', async () => {
    const wrapper = mountDropdown({ disabled: true })
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeNull()

    wrapper.unmount()
  })

  it('honours v-model:visible in controlled mode', async () => {
    const wrapper = mountDropdown({ visible: true })
    await wrapper.vm.$nextTick()
    expect(getMenu()).toBeTruthy()

    await wrapper.find('.lh-dropdown').trigger('click')
    // 受控模式：触发器不自行切换显隐
    expect(getMenu()).toBeTruthy()

    wrapper.unmount()
  })

  it('applies maxHeight to the menu', async () => {
    const wrapper = mountDropdown({ maxHeight: 200 })
    await wrapper.find('.lh-dropdown').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getMenu()?.getAttribute('style')).toContain('max-height: 200px')

    wrapper.unmount()
  })
})
