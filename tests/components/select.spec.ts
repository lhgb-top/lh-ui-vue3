import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import LhSelect from '~/components/select/src/index.vue'
import { lhlocale } from '~/locale'

const options = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2, disabled: true },
  { label: 'Three', value: 3 },
]

const mountOptions = {
  global: {
    stubs: { Teleport: { template: '<div><slot/></div>' } },
  },
}

describe('LhSelect', () => {
  it('opens and selects an option', async () => {
    const wrapper = mount(LhSelect, { ...mountOptions, props: { options } })

    await wrapper.find('.lh-select__trigger').trigger('click')
    expect(wrapper.find('.lh-select__dropdown').exists()).toBe(true)
    await wrapper.findAll('.lh-select__option')[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
    expect(wrapper.emitted('change')?.[0]).toEqual([3, options[2]])
    expect(wrapper.find('.lh-select__dropdown').exists()).toBe(false)
  })

  it('selects the highlighted option with keyboard input', async () => {
    const wrapper = mount(LhSelect, { ...mountOptions, props: { options } })
    const trigger = wrapper.find('.lh-select__trigger')

    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  it('does not open when disabled and can clear a value', async () => {
    const disabled = mount(LhSelect, { ...mountOptions, props: { options, disabled: true } })
    await disabled.find('.lh-select__trigger').trigger('click')
    expect(disabled.find('.lh-select__dropdown').exists()).toBe(false)

    const wrapper = mount(LhSelect, { ...mountOptions, props: { options, modelValue: 1, clearable: true } })
    await wrapper.find('.lh-select__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([undefined])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })
})

describe('LhSelect i18n', () => {
  const restoreLocale = () => lhlocale.setLocale('zh-CN')

  it('falls back to the locale placeholder when none is provided', () => {
    const wrapper = mount(LhSelect, { ...mountOptions, props: { options } })
    expect(wrapper.find('.lh-select__value').text()).toBe('请选择')
  })

  it('a custom placeholder takes priority over the locale fallback', () => {
    const wrapper = mount(LhSelect, {
      ...mountOptions,
      props: { options, placeholder: '请选择城市' },
    })
    expect(wrapper.find('.lh-select__value').text()).toBe('请选择城市')
  })

  it('re-renders the placeholder when the locale switches', async () => {
    const wrapper = mount(LhSelect, { ...mountOptions, props: { options } })
    expect(wrapper.find('.lh-select__value').text()).toBe('请选择')

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.find('.lh-select__value').text()).toBe('Please select')

    restoreLocale()
    await nextTick()
    expect(wrapper.find('.lh-select__value').text()).toBe('请选择')
  })

  it('localizes the empty state and reacts to locale switches', async () => {
    const wrapper = mount(LhSelect, { ...mountOptions, props: { options: [] } })
    await wrapper.find('.lh-select__trigger').trigger('click')
    expect(wrapper.find('.lh-select__empty').text()).toBe('暂无数据')

    lhlocale.setLocale('en-US')
    await nextTick()
    expect(wrapper.find('.lh-select__empty').text()).toBe('No data')

    restoreLocale()
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhSelect, { props: { options, sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })
})

describe('LhSelect empty slot', () => {
  it('overrides the locale no-data text via the empty slot', async () => {
    const wrapper = mount(LhSelect, {
      ...mountOptions,
      props: { options: [] },
      slots: { empty: '<b>自定义空文案</b>' },
    })
    await wrapper.find('.lh-select__trigger').trigger('click')
    expect(wrapper.find('.lh-select__empty').text()).toBe('自定义空文案')
  })

  it('keeps the locale fallback without the slot', async () => {
    const wrapper = mount(LhSelect, { ...mountOptions, props: { options: [] } })
    await wrapper.find('.lh-select__trigger').trigger('click')
    expect(wrapper.find('.lh-select__empty').text()).toBe('暂无数据')
  })
})
