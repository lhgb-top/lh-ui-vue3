import type { App, Component } from 'vue'
import LhInputNumber from './src/index.vue'
import type { LhInputNumberProps, LhInputNumberSize } from './src/types'

const name = LhInputNumber.name ?? 'LhInputNumber'

;(LhInputNumber as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhInputNumber)
}

export default LhInputNumber
export { LhInputNumber }
export type { LhInputNumberProps, LhInputNumberSize }