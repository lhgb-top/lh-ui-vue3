import { createApp } from 'vue'
import App from './app.vue'

// ============================================
// 方式一：全量引入（注册所有组件）
// ============================================
// import lhUiPlus from '../src/index'
// const app = createApp(App)
// app.use(lhUiPlus)

// ============================================
// 方式二：按需引入（仅导入需要的组件）
// ============================================
import LhButton from '../packages/components/button'
import LhInput from '../packages/components/input'
import LhIcon from '../packages/components/icon'
import LhTooltip from '../packages/components/tooltip'
import LhDialog from '../packages/components/dialog'
import LhConfigProvider from '../packages/components/config-provider'

// 组件样式
import '../packages/components/button/style/index.scss'
import '../packages/components/input/style/index.scss'
import '../packages/components/icon/style/index.scss'
import '../packages/components/tooltip/style/index.scss'
import '../packages/components/dialog/style/index.scss'
import '../packages/theme/src/common/var.scss'
import '../packages/theme/src/common/var-dark.scss'

const app = createApp(App)

// 注册组件
app.component('LhButton', LhButton)
app.component('LhInput', LhInput)
app.component('LhIcon', LhIcon)
app.component('LhTooltip', LhTooltip)
app.component('LhDialog', LhDialog)
app.component('LhConfigProvider', LhConfigProvider)

app.mount('#app')
