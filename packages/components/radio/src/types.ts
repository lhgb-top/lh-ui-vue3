import type { InjectionKey, Ref } from 'vue'
import { LH_SIZE_CONST } from '@lh-ui/share/constants'
import type { SxProps } from '@lh-ui/share/core/shared'

export type LhRadioSize = typeof LH_SIZE_CONST[keyof typeof LH_SIZE_CONST]

export interface LhRadioProps {
  modelValue?: unknown
  value?: unknown
  label?: string
  disabled?: boolean
  name?: string
  size?: LhRadioSize
  /** sx 快速布局属性 */
  sx?: SxProps
}

export interface LhRadioGroupProps {
  modelValue?: unknown
  disabled?: boolean
  name?: string
  size?: LhRadioSize
}

export interface LhRadioGroupContext {
  modelValue: Ref<unknown>
  /** 红线 #6：provide 的是 computed ref 本体，禁止 props 快照 */
  disabled: Ref<boolean>
  name: Ref<string | undefined>
  size: Ref<LhRadioSize>
  onChange: (value: unknown) => void
}

export const LH_RADIO_GROUP_KEY: InjectionKey<LhRadioGroupContext> = Symbol('LhRadioGroup')