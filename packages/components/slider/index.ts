import type { App, Component } from 'vue'
import LhSlider from './src/index.vue'
import type { LhSliderProps, LhSliderSize } from './src/types'

const name = LhSlider.name ?? 'LhSlider'

;(LhSlider as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhSlider)
}

export default LhSlider
export { LhSlider }
export type { LhSliderProps, LhSliderSize }