import type { SxProps } from '@lh-ui/share/core/shared'
import type { LhTreeNode } from '@lh-ui/share/core/tree'

export interface LhTreeSelectProps {
  /** 树数据 */
  data: LhTreeNode[]
  /** 当前值（单选 string / 多选 string[]，受控 v-model） */
  modelValue?: string | string[]
  /** 多选（显示勾选框，值为勾选键数组） */
  multiple?: boolean
  /** 禁用 */
  disabled?: boolean
  /** 占位文本 */
  placeholder?: string
  /** 面板是否挂到 body（默认 true） */
  teleported?: boolean
  /** sx 快速布局属性 */
  sx?: SxProps
}

export type { LhTreeNode } from '@lh-ui/share/core/tree'
