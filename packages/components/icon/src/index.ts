import { computed } from 'vue'
import type { LhIconProps } from './types'
import { getIconSvg, getIconStyle, getIconSize } from '@lh-ui/core/icon'

/**
 * Icon 组件 Composable
 */
export function useLhIcon(props: LhIconProps) {
  const svgPath = computed(() => getIconSvg(props.name))
  const iconStyle = computed(() => getIconStyle({ size: props.size, color: props.color }))
  const iconSize = computed(() => getIconSize(props.size))

  return { svgPath, iconStyle, iconSize }
}
