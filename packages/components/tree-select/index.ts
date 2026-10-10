import type { App, Component } from 'vue'
import LhTreeSelect from './src/index.vue'
import type { LhTreeSelectProps } from './src/types'

const name = LhTreeSelect.name ?? 'LhTreeSelect'

;(LhTreeSelect as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTreeSelect)
}

export default LhTreeSelect
export { LhTreeSelect }
export type { LhTreeSelectProps }
