import type { App, Component } from 'vue'
import LhSpinner from './src/index.vue'
import type { LhSpinnerProps } from './src/types'

const name = LhSpinner.name ?? 'LhSpinner'

;(LhSpinner as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhSpinner)
}

export default LhSpinner
export { LhSpinner }
export type { LhSpinnerProps }
