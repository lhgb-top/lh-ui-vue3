import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhAnchor from '~/components/anchor'

const items = [
  { id: 'a', title: '甲' },
  { id: 'b', title: '乙', children: [{ id: 'b-1', title: '乙一' }] },
]

describe('LhAnchor Component', () => {
  it('renders a labelled nav with links', () => {
    const wrapper = mount(LhAnchor, { props: { items } })
    expect(wrapper.element.tagName).toBe('NAV')
    expect(wrapper.attributes('aria-label')).toBe('锚点导航')
    expect(wrapper.findAll('.lh-anchor__link').length).toBe(3)
  })

  it('marks the first anchor active initially', () => {
    const wrapper = mount(LhAnchor, { props: { items } })
    expect(wrapper.find('.lh-anchor__link--active').text()).toBe('甲')
  })

  it('applies level classes for nested anchors', () => {
    const wrapper = mount(LhAnchor, { props: { items } })
    expect(wrapper.find('.lh-anchor__link--level-1').text()).toBe('乙一')
  })

  it('applies horizontal direction', () => {
    const wrapper = mount(LhAnchor, { props: { items, direction: 'horizontal' } })
    expect(wrapper.classes()).toContain('lh-anchor--horizontal')
  })

  it('emits click with the native event and anchor id when a link is clicked', async () => {
    const wrapper = mount(LhAnchor, { props: { items } })
    await wrapper.findAll('.lh-anchor__link')[0].trigger('click')
    const emitted = wrapper.emitted('click')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toHaveLength(2)
    expect(emitted![0][0]).toBeInstanceOf(Event)
    expect(emitted![0][1]).toBe('a')
  })
})
