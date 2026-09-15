import { createApp } from 'vue'
import App from './app.vue'
import lhUiPlus from 'lh-ui'
import '~/theme/src/index.scss'

const app = createApp(App)
app.use(lhUiPlus)

app.mount('#app')
