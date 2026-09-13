import type { App, Component } from 'vue'
import LhCheckbox from './src/index.vue'
import LhCheckboxGroup from './src/group.vue'
import type {
  LhCheckboxGroupProps,
  LhCheckboxProps,
  LhCheckboxSize,
} from './src/types'

const checkboxName = LhCheckbox.name ?? 'LhCheckbox'
const groupName = LhCheckboxGroup.name ?? 'LhCheckboxGroup'

;(LhCheckbox as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(checkboxName, LhCheckbox)
  app.component(groupName, LhCheckboxGroup)
}

export default LhCheckbox
export { LhCheckbox, LhCheckboxGroup }
export type { LhCheckboxGroupProps, LhCheckboxProps, LhCheckboxSize }
