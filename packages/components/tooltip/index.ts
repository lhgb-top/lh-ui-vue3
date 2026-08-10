import type { App, Component } from 'vue'
import LhTooltip from './src/index.vue'

const name = LhTooltip.name ?? 'LhTooltip'

;(LhTooltip as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTooltip)
}

export default LhTooltip
export type { LhTooltipProps, LhTooltipPlacement, LhTooltipTrigger, LhTooltipEffect } from './src/types'
