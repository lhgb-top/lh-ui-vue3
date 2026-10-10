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
        return () => h('div', { 'data-size': ctx?.value.size || 'none' })
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
        return () => h('div', { 'data-locale': ctx?.value.locale || 'none' })
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
        return () => h('div', { 'data-size': ctx?.value.size || 'none' })
      },
    })

    const wrapper = mount(LhConfigProvider, {
      global: { components: { Consumer } },
      slots: { default: '<Consumer/>' },
    })
    expect(wrapper.find('[data-size]').attributes('data-size')).toBe('none')
  })

  // 回归：provider props 变化必须传导给 inject 方（旧实现只拍一次快照）
  it('propagates prop changes to injected consumers', async () => {
    const Consumer = defineComponent({
      setup() {
        const ctx = useLhConfigContext()
        return () => h('div', { 'data-size': ctx?.value.size || 'none' })
      },
    })

    const wrapper = mount(LhConfigProvider, {
      props: { size: 'small' },
      global: { components: { Consumer } },
      slots: { default: '<Consumer/>' },
    })
    expect(wrapper.find('[data-size]').attributes('data-size')).toBe('small')

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('[data-size]').attributes('data-size')).toBe('large')
  })

  // 回归：getThemeVars() 返回的键已带 --lh- 前缀，旧实现会拼成 --lh---lh-primary-color
  it('does not double-prefix already-prefixed themeVars keys', () => {
    const wrapper = mount(LhConfigProvider, {
      props: { themeVars: { '--lh-primary-color': '#2B4C7C' } },
    })
    const style = wrapper.attributes('style')
    // Vue 序列化为 "--lh-primary-color: #2B4C7C;"（冒号后带空格、保留原大小写）
    expect(style).toMatch(/--lh-primary-color:\s*#2B4C7C/i)
    expect(style).not.toContain('--lh---lh-')
  })
})
