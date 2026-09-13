import type { LhComponentSize } from '@lh-ui/core'

export interface LhSwitchProps {
  modelValue?: boolean
  disabled?: boolean
  loading?: boolean
  name?: string
  size?: LhComponentSize
  activeText?: string
  inactiveText?: string
}

export type LhSwitchSize = LhComponentSize