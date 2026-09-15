import type { LhComponentSize } from '@lh-ui/core/shared'

export interface LhInputNumberProps {
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  disabled?: boolean
  size?: LhComponentSize
  controls?: boolean
  placeholder?: string
  name?: string
}

export type LhInputNumberSize = LhComponentSize