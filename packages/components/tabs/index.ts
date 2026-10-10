import type { App, Component } from 'vue'
import LhTabs from './src/index.vue'
import LhTabPane from './src/tab-pane.vue'
import type { LhTabsProps, LhTabPaneProps } from './src/types'

const name = LhTabs.name ?? 'LhTabs'

;(LhTabs as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTabs)
}

const paneName = LhTabPane.name ?? 'LhTabPane'

;(LhTabPane as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(paneName, LhTabPane)
}

export default LhTabs
export { LhTabs, LhTabPane }
export type { LhTabsProps, LhTabPaneProps }
