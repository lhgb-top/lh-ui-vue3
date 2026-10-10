import type { App, Component } from 'vue'
import LhCard from './src/index.vue'
import type { LhCardProps } from './src/types'

const name = LhCard.name ?? 'LhCard'

;(LhCard as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhCard)
}

export default LhCard
export { LhCard }
export type { LhCardProps }
