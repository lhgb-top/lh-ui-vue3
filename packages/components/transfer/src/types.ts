import type { LhSxProps } from '@lh-ui/share/core/shared'
import type { LhTransferItem } from '@lh-ui/share/core/transfer'

export interface LhTransferProps {
  /** 全量数据 */
  data: LhTransferItem[]
  /** 左侧（源）键列表（受控 v-model） */
  modelValue?: Array<string | number>
  /** 禁用 */
  disabled?: boolean
  /** sx 快速布局属性 */
  sx?: LhSxProps
}

export type { LhTransferItem, LhTransferSide } from '@lh-ui/share/core/transfer'
