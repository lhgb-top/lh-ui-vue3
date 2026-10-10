import type { App, Component } from 'vue'
import LhBreadcrumb from './src/index.vue'
import LhBreadcrumbItem from './src/breadcrumb-item.vue'
import type { LhBreadcrumbProps, LhBreadcrumbItemProps } from './src/types'

const name = LhBreadcrumb.name ?? 'LhBreadcrumb'

;(LhBreadcrumb as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhBreadcrumb)
}

const itemName = LhBreadcrumbItem.name ?? 'LhBreadcrumbItem'

;(LhBreadcrumbItem as Component & { install?: (app: App) => void }).install = (
  app: App,
): void => {
  app.component(itemName, LhBreadcrumbItem)
}

export default LhBreadcrumb
export { LhBreadcrumb, LhBreadcrumbItem }
export type { LhBreadcrumbProps, LhBreadcrumbItemProps }
