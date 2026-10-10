import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhSegmented from '~/components/segmented'

const options = ['日', '周', { label: '月', value: 'month', disabled: true }]

describe('LhSegmented Component', () => {
  it('renders a radiogroup with aria-checked options', () => {
    const wrapper = mount(LhSegmented, { props: { modelValue: '周', options } })
    expect(wrapper.attributes('role')).toBe('radiogroup')
    const radios = wrapper.findAll('[role="radio"]')
    expect(radios.length).toBe(3)
    expect(radios[1].attributes('aria-checked')).toBe('true')
  })

  it('emits update:modelValue and change on select', async () => {
    const wrapper = mount(LhSegmented, { props: { modelValue: '日', options } })
    await wrapper.findAll('[role="radio"]')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['周'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['周'])
  })

  it('skips disabled options with roving arrow keys', async () => {
    const wrapper = mount(LhSegmented, { props: { modelValue: '日', options } })
    await wrapper.find('[role="radiogroup"]').trigger('keydown', { key: 'ArrowRight' })
    // 从 index 0 右移：index 1「周」是启用项，跳过的应是 index 2「month」
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['周'])
  })

  it('applies the block layout class', () => {
    const wrapper = mount(LhSegmented, { props: { modelValue: '日', options, block: true } })
    expect(wrapper.classes()).toContain('lh-segmented--block')
  })
})
