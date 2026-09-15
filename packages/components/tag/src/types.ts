import type { LhTagType } from '@lh-ui/core/tag'
import type { LhComponentSize } from '@lh-ui/core/shared'

export interface LhTagProps {
  type?: LhTagType
  size?: LhTagSize
  closable?: boolean
  disabled?: boolean
  round?: boolean
  hit?: boolean
  /** 关闭时的自定义处理 */
  onClose?: (e: Event) => void
}

export type LhTagSize = LhComponentSize