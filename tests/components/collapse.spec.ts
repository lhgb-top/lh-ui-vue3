import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import LhCollapse, { LhCollapseItem } from '~/components/collapse'

const Host = defineComponent({
  components: { LhCollapse, LhCollapseItem },
  props: { modelValue: { type: undefined, default: undefined }, accordion: Boolean },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    return () =>
      h(LhCollapse, {
        modelValue: props.modelValue,
        accordion: props.accordion,
        'onUpdate:modelValue': (v: unknown) => emit('update:modelValue', v),
        onChange: (v: unknown) => emit('change', v),
      }, () => [
        h(LhCollapseItem, { name: 'a', title: '面板甲' }, () => '内容甲'),
        h(LhCollapseItem, { name: 'b', title: '面板乙' }, () => '内容乙'),
        h(LhCollapseItem, { name: 'c', title: '禁用面板', disabled: true }, () => '内容丙'),
      ])
  },
})

const findHeaders = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('.lh-collapse__header')

describe('LhCollapse Component', () => {
  it('renders headers as buttons with aria-expanded and regions with ids', async () => {
    const wrapper = mount(Host)
    const headers = findHeaders(wrapper)
    expect(headers.length).toBe(3)
    expect(headers[0].attributes('aria-expanded')).toBe('false')
    const region = wrapper.find('.lh-collapse__wrap')
    expect(region.attributes('role')).toBe('region')
    expect(region.attributes('aria-labelledby')).toBe(headers[0].attributes('id'))
    expect(region.attributes('aria-controls')).toBeUndefined()
    expect(headers[0].attributes('aria-controls')).toBe(region.attributes('id'))
  })

  it('toggles panels and expands content', async () => {
    const wrapper = mount(Host)
    await findHeaders(wrapper)[0].trigger('click')
    expect(findHeaders(wrapper)[0].attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('.lh-collapse__item--active').exists()).toBe(true)
  })

  it('enforces the accordion constraint', async () => {
    const wrapper = mount(Host, { props: { accordion: true } })
    await findHeaders(wrapper)[0].trigger('click')
    await findHeaders(wrapper)[1].trigger('click')
    const expanded = findHeaders(wrapper).filter((h) => h.attributes('aria-expanded') === 'true')
    expect(expanded.length).toBe(1)
    expect(expanded[0].text()).toContain('面板乙')
  })

  it('blocks disabled items', async () => {
    const wrapper = mount(Host)
    await findHeaders(wrapper)[2].trigger('click')
    expect(findHeaders(wrapper)[2].attributes('aria-expanded')).toBe('false')
    expect(findHeaders(wrapper)[2].attributes('disabled')).toBeDefined()
  })
})
