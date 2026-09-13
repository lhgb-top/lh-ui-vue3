import type { App, Component } from 'vue'
import LhSwitch from './src/index.vue'
import type { LhSwitchProps, LhSwitchSize } from './src/types'

const name = LhSwitch.name ?? 'LhSwitch'

;(LhSwitch as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhSwitch)
}

export default LhSwitch
export { LhSwitch }
export type { LhSwitchProps, LhSwitchSize }