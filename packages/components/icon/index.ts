import type { App, Component } from 'vue'
import LhIcon from './src/index.vue'

const name = LhIcon.name ?? 'LhIcon'

;(LhIcon as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhIcon)
}

export default LhIcon
export type { LhIconProps, LhIconSize } from './src/types'

// 导出所有独立图标组件（支持 tree-shaking）
export * from './src/components'
