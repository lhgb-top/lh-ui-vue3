import type { App, Component } from 'vue'
import LhDivider from './src/index.vue'
import type { LhDividerProps } from './src/types'

const name = LhDivider.name ?? 'LhDivider'

;(LhDivider as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhDivider)
}

export default LhDivider
export { LhDivider }
export type { LhDividerProps }
