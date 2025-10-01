import { App } from 'vue'
import Input from './src/index.vue'

Input.install = (app: App): void => {
  app.component(Input.name as string, Input)
}

export default Input