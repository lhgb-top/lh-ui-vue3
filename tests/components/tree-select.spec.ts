import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhTreeSelect from '~/components/tree-select'
import type { LhTreeNode } from '@lh-ui/share/core/tree'

const data: LhTreeNode[] = [
  { key: 'a', label: '甲', children: [{ key: 'a-1', label: '甲一' }, { key: 'a-2', label: '甲二' }] },
  { key: 'b', label: '乙' },
]

describe('LhTreeSelect Component', () => {
  it('renders a combobox trigger with placeholder', () => {
    const wrapper = mount(LhTreeSelect, { props: { data } })
    const trigger = wrapper.find('.lh-tree-select__trigger')
    expect(trigger.attributes('aria-haspopup')).toBe('tree')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(wrapper.text()).toContain('请选择')
  })

  it('opens the panel on click and shows the tree', async () => {
    const wrapper = mount(LhTreeSelect, { props: { data, teleported: false } })
    await wrapper.find('.lh-tree-select__trigger').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(2)
    wrapper.unmount()
  })

  it('shows the selected label in the trigger', () => {
    const wrapper = mount(LhTreeSelect, { props: { data, modelValue: 'a-1' } })
    expect(wrapper.find('.lh-tree-select__value').text()).toBe('甲一')
  })

  it('selects a leaf and closes the panel in single mode', async () => {
    const wrapper = mount(LhTreeSelect, { props: { data, teleported: false }, attachTo: document.body })
    await wrapper.find('.lh-tree-select__trigger').trigger('click')
    await wrapper.findAll('[role="treeitem"]')[1].trigger('click') // 乙
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('emits arrays in multiple mode', async () => {
    const wrapper = mount(LhTreeSelect, {
      props: { data, multiple: true, modelValue: [], teleported: false },
      attachTo: document.body,
    })
    await wrapper.find('.lh-tree-select__trigger').trigger('click')
    const boxes = wrapper.findAll('.lh-tree-node__checkbox')
    await boxes[0].trigger('click')
    expect(Array.isArray(wrapper.emitted('update:modelValue')?.[0][0])).toBe(true)
    wrapper.unmount()
  })
})
