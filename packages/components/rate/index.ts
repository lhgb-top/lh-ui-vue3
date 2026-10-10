import type { App, Component } from 'vue'
import LhRate from './src/index.vue'
import type { LhRateProps } from './src/types'

const name = LhRate.name ?? 'LhRate'

;(LhRate as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhRate)
}

export default LhRate
export { LhRate }
export type { LhRateProps }
