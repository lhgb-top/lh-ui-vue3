/**
 * ConfigProvider 纯函数逻辑
 */
import type { ConfigState } from './types'
import { createDefaultConfig } from './types'

/**
 * 合并配置（局部 > 全局 > 默认）
 */
export function mergeConfig(
  defaults: Partial<ConfigState>,
  global: Partial<ConfigState>,
  local: Partial<ConfigState>
): ConfigState {
  return {
    ...createDefaultConfig(),
    ...defaults,
    ...global,
    ...local,
  }
}

/**
 * 获取有效尺寸
 */
export function getEffectiveSize(
  localSize: string | undefined,
  globalSize: string | undefined
): string | undefined {
  return localSize || globalSize
}

/**
 * 获取有效 zIndex
 */
export function getEffectiveZIndex(
  localZIndex: number | undefined,
  globalZIndex: number
): number {
  return localZIndex ?? globalZIndex
}