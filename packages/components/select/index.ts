import type { App, Component } from 'vue'
import LhSelect from './src/index.vue'
import type { LhSelectOption, LhSelectProps, LhSelectSize } from './src/types'

const name = LhSelect.name ?? 'LhSelect'

;(LhSelect as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhSelect)
}

export default LhSelect
export type { LhSelectOption, LhSelectProps, LhSelectSize }
