import type { App, Component } from 'vue'
import LhLayout from './src/index.vue'
import LhLayoutHeader from './src/header.vue'
import LhLayoutAside from './src/aside.vue'
import LhLayoutMain from './src/main.vue'
import LhLayoutFooter from './src/footer.vue'
import type {
  LhLayoutAsideProps,
  LhLayoutProps,
  LhLayoutSectionProps,
} from './src/types'

const name = LhLayout.name ?? 'LhLayout'

;(LhLayout as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhLayout)
  app.component('LhLayoutHeader', LhLayoutHeader)
  app.component('LhLayoutAside', LhLayoutAside)
  app.component('LhLayoutMain', LhLayoutMain)
  app.component('LhLayoutFooter', LhLayoutFooter)
}

export default LhLayout
export { LhLayout, LhLayoutHeader, LhLayoutAside, LhLayoutMain, LhLayoutFooter }
export type { LhLayoutAsideProps, LhLayoutProps, LhLayoutSectionProps }
