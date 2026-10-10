import type { App, Component } from 'vue'
import LhSteps from './src/index.vue'
import LhStep from './src/step.vue'
import type { LhStepsProps, LhStepProps } from './src/types'

const name = LhSteps.name ?? 'LhSteps'

;(LhSteps as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhSteps)
}

const stepName = LhStep.name ?? 'LhStep'

;(LhStep as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(stepName, LhStep)
}

export default LhSteps
export { LhSteps, LhStep }
export type { LhStepsProps, LhStepProps }
