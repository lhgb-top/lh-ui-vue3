import type { ComponentSize } from '../shared/types'

export interface ConfigState {
  size: ComponentSize | undefined
  zIndex: number
  locale: string
}

export function createDefaultConfig(): ConfigState {
  return {
    size: undefined,
    zIndex: 2000,
    locale: 'zh-CN',
  }
}