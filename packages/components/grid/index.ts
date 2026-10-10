import type { App, Component } from 'vue'
import LhRow from './src/row.vue'
import LhCol from './src/col.vue'
import type { LhColProps, LhRowProps } from './src/types'

const name = LhRow.name ?? 'LhRow'

;(LhRow as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhRow)
  app.component('LhCol', LhCol)
}

export default LhRow
export { LhRow, LhCol }
export type { LhColProps, LhRowProps }
