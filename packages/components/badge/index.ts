import type { App, Component } from 'vue'
import LhBadge from './src/index.vue'
import type { LhBadgeProps, LhBadgeSize, LhBadgeOffset } from './src/types'

const name = LhBadge.name ?? 'LhBadge'

;(LhBadge as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhBadge)
}

export default LhBadge
export { LhBadge }
export type { LhBadgeProps, LhBadgeSize, LhBadgeOffset }