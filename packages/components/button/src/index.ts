import { computed } from 'vue'
import type { LhButtonProps } from './types'
import { useConfigContext } from '~/components/config-provider/src/index'

/**
 * Button 组件 Composable
 * 整合 ConfigProvider 配置、事件处理与样式计算
 */
export function useLhButton(props: LhButtonProps, emit: (event: 'click', e: MouseEvent) => void) {
  // 从 ConfigProvider 获取全局配置
  const configContext = useConfigContext()

  // 有效的尺寸（props > ConfigProvider > 默认值）
  const effectiveSize = computed(() => {
    return props.size || configContext?.size || 'default'
  })

  /**
   * 点击事件处理
   */
  const handleClick = (e: MouseEvent) => {
    if (!props.loading && !props.disabled) {
      emit('click', e)
    }
  }

  /**
   * 计算按钮内联样式（主题变量）
   */
  const buttonStyle = computed(() => {
    return {
      '--lh-primary-color': 'var(--lh-primary-color, #409EFF)',
      '--lh-primary-color-border': 'var(--lh-primary-color-border, #c6e2ff)',
      '--lh-primary-color-bg': 'var(--lh-primary-color-bg, #ecf5ff)',
      '--lh-primary-color-hover': 'var(--lh-primary-color-hover, #66b1ff)',
      '--lh-border-radius-base': 'var(--lh-border-radius-base, 4px)',
    }
  })

  return {
    handleClick,
    buttonStyle,
    effectiveSize,
    configContext,
  }
}
