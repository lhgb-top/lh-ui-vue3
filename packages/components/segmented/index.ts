import type { App, Component } from 'vue'
import LhSegmented from './src/index.vue'
import type { LhSegmentedProps } from './src/types'

const name = LhSegmented.name ?? 'LhSegmented'

;(LhSegmented as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhSegmented)
}

export default LhSegmented
export { LhSegmented }
export type { LhSegmentedProps }
