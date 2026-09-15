import type { LhDatePickerMode } from '@lh-ui/core/date-picker'
import type { LhComponentSize } from '@lh-ui/core/shared'

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
}