import type { App, Component } from 'vue'
import LhRadio from './src/index.vue'
import LhRadioGroup from './src/group.vue'
import type {
  LhRadioGroupProps,
  LhRadioProps,
  LhRadioSize,
} from './src/types'

const radioName = LhRadio.name ?? 'LhRadio'
const groupName = LhRadioGroup.name ?? 'LhRadioGroup'

;(LhRadio as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(radioName, LhRadio)
  app.component(groupName, LhRadioGroup)
}

export default LhRadio
export { LhRadio, LhRadioGroup }
export type { LhRadioGroupProps, LhRadioProps, LhRadioSize }