import type { App, Component } from 'vue'
import LhBackTop from './src/index.vue'
import type { LhBackTopProps } from './src/types'

const name = LhBackTop.name ?? 'LhBackTop'

;(LhBackTop as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhBackTop)
}

export default LhBackTop
export { LhBackTop }
export type { LhBackTopProps }
