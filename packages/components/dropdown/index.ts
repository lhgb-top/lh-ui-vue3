import type { App, Component } from 'vue'
import LhDropdown from './src/index.vue'
import LhDropdownItem from './src/item.vue'

const dropdownName = LhDropdown.name ?? 'LhDropdown'
;(LhDropdown as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(dropdownName, LhDropdown)
}

const itemName = LhDropdownItem.name ?? 'LhDropdownItem'
;(LhDropdownItem as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(itemName, LhDropdownItem)
}

export default LhDropdown
export { LhDropdown, LhDropdownItem }
export type {
  LhDropdownProps,
  LhDropdownItemProps,
  LhDropdownPlacement,
  LhDropdownTrigger,
} from './src/types'
