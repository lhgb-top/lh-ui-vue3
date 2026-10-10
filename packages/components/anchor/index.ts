import type { App, Component } from 'vue'
import LhAnchor from './src/index.vue'
import type { LhAnchorProps } from './src/types'

const name = LhAnchor.name ?? 'LhAnchor'

;(LhAnchor as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhAnchor)
}

export default LhAnchor
export { LhAnchor }
export type { LhAnchorProps }
