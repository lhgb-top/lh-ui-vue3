import type { App, Component } from 'vue'
import LhDialog from './src/index.vue'

const name = LhDialog.name ?? 'LhDialog'

;(LhDialog as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhDialog)
}

export default LhDialog
export type { LhDialogProps, LhDialogEmits } from './src/types'
