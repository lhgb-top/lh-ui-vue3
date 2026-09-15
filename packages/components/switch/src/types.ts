import type { LhComponentSize } from '@lh-ui/core/shared'

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