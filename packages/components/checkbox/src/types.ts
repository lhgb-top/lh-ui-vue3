import type { InjectionKey, Ref } from 'vue'

export type LhCheckboxSize = 'small' | 'medium' | 'large'

export interface LhCheckboxProps {
  modelValue?: boolean
  value?: unknown
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  name?: string
  size?: LhCheckboxSize
}

export interface LhCheckboxGroupProps {
  modelValue?: unknown[]
  disabled?: boolean
  name?: string
  size?: LhCheckboxSize
}

export interface LhCheckboxGroupContext {
  values: Ref<unknown[]>
  disabled: boolean
  name: string | undefined
  size: LhCheckboxSize
  toggle: (value: unknown, checked: boolean) => void
}

export const LH_CHECKBOX_GROUP_KEY: InjectionKey<LhCheckboxGroupContext> = Symbol('LhCheckboxGroup')
