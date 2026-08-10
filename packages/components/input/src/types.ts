import type { LhSizeConst } from 'constants'

/**
 * Input 类型
 */
export const LhInputTypeConst = {
  text: 'text',
  textarea: 'textarea',
  password: 'password',
  number: 'number',
  email: 'email',
  url: 'url',
  tel: 'tel',
  date: 'date',
  time: 'time',
} as const

export type LhInputType = typeof LhInputTypeConst[keyof typeof LhInputTypeConst]

/**
 * Input 尺寸
 */
export type LhInputSize = typeof LhSizeConst[keyof typeof LhSizeConst]

/**
 * Input 状态
 */
export const LhInputStateConst = {
  error: 'error',
  success: 'success',
  warning: 'warning',
} as const

export type LhInputState = typeof LhInputStateConst[keyof typeof LhInputStateConst]

/**
 * Input Props 接口
 */
export interface LhInputProps {
  modelValue?: string
  type?: LhInputType
  size?: LhInputSize
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  maxlength?: number
  minlength?: number
  showWordLimit?: boolean
  clearable?: boolean
  prefixIcon?: string
  suffixIcon?: string
  autofocus?: boolean
  autocomplete?: string
  nativeType?: string
  autosize?: boolean | { minRows?: number; maxRows?: number }
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  name?: string
  rows?: number
  tabindex?: number | string
  form?: string
  inputStyle?: Record<string, string>
  label?: string
}