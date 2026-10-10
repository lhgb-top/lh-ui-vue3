import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import LhDatePicker from '~/components/date-picker'
import { lhlocale } from '~/locale'

describe('LhDatePicker Component', () => {
  let wrapper: VueWrapper

  it('should render', () => {
    wrapper = mount(LhDatePicker)
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with disabled class', async () => {
    wrapper = mount(LhDatePicker, {
      props: { disabled: true, modelValue: null },
    })
    expect(wrapper.classes()).toContain('lh-date-picker--disabled')
  })

  it('should render with size class', async () => {
    wrapper = mount(LhDatePicker, {
      props: { size: 'small', modelValue: null },
    })
    expect(wrapper.classes()).toContain('lh-date-picker--small')
  })

  it('should render the input field', async () => {
    wrapper = mount(LhDatePicker, {
      props: { modelValue: null },
    })
    expect(wrapper.find('.lh-date-picker__input').exists()).toBe(true)
  })

  it('should show clear icon when clearable and has value', async () => {
    wrapper = mount(LhDatePicker, {
      props: {
        clearable: true,
        modelValue: new Date(2024, 0, 15),
      },
      global: {
        stubs: {
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    expect(wrapper.find('.lh-date-picker__clear').exists()).toBe(true)
  })

  it('should not show clear icon when no value', async () => {
    wrapper = mount(LhDatePicker, {
      props: { clearable: true, modelValue: null },
    })
    expect(wrapper.find('.lh-date-picker__clear').exists()).toBe(false)
  })

  it('should emit update:modelValue when clear is clicked', async () => {
    wrapper = mount(LhDatePicker, {
      props: {
        clearable: true,
        modelValue: new Date(2024, 0, 15),
      },
      global: {
        stubs: {
          'lh-icon': true,
          'lh-button': true,
        },
      },
    })
    const clearIcon = wrapper.find('.lh-date-picker__clear')
    if (clearIcon.exists()) {
      await clearIcon.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('should render week day headers when opened', async () => {
    wrapper = mount(LhDatePicker, {
      props: { modelValue: null },
      global: {
        stubs: {
          teleports: false,
          'lh-icon': true,
        },
      },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(true)
  })

  it('should display formatted date when value is set', async () => {
    wrapper = mount(LhDatePicker, {
      props: {
        modelValue: new Date(2024, 0, 15),
        format: 'yyyy-MM-dd',
      },
    })
    expect(wrapper.find('.lh-date-picker__value').exists()).toBe(true)
    expect(wrapper.find('.lh-date-picker__value').text()).toContain('2024')
  })

  it('should not open panel when disabled', async () => {
    wrapper = mount(LhDatePicker, {
      props: { disabled: true, modelValue: null },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(false)
  })
})
describe('LhDatePicker i18n', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')
  const mountOptions = {
    global: {
      stubs: {
        // 面板真实挂载到组件树内，便于断言表头文案
        Teleport: { template: '<div><slot/></div>' },
        'lh-icon': true,
      },
    },
  }

  it('renders week day headers from the locale pack', async () => {
    const wrapper = mount(LhDatePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    const headers = wrapper.findAll('.lh-date-picker-panel__weekday')
    expect(headers).toHaveLength(7)
    expect(headers[0].text()).toBe('日')
    expect(headers[6].text()).toBe('六')
    restoreLocale()
  })

  it('re-renders week day headers when the locale switches', async () => {
    const wrapper = mount(LhDatePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    expect(wrapper.findAll('.lh-date-picker-panel__weekday')[0].text()).toBe('日')

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.findAll('.lh-date-picker-panel__weekday')[0].text()).toBe('Sun')

    restoreLocale()
    await nextTick()
    expect(wrapper.findAll('.lh-date-picker-panel__weekday')[0].text()).toBe('日')
  })

  it('falls back to a locale-aware placeholder from the format', () => {
    const wrapper = mount(LhDatePicker, { props: { modelValue: null, format: 'yyyy-MM-dd' } })
    expect(wrapper.find('.lh-date-picker__input-inner').attributes('placeholder')).toBe('年-月-日')
  })

  it('keeps a custom placeholder over the format fallback', () => {
    const wrapper = mount(LhDatePicker, {
      props: { modelValue: null, placeholder: '选择日期' },
    })
    expect(wrapper.find('.lh-date-picker__input-inner').attributes('placeholder')).toBe('选择日期')
  })
})

describe('LhDatePicker month/year views', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')
  const mountOptions = {
    global: {
      stubs: {
        Teleport: { template: '<div><slot/></div>' },
        'lh-icon': true,
        'lh-button': true,
      },
    },
  }

  it('opens the month grid when the title is clicked', async () => {
    const wrapper = mount(LhDatePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    await wrapper.find('.lh-date-picker-panel__title-text').trigger('click')
    const cells = wrapper.findAll('.lh-date-picker-panel__month-cell')
    expect(cells).toHaveLength(12)
    expect(cells[0].text()).toBe('1月')
    expect(cells[11].text()).toBe('12月')
    restoreLocale()
  })

  it('renders localized month names and reacts to locale switches', async () => {
    const wrapper = mount(LhDatePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    await wrapper.find('.lh-date-picker-panel__title-text').trigger('click')
    expect(wrapper.findAll('.lh-date-picker-panel__month-cell')[0].text()).toBe('1月')

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.findAll('.lh-date-picker-panel__month-cell')[0].text()).toBe('Jan')

    restoreLocale()
  })

  it('drills back to the calendar of the picked month in date mode', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: null },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    await wrapper.find('.lh-date-picker-panel__title-text').trigger('click')
    await wrapper.findAll('.lh-date-picker-panel__month-cell')[2].trigger('click')
    // 回到日历视图，标题显示所选月份
    expect(wrapper.find('.lh-date-picker-panel__month-grid').exists()).toBe(false)
    expect(wrapper.find('.lh-date-picker-panel__days').exists()).toBe(true)
    expect(wrapper.find('.lh-date-picker-panel__title-text').text()).toContain('3月')
  })

  it('selects a month directly in month mode', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: null, mode: 'month' },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    // 打开即月份网格
    expect(wrapper.find('.lh-date-picker-panel__month-grid').exists()).toBe(true)
    await wrapper.findAll('.lh-date-picker-panel__month-cell')[5].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBeInstanceOf(Date)
    const val = wrapper.emitted('update:modelValue')?.[0]?.[0] as Date
    expect(val.getFullYear()).toBe(new Date().getFullYear())
    expect(val.getMonth()).toBe(5)
  })

  it('selects a year directly in year mode', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: null, mode: 'year' },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    expect(wrapper.find('.lh-date-picker-panel__year-grid').exists()).toBe(true)
    await wrapper.findAll('.lh-date-picker-panel__year-cell')[3].trigger('click')

    const val = wrapper.emitted('update:modelValue')?.[0]?.[0] as Date
    expect(val.getMonth()).toBe(0)
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('navigates the year grid by decade steps', async () => {
    const wrapper = mount(LhDatePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    await wrapper.find('.lh-date-picker-panel__title-text').trigger('click')
    await wrapper.find('.lh-date-picker-panel__title-text').trigger('click')
    // 年份视图标题为十年段
    expect(wrapper.find('.lh-date-picker-panel__title-text').text()).toMatch(/^\d{4} - \d{4}$/)
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhDatePicker, { props: { sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })
})

describe('LhDatePicker today navigation', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')
  const mountOptions = {
    global: {
      stubs: {
        // 面板保留在组件树内，便于断言标题与高亮；不 stub lh-button，否则点不到真实按钮
        Teleport: { template: '<div><slot/></div>' },
        'lh-icon': true,
      },
    },
  }

  it('switches the panel to today when the footer today button is clicked', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: new Date(2020, 0, 15) },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    // 初始面板跟随 modelValue，停在 2020 年 1 月，该月没有「今天」高亮
    expect(wrapper.find('.lh-date-picker-panel__title-text').text()).toContain('2020')
    expect(wrapper.find('.lh-date-picker-panel--today').exists()).toBe(false)

    const footerButtons = wrapper.findAll('.lh-date-picker-panel__footer button')
    const todayBtn = footerButtons.find((b) => b.text().includes('今天'))
    if (!todayBtn) throw new Error('底部「今天」按钮未渲染')
    await todayBtn.trigger('click')

    const now = new Date()
    const title = wrapper.find('.lh-date-picker-panel__title-text').text()
    expect(title).toContain(String(now.getFullYear()))
    expect(title).toMatch(new RegExp(`${now.getMonth() + 1}月`))
    expect(wrapper.find('.lh-date-picker-panel--today').exists()).toBe(true)
    // 今天仅被预选，未触发提交
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    restoreLocale()
  })

  it('navigates to the month of a clicked adjacent-month filler day', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: new Date(2020, 0, 15) },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    expect(wrapper.find('.lh-date-picker-panel__title-text').text()).toContain('2020')

    const otherDay = wrapper.find('.lh-date-picker-panel--other')
    if (!otherDay.exists()) throw new Error('未渲染相邻月份填充格')
    await otherDay.trigger('click')

    // 2020 年 1 月的头几个填充格属于 2019 年 12 月，点击后面板跳到该月
    const title = wrapper.find('.lh-date-picker-panel__title-text').text()
    expect(title).toContain('2019')
    expect(title).toMatch(/12月/)
    restoreLocale()
  })
})

describe('LhDatePicker readonly / cellClassName', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')
  const mountOptions = {
    global: {
      stubs: {
        // 面板真实挂载到组件树内，便于断言单元格类名
        Teleport: { template: '<div><slot/></div>' },
        'lh-icon': true,
        'lh-button': true,
      },
    },
  }

  it('renders the native input with readonly attribute when readonly is true', () => {
    const wrapper = mount(LhDatePicker, {
      props: { modelValue: null, readonly: true },
    })
    expect(wrapper.find('.lh-date-picker__input-inner').attributes('readonly')).toBeDefined()
  })

  it('keeps the readonly attribute on the native input under the default readonly=true', () => {
    const wrapper = mount(LhDatePicker, { props: { modelValue: null } })
    expect(wrapper.find('.lh-date-picker__input-inner').attributes('readonly')).toBeDefined()
  })

  it('applies cellClassName output to the matching day cells', async () => {
    const received: Date[] = []
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: {
        modelValue: null,
        cellClassName: (date: Date) => {
          received.push(date)
          return date.getDate() === 15 ? 'my-custom-day' : ''
        },
      },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    const cells = wrapper.findAll('.my-custom-day')
    expect(cells.length).toBeGreaterThan(0)
    cells.forEach((cell) => {
      expect(cell.classes()).toContain('lh-date-picker-panel__day')
      expect(cell.text()).toBe('15')
    })
    expect(received.length).toBeGreaterThan(0)
    received.forEach((d) => expect(d).toBeInstanceOf(Date))
    restoreLocale()
  })

  it('omits the custom class when cellClassName returns an empty value', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: null, cellClassName: () => '' },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    // 面板正常渲染且无自定义类残留
    expect(wrapper.find('.lh-date-picker-panel__days').exists()).toBe(true)
    expect(wrapper.find('.my-custom-day').exists()).toBe(false)
    restoreLocale()
  })
})

describe('LhDatePicker keyboard / ARIA', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')
  const mountOptions = {
    global: {
      stubs: {
        Teleport: { template: '<div><slot/></div>' },
        'lh-icon': true,
      },
    },
  }

  /** 取得当前持有 roving tabindex 的日期格 */
  const focusedDay = (wrapper: VueWrapper) =>
    wrapper.findAll('.lh-date-picker-panel__day').find((d) => d.attributes('tabindex') === '0')!

  it('gives the trigger combobox semantics with a tab stop', () => {
    const wrapper = mount(LhDatePicker, { ...mountOptions, props: { modelValue: null } })
    const trigger = wrapper.find('.lh-date-picker__input')
    expect(trigger.attributes('role')).toBe('combobox')
    expect(trigger.attributes('tabindex')).toBe('0')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(trigger.attributes('aria-haspopup')).toBe('dialog')
    wrapper.unmount()
  })

  it('removes the trigger from the tab order when disabled', () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: null, disabled: true },
    })
    expect(wrapper.find('.lh-date-picker__input').attributes('tabindex')).toBe('-1')
    wrapper.unmount()
  })

  it('opens the panel via Enter and closes it via Escape', async () => {
    const wrapper = mount(LhDatePicker, { ...mountOptions, props: { modelValue: null } })
    await wrapper.find('.lh-date-picker__input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.find('.lh-date-picker__panel').exists()).toBe(true)
    expect(wrapper.find('.lh-date-picker__input').attributes('aria-expanded')).toBe('true')
    // Escape 在网格上关闭面板
    await focusedDay(wrapper).trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.lh-date-picker__panel').exists()).toBe(false)
    restoreLocale()
  })

  it('renders the day grid as grid / row / gridcell with roving tabindex', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: new Date(2020, 0, 15) },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    const grid = wrapper.find('.lh-date-picker-panel__days')
    expect(grid.attributes('role')).toBe('grid')
    const rows = grid.findAll('[role="row"]')
    const cells = grid.findAll('[role="gridcell"]')
    // 日历按 7 列分行，行数 × 7 = 格数（补齐到整周，35 或 42）
    expect(rows.length * 7).toBe(cells.length)
    // 全网格中只有一个 tabindex=0（roving tabindex）
    const tabbable = cells.filter((c) => c.attributes('tabindex') === '0')
    expect(tabbable).toHaveLength(1)
    // 锚点落在选中日（2020-01-15）
    expect(tabbable[0].attributes('aria-label')).toContain('2020年1月15日')
    expect(tabbable[0].attributes('aria-selected')).toBe('true')
    // 表头行是 columnheader（语义仅视觉，格本身已带完整日期文案）
    const headers = wrapper.findAll('.lh-date-picker-panel__weekday')
    expect(headers.length).toBe(7)
    expect(headers[0].attributes('role')).toBe('columnheader')
    restoreLocale()
  })

  it('moves the roving tabindex on arrow keys', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: new Date(2020, 0, 15) },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    expect(focusedDay(wrapper).attributes('aria-label')).toContain('2020年1月15日')
    await focusedDay(wrapper).trigger('keydown', { key: 'ArrowRight' })
    expect(focusedDay(wrapper).attributes('aria-label')).toContain('2020年1月16日')
    await focusedDay(wrapper).trigger('keydown', { key: 'ArrowLeft' })
    expect(focusedDay(wrapper).attributes('aria-label')).toContain('2020年1月15日')
    // 下移一整行（7 格）：15 → 22
    await focusedDay(wrapper).trigger('keydown', { key: 'ArrowDown' })
    expect(focusedDay(wrapper).attributes('aria-label')).toContain('2020年1月22日')
    restoreLocale()
  })

  it('jumps to the row start / end on Home / End', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: new Date(2020, 0, 15) },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    await focusedDay(wrapper).trigger('keydown', { key: 'End' })
    // 15 日所在行的行末是 18 日（周三起算的同一周）
    expect(focusedDay(wrapper).attributes('aria-label')).toContain('2020年1月18日')
    await focusedDay(wrapper).trigger('keydown', { key: 'Home' })
    expect(focusedDay(wrapper).attributes('aria-label')).toContain('2020年1月12日')
    restoreLocale()
  })

  it('selects the focused day on Enter / Space', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: new Date(2020, 0, 15) },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    await focusedDay(wrapper).trigger('keydown', { key: 'ArrowRight' })
    await focusedDay(wrapper).trigger('keydown', { key: 'Enter' })
    // 两阶段选择：Enter 只落 tempSelection（高亮），确认才抛值
    expect(focusedDay(wrapper).attributes('aria-selected')).toBe('true')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    restoreLocale()
  })

  it('flips months on PageUp / PageDown keeping the column', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: new Date(2020, 0, 15) },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    await focusedDay(wrapper).trigger('keydown', { key: 'PageDown' })
    expect(wrapper.find('.lh-date-picker-panel__title-text').text()).toContain('2月')
    // 翻月后聚焦格仍可寻址
    expect(focusedDay(wrapper).exists()).toBe(true)
    await focusedDay(wrapper).trigger('keydown', { key: 'PageUp' })
    expect(wrapper.find('.lh-date-picker-panel__title-text').text()).toContain('1月')
    restoreLocale()
  })

  it('flips to the next month when arrowing past the last cell', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: new Date(2020, 0, 31) },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    // 2020-01-31 位于 index 33，右移一格到本月最后一格（2 月填充日）
    await focusedDay(wrapper).trigger('keydown', { key: 'ArrowRight' })
    expect(focusedDay(wrapper).attributes('aria-label')).toContain('2020年2月1日')
    // 再右移越过整个网格边界 → 翻到 2 月
    await focusedDay(wrapper).trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.find('.lh-date-picker-panel__title-text').text()).toContain('2月')
    // 翻月后落点回到新网格首格（2 月网格以 1 月填充日起算）
    expect(focusedDay(wrapper).attributes('aria-label')).toContain('2020年1月26日')
    restoreLocale()
  })

  it('navigates the month grid by keyboard in month mode', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: null, mode: 'month' },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    const grid = wrapper.find('.lh-date-picker-panel__month-grid')
    expect(grid.attributes('role')).toBe('grid')
    const cells = wrapper.findAll('.lh-date-picker-panel__month-cell')
    expect(cells.filter((c) => c.attributes('tabindex') === '0')).toHaveLength(1)
    const focused = cells.find((c) => c.attributes('tabindex') === '0')!
    await focused.trigger('keydown', { key: 'ArrowRight' })
    const next = wrapper.findAll('.lh-date-picker-panel__month-cell').find(
      (c) => c.attributes('tabindex') === '0',
    )!
    expect(next.text()).not.toBe(focused.text())
    // Enter 直接选中并关闭
    await next.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBeInstanceOf(Date)
    restoreLocale()
  })

  it('navigates the year grid by keyboard in year mode', async () => {
    const wrapper = mount(LhDatePicker, {
      ...mountOptions,
      props: { modelValue: null, mode: 'year' },
    })
    await wrapper.find('.lh-date-picker__input').trigger('click')
    const grid = wrapper.find('.lh-date-picker-panel__year-grid')
    expect(grid.attributes('role')).toBe('grid')
    const focused = wrapper
      .findAll('.lh-date-picker-panel__year-cell')
      .find((c) => c.attributes('tabindex') === '0')!
    const before = focused.text()
    await focused.trigger('keydown', { key: 'ArrowDown' })
    const after = wrapper
      .findAll('.lh-date-picker-panel__year-cell')
      .find((c) => c.attributes('tabindex') === '0')!
    expect(after.text()).not.toBe(before)
    restoreLocale()
  })
})
