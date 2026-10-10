import type { App, Component } from 'vue'
import LhCollapse from './src/index.vue'
import LhCollapseItem from './src/item.vue'
import type { LhCollapseItemProps, LhCollapseProps } from './src/types'

const name = LhCollapse.name ?? 'LhCollapse'

;(LhCollapse as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhCollapse)
  app.component('LhCollapseItem', LhCollapseItem)
}

export default LhCollapse
export { LhCollapse, LhCollapseItem }
export type { LhCollapseItemProps, LhCollapseProps }
