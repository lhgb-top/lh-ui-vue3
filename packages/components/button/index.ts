import { App } from 'vue'
import LhButton from './src/index.vue'

LhButton.install = (app: App): void => {
  app.component(LhButton.name as string, LhButton)
}

export default LhButton