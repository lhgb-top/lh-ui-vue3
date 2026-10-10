import type { LhComponentSize } from '@lh-ui/share/core/shared'
import type { SxProps } from '@lh-ui/share/core/shared'

export interface LhTimePickerProps {
  modelValue?: Date | null
  size?: LhComponentSize
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  format?: string
  readonly?: boolean
  arrowControl?: boolean
  start?: number
  end?: number
  stepHour?: number
  stepMinute?: number
  stepSecond?: number
  /** sx 快速布局属性 */
  sx?: SxProps
}