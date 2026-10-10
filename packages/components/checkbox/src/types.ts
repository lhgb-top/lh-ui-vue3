import type { InjectionKey, Ref } from 'vue'
import type { SxProps } from '@lh-ui/share/core/shared'

export type LhCheckboxSize = 'small' | 'medium' | 'large'

export interface LhCheckboxProps {
  modelValue?: boolean
  value?: unknown
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  name?: string
  size?: LhCheckboxSize
  /** sx 快速布局属性 */
  sx?: SxProps
}

export interface LhCheckboxGroupProps {
  modelValue?: unknown[]
  disabled?: boolean
  name?: string
  size?: LhCheckboxSize
}

export interface LhCheckboxGroupContext {
  values: Ref<unknown[]>
  /** 红线 #6：provide 的是 computed ref 本体，禁止 props 快照（动态禁用/改尺寸需传导） */
  disabled: Ref<boolean>
  name: Ref<string | undefined>
  size: Ref<LhCheckboxSize>
  toggle: (value: unknown, checked: boolean) => void
}

export const LH_CHECKBOX_GROUP_KEY: InjectionKey<LhCheckboxGroupContext> = Symbol('LhCheckboxGroup')
