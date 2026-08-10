import { computed } from 'vue'
import type { LhIconProps } from './types'

/**
 * Icon 组件 Composable
 */
export function useLhIcon(props: LhIconProps) {
  const iconStyle = computed(() => {
    const style: Record<string, string> = {}

    // 尺寸处理
    if (props.size) {
      if (typeof props.size === 'number') {
        style.fontSize = `${props.size}px`
      } else if (typeof props.size === 'string') {
        const sizeMap: Record<string, string> = {
          mini: '12px',
          small: '14px',
          medium: '16px',
          default: '16px',
          large: '20px',
          'x-large': '24px',
        }
        style.fontSize = sizeMap[props.size] || props.size
      }
    } else {
      style.fontSize = '16px'
    }

    // 颜色处理
    if (props.color) {
      style.color = props.color
    }

    return style
  })

  const iconName = computed(() => {
    return props.name ? `lh-icon-${props.name}` : ''
  })

  return {
    iconStyle,
    iconName,
  }
}
