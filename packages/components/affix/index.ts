import type { App, Component } from 'vue'
import LhAffix from './src/index.vue'
import type { LhAffixProps } from './src/types'

const name = LhAffix.name ?? 'LhAffix'

;(LhAffix as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhAffix)
}

export default LhAffix
export { LhAffix }
export type { LhAffixProps }
