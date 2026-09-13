import type { LhComponentSize, LhDatePickerMode } from '@lh-ui/core'

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