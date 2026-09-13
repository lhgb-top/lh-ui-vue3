import type { LhComponentSize } from '@lh-ui/core'

export interface LhSliderProps {
  modelValue?: number | [number, number] | null
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  range?: boolean
  showInput?: boolean
  size?: LhComponentSize
  marks?: Record<number, string>
}

export type LhSliderSize = LhComponentSize