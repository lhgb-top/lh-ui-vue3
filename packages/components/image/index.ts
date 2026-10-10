import type { App, Component } from 'vue'
import LhImage from './src/index.vue'
import LhImageViewer from './src/viewer.vue'
import type { LhImageProps, LhImageViewerProps } from './src/types'

const name = LhImage.name ?? 'LhImage'

;(LhImage as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhImage)
}

export default LhImage
export { LhImage, LhImageViewer }
export type { LhImageProps, LhImageViewerProps }
