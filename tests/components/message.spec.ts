import { afterEach, describe, expect, it, vi } from 'vitest'
import { LhMessage } from '~/components/message'

// 服务式组件的渲染 flush 与 TransitionGroup 离场都是异步的，
// 固定 sleep 会和 jsdom 的 rAF 调度赛跑，统一用 vi.waitFor 轮询断言
const itemCount = () => document.querySelectorAll('.lh-message__item').length
const waitForCount = (count: number) =>
  vi.waitFor(() => expect(itemCount()).toBe(count))

describe('LhMessage Component', () => {
  afterEach(async () => {
    LhMessage.config({ max: 5 })
    LhMessage.closeAll()
    await waitForCount(0)
  })

  it('opens an info message through the callable service', async () => {
    LhMessage('已保存')
    await waitForCount(1)
    const item = document.querySelector('.lh-message__item') as HTMLElement
    expect(item.getAttribute('role')).toBe('status')
    expect(item.textContent).toContain('已保存')
  })

  it('maps warning/danger to the alert role for assertive announcement', async () => {
    LhMessage.warning('警告', { duration: 0 })
    LhMessage.danger('失败', { duration: 0 })
    await waitForCount(2)
    const roles = [...document.querySelectorAll('.lh-message__item')].map((el) =>
      el.getAttribute('role'),
    )
    expect(roles).toEqual(['alert', 'alert'])
  })

  it('renders a close button only when showClose is set and closes via it', async () => {
    LhMessage.success('可关闭', { duration: 0, showClose: true })
    await waitForCount(1)
    const item = document.querySelector('.lh-message__item') as HTMLElement
    const button = item.querySelector('.lh-message__close')
    expect(button).toBeTruthy()
    expect(button?.getAttribute('aria-label')).toBe('关闭提示')
    button?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await waitForCount(0)
  })

  it('closes manually via the returned handle (loading never auto-closes)', async () => {
    const handle = LhMessage.loading('加载中', { duration: 0 })
    await waitForCount(1)
    handle.close()
    await waitForCount(0)
  })

  it('clamps the queue to max and removes the oldest messages', async () => {
    LhMessage.config({ max: 2 })
    LhMessage('一', { duration: 0 })
    LhMessage('二', { duration: 0 })
    LhMessage('三', { duration: 0 })
    await vi.waitFor(() => {
      const contents = [...document.querySelectorAll('.lh-message__content')].map((el) =>
        el.textContent,
      )
      expect(contents).toEqual(['二', '三'])
    })
  })

  it('auto-closes after the duration (real timer)', async () => {
    // 服务签名是 LhMessage(content | options)，选项要经语义方法或单对象传入
    LhMessage.info('稍候', { duration: 200 })
    await waitForCount(1)
    await waitForCount(0)
  })
})
