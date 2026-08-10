/**
 * Tooltip 纯类型定义（无框架依赖）
 */

export type TooltipPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual'
export type TooltipEffect = 'dark' | 'light'

export interface TooltipState {
  placement: TooltipPlacement
  effect: TooltipEffect
  maxWidth: string | number | undefined
}