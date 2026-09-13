import type { LhSelectOption } from '@lh-ui/core/select'

export type LhSelectSize = 'small' | 'medium' | 'large'

export interface LhSelectProps {
  modelValue?: unknown
  options?: LhSelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: LhSelectSize
  name?: string
  ariaLabel?: string
}

export type { LhSelectOption }
