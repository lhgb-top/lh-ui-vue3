import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LhPopconfirm from '~/components/popconfirm/src/index.vue'

describe('LhPopconfirm', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  const getPopper = () => document.querySelector('.lh-popconfirm__popper')

  const open = async (wrapper: ReturnType<typeof mount>) => {
    await wrapper.find('.lh-popconfirm').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
  }

  it('renders the trigger slot', () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })
    expect(wrapper.classes()).toContain('lh-popconfirm')
    expect(wrapper.text()).toContain('删除')
    wrapper.unmount()
  })

  it('opens on click with role=alertdialog', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '<button>删除</button>' },
      attachTo: document.body,
    })

    await open(wrapper)

    const popper = getPopper()
    expect(popper).toBeTruthy()
    expect(popper?.getAttribute('role')).toBe('alertdialog')
    expect(popper?.getAttribute('aria-modal')).toBe('true')
    expect(popper?.querySelector('.lh-popconfirm__title')?.textContent).toContain('确定删除？')

    wrapper.unmount()
  })

  it('emits confirm and hides', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    const buttons = getPopper()?.querySelectorAll('button')
    expect(buttons?.length).toBe(2)

    ;(buttons as NodeListOf<HTMLElement>)[1].click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([false])

    wrapper.unmount()
  })

  it('emits cancel and hides', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    const buttons = getPopper()?.querySelectorAll('button')
    ;(buttons as NodeListOf<HTMLElement>)[0].click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([false])

    wrapper.unmount()
  })

  it('uses default confirm / cancel labels from the locale', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    const buttons = getPopper()?.querySelectorAll('button')
    expect(buttons?.[0].textContent).toBe('取消')
    expect(buttons?.[1].textContent).toBe('确定')

    wrapper.unmount()
  })

  it('honours confirmText / cancelText props', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？', confirmText: '删掉', cancelText: '算了' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    const buttons = getPopper()?.querySelectorAll('button')
    expect(buttons?.[0].textContent).toBe('算了')
    expect(buttons?.[1].textContent).toBe('删掉')

    wrapper.unmount()
  })

  it('cancels on Escape', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(getPopper()).toBeNull()

    wrapper.unmount()
  })

  it('moves focus to the confirm button on open', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    const buttons = getPopper()?.querySelectorAll('button')
    expect(document.activeElement).toBe(buttons?.[1])

    wrapper.unmount()
  })

  it('focuses without scrolling: popper lands off-screen on the open tick', async () => {
    // 回归：弹层 teleport 到 body 后首个 tick 尚未落位，focus() 若不阻止滚动，
    // 会把页面拽到 body 末尾的临时挂载点
    const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus')

    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    try {
      await open(wrapper)

      const confirmBtn = getPopper()?.querySelectorAll('button')[1]
      expect(confirmBtn).toBeTruthy()
      // vi.spyOn 的 mock.calls 只记录参数，this 上下文在 mock.contexts 里；
      // 用「期望值」当 this 去 calls 里捞永远匹配不到
      const callIndex = focusSpy.mock.contexts.findIndex((el) => el === confirmBtn)
      expect(callIndex).toBeGreaterThanOrEqual(0)
      expect(focusSpy.mock.calls[callIndex]?.[0]).toEqual({ preventScroll: true })
    } finally {
      // 断言失败时也不能留下脏的 prototype spy 与挂载实例，否则后续用例
      // 会被遗留的文档级监听器污染（focus 被代理、Tab 被别的实例吞掉）
      focusSpy.mockRestore()
      wrapper.unmount()
    }
  })

  it('cycles Tab between the two actions', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    const buttons = getPopper()?.querySelectorAll('button')
    expect(document.activeElement).toBe(buttons?.[1])

    // 焦点在末项（确定）时 Tab：循环回首项（取消）
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
    )
    expect(document.activeElement).toBe(buttons?.[0])

    // 焦点在首项（取消）时 Shift+Tab：循环回末项（确定）。
    // jsdom 不会执行 Tab 的默认焦点遍历，两个方向的「跳跃」都得由焦点圈完成
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true })
    )
    expect(document.activeElement).toBe(buttons?.[1])

    wrapper.unmount()
  })

  it('hides on click outside', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)
    expect(getPopper()).toBeTruthy()

    document.body.insertAdjacentHTML('beforeend', '<div id="far-away">elsewhere</div>')
    document.getElementById('far-away')?.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    )
    await wrapper.vm.$nextTick()

    // 点击外部只是收起（对齐 alertdialog 的非否定式关闭），不抛 cancel；
    // 外部状态靠 update:visible 同步
    expect(wrapper.emitted('update:visible')?.at(-1)).toEqual([false])
    expect(getPopper()).toBeNull()

    wrapper.unmount()
  })

  it('renders the type class and icon', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '危险操作', type: 'danger' },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    expect(getPopper()?.classList.contains('lh-popconfirm__popper--danger')).toBe(true)
    expect(getPopper()?.querySelector('.lh-popconfirm__icon')).toBeTruthy()

    wrapper.unmount()
  })

  it('hides the icon when showIcon is false', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？', showIcon: false },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await open(wrapper)

    expect(getPopper()?.querySelector('.lh-popconfirm__icon')).toBeNull()

    wrapper.unmount()
  })

  it('does not respond to triggers in manual mode', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？', trigger: 'manual', visible: false },
      slots: { default: '删除' },
      attachTo: document.body,
    })

    await wrapper.find('.lh-popconfirm').trigger('click')
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeNull()

    await wrapper.setProps({ visible: true })
    await wrapper.vm.$nextTick()
    expect(getPopper()).toBeTruthy()

    wrapper.unmount()
  })

  it('renders the content slot', async () => {
    const wrapper = mount(LhPopconfirm, {
      props: { title: '确定删除？' },
      slots: {
        default: '删除',
        content: '<span class="my-content">此操作不可撤销</span>',
      },
      attachTo: document.body,
    })

    await open(wrapper)

    expect(getPopper()?.querySelector('.my-content')?.textContent).toBe('此操作不可撤销')

    wrapper.unmount()
  })
})
