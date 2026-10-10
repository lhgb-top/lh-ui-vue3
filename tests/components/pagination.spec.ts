import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LhPagination from '~/components/pagination'

describe('LhPagination', () => {
  it('renders the collapsed page window with ellipsis', () => {
    const wrapper = mount(LhPagination, { props: { total: 100 } })
    expect(wrapper.find('nav.lh-pagination').exists()).toBe(true)
    expect(wrapper.findAll('.lh-pagination__page')).toHaveLength(6)
    expect(wrapper.findAll('.lh-pagination__ellipsis')).toHaveLength(1)
    wrapper.unmount()
  })

  it('marks the active page with aria-current', () => {
    const wrapper = mount(LhPagination, { props: { total: 100, current: 3 } })
    const pages = wrapper.findAll('.lh-pagination__page')
    const active = pages.find((page) => page.classes().includes('lh-pagination__page--active'))
    expect(active?.text()).toBe('3')
    expect(active?.attributes('aria-current')).toBe('page')
    wrapper.unmount()
  })

  it('emits change and update:current when a page is clicked', async () => {
    const wrapper = mount(LhPagination, { props: { total: 100 } })
    const pages = wrapper.findAll('.lh-pagination__page')
    await pages[3].trigger('click')
    expect(wrapper.emitted('update:current')).toEqual([[4]])
    expect(wrapper.emitted('change')).toEqual([[4]])
    wrapper.unmount()
  })

  it('navigates with prev/next buttons and named aria-labels', async () => {
    const wrapper = mount(LhPagination, { props: { total: 100 } })
    const prev = wrapper.find('.lh-pagination__btn--prev')
    const next = wrapper.find('.lh-pagination__btn--next')
    expect(prev.attributes('aria-label')).toBe('上一页')
    expect(next.attributes('aria-label')).toBe('下一页')
    // 第 1 页时上一页禁用
    expect(prev.attributes('disabled')).toBeDefined()
    await next.trigger('click')
    expect(wrapper.emitted('change')).toEqual([[2]])
    expect(prev.attributes('disabled')).toBeUndefined()
    wrapper.unmount()
  })

  it('shows the localized total when showTotal is on', () => {
    const wrapper = mount(LhPagination, { props: { total: 100, showTotal: true } })
    expect(wrapper.find('.lh-pagination__total').text()).toBe('共 100 条')
    wrapper.unmount()
  })

  it('disables all controls when disabled is on', async () => {
    const wrapper = mount(LhPagination, { props: { total: 100, disabled: true } })
    await wrapper.find('.lh-pagination__btn--next').trigger('click')
    expect(wrapper.emitted('change')).toBeFalsy()
    expect(wrapper.find('.lh-pagination--disabled').exists()).toBe(true)
    wrapper.unmount()
  })

  it('renders compact current/total in simple mode', () => {
    const wrapper = mount(LhPagination, { props: { total: 100, simple: true } })
    expect(wrapper.find('.lh-pagination__simple-text').text()).toBe('1 / 10')
    expect(wrapper.findAll('.lh-pagination__page')).toHaveLength(0)
    wrapper.unmount()
  })

  it('jumps to a page from the jumper input', async () => {
    const wrapper = mount(LhPagination, { props: { total: 100, showJumper: true } })
    const input = wrapper.find('.lh-pagination__jumper-input')
    expect(wrapper.find('.lh-pagination__jumper-label').text()).toBe('前往')
    await input.setValue('4')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('update:current')).toEqual([[4]])
    expect(input.element.value).toBe('')
    wrapper.unmount()
  })

  it('emits size-change from the size changer', async () => {
    const wrapper = mount(LhPagination, {
      props: { total: 100, showSizeChanger: true, pageSizes: [10, 20, 50] },
    })
    expect(wrapper.find('.lh-pagination__size-select').attributes('aria-label')).toBe('每页条数')
    await wrapper.find('.lh-pagination__size-select').setValue('20')
    expect(wrapper.emitted('size-change')).toEqual([[20]])
    expect(wrapper.emitted('update:pageSize')).toEqual([[20]])
    wrapper.unmount()
  })
})
