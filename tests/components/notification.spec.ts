import { afterEach, describe, expect, it, vi } from 'vitest'
import { LhNotification } from '~/components/notification'

// 服务式组件的渲染 flush 与 TransitionGroup 离场都是异步的，
// 固定 sleep 会和 jsdom 的 rAF 调度赛跑，统一用 vi.waitFor 轮询断言
const itemCount = () => document.querySelectorAll('.lh-notification__item').length
const waitForCount = (count: number) =>
  vi.waitFor(() => expect(itemCount()).toBe(count))

describe('LhNotification Component', () => {
  afterEach(async () => {
    LhNotification.closeAll()
    await waitForCount(0)
  })

  it('opens in the top-right container by default with a live region', async () => {
    LhNotification.info({ title: '提示', content: '任务已完成', duration: 0 })
    await waitForCount(1)
    const container = document.querySelector('.lh-notification--top-right')
    expect(container).toBeTruthy()
    expect(container?.getAttribute('role')).toBe('region')
    expect(container?.getAttribute('aria-live')).toBe('polite')
    expect(container?.querySelector('.lh-notification__title')?.textContent).toBe('提示')
    expect(container?.querySelector('.lh-notification__content')?.textContent).toBe('任务已完成')
  })

  it('groups notifications by position', async () => {
    LhNotification.success({ title: '右上', duration: 0 })
    LhNotification.warning({ title: '左下', duration: 0, position: 'bottom-left' })
    await waitForCount(2)
    expect(document.querySelectorAll('.lh-notification--top-right .lh-notification__item').length).toBe(1)
    expect(document.querySelectorAll('.lh-notification--bottom-left .lh-notification__item').length).toBe(1)
  })

  it('closes via the handle and via closeAll', async () => {
    const handle = LhNotification.info({ title: '可关闭', duration: 0 })
    await waitForCount(1)
    handle.close()
    await waitForCount(0)

    LhNotification.danger({ title: '其一', duration: 0 })
    LhNotification.danger({ title: '其二', duration: 0 })
    await waitForCount(2)
    LhNotification.closeAll()
    await waitForCount(0)
  })

  it('marks clickable cards with the button role and keyboard activation', async () => {
    let clicked = 0
    LhNotification.info({
      title: '可点击',
      duration: 0,
      onClick: () => {
        clicked++
      },
    })
    await waitForCount(1)
    const card = document.querySelector('.lh-notification__item--clickable') as HTMLElement
    expect(card).toBeTruthy()
    expect(card.getAttribute('role')).toBe('button')
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    expect(clicked).toBe(1)
  })

  it('auto-closes after the duration (real timer)', async () => {
    LhNotification.info({ title: '稍候', duration: 200 })
    await waitForCount(1)
    await waitForCount(0)
  })
})
