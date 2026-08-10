import type { App, Component } from 'vue'
import LhInput from './src/index.vue'
import type { LhInputProps, LhInputType, LhInputSize, LhInputState } from './src/types'

const name = LhInput.name ?? 'LhInput'

;(LhInput as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhInput)
}

export default LhInput
export type { LhInputProps, LhInputType, LhInputSize, LhInputState }
