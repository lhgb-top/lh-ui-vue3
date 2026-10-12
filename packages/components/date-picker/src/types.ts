import type { LhDatePickerMode } from '@lh-ui/share/core/date-picker'
import type { LhComponentSize } from '@lh-ui/share/core/shared'
import type { LhSxProps } from '@lh-ui/share/core/shared'

export interface LhDatePickerProps {
  modelValue?: Date | [Date, Date] | null
  mode?: LhDatePickerMode
  size?: LhComponentSize
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  format?: string
  readonly?: boolean
  rangeSeparator?: string
  cellClassName?: (date: Date) => string
  popperClass?: string
  /** sx 快速布局属性 */
  sx?: LhSxProps
}