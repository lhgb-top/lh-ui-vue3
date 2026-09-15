import type { App, Component } from 'vue'
import LhProgress from './src/index.vue'
import type { LhProgressProps, LhProgressStatus, LhProgressType } from './src/types'

const name = LhProgress.name ?? 'LhProgress'

;(LhProgress as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhProgress)
}

export default LhProgress
export { LhProgress }
export type { LhProgressProps, LhProgressStatus, LhProgressType }
