import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import LhConfigProvider from '~/components/config-provider/src/index.vue'
import { useLhConfigContext } from '~/components/config-provider/src/index'

describe('LhConfigProvider', () => {
  it('renders default slot', () => {
    const wrapper = mount(LhConfigProvider, {
      slots: { default: '<div>Child content</div>' },
    })
    expect(wrapper.text()).toContain('Child content')
  })

  it('applies lh-config-provider class', () => {
    const wrapper = mount(LhConfigProvider)
    expect(wrapper.classes()).toContain('lh-config-provider')
  })

  it('provides size to children through context', () => {
    const Consumer = defineComponent({
      setup() {
        const ctx = useLhConfigContext()
        return () => h('div', { 'data-size': ctx?.size || 'none' })
      },
    })

    const wrapper = mount(LhConfigProvider, {
      props: { size: 'small' },
      global: { components: { Consumer } },
      slots: { default: '<Consumer/>' },
    })
    expect(wrapper.find('[data-size]').attributes('data-size')).toBe('small')
  })

  it('provides locale to children', () => {
    const Consumer = defineComponent({
      setup() {
        const ctx = useLhConfigContext()
        return () => h('div', { 'data-locale': ctx?.locale || 'none' })
      },
    })

    const wrapper = mount(LhConfigProvider, {
      props: { locale: 'en-US' },
      global: { components: { Consumer } },
      slots: { default: '<Consumer/>' },
    })
    expect(wrapper.find('[data-locale]').attributes('data-locale')).toBe('en-US')
  })

  it('applies themeVars as CSS custom properties', () => {
    const wrapper = mount(LhConfigProvider, {
      props: { themeVars: { 'primary-color': '#ff0000' } },
    })
    expect(wrapper.attributes('style')).toContain('--lh-primary-color')
    expect(wrapper.attributes('style')).toContain('#ff0000')
  })

  it('returns empty cssVars when no themeVars', () => {
    const wrapper = mount(LhConfigProvider)
    expect(wrapper.attributes('style')).toBeFalsy()
  })

  it('returns null context when no provider', () => {
    const Consumer = defineComponent({
      setup() {
        const ctx = useLhConfigContext()
        return () => h('div', { 'data-has-provider': String(ctx !== null) })
      },
    })

    const wrapper = shallowMount(Consumer)
    expect(wrapper.attributes('data-has-provider')).toBe('false')
  })

  it('does not provide when props are empty', () => {
    const Consumer = defineComponent({
      setup() {
        const ctx = useLhConfigContext()
        return () => h('div', { 'data-size': ctx?.size || 'none' })
      },
    })

    const wrapper = mount(LhConfigProvider, {
      global: { components: { Consumer } },
      slots: { default: '<Consumer/>' },
    })
    expect(wrapper.find('[data-size]').attributes('data-size')).toBe('none')
  })
})