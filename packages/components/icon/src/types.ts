import type { LhSizes } from 'types/components'

/**
 * Icon 组件 Props
 */
export interface LhIconProps {
  /** 图标名称 */
  name?: string
  /** 图标尺寸 */
  size?: LhSizes | number | string
  /** 图标颜色 */
  color?: string
}

export type LhIconSize = LhSizes | number | string
