import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import LhTransfer from '~/components/transfer'

const data = [
  { key: 'a', label: '甲' },
  { key: 'b', label: '乙', disabled: true },
  { key: 'c', label: '丙' },
]

describe('LhTransfer Component', () => {
  it('renders two listboxes with partitions', () => {
    const wrapper = mount(LhTransfer, { props: { data, modelValue: ['a'] } })
    const panels = wrapper.findAll('[role="listbox"]')
    expect(panels.length).toBe(2)
    expect(panels[0].attributes('aria-multiselectable')).toBe('true')
    // 左 1 项 + 右 2 项
    expect(wrapper.findAll('[role="option"]').length).toBe(3)
  })

  it('moves checked items to the right and emits', async () => {
    const wrapper = mount(LhTransfer, { props: { data, modelValue: ['a'] } })
    await wrapper.findAll('[role="option"]')[0].trigger('click')
    const buttons = wrapper.findAll('.lh-transfer__button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
    expect(wrapper.emitted('change')?.[0][1]).toBe('left-to-right')
  })

  it('moves items back to the left', async () => {
    const wrapper = mount(LhTransfer, { props: { data, modelValue: ['a'] } })
    // options = [左·甲, 右·乙, 右·丙]；乙是禁用项，要点右边的「丙」
    await wrapper.findAll('[role="option"]')[2].trigger('click')
    await wrapper.findAll('.lh-transfer__button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'c']])
  })

  it('does not move disabled items', async () => {
    const wrapper = mount(LhTransfer, { props: { data, modelValue: ['a'] } })
    const disabledOption = wrapper.findAll('[role="option"]')[1] // 右侧的「乙」
    await disabledOption.trigger('click')
    expect(disabledOption.attributes('aria-disabled')).toBe('true')
  })

  it('check-all skips disabled and reflects state', async () => {
    // modelValue 是「左侧的键」：给全量 → 左面板有甲乙丙，全选应跳过禁用的乙
    const wrapper = mount(LhTransfer, { props: { data, modelValue: ['a', 'b', 'c'] } })
    const leftAll = wrapper.findAll('.lh-transfer-panel__check-all input')[0]
    await leftAll.setValue(true)
    const selected = wrapper.findAll('[role="option"]').map((o) => o.attributes('aria-selected'))
    expect(selected).toEqual(['true', 'false', 'true'])
  })

  it('filters items by search query', async () => {
    const wrapper = mount(LhTransfer, { props: { data, modelValue: ['a'] } })
    const searches = wrapper.findAll('.lh-transfer-panel__search')
    await searches[1].setValue('丙')
    const rightOptions = wrapper.findAll('[role="listbox"]')[1].findAll('[role="option"]')
    expect(rightOptions.length).toBe(1)
    expect(rightOptions[0].text()).toContain('丙')
  })
})

describe('LhTransfer keyboard navigation', () => {
  // 四项全可用：左 1 项 / 右 3 项，便于测纵向移动
  const data = [
    { key: 'a', label: '甲' },
    { key: 'b', label: '乙' },
    { key: 'c', label: '丙' },
    { key: 'd', label: '丁' },
  ]

  const wrappers: ReturnType<typeof mountTransfer>[] = []
  afterEach(() => {
    wrappers.forEach((w) => w.unmount())
    wrappers.splice(0, wrappers.length)
  })

  const mountTransfer = () => {
    const wrapper = mount(LhTransfer, {
      attachTo: document.body,
      props: { data, modelValue: ['a'] },
    })
    wrappers.push(wrapper)
    return wrapper
  }

  const tabIndexes = (wrapper: ReturnType<typeof mountTransfer>, side: 'left' | 'right') =>
    wrapper
      .findAll(`.lh-transfer-panel--${side} [role="option"]`)
      .map((o) => o.attributes('tabindex'))

  it('places a single tab stop per panel', () => {
    const wrapper = mountTransfer()
    expect(tabIndexes(wrapper, 'left')).toEqual(['0'])
    expect(tabIndexes(wrapper, 'right')).toEqual(['0', '-1', '-1'])
  })

  it('skips a disabled item when choosing the tab stop', () => {
    const wrapper = mount(LhTransfer, {
      props: {
        data: [
          { key: 'a', label: '甲' },
          { key: 'b', label: '乙', disabled: true },
          { key: 'c', label: '丙' },
        ],
        modelValue: ['a'],
      },
    })
    // 右侧锚点是禁用的「乙」，回落到首个可用项「丙」
    expect(tabIndexes(wrapper, 'right')).toEqual(['-1', '0'])
  })

  it('moves the tab stop with ArrowUp / ArrowDown', async () => {
    const wrapper = mountTransfer()
    const rightOptions = () =>
      wrapper.findAll('.lh-transfer-panel--right [role="option"]')

    await rightOptions()[0].trigger('keydown', { key: 'ArrowDown' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['-1', '0', '-1'])
    await rightOptions()[1].trigger('keydown', { key: 'ArrowDown' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['-1', '-1', '0'])
    await rightOptions()[2].trigger('keydown', { key: 'ArrowUp' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['-1', '0', '-1'])
  })

  it('clamps at the list boundaries', async () => {
    const wrapper = mountTransfer()
    const options = () => wrapper.findAll('.lh-transfer-panel--right [role="option"]')
    await options()[0].trigger('keydown', { key: 'ArrowDown' })
    await options()[1].trigger('keydown', { key: 'ArrowDown' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['-1', '-1', '0'])
    // 已在末项，ArrowDown 停在原地
    await options()[2].trigger('keydown', { key: 'ArrowDown' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['-1', '-1', '0'])
    // 已在首项，ArrowUp 停在原地
    await options()[2].trigger('keydown', { key: 'ArrowUp' })
    await options()[1].trigger('keydown', { key: 'ArrowUp' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['0', '-1', '-1'])
    await options()[0].trigger('keydown', { key: 'ArrowUp' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['0', '-1', '-1'])
  })

  it('toggles selection with Space / Enter', async () => {
    const wrapper = mountTransfer()
    const option = wrapper.find('.lh-transfer-panel--left [role="option"]')
    await option.trigger('keydown', { key: ' ' })
    expect(option.attributes('aria-selected')).toBe('true')
    await option.trigger('keydown', { key: 'Enter' })
    expect(option.attributes('aria-selected')).toBe('false')
  })

  it('jumps focus between panels with ArrowRight / ArrowLeft', async () => {
    const wrapper = mountTransfer()
    const leftOption = wrapper.find('.lh-transfer-panel--left [role="option"]')
    await leftOption.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    const rightTabStop = wrapper.find(
      '.lh-transfer-panel--right .lh-transfer-panel__item[tabindex="0"]',
    ).element
    expect(document.activeElement).toBe(rightTabStop)

    // 从右列表 ArrowLeft 回到左列表的可 Tab 项
    const rightOptions = wrapper.findAll('.lh-transfer-panel--right [role="option"]')
    await rightOptions[0].trigger('keydown', { key: 'ArrowLeft' })
    await nextTick()
    const leftTabStop = wrapper.find(
      '.lh-transfer-panel--left .lh-transfer-panel__item[tabindex="0"]',
    ).element
    expect(document.activeElement).toBe(leftTabStop)
  })

  it('resets the tab stop to the anchor with Escape', async () => {
    const wrapper = mountTransfer()
    const options = () => wrapper.findAll('.lh-transfer-panel--right [role="option"]')
    await options()[0].trigger('keydown', { key: 'ArrowDown' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['-1', '0', '-1'])
    await options()[1].trigger('keydown', { key: 'Escape' })
    expect(tabIndexes(wrapper, 'right')).toEqual(['0', '-1', '-1'])
  })

  it('does not toggle a disabled item via keyboard', async () => {
    const wrapper = mount(LhTransfer, {
      props: {
        data: [
          { key: 'a', label: '甲' },
          { key: 'b', label: '乙', disabled: true },
        ],
        modelValue: [],
      },
    })
    // modelValue 为空 → 全量在右侧：乙禁用、不可勾选
    const disabledOption = wrapper.findAll('.lh-transfer-panel--right [role="option"]')[1]
    expect(disabledOption.attributes('aria-disabled')).toBe('true')
    await disabledOption.trigger('keydown', { key: ' ' })
    expect(disabledOption.attributes('aria-selected')).toBe('false')
  })
})
