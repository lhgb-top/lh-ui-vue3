import type { LhCascaderNode, LhCascaderItemConfig } from '@lh-ui/share/core/cascader'
import type { LhComponentSize } from '@lh-ui/share/core/shared'
import type { LhSxProps } from '@lh-ui/share/core/shared'

export interface LhCascaderProps {
  modelValue?: (string | number)[]
  options?: LhCascaderNode[]
  size?: LhComponentSize
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  readonly?: boolean
  showAllLevels?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  multiple?: boolean
  cascading?: boolean
  separator?: string
  collapseTags?: boolean
  filterable?: boolean
  itemConfig?: LhCascaderItemConfig
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
