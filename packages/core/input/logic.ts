/**
 * Input 纯函数逻辑（无框架依赖）
 */

import type { InputState } from './types'

export function getWordCount(state: InputState): string {
  return `${state.value.length}/${state.maxlength ?? '∞'}`
}

export function shouldShowWordLimit(state: InputState): boolean {
  return state.maxlength !== undefined || state.minlength !== undefined
}

export function clampValue(value: string, maxlength: number | undefined): string {
  if (maxlength !== undefined && value.length > maxlength) {
    return value.slice(0, maxlength)
  }
  return value
}

export function getInputStyle(size: string): Record<string, string> {
  const map: Record<string, Record<string, string>> = {
    mini: { padding: '4px 8px', fontSize: '12px' },
    small: { padding: '6px 10px', fontSize: '12px' },
    medium: { padding: '8px 12px', fontSize: '14px' },
    large: { padding: '12px 16px', fontSize: '16px' },
  }
  return map[size] || map.medium
}