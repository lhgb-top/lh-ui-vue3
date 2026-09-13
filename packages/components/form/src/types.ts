import type { InjectionKey } from 'vue'
import type { LhFormRule } from '@lh-ui/core/form'

export type LhFormLabelPosition = 'left' | 'right' | 'top'

export interface LhFormProps {
  model: Record<string, unknown>
  rules?: Record<string, LhFormRule[]>
  labelPosition?: LhFormLabelPosition
  labelWidth?: string | number
  inline?: boolean
}

export interface LhFormItemProps {
  prop?: string
  label?: string
  required?: boolean
  rules?: LhFormRule[]
}

export interface LhFormContext {
  model: Record<string, unknown>
  rules?: Record<string, LhFormRule[]>
  labelPosition: LhFormLabelPosition
  labelWidth: string | number | undefined
  registerField: (prop: string, validate: () => Promise<boolean>) => () => void
  validateField: (prop: string) => Promise<boolean>
  resetField: (prop: string) => void
}

export const LH_FORM_CONTEXT_KEY: InjectionKey<LhFormContext> = Symbol('LhFormContext')

export type { LhFormRule }
