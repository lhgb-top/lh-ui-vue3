/**
 * Tooltip 组件 Props
 */
export interface LhTooltipProps {
  /** 提示文字内容 */
  content?: string
  /** 展示位置 */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否手动控制显示 */
  manual?: boolean
  /** 手动控制的显示状态 */
  visible?: boolean
  /** 延迟显示时间(ms) */
  showAfter?: number
  /** 延迟隐藏时间(ms) */
  hideAfter?: number
  /** 是否默认插槽 */
  openDelay?: number
  /** 关闭延迟 */
  closeDelay?: number
  /** 主题 */
  effect?: 'dark' | 'light'
  /** 最大宽度 */
  maxWidth?: string | number
}

export type LhTooltipPlacement = LhTooltipProps['placement']
export type LhTooltipTrigger = LhTooltipProps['trigger']
export type LhTooltipEffect = LhTooltipProps['effect']
