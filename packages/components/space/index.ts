import type { App, Component } from 'vue'
import LhSpace from './src/index.vue'
import type { LhSpaceProps } from './src/types'

const name = LhSpace.name ?? 'LhSpace'

;(LhSpace as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhSpace)
}

export default LhSpace
export { LhSpace }
export type { LhSpaceProps }
