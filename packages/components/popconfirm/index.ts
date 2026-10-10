import type { App, Component } from 'vue'
import LhPopconfirm from './src/index.vue'

const name = LhPopconfirm.name ?? 'LhPopconfirm'
;(LhPopconfirm as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhPopconfirm)
}

export default LhPopconfirm
export { LhPopconfirm }
export type {
  LhPopconfirmProps,
  LhPopconfirmPlacement,
  LhPopconfirmType,
  LhPopconfirmTrigger,
} from './src/types'
