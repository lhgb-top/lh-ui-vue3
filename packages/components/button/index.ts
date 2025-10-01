import { App } from 'vue'
import LhButton from './src/index.vue'
const name = LhButton.name?? 'LhButton'
LhButton.install = (app: App): void => {
  app.component(name, LhButton)
}

export default LhButton