import type { App, Component } from 'vue'
import LhTable from './src/index.vue'
import type { LhTableProps } from './src/types'

const name = LhTable.name ?? 'LhTable'

;(LhTable as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTable)
}

export default LhTable
export { LhTable }
export type { LhTableProps }
