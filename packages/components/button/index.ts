import type { App, Component } from 'vue'
import LhButton from './src/index.vue'
import type { LhButtonProps, LhButtonType, LhButtonSize } from './src/types'

const name = LhButton.name ?? 'LhButton'

;(LhButton as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhButton)
}

export default LhButton
export type { LhButtonProps, LhButtonType, LhButtonSize }
