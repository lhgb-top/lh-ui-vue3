import type { InjectionKey, Ref } from 'vue'
import { LH_SIZE_CONST } from 'lh-constants'

export type LhRadioSize = typeof LH_SIZE_CONST[keyof typeof LH_SIZE_CONST]

export interface LhRadioProps {
  modelValue?: unknown
  value?: unknown
  label?: string
  disabled?: boolean
  name?: string
  size?: LhRadioSize
}

export interface LhRadioGroupProps {
  modelValue?: unknown
  disabled?: boolean
  name?: string
  size?: LhRadioSize
}

export interface LhRadioGroupContext {
  modelValue: Ref<unknown>
  disabled: boolean
  name: string | undefined
  size: LhRadioSize
  onChange: (value: unknown) => void
}

export const LH_RADIO_GROUP_KEY: InjectionKey<LhRadioGroupContext> = Symbol('LhRadioGroup')