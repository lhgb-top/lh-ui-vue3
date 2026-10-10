import type { App, Component } from 'vue'
import LhPagination from './src/index.vue'
import type { LhPaginationProps } from './src/types'

const name = LhPagination.name ?? 'LhPagination'

;(LhPagination as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhPagination)
}

export default LhPagination
export { LhPagination }
export type { LhPaginationProps }
