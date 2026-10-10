import type { LhComponentSize } from '@lh-ui/share/core/shared'
import type { SxProps } from '@lh-ui/share/core/shared'

export interface LhSwitchProps {
  modelValue?: boolean
  disabled?: boolean
  loading?: boolean
  name?: string
  size?: LhComponentSize
  activeText?: string
  inactiveText?: string
  /** sx 快速布局属性 */
  sx?: SxProps
}

export type LhSwitchSize = LhComponentSize