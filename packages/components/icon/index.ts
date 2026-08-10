import type { App, Component } from 'vue'
import LhIcon from './src/index.vue'

const name = LhIcon.name ?? 'LhIcon'

;(LhIcon as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhIcon)
}

export default LhIcon
export type { LhIconProps, LhIconSize } from './src/types'
