import type { App, Component } from 'vue'
import LhAvatar from './src/index.vue'
import type { LhAvatarProps, LhAvatarSize, LhAvatarShape } from './src/types'

const name = LhAvatar.name ?? 'LhAvatar'

;(LhAvatar as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhAvatar)
}

export default LhAvatar
export { LhAvatar }
export type { LhAvatarProps, LhAvatarSize, LhAvatarShape }
