import type { App, Component } from 'vue'
import LhCalendar from './src/index.vue'
import type { LhCalendarProps } from './src/types'

const name = LhCalendar.name ?? 'LhCalendar'

;(LhCalendar as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhCalendar)
}

export default LhCalendar
export { LhCalendar }
export type { LhCalendarProps }
