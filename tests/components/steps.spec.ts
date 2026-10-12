import { describe, it, expect } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import LhSteps, { LhStep } from '~/components/steps'

function mountSteps(extraProps = {}) {
  return mount(LhSteps, {
    props: { ...extraProps },
    slots: {
      default: () => [
        h(LhStep, { title: '第一步', description: '准备' }),
        h(LhStep, { title: '第二步' }),
        h(LhStep, { title: '第三步' }),
      ],
    },
  })
}

describe('LhSteps', () => {
  it('renders an ordered list of steps', () => {
    const wrapper = mountSteps()
    expect(wrapper.find('ol.lh-steps').exists()).toBe(true)
    expect(wrapper.findAll('.lh-steps__item')).toHaveLength(3)
    wrapper.unmount()
  })

  it('derives wait/process/finish statuses and marks the current step', () => {
    const wrapper = mountSteps({ current: 1 })
    const items = wrapper.findAll('.lh-steps__item')
    expect(items[0].classes()).toContain('lh-steps__item--finish')
    expect(items[1].classes()).toContain('lh-steps__item--process')
    expect(items[1].attributes('aria-current')).toBe('step')
    expect(items[2].classes()).toContain('lh-steps__item--wait')
    expect(items[2].attributes('aria-current')).toBeUndefined()
    wrapper.unmount()
  })

  it('renders titles and optional descriptions', () => {
    const wrapper = mountSteps({ current: 0 })
    const titles = wrapper.findAll('.lh-steps__title')
    expect(titles.map((title) => title.text())).toEqual(['第一步', '第二步', '第三步'])
    expect(wrapper.findAll('.lh-steps__description')).toHaveLength(1)
    wrapper.unmount()
  })

  it('renders heads as buttons only for clickable non-wait steps', async () => {
    const wrapper = mountSteps({ current: 1, clickable: true })
    const items = wrapper.findAll('.lh-steps__item')
    expect(items[0].find('button.lh-steps__head').exists()).toBe(true)
    expect(items[1].find('button.lh-steps__head').exists()).toBe(true)
    // 等待中的步骤不可点击
    expect(items[2].find('button.lh-steps__head').exists()).toBe(false)

    const finishBtn = items[0].find('button.lh-steps__head')
    expect(finishBtn.attributes('aria-label')).toBe('已完成')
    const processBtn = items[1].find('button.lh-steps__head')
    expect(processBtn.attributes('aria-label')).toBe('第 2 步')

    await finishBtn.trigger('click')
    expect(wrapper.emitted('update:current')).toEqual([[0]])
    expect(wrapper.emitted('change')).toEqual([[0]])
    wrapper.unmount()
  })

  it('does not emit when clicking the current step', async () => {
    const wrapper = mountSteps({ current: 0, clickable: true })
    await wrapper.findAll('.lh-steps__item')[0].find('button.lh-steps__head').trigger('click')
    expect(wrapper.emitted('change')).toBeFalsy()
    wrapper.unmount()
  })

  it('keeps static heads when clickable is off', () => {
    const wrapper = mountSteps({ current: 1 })
    expect(wrapper.findAll('button.lh-steps__head')).toHaveLength(0)
    wrapper.unmount()
  })

  it('supports the forced status override', () => {
    const wrapper = mountSteps({ current: 0, status: 'error' })
    const items = wrapper.findAll('.lh-steps__item')
    expect(items.every((item) => item.classes().includes('lh-steps__item--error'))).toBe(true)
    wrapper.unmount()
  })

  it('applies the vertical direction class', () => {
    const wrapper = mountSteps({ direction: 'vertical' })
    expect(wrapper.find('.lh-steps--vertical').exists()).toBe(true)
    wrapper.unmount()
  })

  it('marks the last step of each wrapped horizontal line', async () => {
    const wrapper = mountSteps()
    const items = wrapper.findAll('.lh-steps__item')

    // jsdom 没有真实布局，手动模拟折行：前两步在第一行，第三步折到第二行
    ;[0, 0, 40].forEach((top, index) => {
      Object.defineProperty(items[index].element, 'offsetTop', { value: top, configurable: true })
    })
    // 折行位置由 watch 监听方向变化重算（回调在 nextTick 后执行，多等一拍）
    await wrapper.setProps({ direction: 'vertical' })
    await wrapper.setProps({ direction: 'horizontal' })
    await nextTick()
    await nextTick()

    expect(items[0].classes()).not.toContain('lh-steps__item--line-last')
    expect(items[1].classes()).toContain('lh-steps__item--line-last')
    expect(items[2].classes()).toContain('lh-steps__item--line-last')
    wrapper.unmount()
  })

  it('emits no last-item class (the connector uses the structural :last-child)', () => {
    const wrapper = mountSteps()
    const items = wrapper.findAll('.lh-steps__item')
    // 末项语义改由样式 :last-child 承担：JS 类在子项分批注册时会首屏全命中，已移除
    expect(items.every((item) => !item.classes().includes('lh-steps__item--last'))).toBe(true)
    wrapper.unmount()
  })

  it('never marks line-last steps in the vertical direction', () => {
    const wrapper = mountSteps({ direction: 'vertical' })
    const items = wrapper.findAll('.lh-steps__item')
    expect(items.every((item) => !item.classes().includes('lh-steps__item--line-last'))).toBe(true)
    wrapper.unmount()
  })

  it('applies component theme vars to the root element', () => {
    const wrapper = mountSteps({ themeVars: { 'steps-item-basis': '220px' } })
    expect(wrapper.find('ol.lh-steps').attributes('style')).toContain('--lh-steps-item-basis: 220px')
    wrapper.unmount()
  })

  it('renders a custom icon from the icon prop', () => {
    const wrapper = mount(LhSteps, {
      props: { current: 1 },
      slots: {
        default: () => h(LhStep, { icon: 'user', title: '注册' }),
      },
    })
    expect(wrapper.find('.lh-steps__icon svg').exists()).toBe(true)
    // 传了 icon 时不再回退到序号字符
    expect(wrapper.find('.lh-steps__icon').text()).toBe('')
    wrapper.unmount()
  })

  it('lets the icon slot override the icon prop fallback', () => {
    const wrapper = mount(LhSteps, {
      props: { current: 0 },
      slots: {
        default: () =>
          h(LhStep, { title: '注册' }, { icon: () => h('em', { class: 'custom-icon' }) }),
      },
    })
    expect(wrapper.find('.lh-steps__icon em.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.lh-steps__icon svg').exists()).toBe(false)
    wrapper.unmount()
  })
})
