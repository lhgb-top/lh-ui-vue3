import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LhTree from '~/components/tree'
import type { LhTreeNode } from '@lh-ui/share/core/tree'

const data: LhTreeNode[] = [
  { key: 'a', label: '甲', children: [{ key: 'a-1', label: '甲一' }, { key: 'a-2', label: '甲二' }] },
  { key: 'b', label: '乙', children: [{ key: 'b-1', label: '乙一' }] },
  { key: 'c', label: '丙', disabled: true },
]

describe('LhTree Component', () => {
  it('renders a tree role with top-level items only when collapsed', () => {
    const wrapper = mount(LhTree, { props: { data } })
    expect(wrapper.attributes('role')).toBe('tree')
    const nodes = wrapper.findAll('[role="treeitem"]')
    expect(nodes.length).toBe(3)
    expect(nodes[0].attributes('aria-level')).toBe('1')
    expect(nodes[0].attributes('aria-expanded')).toBe('false')
  })

  it('expands a node to reveal children', async () => {
    const wrapper = mount(LhTree, { props: { data } })
    await wrapper.findAll('.lh-tree-node__arrow')[0].trigger('click')
    expect(wrapper.emitted('update:expandedKeys')?.[0]).toEqual([['a']])
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(5)
    const child = wrapper.findAll('[role="treeitem"]')[1]
    expect(child.attributes('aria-level')).toBe('2')
  })

  it('expands a node by clicking the node label by default', async () => {
    const wrapper = mount(LhTree, { props: { data } })
    await wrapper.findAll('[role="treeitem"]')[0].trigger('click')
    expect(wrapper.emitted('update:expandedKeys')?.[0]).toEqual([['a']])
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(5)
  })

  it('does not expand on label click when expandOnClickNode false', async () => {
    const wrapper = mount(LhTree, { props: { data, expandOnClickNode: false } })
    await wrapper.findAll('[role="treeitem"]')[0].trigger('click')
    expect(wrapper.emitted('update:expandedKeys')).toBeUndefined()
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(3)
    // 点击选中仍然生效
    expect(wrapper.emitted('update:selectedKeys')?.[0]).toEqual([['a']])
  })

  it('respects defaultExpandedKeys', () => {
    const wrapper = mount(LhTree, { props: { data, defaultExpandedKeys: ['a'] } })
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(5)
  })

  it('selects a leaf and emits', async () => {
    const wrapper = mount(LhTree, { props: { data, defaultExpandedKeys: ['a'] } })
    const nodes = wrapper.findAll('[role="treeitem"]')
    await nodes[1].trigger('click')
    expect(wrapper.emitted('update:selectedKeys')?.[0]).toEqual([['a-1']])
    expect(wrapper.emitted('select')?.[0][0]).toBe('a-1')
    expect(wrapper.findAll('.lh-tree-node--selected').length).toBe(1)
  })

  it('does not select disabled nodes', async () => {
    const wrapper = mount(LhTree, { props: { data } })
    await wrapper.findAll('[role="treeitem"]')[2].trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('cascades checkbox checks with indeterminate state', async () => {
    const wrapper = mount(LhTree, { props: { data, showCheckbox: true, defaultExpandedKeys: ['a'] } })
    const boxes = wrapper.findAll('.lh-tree-node__checkbox')
    await boxes[0].trigger('click') // 勾选父级甲
    expect(wrapper.emitted('update:checkedKeys')?.[0]).toEqual([['a', 'a-1', 'a-2']])
    expect(wrapper.findAll('.lh-tree-node__checkbox--checked').length).toBe(3)
  })

  it('supports multiple selection', async () => {
    const wrapper = mount(LhTree, { props: { data, multiple: true } })
    const nodes = wrapper.findAll('[role="treeitem"]')
    await nodes[0].trigger('click')
    await nodes[1].trigger('click')
    expect(wrapper.emitted('update:selectedKeys')?.[1]).toEqual([['a', 'b']])
  })

  it('navigates with arrow keys', async () => {
    const wrapper = mount(LhTree, { props: { data }, attachTo: document.body })
    await wrapper.findAll('[role="treeitem"]')[0].trigger('keydown', { key: 'ArrowDown' })
    // 焦点键下移到第二项（tabindex 转移）
    const nodes = wrapper.findAll('[role="treeitem"]')
    expect(nodes[1].attributes('tabindex')).toBe('0')
    wrapper.unmount()
  })
  it('loads children lazily on expand', async () => {
    const loaded = [{ key: 'x-1', label: '懒加载子' }]
    const load = vi.fn((node: LhTreeNode, resolve: (c: LhTreeNode[]) => void) => {
      resolve(loaded)
    })
    const wrapper = mount(LhTree, {
      props: { data: [{ key: 'x', label: '待加载', isLeaf: false }], lazy: true, load },
      attachTo: document.body,
    })
    await wrapper.find('[role="treeitem"]').trigger('click')
    expect(load).toHaveBeenCalled()
    // loading 态出现过（同步 resolve 时立即清除，这里验证最终子节点出现）
    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('懒加载子')
    })
    expect(wrapper.emitted('nodeLoad')?.[0][0]).toMatchObject({ key: 'x' })
    expect(wrapper.emitted('nodeLoad')?.[0][1]).toEqual(loaded)
    wrapper.unmount()
  })

  it('does not expand when lazy load rejects', async () => {
    const load = vi.fn((_node: LhTreeNode, _resolve: unknown, reject: () => void) => {
      reject(new Error('network'))
    })
    const wrapper = mount(LhTree, {
      props: { data: [{ key: 'x', label: '待加载', isLeaf: false }], lazy: true, load },
      attachTo: document.body,
    })
    await wrapper.find('[role="treeitem"]').trigger('click')
    await new Promise((r) => setTimeout(r, 0))
    expect(wrapper.emitted('nodeLoad')).toBeUndefined()
    expect(wrapper.emitted('update:expandedKeys')).toBeUndefined()
    wrapper.unmount()
  })

  it('checks strictly without cascading when checkStrictly', async () => {
    const wrapper = mount(LhTree, { props: { data, showCheckbox: true, checkStrictly: true, defaultExpandedKeys: ['a'] } })
    // 勾父级：只勾 a 自己，不级联 a-1 / a-2
    await wrapper.findAll('.lh-tree-node__checkbox')[0].trigger('click')
    expect(wrapper.emitted('update:checkedKeys')?.[0]).toEqual([['a']])
    // 无半选态
    expect(wrapper.findAll('.lh-tree-node__checkbox--indeterminate').length).toBe(0)
    expect(wrapper.findAll('.lh-tree-node__checkbox--checked').length).toBe(1)
    wrapper.unmount()
  })
})
