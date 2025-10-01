import { App } from 'vue'
import LhInput from './src/index.vue'

LhInput.install = (app: App): void => {
  app.component(LhInput.name as string, LhInput)
}

export default LhInput