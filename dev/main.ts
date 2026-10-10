import { createApp } from 'vue'
import App from './app.vue'
import lhUiPlus from '@lh-ui/vue3'
import '@lh-ui/share/styles/theme/index.scss'

const app = createApp(App)
app.use(lhUiPlus)

app.mount('#app')
