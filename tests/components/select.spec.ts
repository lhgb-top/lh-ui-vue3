import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhSelect from '~/components/select/src/index.vue'

const options = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2, disabled: true },
  { label: 'Three', value: 3 },
]

describe('LhSelect', () => {
  it('opens and selects an option', async () => {
    const wrapper = mount(LhSelect, { props: { options } })

    await wrapper.find('.lh-select__trigger').trigger('click')
    expect(wrapper.find('.lh-select__dropdown').exists()).toBe(true)
    await wrapper.findAll('.lh-select__option')[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
    expect(wrapper.emitted('change')?.[0]).toEqual([3, options[2]])
    expect(wrapper.find('.lh-select__dropdown').exists()).toBe(false)
  })

  it('selects the highlighted option with keyboard input', async () => {
    const wrapper = mount(LhSelect, { props: { options } })
    const trigger = wrapper.find('.lh-select__trigger')

    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
  })

  it('does not open when disabled and can clear a value', async () => {
    const disabled = mount(LhSelect, { props: { options, disabled: true } })
    await disabled.find('.lh-select__trigger').trigger('click')
    expect(disabled.find('.lh-select__dropdown').exists()).toBe(false)

    const wrapper = mount(LhSelect, { props: { options, modelValue: 1, clearable: true } })
    await wrapper.find('.lh-select__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([undefined])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })
})
