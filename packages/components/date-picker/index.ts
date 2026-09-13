import type { App, Component } from 'vue'
import LhDatePicker from './src/index.vue'
import type { LhDatePickerProps } from './src/types'

const name = LhDatePicker.name ?? 'LhDatePicker'

;(LhDatePicker as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhDatePicker)
}

export default LhDatePicker
export { LhDatePicker }
export type { LhDatePickerProps }