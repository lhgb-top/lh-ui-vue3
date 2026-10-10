import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import LhTimePicker from '~/components/time-picker'
import { lhlocale } from '~/locale'

describe('LhTimePicker Component', () => {
  let wrapper: VueWrapper

  it('should render', () => {
    wrapper = mount(LhTimePicker)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with disabled class', async () => {
    wrapper = mount(LhTimePicker, {
      props: { disabled: true, modelValue: null },
    })
    expect(wrapper.classes()).toContain('lh-time-picker--disabled')
  })

  it('should render with size class', async () => {
    wrapper = mount(LhTimePicker, {
      props: { size: 'small', modelValue: null },
    })
    expect(wrapper.classes()).toContain('lh-time-picker--small')
  })

  it('should render the input field', async () => {
    wrapper = mount(LhTimePicker, {
      props: { modelValue: null },
    })
    expect(wrapper.find('.lh-time-picker__input-inner').exists()).toBe(true)
  })

  it('should show clear icon when clearable and has value', async () => {
    wrapper = mount(LhTimePicker, {
      props: {
        clearable: true,
        modelValue: new Date(2024, 0, 15, 9, 30, 0),
      },
      global: {
        stubs: {
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    expect(wrapper.find('.lh-time-picker__clear').exists()).toBe(true)
  })

  it('should not show clear icon when no value', async () => {
    wrapper = mount(LhTimePicker, {
      props: { clearable: true, modelValue: null },
    })
    expect(wrapper.find('.lh-time-picker__clear').exists()).toBe(false)
  })

  it('should emit update:modelValue when clear is clicked', async () => {
    wrapper = mount(LhTimePicker, {
      props: {
        clearable: true,
        modelValue: new Date(2024, 0, 15, 9, 30, 0),
      },
      global: {
        stubs: {
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    const clearIcon = wrapper.find('.lh-time-picker__clear')
    if (clearIcon.exists()) {
      await clearIcon.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('should display formatted time when value is set', async () => {
    wrapper = mount(LhTimePicker, {
      props: {
        modelValue: new Date(2024, 0, 15, 9, 5, 30),
        format: 'HH:mm:ss',
      },
    })
    expect(wrapper.find('.lh-time-picker__value').exists()).toBe(true)
    expect(wrapper.find('.lh-time-picker__value').text()).toContain('09')
  })

  it('should not open panel when disabled', async () => {
    wrapper = mount(LhTimePicker, {
      props: { disabled: true, modelValue: null },
    })
    await wrapper.find('.lh-time-picker__input-inner').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(false)
  })

  it('should open panel when clicked', async () => {
    wrapper = mount(LhTimePicker, {
      props: { disabled: false, modelValue: null },
    })
    await wrapper.find('.lh-time-picker__input-inner').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(true)
  })
})
describe('LhTimePicker i18n column titles', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')
  const mountOptions = {
    global: {
      stubs: {
        // 面板挂到组件树内便于断言列标题
        Teleport: { template: '<div><slot/></div>' },
        'lh-icon': true,
        'lh-button': true,
      },
    },
  }

  it('renders column titles from the locale pack', async () => {
    const wrapper = mount(LhTimePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-time-picker__input-inner').trigger('click')
    const titles = wrapper.findAll('.lh-time-picker-panel__column-title')
    expect(titles).toHaveLength(3)
    expect(titles[0].text()).toBe('时')
    expect(titles[1].text()).toBe('分')
    expect(titles[2].text()).toBe('秒')
    restoreLocale()
  })

  it('re-renders column titles when the locale switches', async () => {
    const wrapper = mount(LhTimePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-time-picker__input-inner').trigger('click')
    expect(wrapper.findAll('.lh-time-picker-panel__column-title')[0].text()).toBe('时')

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.findAll('.lh-time-picker-panel__column-title')[0].text()).toBe('H')

    restoreLocale()
    await nextTick()
    expect(wrapper.findAll('.lh-time-picker-panel__column-title')[0].text()).toBe('时')
  })
})

describe('LhTimePicker placeholder i18n', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')

  it('falls back to a locale-aware placeholder from the format', () => {
    const wrapper = mount(LhTimePicker, { props: { modelValue: null, format: 'HH:mm:ss' } })
    expect(wrapper.find('.lh-time-picker__input-inner').attributes('placeholder')).toBe('时:分:秒')
  })

  it('keeps a custom placeholder over the format fallback', () => {
    const wrapper = mount(LhTimePicker, {
      props: { modelValue: null, placeholder: '选择时间' },
    })
    expect(wrapper.find('.lh-time-picker__input-inner').attributes('placeholder')).toBe('选择时间')
  })

  it('omits the second label when format has no seconds', () => {
    const wrapper = mount(LhTimePicker, { props: { modelValue: null, format: 'HH:mm' } })
    expect(wrapper.find('.lh-time-picker__input-inner').attributes('placeholder')).toBe('时:分')
    restoreLocale()
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhTimePicker, { props: { sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })
})

describe('LhTimePicker readonly / hour range', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')
  const mountOptions = {
    global: {
      stubs: {
        // 面板挂到组件树内便于断言小时列选项
        Teleport: { template: '<div><slot/></div>' },
        'lh-icon': true,
        'lh-button': true,
      },
    },
  }

  // 第一列固定为小时列
  const getHourItems = (wrapper: VueWrapper) =>
    wrapper.findAll('.lh-time-picker-panel__column')[0].findAll('.lh-time-picker-panel__column-item')

  it('renders the native input with readonly attribute when readonly is true', () => {
    const wrapper = mount(LhTimePicker, {
      props: { modelValue: null, readonly: true },
    })
    expect(wrapper.find('.lh-time-picker__input-inner').attributes('readonly')).toBeDefined()
  })

  it('keeps the full 0-23 hour list under the default start/end', async () => {
    const wrapper = mount(LhTimePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-time-picker__input-inner').trigger('click')
    expect(getHourItems(wrapper)).toHaveLength(24)
    restoreLocale()
  })

  it('limits the hour list to the start/end range', async () => {
    const wrapper = mount(LhTimePicker, {
      ...mountOptions,
      props: { modelValue: null, start: 8, end: 18 },
    })
    await wrapper.find('.lh-time-picker__input-inner').trigger('click')
    const items = getHourItems(wrapper)
    expect(items).toHaveLength(11)
    expect(items[0].text()).toBe('08')
    expect(items[items.length - 1].text()).toBe('18')
    restoreLocale()
  })

  it('clamps an out-of-range selected hour into the range', () => {
    const wrapper = mount(LhTimePicker, {
      props: { modelValue: new Date(2024, 0, 15, 20, 30, 0), start: 8, end: 18 },
    })
    // 范围外的 20 点收敛回上界 18 点展示
    expect(wrapper.find('.lh-time-picker__value').text()).toContain('18')
  })
})

describe('LhTimePicker keyboard / ARIA', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')

  // jsdom 未实现 scrollIntoView，列步进会调到它，这里给个空实现避免报错
  beforeEach(() => {
    if (typeof HTMLElement.prototype.scrollIntoView !== 'function') {
      HTMLElement.prototype.scrollIntoView = () => {}
    }
  })

  const wrappers: VueWrapper[] = []
  afterEach(() => {
    wrappers.forEach((w) => w.unmount())
    wrappers.splice(0, wrappers.length)
  })

  const mountPanel = (props: Record<string, unknown> = {}) => {
    const w = mount(LhTimePicker, {
      attachTo: document.body,
      props: { modelValue: null, ...props },
      global: {
        stubs: {
          // 面板挂到组件树内便于断言列内容与焦点
          Teleport: { template: '<div><slot/></div>' },
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    wrappers.push(w)
    return w
  }

  const columnBodies = (wrapper: VueWrapper) =>
    wrapper.findAll('.lh-time-picker-panel__column-body')

  const openWithKeyboard = async (wrapper: VueWrapper) => {
    await wrapper.find('.lh-time-picker__input').trigger('keydown', { key: 'Enter' })
    await nextTick()
  }

  it('renders the trigger as a focusable combobox', () => {
    const wrapper = mountPanel()
    const trigger = wrapper.find('.lh-time-picker__input')
    expect(trigger.attributes('role')).toBe('combobox')
    expect(trigger.attributes('tabindex')).toBe('0')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(trigger.attributes('aria-haspopup')).toBe('dialog')
    expect(trigger.attributes('aria-controls')).toMatch(/^lh-time-picker-panel-\d+$/)
    restoreLocale()
  })

  it('removes the trigger from the tab order when disabled', () => {
    const wrapper = mountPanel({ disabled: true })
    expect(wrapper.find('.lh-time-picker__input').attributes('tabindex')).toBe('-1')
    restoreLocale()
  })

  it('does not respond to keyboard when disabled', async () => {
    const wrapper = mountPanel({ disabled: true })
    await wrapper.find('.lh-time-picker__input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.vm.internalVisible).toBe(false)
    restoreLocale()
  })

  it('opens the panel with Enter and moves focus to the hour column', async () => {
    const wrapper = mountPanel()
    await openWithKeyboard(wrapper)
    const bodies = columnBodies(wrapper)
    expect(wrapper.vm.internalVisible).toBe(true)
    expect(wrapper.find('.lh-time-picker__input').attributes('aria-expanded')).toBe('true')
    expect(bodies).toHaveLength(3)
    expect(document.activeElement).toBe(bodies[0]!.element)
    restoreLocale()
  })

  it('renders the panel as a dialog with a locale label', async () => {
    const wrapper = mountPanel()
    await openWithKeyboard(wrapper)
    const panel = wrapper.find('.lh-time-picker__panel')
    expect(panel.attributes('role')).toBe('dialog')
    expect(panel.attributes('aria-label')).toBe('选择时间')
    restoreLocale()
  })

  it('renders each column as a listbox with option semantics', async () => {
    const wrapper = mountPanel()
    await openWithKeyboard(wrapper)
    const bodies = columnBodies(wrapper)
    expect(bodies.map((b) => b.attributes('role'))).toEqual(['listbox', 'listbox', 'listbox'])
    expect(bodies.map((b) => b.attributes('aria-label'))).toEqual(['小时', '分钟', '秒'])

    const options = bodies[0]!.findAll('.lh-time-picker-panel__column-item')
    expect(options.every((o) => o.attributes('role') === 'option')).toBe(true)
    // 恰好一项被选中，且 aria-activedescendant 指向它
    const selected = bodies[0]!.findAll('[aria-selected="true"]')
    expect(selected).toHaveLength(1)
    expect(bodies[0]!.attributes('aria-activedescendant')).toBe(selected[0]!.attributes('id'))
    restoreLocale()
  })

  it('renders only two columns when the format omits seconds', async () => {
    const wrapper = mountPanel({ format: 'HH:mm' })
    await openWithKeyboard(wrapper)
    expect(columnBodies(wrapper)).toHaveLength(2)
    restoreLocale()
  })

  it('steps the hour with ArrowUp / ArrowDown', async () => {
    const wrapper = mountPanel({ modelValue: new Date(2024, 0, 15, 9, 30, 0) })
    await openWithKeyboard(wrapper)
    // 面板在 Transition 内，状态变更会重建节点，每次断言前重新查询列
    const hourBody = () => wrapper.findAll('.lh-time-picker-panel__column-body')[0]!
    const activeText = () =>
      hourBody().find('.lh-time-picker-panel__column-item--active').text()

    expect(activeText()).toBe('09')
    await hourBody().trigger('keydown', { key: 'ArrowDown' })
    expect(activeText()).toBe('10')
    await hourBody().trigger('keydown', { key: 'ArrowUp' })
    expect(activeText()).toBe('09')
    restoreLocale()
  })

  it('wraps the hour around at the boundaries', async () => {
    const wrapper = mountPanel({ modelValue: new Date(2024, 0, 15, 23, 30, 0) })
    await openWithKeyboard(wrapper)
    const hourBody = () => wrapper.findAll('.lh-time-picker-panel__column-body')[0]!
    expect(hourBody().find('.lh-time-picker-panel__column-item--active').text()).toBe('23')
    await hourBody().trigger('keydown', { key: 'ArrowDown' })
    expect(hourBody().find('.lh-time-picker-panel__column-item--active').text()).toBe('00')
    restoreLocale()
  })

  it('moves focus between columns with ArrowRight / ArrowLeft', async () => {
    const wrapper = mountPanel()
    await openWithKeyboard(wrapper)
    const bodies = columnBodies(wrapper)

    await bodies[0]!.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(bodies[1]!.element)
    await bodies[1]!.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(bodies[2]!.element)
    // 最后一列再按 ArrowRight 不越界，焦点保持
    await bodies[2]!.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(bodies[2]!.element)
    await bodies[2]!.trigger('keydown', { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(bodies[1]!.element)
    restoreLocale()
  })

  it('confirms the selection and closes the panel with Enter', async () => {
    const wrapper = mountPanel({ modelValue: new Date(2024, 0, 15, 9, 30, 0) })
    await openWithKeyboard(wrapper)
    const hourBody = () => wrapper.findAll('.lh-time-picker-panel__column-body')[0]!
    await hourBody().trigger('keydown', { key: 'ArrowDown' }) // 9 → 10
    await hourBody().trigger('keydown', { key: 'Enter' })

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    const value = emitted![0]![0] as Date
    expect(value.getHours()).toBe(10)
    expect(wrapper.vm.internalVisible).toBe(false)
    // 焦点回到触发器
    expect(document.activeElement).toBe(wrapper.find('.lh-time-picker__input').element)
    restoreLocale()
  })

  it('closes the panel with Escape and returns focus to the trigger', async () => {
    const wrapper = mountPanel()
    await openWithKeyboard(wrapper)
    await columnBodies(wrapper)[0]!.trigger('keydown', { key: 'Escape' })
    expect(wrapper.vm.internalVisible).toBe(false)
    expect(wrapper.find('.lh-time-picker__panel').exists()).toBe(false)
    expect(document.activeElement).toBe(wrapper.find('.lh-time-picker__input').element)
    restoreLocale()
  })

  it('closes an open panel with Escape on the trigger', async () => {
    const wrapper = mountPanel()
    const trigger = wrapper.find('.lh-time-picker__input')
    await trigger.trigger('keydown', { key: 'Enter' })
    expect(wrapper.vm.internalVisible).toBe(true)
    await trigger.trigger('keydown', { key: 'Escape' })
    expect(wrapper.vm.internalVisible).toBe(false)
    restoreLocale()
  })

  it('ignores non-navigation keys on a column', async () => {
    const wrapper = mountPanel({ modelValue: new Date(2024, 0, 15, 9, 30, 0) })
    await openWithKeyboard(wrapper)
    const hourBody = columnBodies(wrapper)[0]!
    await hourBody.trigger('keydown', { key: 'x' })
    expect(
      hourBody.find('.lh-time-picker-panel__column-item--active').text(),
    ).toBe('09')
    restoreLocale()
  })
})
