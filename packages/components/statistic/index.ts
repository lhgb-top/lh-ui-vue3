import type { App, Component } from 'vue'
import LhStatistic from './src/index.vue'
import type { LhStatisticProps } from './src/types'

const name = LhStatistic.name ?? 'LhStatistic'

;(LhStatistic as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhStatistic)
}

export default LhStatistic
export { LhStatistic }
export type { LhStatisticProps }
