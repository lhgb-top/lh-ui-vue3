import type { App, Component } from 'vue'
import LhUpload from './src/index.vue'
import type { LhUploadProps } from './src/types'

const name = LhUpload.name ?? 'LhUpload'

;(LhUpload as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhUpload)
}

export default LhUpload
export { LhUpload }
export type { LhUploadProps }
