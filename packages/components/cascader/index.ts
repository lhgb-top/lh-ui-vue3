import type { App, Component } from 'vue'
import LhCascader from './src/index.vue'
import type { LhCascaderProps } from './src/types'

const name = LhCascader.name ?? 'LhCascader'

;(LhCascader as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhCascader)
}

export default LhCascader
export { LhCascader }
export type { LhCascaderProps }