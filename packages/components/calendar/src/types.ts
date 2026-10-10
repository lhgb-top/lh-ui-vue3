import type { SxProps } from '@lh-ui/share/core/shared'
import type { LhCalendarRange, LhCalendarSelection } from '@lh-ui/share/core/calendar'

/** 展示形态：panel 常驻面板（默认）/ input 点击输入框展开的折叠面板 */
export type LhCalendarMode = 'panel' | 'input'

/** 受控值的形态随 selection 变化：单选 Date / 一段时间 Date[]（长度 2 的起止）/ 多选 Date[]。
 *  不用 [Date, Date] 元组：SFC 编译器无法从元组推断运行时类型，会导致 prop 校验告警 */
export type LhCalendarValue = Date | Date[]

export interface LhCalendarProps {
  /** 当前选中（受控 v-model；未传时组件内部维护选中态） */
  modelValue?: LhCalendarValue
  /** 选择模式：单选（默认）/ 一段时间（起止日期）/ 多选 */
  selection?: LhCalendarSelection
  /** 可选日期范围约束 */
  range?: LhCalendarRange
  /** 展示形态：panel 常驻面板（默认）/ input 点击输入框展开的折叠面板 */
  mode?: LhCalendarMode
  /** 同时展示的月面板数（flex 换行排列） */
  panels?: number
  /** input 模式的占位文本 */
  placeholder?: string
  /** input 模式选中后是否自动收起面板 */
  closeOnSelect?: boolean
  /** sx 快速布局属性 */
  sx?: SxProps
}

