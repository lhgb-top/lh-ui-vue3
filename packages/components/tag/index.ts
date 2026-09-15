import type { App, Component } from 'vue'
import LhTag from './src/index.vue'
import type { LhTagProps, LhTagSize } from './src/types'

const name = LhTag.name ?? 'LhTag'

;(LhTag as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTag)
}

export default LhTag
export { LhTag }
export type { LhTagProps, LhTagSize }