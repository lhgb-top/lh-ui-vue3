import type { App, Component } from 'vue'
import LhVirtualList from './src/index.vue'
import type { LhVirtualListProps } from './src/types'

const name = LhVirtualList.name ?? 'LhVirtualList'

;(LhVirtualList as Component<LhVirtualListProps> & { install?: (app: App) => void }).install = (
  app: App,
): void => {
  app.component(name, LhVirtualList)
}

export default LhVirtualList
export { LhVirtualList }
export type { LhVirtualListProps }
