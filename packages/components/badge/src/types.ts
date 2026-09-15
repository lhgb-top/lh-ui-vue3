import type { LhBadgeType } from '@lh-ui/core/badge'
import type { LhComponentSize } from '@lh-ui/core/shared'

export interface LhBadgeProps {
  type?: LhBadgeType
  value?: string | number
  size?: LhBadgeSize
  max?: number
  isDot?: boolean
  hidden?: boolean
  offset?: [number, number]
  showZero?: boolean
  content?: string
}

export type LhBadgeSize = LhComponentSize
export type LhBadgeOffset = [number, number]