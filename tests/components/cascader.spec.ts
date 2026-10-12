import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import LhCascader from '~/components/cascader'
import { lhlocale } from '~/locale'

// 模块级共享：LhCascader placeholder i18n 用例也要用同一份 options
const cascaderOptions = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'sheji',
        label: '设计指南',
        children: [
          { value: 'yuansze', label: '颜色' },
          { value: 'fuziyuanze', label: '字体' },
        ],
      },
      { value: 'shejiguize', label: '设计规则' },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件' },
    ],
  },
]

describe('LhCascader Component', () => {
  let wrapper: VueWrapper

  it('should render', () => {
    wrapper = mount(LhCascader, {
      props: { options: cascaderOptions },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with disabled class', () => {
    wrapper = mount(LhCascader, {
      props: { disabled: true, options: cascaderOptions },
    })
    expect(wrapper.classes()).toContain('lh-cascader--disabled')
  })

  it('should render with size class', () => {
    wrapper = mount(LhCascader, {
      props: { size: 'small', options: cascaderOptions },
    })
    expect(wrapper.classes()).toContain('lh-cascader--small')
  })

  it('should render the input field', () => {
    wrapper = mount(LhCascader, {
      props: { options: cascaderOptions },
    })
    expect(wrapper.find('.lh-cascader__input-inner').exists()).toBe(true)
  })

  it('should show clear button when clearable and has value', () => {
    wrapper = mount(LhCascader, {
      props: {
        clearable: true,
        options: cascaderOptions,
        modelValue: ['zhinan', 'sheji'],
      },
      global: {
        stubs: {
          'lh-icon': true,
          Teleport: {
            disabled: true,
          },
        },
      },
    })
    expect(wrapper.find('.lh-cascader__clear').exists()).toBe(true)
  })

  it('should not show clear button when no value', () => {
    wrapper = mount(LhCascader, {
      props: { clearable: true, options: cascaderOptions, modelValue: [] },
    })
    expect(wrapper.find('.lh-cascader__clear').exists()).toBe(false)
  })

  it('should emit update:modelValue when clear is clicked', async () => {
    wrapper = mount(LhCascader, {
      props: {
        clearable: true,
        options: cascaderOptions,
        modelValue: ['zhinan', 'sheji'],
      },
      global: {
        stubs: {
          'lh-icon': true,
          Teleport: {
            disabled: true,
          },
        },
      },
    })
    const clearBtn = wrapper.find('.lh-cascader__clear')
    if (clearBtn.exists()) {
      await clearBtn.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('should not open panel when disabled', async () => {
    wrapper = mount(LhCascader, {
      props: { disabled: true, options: cascaderOptions },
    })
    await wrapper.find('.lh-cascader__input-inner').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(false)
  })

  it('should render in multiple mode', () => {
    wrapper = mount(LhCascader, {
      props: { multiple: true, options: cascaderOptions },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with filterable', () => {
    wrapper = mount(LhCascader, {
      props: { filterable: true, options: cascaderOptions },
    })
    const input = wrapper.find('.lh-cascader__input-inner')
    expect(input.exists()).toBe(true)
  })
})
describe('LhCascader placeholder i18n', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')

  it('falls back to the locale placeholder when none is provided', () => {
    const wrapper = mount(LhCascader, { props: { options: cascaderOptions } })
    expect(wrapper.find('.lh-cascader__input-inner').attributes('placeholder')).toBe('请选择')
  })

  it('a custom placeholder takes priority over the locale fallback', () => {
    const wrapper = mount(LhCascader, {
      props: { options: cascaderOptions, placeholder: '请选择地区' },
    })
    expect(wrapper.find('.lh-cascader__input-inner').attributes('placeholder')).toBe('请选择地区')
  })

  it('re-renders the fallback placeholder when the locale switches', async () => {
    const wrapper = mount(LhCascader, { props: { options: cascaderOptions } })
    expect(wrapper.find('.lh-cascader__input-inner').attributes('placeholder')).toBe('请选择')

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.find('.lh-cascader__input-inner').attributes('placeholder')).toBe('Please select')

    restoreLocale()
    await nextTick()
    expect(wrapper.find('.lh-cascader__input-inner').attributes('placeholder')).toBe('请选择')
  })
})

describe('LhCascader no-match slot', () => {
  it('overrides the locale no-match text via the slot', async () => {
    const wrapper = mount(LhCascader, {
      props: { options: cascaderOptions, filterable: true },
      slots: { 'no-match': '<em>没有匹配项</em>' },
      global: {
        stubs: {
          Teleport: { template: '<div><slot/></div>' },
        },
      },
    })
    await wrapper.find('.lh-cascader__input-inner').trigger('focus')
    await wrapper.find('.lh-cascader__input-inner').setValue('不存在的关键词xyz')
    await nextTick()
    const empty = wrapper.find('.lh-cascader-panel__empty')
    expect(empty.exists()).toBe(true)
    expect(empty.text()).toBe('没有匹配项')
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhCascader, { props: { options: [], sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })
})

describe('LhCascader strict mode, search path and readonly', () => {
  const mountOptions = {
    global: {
      stubs: {
        // 面板保留在组件树内，便于断言搜索结果
        Teleport: { template: '<div><slot/></div>' },
        'lh-icon': true,
      },
    },
  }

  it('selects an unexpanded non-leaf node directly when checkStrictly is set', async () => {
    const wrapper = mount(LhCascader, {
      ...mountOptions,
      props: { options: cascaderOptions, checkStrictly: true },
    })
    await wrapper.find('.lh-cascader__input-inner').trigger('focus')
    // 第一列首个未展开的非叶节点，点击即选中而不是展开
    await wrapper.find('.lh-cascader-panel__item').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['zhinan'])
  })

  it('expands an unexpanded non-leaf node by default (no checkStrictly)', async () => {
    const wrapper = mount(LhCascader, {
      ...mountOptions,
      props: { options: cascaderOptions },
    })
    await wrapper.find('.lh-cascader__input-inner').trigger('focus')
    await wrapper.find('.lh-cascader-panel__item').trigger('click')
    // 默认行为：点击非叶节点仅展开子面板，不触发选中
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.findAll('.lh-cascader-panel__column')).toHaveLength(2)
  })

  it('renders child columns on hover and emits the full path on leaf click', async () => {
    const wrapper = mount(LhCascader, {
      ...mountOptions,
      props: { options: cascaderOptions },
    })
    await wrapper.find('.lh-cascader__input-inner').trigger('focus')
    const columns = () => wrapper.findAll('.lh-cascader-panel__column')

    // hover 第一列「指南」展开第二列
    await columns()[0].findAll('.lh-cascader-panel__item')[0].trigger('mouseenter')
    expect(columns()).toHaveLength(2)
    // hover 第二列「设计指南」展开第三列
    await columns()[1].findAll('.lh-cascader-panel__item')[0].trigger('mouseenter')
    expect(columns()).toHaveLength(3)

    // 点击第三列叶子「颜色」，emit 完整路径
    await columns()[2].findAll('.lh-cascader-panel__item')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['zhinan', 'sheji', 'yuansze'])
  })

  it('joins search result labels with the separator prop', async () => {
    const wrapper = mount(LhCascader, {
      ...mountOptions,
      props: { options: cascaderOptions, filterable: true, separator: ' > ' },
    })
    await wrapper.find('.lh-cascader__input-inner').trigger('focus')
    await wrapper.find('.lh-cascader__input-inner').setValue('颜色')
    await nextTick()
    const item = wrapper.find('.lh-cascader-panel__search-item')
    expect(item.exists()).toBe(true)
    // 模板中标签与分隔符之间有换行空白，归一化后断言
    expect(item.text().replace(/\s+/g, ' ').trim()).toBe('指南 > 设计指南 > 颜色')
  })

  it('marks the input readonly when readonly is combined with filterable', async () => {
    const wrapper = mount(LhCascader, {
      ...mountOptions,
      props: { options: cascaderOptions, filterable: true, readonly: true },
    })
    const input = wrapper.find('.lh-cascader__input-inner')
    expect(input.attributes('readonly')).toBeDefined()
    // 只读组件聚焦不弹面板
    await input.trigger('focus')
    expect(wrapper.vm.internalVisible).toBe(false)
  })

  it('displays the full path for a leaf value when emitPath is false', () => {
    const wrapper = mount(LhCascader, {
      ...mountOptions,
      props: { options: cascaderOptions, modelValue: ['yuansze'], emitPath: false },
    })
    const input = wrapper.find('.lh-cascader__input-inner').element as HTMLInputElement
    expect(input.value).toBe('指南/设计指南/颜色')
  })

  it('resolves aliased option fields via itemConfig for path display', () => {
    const aliasedOptions = [
      {
        id: 'zhinan',
        name: '指南',
        sub: [
          {
            id: 'sheji',
            name: '设计指南',
            sub: [{ id: 'yuansze', name: '颜色' }],
          },
        ],
      },
    ]
    const wrapper = mount(LhCascader, {
      ...mountOptions,
      props: {
        options: aliasedOptions as unknown as typeof cascaderOptions,
        itemConfig: { value: 'id', label: 'name', children: 'sub' },
        modelValue: ['zhinan', 'sheji', 'yuansze'],
      },
    })
    const input = wrapper.find('.lh-cascader__input-inner').element as HTMLInputElement
    expect(input.value).toBe('指南/设计指南/颜色')
  })
})

describe('LhCascader keyboard / ARIA', () => {
  const wrappers: VueWrapper[] = []
  afterEach(() => {
    wrappers.forEach((w) => w.unmount())
    wrappers.splice(0, wrappers.length)
  })
  const restoreLocale = () => lhlocale.setLocale('zh-CN')

  const mountCascader = (props: Record<string, unknown> = {}) => {
    const wrapper = mount(LhCascader, {
      attachTo: document.body,
      props: { options: cascaderOptions, ...props },
      global: {
        stubs: {
          // 面板保留在组件树内，便于断言列内容与焦点
          Teleport: { template: '<div><slot/></div>' },
        },
      },
    })
    wrappers.push(wrapper)
    return wrapper
  }

  const openWithArrowDown = async (wrapper: VueWrapper) => {
    await wrapper.find('.lh-cascader__input-inner').trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
  }

  it('renders the trigger as a combobox controlling the panel', () => {
    const wrapper = mountCascader()
    const input = wrapper.find('.lh-cascader__input-inner')
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.attributes('aria-haspopup')).toBe('dialog')
    expect(input.attributes('aria-controls')).toMatch(/^lh-cascader-panel-\d+_\d+$/)
    restoreLocale()
  })

  it('opens the panel with ArrowDown and focuses the first column', async () => {
    const wrapper = mountCascader()
    const input = wrapper.find('.lh-cascader__input-inner')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(wrapper.findAll('.lh-cascader-panel__column')).toHaveLength(1)
    // aria-controls 指向真实面板 id
    expect(wrapper.find('[role="dialog"]').attributes('id')).toBe(input.attributes('aria-controls'))
    const tabStop = wrapper.find('.lh-cascader-panel__item[tabindex="0"]').element
    expect(document.activeElement).toBe(tabStop)
    restoreLocale()
  })

  it('renders columns as listboxes with level labels', async () => {
    const wrapper = mountCascader()
    await openWithArrowDown(wrapper)
    const columns = wrapper.findAll('.lh-cascader-panel__column')
    expect(columns[0].attributes('role')).toBe('listbox')
    expect(columns[0].attributes('aria-label')).toBe('第 1 级')
    const options = wrapper.findAll('.lh-cascader-panel__item')
    expect(options.every((o) => o.attributes('role') === 'option')).toBe(true)
    // 每列恰好一个 tab stop
    expect(wrapper.findAll('.lh-cascader-panel__item[tabindex="0"]')).toHaveLength(1)
    restoreLocale()
  })

  it('moves the tab stop with ArrowUp / ArrowDown', async () => {
    const wrapper = mountCascader()
    await openWithArrowDown(wrapper)
    const items = () => wrapper.findAll('.lh-cascader-panel__item')
    expect(items()[0].attributes('tabindex')).toBe('0')
    await items()[0].trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(items()[0].attributes('tabindex')).toBe('-1')
    expect(items()[1].attributes('tabindex')).toBe('0')
    await items()[1].trigger('keydown', { key: 'ArrowUp' })
    await nextTick()
    expect(items()[0].attributes('tabindex')).toBe('0')
    restoreLocale()
  })

  it('expands a parent with ArrowRight and focuses the next column', async () => {
    const wrapper = mountCascader()
    await openWithArrowDown(wrapper)
    const firstItem = wrapper.findAll('.lh-cascader-panel__item')[0]
    await firstItem.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(wrapper.findAll('.lh-cascader-panel__column')).toHaveLength(2)
    // 展开项被标记选中
    expect(firstItem.attributes('aria-selected')).toBe('true')
    const secondTabStop = wrapper
      .findAll('.lh-cascader-panel__column')[1]
      .find('.lh-cascader-panel__item[tabindex="0"]')
    expect(document.activeElement).toBe(secondTabStop.element)
    restoreLocale()
  })

  it('returns to the previous column with ArrowLeft', async () => {
    const wrapper = mountCascader()
    await openWithArrowDown(wrapper)
    await wrapper.findAll('.lh-cascader-panel__item')[0].trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    const col2Items = () =>
      wrapper.findAll('.lh-cascader-panel__column')[1].findAll('.lh-cascader-panel__item')
    await col2Items()[0].trigger('keydown', { key: 'ArrowLeft' })
    await nextTick()
    const firstTabStop = wrapper
      .findAll('.lh-cascader-panel__column')[0]
      .find('.lh-cascader-panel__item[tabindex="0"]')
    expect(document.activeElement).toBe(firstTabStop.element)
    restoreLocale()
  })

  it('selects a leaf with Enter, closes the panel and returns focus', async () => {
    const wrapper = mountCascader()
    await openWithArrowDown(wrapper)
    // 指南 → 设计指南 → 颜色（叶）
    await wrapper.findAll('.lh-cascader-panel__item')[0].trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    await wrapper
      .findAll('.lh-cascader-panel__column')[1]
      .findAll('.lh-cascader-panel__item')[0]
      .trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(wrapper.findAll('.lh-cascader-panel__column')).toHaveLength(3)
    await wrapper
      .findAll('.lh-cascader-panel__column')[2]
      .findAll('.lh-cascader-panel__item')[0]
      .trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['zhinan', 'sheji', 'yuansze']])
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement).toBe(wrapper.find('.lh-cascader__input-inner').element)
    restoreLocale()
  })

  it('closes with Escape and does not reopen when focus returns', async () => {
    const wrapper = mountCascader()
    const input = wrapper.find('.lh-cascader__input-inner')
    await openWithArrowDown(wrapper)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    await wrapper.find('.lh-cascader-panel__item[tabindex="0"]').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement).toBe(input.element)
    // 焦点回到 input 触发 focus，但不能重开面板（suppressOpenOnFocus）
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    restoreLocale()
  })

  it('closes an open panel with Escape on the trigger', async () => {
    const wrapper = mountCascader()
    const input = wrapper.find('.lh-cascader__input-inner')
    await openWithArrowDown(wrapper)
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    restoreLocale()
  })

  it('skips disabled items in keyboard navigation', async () => {
    const wrapper = mountCascader({
      options: [
        { value: 'a', label: '甲' },
        { value: 'b', label: '乙', disabled: true },
        { value: 'c', label: '丙' },
      ],
    })
    await openWithArrowDown(wrapper)
    const items = () => wrapper.findAll('.lh-cascader-panel__item')
    expect(items()[1].attributes('tabindex')).toBe('-1')
    expect(items()[1].attributes('aria-disabled')).toBe('true')
    // 首项 ArrowDown 跳过禁用项落到「丙」
    await items()[0].trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(items()[2].attributes('tabindex')).toBe('0')
    restoreLocale()
  })
})
