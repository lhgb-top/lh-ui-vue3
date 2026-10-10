import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhTable from '~/components/table'
import type { LhTableColumn, LhTableRow } from '@lh-ui/share/core/table'

const columns: LhTableColumn[] = [
  { prop: 'name', label: '名称', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'city', label: '城市' },
]

const data: LhTableRow[] = [
  { id: 1, name: '甲', age: 30, city: '杭州' },
  { id: 2, name: '乙', age: 25, city: '苏州' },
  { id: 3, name: '丙', age: 35, city: '北京' },
]

describe('LhTable Component', () => {
  it('renders a grid with header cells and rows', () => {
    const wrapper = mount(LhTable, { props: { data, columns } })
    expect(wrapper.attributes('role')).toBe('grid')
    expect(wrapper.findAll('[role="columnheader"]').length).toBe(3)
    expect(wrapper.findAll('[role="row"]').length).toBe(4) // 表头 + 3 行
    expect(wrapper.findAll('[role="gridcell"]').length).toBe(9)
    expect(wrapper.text()).toContain('甲')
  })

  it('renders the empty slot when there is no data', () => {
    const wrapper = mount(LhTable, { props: { data: [], columns } })
    expect(wrapper.find('.lh-table__empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('sorts a sortable column through the full cycle', async () => {
    const wrapper = mount(LhTable, { props: { data, columns } })
    const trigger = wrapper.find('.lh-table__sort-trigger')
    await trigger.trigger('click')
    expect(wrapper.emitted('sortChange')?.[0]).toEqual([{ prop: 'age', order: 'asc' }])
    let rows = wrapper.findAll('.lh-table__row')
    expect(rows[0].text()).toContain('乙') // asc：25 最小在最前

    await trigger.trigger('click')
    expect(wrapper.emitted('sortChange')?.[1]).toEqual([{ prop: 'age', order: 'desc' }])
    rows = wrapper.findAll('.lh-table__row')
    expect(rows[0].text()).toContain('丙') // desc：35 最大在最前

    await trigger.trigger('click')
    expect(wrapper.emitted('sortChange')?.[2]).toEqual([{ prop: 'age', order: undefined }])
  })

  it('exposes aria-sort on sortable headers', async () => {
    const wrapper = mount(LhTable, { props: { data, columns } })
    const headers = wrapper.findAll('[role="columnheader"]')
    expect(headers[0].attributes('aria-sort')).toBeUndefined()
    expect(headers[1].attributes('aria-sort')).toBe('none')
    await wrapper.find('.lh-table__sort-trigger').trigger('click')
    expect(wrapper.findAll('[role="columnheader"]')[1].attributes('aria-sort')).toBe('ascending')
  })

  it('renders scoped slots per column', () => {
    const wrapper = mount(LhTable, {
      props: { data, columns: [{ prop: 'name', label: '名称', slot: 'name' }] },
      slots: {
        name: `<template #name="{ row }"><em class="custom">{{ row.name }}!</em></template>`,
      },
    })
    expect(wrapper.find('.custom').text()).toBe('甲!')
  })

  it('applies sticky offsets for fixed columns', () => {
    const wrapper = mount(LhTable, {
      props: {
        data,
        columns: [
          { prop: 'name', label: '名称', width: 120, fixed: 'left' },
          { prop: 'city', label: '城市' },
        ],
      },
    })
    const fixed = wrapper.find('.lh-table__cell--fixed-left')
    expect(fixed.attributes('style')).toContain('left: 0px')
  })

  it('enables the virtual window when height is set', async () => {
    const many = Array.from({ length: 200 }, (_, i) => ({
      id: i + 1,
      name: `行${i + 1}`,
      age: i,
      city: 'x',
    }))
    const wrapper = mount(LhTable, { props: { data: many, columns, height: 240, rowHeight: 48 } })
    expect(wrapper.classes()).toContain('lh-table--virtual')
    // 视口未测量（jsdom clientHeight 为 0）时窗口只保留 overscan 行，远少于 200
    expect(wrapper.findAll('.lh-table__row').length).toBeLessThan(200)
    expect(wrapper.find('.lh-table__phantom').attributes('style')).toContain('9600px')
  })

  it('emits rowClick with the row and index', async () => {
    const wrapper = mount(LhTable, { props: { data, columns } })
    await wrapper.findAll('.lh-table__row')[1].trigger('click')
    // rows[0] = 甲（index 0），rows[1] = 乙（index 1）
    expect(wrapper.emitted('rowClick')?.[0][1]).toBe(1)
  })

  it('applies stripe and border classes', () => {
    const wrapper = mount(LhTable, { props: { data, columns, stripe: true, border: true, size: 'small' } })
    expect(wrapper.classes()).toContain('lh-table--stripe')
    expect(wrapper.classes()).toContain('lh-table--border')
    expect(wrapper.classes()).toContain('lh-table--small')
  })
  it('renders a two-level header with colspan and leaf-based colcount', async () => {
    const nested = [
      { prop: 'name', label: '名称' },
      {
        prop: 'g', label: '分组', children: [
          { prop: 'age', label: '年龄', sortable: true },
          { prop: 'city', label: '城市' },
        ],
      },
    ]
    const wrapper = mount(LhTable, { props: { data, columns: nested } })
    expect(wrapper.attributes('aria-colcount')).toBe('3')
    // 两行表头 + 3 数据行 = 5 个 role=row
    expect(wrapper.findAll('[role="row"]').length).toBe(5)
    const groupHeader = wrapper.findAll('[role="columnheader"]')[1]
    expect(groupHeader.attributes('aria-colspan')).toBe('2')
    // 表体按叶子列渲染
    expect(wrapper.findAll('[role="gridcell"]').length).toBe(9)
    // 排序仍工作于叶子列
    await wrapper.find('.lh-table__sort-trigger').trigger('click')
    expect(wrapper.emitted('sortChange')?.[0]).toEqual([{ prop: 'age', order: 'asc' }])
  })

  it('filters rows through the filter panel', async () => {
    const filterCols = [
      { prop: 'name', label: '名称' },
      {
        prop: 'city', label: '城市', filters: [
          { text: '杭州', value: '杭州' },
          { text: '苏州', value: '苏州' },
        ],
      },
    ]
    const wrapper = mount(LhTable, { props: { data, columns: filterCols }, attachTo: document.body })
    await wrapper.find('.lh-table__filter-trigger').trigger('click')
    // 面板由 teleport 渲染到 body
    const panel = document.body.querySelector('.lh-table__filter-panel') as HTMLElement
    expect(panel).toBeTruthy()
    const checkbox = panel.querySelector('input[type="checkbox"]') as HTMLInputElement
    checkbox.checked = true
    checkbox.dispatchEvent(new Event('change'))
    await new Promise((r) => setTimeout(r, 0))
    // 点击确定
    const confirmBtn = panel.querySelector('.lh-table__filter-btn--primary') as HTMLButtonElement
    confirmBtn.click()
    await new Promise((r) => setTimeout(r, 0))
    expect(wrapper.emitted('filterChange')?.[0]).toEqual([{ prop: 'city', values: ['杭州'] }])
    wrapper.unmount()
  })

  it('resets the filter to empty values', async () => {
    const filterCols = [
      { prop: 'name', label: '名称' },
      { prop: 'city', label: '城市', filters: [{ text: '杭州', value: '杭州' }] },
    ]
    const wrapper = mount(LhTable, {
      props: { data, columns: filterCols, defaultFilteredValues: { city: ['杭州'] } },
      attachTo: document.body,
    })
    await wrapper.find('.lh-table__filter-trigger').trigger('click')
    const panel = document.body.querySelector('.lh-table__filter-panel') as HTMLElement
    const resetBtn = panel.querySelector('.lh-table__filter-btn:not(.lh-table__filter-btn--primary)') as HTMLButtonElement
    resetBtn.click()
    await new Promise((r) => setTimeout(r, 0))
    expect(wrapper.emitted('filterChange')?.[0]).toEqual([{ prop: 'city', values: [] }])
    wrapper.unmount()
  })

  it('resizes a column via the drag handle', async () => {
    const wrapper = mount(LhTable, {
      props: {
        data,
        columns,
        resizable: true,
      },
      attachTo: document.body,
    })
    const handle = wrapper.find('.lh-table__resize-handle')
    expect(handle.exists()).toBe(true)
    await handle.trigger('mousedown', { clientX: 100 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 160 }))
    document.dispatchEvent(new MouseEvent('mouseup'))
    await new Promise((r) => setTimeout(r, 0))
    // 初始 120 + 拖 60 = 180
    expect(wrapper.emitted('columnResize')?.[0]).toEqual([{ prop: 'name', width: 180 }])
    wrapper.unmount()
  })

  it('clamps resized width to the minimum', async () => {
    const wrapper = mount(LhTable, {
      props: {
        data,
        columns,
        resizable: true,
      },
      attachTo: document.body,
    })
    const handle = wrapper.find('.lh-table__resize-handle')
    await handle.trigger('mousedown', { clientX: 100 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: -1000 }))
    document.dispatchEvent(new MouseEvent('mouseup'))
    await new Promise((r) => setTimeout(r, 0))
    expect(wrapper.emitted('columnResize')?.[0]).toEqual([{ prop: 'name', width: 40 }])
    wrapper.unmount()
  })

  it('resizes via keyboard arrows in 10px steps', async () => {
    const wrapper = mount(LhTable, {
      props: { data, columns, resizable: true },
      attachTo: document.body,
    })
    const handle = wrapper.find('.lh-table__resize-handle')
    await handle.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('columnResize')?.[0]).toEqual([{ prop: 'name', width: 130 }])
    await handle.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('columnResize')?.[1]).toEqual([{ prop: 'name', width: 120 }])
    wrapper.unmount()
  })
})
