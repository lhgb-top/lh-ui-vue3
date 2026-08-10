import type { LhIconName } from '@lh-ui/core/icon'

/**
 * Icon 组件 Props
 */
export interface LhIconProps {
  /** 图标名称 */
  name?: LhIconName
  /** 图标尺寸 */
  size?: string | number
  /** 图标颜色 */
  color?: string
}

export type LhIconSize = string | number
