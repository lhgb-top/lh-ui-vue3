import type { App, Component } from 'vue'
import LhDrawer from './src/index.vue'

const name = LhDrawer.name ?? 'LhDrawer'
;(LhDrawer as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhDrawer)
}

export default LhDrawer
export { LhDrawer }
export type { LhDrawerProps, LhDrawerDirection } from './src/types'
