import type { App, Component } from 'vue'
import LhConfigProvider from './src/index.vue'
import { useLhConfigContext } from './src/index'
import type { LhConfigProviderProps, LhConfigContext } from './src/types'

const name = LhConfigProvider.name ?? 'LhConfigProvider'

;(LhConfigProvider as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhConfigProvider)
}

export default LhConfigProvider
export { useLhConfigContext }
export type { LhConfigProviderProps, LhConfigContext }
