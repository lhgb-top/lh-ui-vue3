import type { App, Component } from 'vue'
import LhEmpty from './src/index.vue'
import type { LhEmptyProps } from './src/types'

const name = LhEmpty.name ?? 'LhEmpty'

;(LhEmpty as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhEmpty)
}

export default LhEmpty
export { LhEmpty }
export type { LhEmptyProps }
