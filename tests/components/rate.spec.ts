import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhRate from '~/components/rate'

describe('LhRate Component', () => {
  it('renders max stars as a radiogroup', () => {
    const wrapper = mount(LhRate, { props: { modelValue: 3 } })
    expect(wrapper.attributes('role')).toBe('radiogroup')
    expect(wrapper.findAll('.lh-rate__star').length).toBe(5)
    expect(wrapper.findAll('.lh-rate__star--full').length).toBe(3)
  })

  it('emits update:modelValue and change on click', async () => {
    const wrapper = mount(LhRate, { props: { modelValue: 0 } })
    await wrapper.findAll('.lh-rate__star')[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
    expect(wrapper.emitted('change')?.[0]).toEqual([4])
  })

  it('steps by half stars via keyboard when allowHalf', async () => {
    // 未接 v-model 时组件值始终派生自 props.modelValue（3）：
    // 第一次 ↑ 3.5，第二次仍从 3 起算 → 2.5
    const wrapper = mount(LhRate, { props: { modelValue: 3, allowHalf: true } })
    await wrapper.find('[role="radiogroup"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3.5])
    await wrapper.find('[role="radiogroup"]').trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([2.5])
  })

  it('renders read-only output with aria text', () => {
    const wrapper = mount(LhRate, { props: { modelValue: 4.5, readonly: true, allowHalf: true } })
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('4.5 星')
    expect(wrapper.findAll('.lh-rate__star--half').length).toBe(1)
  })

  it('disables interaction', async () => {
    const wrapper = mount(LhRate, { props: { modelValue: 2, disabled: true } })
    await wrapper.findAll('.lh-rate__star')[3].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findAll('.lh-rate__star')[3].attributes('disabled')).toBeDefined()
  })
})
