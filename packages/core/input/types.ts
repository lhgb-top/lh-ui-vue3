/**
 * Input 组件纯类型定义（无框架依赖）
 */

export interface InputState {
  value: string
  size: string
  maxlength: number | undefined
  minlength: number | undefined
}