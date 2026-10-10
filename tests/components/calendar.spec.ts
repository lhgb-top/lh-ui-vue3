import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhCalendar from '~/components/calendar'

describe('LhCalendar Component', () => {
  it('renders a grid with 7 column headers and 6 rows', () => {
    const wrapper = mount(LhCalendar)
    expect(wrapper.find('[role="grid"]').exists()).toBe(true)
    expect(wrapper.findAll('[role="columnheader"]').length).toBe(7)
    // 周行数随月首星期与天数在 5~6 之间浮动，只断言表头行 + 至少 5 周行
    expect(wrapper.findAll('[role="row"]').length).toBeGreaterThanOrEqual(6)
  })

  it('marks today with aria-current="date"', () => {
    const wrapper = mount(LhCalendar)
    expect(wrapper.find('[aria-current="date"]').exists()).toBe(true)
  })

  it('selects a date and emits events', async () => {
    const wrapper = mount(LhCalendar)
    const enabled = wrapper
      .findAll('.lh-calendar__cell')
      .find((c) => !c.attributes('disabled') && !c.classes().includes('lh-calendar__cell--outside'))
    await enabled?.trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('disables dates outside the optional range', () => {
    const wrapper = mount(LhCalendar, {
      props: { range: [new Date(2026, 0, 10), new Date(2026, 0, 20)] as [Date, Date] },
    })
    const disabled = wrapper.findAll('.lh-calendar__cell[disabled]')
    expect(disabled.length).toBeGreaterThan(0)
  })

  it('moves selection with arrow keys', async () => {
    const wrapper = mount(LhCalendar, { props: { modelValue: new Date(2026, 0, 15) } })
    await wrapper.find('[role="grid"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0][0].getDate()).toBe(16)
  })
})

describe('LhCalendar selection modes', () => {
  const getCell = (wrapper: ReturnType<typeof mount>, day: number) =>
    wrapper
      .findAll('.lh-calendar__cell')
      .find((c) => !c.classes().includes('lh-calendar__cell--outside') && c.text() === String(day))

  it('range: two clicks set a span and emit [start, end]', async () => {
    // 非受控挂载：受控静态值下 DOM 不会随第二次点击更新
    const wrapper = mount(LhCalendar, { props: { selection: 'range' } })
    await getCell(wrapper, 5)?.trigger('click')
    await getCell(wrapper, 20)?.trigger('click')
    const value = wrapper.emitted('update:modelValue')?.[1][0] as [Date, Date]
    expect(value[0].getDate()).toBe(5)
    expect(value[1].getDate()).toBe(20)
    expect(wrapper.findAll('.lh-calendar__cell--in-range').length).toBeGreaterThan(0)
  })

  it('multiple: clicks toggle dates and emit sorted arrays', async () => {
    const wrapper = mount(LhCalendar, { props: { modelValue: [], selection: 'multiple' } })
    await getCell(wrapper, 3)?.trigger('click')
    await getCell(wrapper, 15)?.trigger('click')
    await getCell(wrapper, 3)?.trigger('click')
    const last = wrapper.emitted('update:modelValue')?.at(-1)[0] as Date[]
    expect(last.length).toBe(1)
    expect(last[0].getDate()).toBe(15)
  })
})

describe('LhCalendar controlled array values', () => {
  it('does not crash with an empty array modelValue in multiple mode', async () => {
    const wrapper = mount(LhCalendar, { props: { modelValue: [], selection: 'multiple' } })
    expect(wrapper.findAll('.lh-calendar__cell').length).toBeGreaterThan(0)
    await wrapper
      .findAll('.lh-calendar__cell')
      .find((c) => !c.classes().includes('lh-calendar__cell--outside'))
      ?.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    wrapper.unmount()
  })
})
