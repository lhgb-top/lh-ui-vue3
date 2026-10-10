import type { App, Component } from 'vue'
import LhTree from './src/index.vue'
import type { LhTreeProps } from './src/types'

const name = LhTree.name ?? 'LhTree'

;(LhTree as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTree)
}

export default LhTree
export { LhTree }
export type { LhTreeProps }
