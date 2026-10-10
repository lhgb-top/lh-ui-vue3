import type { App, Component } from 'vue'
import LhTransfer from './src/index.vue'
import type { LhTransferProps } from './src/types'

const name = LhTransfer.name ?? 'LhTransfer'

;(LhTransfer as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTransfer)
}

export default LhTransfer
export { LhTransfer }
export type { LhTransferProps }
