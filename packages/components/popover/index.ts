import type { App, Component } from 'vue'
import LhPopover from './src/index.vue'

const name = LhPopover.name ?? 'LhPopover'
;(LhPopover as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhPopover)
}

export default LhPopover
export { LhPopover }
export type { LhPopoverProps, LhPopoverPlacement, LhPopoverTrigger } from './src/types'
