import type { App, Component } from 'vue'
import LhMenu from './src/index.vue'
import LhMenuItem from './src/item.vue'
import LhSubMenu from './src/sub-menu.vue'
import LhMenuItemGroup from './src/item-group.vue'
import type {
  LhMenuItemGroupProps,
  LhMenuItemProps,
  LhMenuProps,
  LhSubMenuProps,
} from './src/types'

const name = LhMenu.name ?? 'LhMenu'

;(LhMenu as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhMenu)
  app.component('LhMenuItem', LhMenuItem)
  app.component('LhSubMenu', LhSubMenu)
  app.component('LhMenuItemGroup', LhMenuItemGroup)
}

export default LhMenu
export { LhMenu, LhMenuItem, LhSubMenu, LhMenuItemGroup }
export type {
  LhMenuItemGroupProps,
  LhMenuItemProps,
  LhMenuProps,
  LhSubMenuProps,
}
