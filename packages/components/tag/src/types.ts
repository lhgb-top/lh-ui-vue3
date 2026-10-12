import type { LhTagType } from '@lh-ui/share/core/tag'
import type { LhComponentSize } from '@lh-ui/share/core/shared'
import type { LhSxProps } from '@lh-ui/share/core/shared'

export interface LhTagProps {
  type?: LhTagType
  size?: LhTagSize
  closable?: boolean
  disabled?: boolean
  round?: boolean
  hit?: boolean
  /** 关闭时的自定义处理 */
  onClose?: (e: Event) => void
  /** sx 快速布局属性 */
  sx?: LhSxProps
}

export type LhTagSize = LhComponentSize