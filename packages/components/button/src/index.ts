import { computed } from 'vue'
import type { LhButtonProps } from './types'
import { useConfigContext } from '~/components/config-provider/src/index'
import { isClickable, getSize, getStyle } from '@lh-ui/core/button/logic'

/**
 * Button 组件 Composable
 * 整合 ConfigProvider 配置、事件处理与样式计算
 */
export function useLhButton(props: LhButtonProps, emit: (event: 'click', e: MouseEvent) => void) {
  // 从 ConfigProvider 获取全局配置
  const configContext = useConfigContext()

  // 有效的尺寸（props > ConfigProvider > 默认值）
  const effectiveSize = computed(() => {
    return getSize(props.size, configContext?.size)
  })

  /**
   * 点击事件处理
   */
  const handleClick = (e: MouseEvent) => {
    if (isClickable({ loading: props.loading, disabled: props.disabled })) {
      emit('click', e)
    }
  }

  /**
   * 计算按钮内联样式（主题变量）
   */
  const buttonStyle = computed(() => getStyle())

  return {
    handleClick,
    buttonStyle,
    effectiveSize,
    configContext,
  }
}
