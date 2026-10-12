import { createApp, h } from 'vue'
import type { Component } from 'vue'

/**
 * 命令式挂载基建（Wave D 前置）：把组件挂到独立 app 并插入目标容器，
 * 供 Message / Notification / Loading 的服务式 API 复用。
 * 返回 unmount 时同步卸载 app 并移除容器节点。
 */
export function mountLhComponent(
  component: Component,
  props: Record<string, unknown> = {},
  target: HTMLElement = document.body,
): { container: HTMLElement; unmount: () => void } {
  const container = document.createElement('div')
  const app = createApp({ render: () => h(component as never, props as never) })
  app.mount(container)
  target.appendChild(container)
  return {
    container,
    unmount: () => {
      app.unmount()
      container.remove()
    },
  }
}
