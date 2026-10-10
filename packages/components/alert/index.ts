import type { App, Component } from 'vue'
import LhAlert from './src/index.vue'
import type { LhAlertProps } from './src/types'

const name = LhAlert.name ?? 'LhAlert'

;(LhAlert as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhAlert)
}

export default LhAlert
export { LhAlert }
export type { LhAlertProps }
