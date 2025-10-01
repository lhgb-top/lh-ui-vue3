import { App } from 'vue'
import LhConfigProvider from './src/index.vue'

LhConfigProvider.install = (app: App): void => {
  app.component(LhConfigProvider.name as string, LhConfigProvider)
}
export default LhConfigProvider