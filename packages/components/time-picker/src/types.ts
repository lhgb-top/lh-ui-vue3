import type { LhComponentSize } from '@lh-ui/core/shared'

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
}