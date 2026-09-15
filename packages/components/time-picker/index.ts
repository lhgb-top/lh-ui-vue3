import type { App, Component } from 'vue'
import LhTimePicker from './src/index.vue'
import type { LhTimePickerProps } from './src/types'

const name = LhTimePicker.name ?? 'LhTimePicker'

;(LhTimePicker as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTimePicker)
}

export default LhTimePicker
export { LhTimePicker }
export type { LhTimePickerProps }