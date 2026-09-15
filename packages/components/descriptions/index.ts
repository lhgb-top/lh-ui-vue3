import type { App, Component } from 'vue'
import LhDescriptions from './src/index.vue'
import type { LhDescriptionsProps, LhDescriptionsItem } from './src/types'

const name = LhDescriptions.name ?? 'LhDescriptions'

;(LhDescriptions as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhDescriptions)
}

export default LhDescriptions
export { LhDescriptions }
export type { LhDescriptionsProps, LhDescriptionsItem }
