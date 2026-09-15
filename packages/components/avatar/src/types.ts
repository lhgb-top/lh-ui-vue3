import type { LhAvatarShape } from '@lh-ui/core/avatar'
import type { LhComponentSize } from '@lh-ui/core/shared'

export interface LhAvatarProps {
  /** 图片地址；为空时依次回退到图标、文字 */
  src?: string
  /** 图片加载失败的替代文本，同时作为 alt */
  alt?: string
  /** 图标类名（src 为空或加载失败时展示） */
  icon?: string
  /** 文字头像内容（src 与 icon 都缺省时取首字展示） */
  text?: string
  shape?: LhAvatarShape
  size?: LhAvatarSize
  /** 图片加载模式：fill / contain / cover */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

export type LhAvatarSize = LhComponentSize
