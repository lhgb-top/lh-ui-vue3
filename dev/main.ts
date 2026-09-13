import { createApp } from 'vue'
import App from './app.vue'
import lhUiPlus from '../src'
import '../packages/theme/src/index.scss'

const app = createApp(App)
app.use(lhUiPlus)

app.mount('#app')
