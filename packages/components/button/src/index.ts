import { computed } from 'vue'
import type { LhButtonProps } from './types'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import { isClickable, getSize } from '@lh-ui/core/button/logic'
import { useLhComponentTheme } from '~/utils/composables'

/**
 * Button 组件 Composable
 * 整合 ConfigProvider 配置、事件处理与样式计算
 */
export function useLhButton(props: LhButtonProps, emit: (event: 'click', e: MouseEvent) => void) {
  // 从 ConfigProvider 获取全局配置
  const configContext = useLhConfigContext()

  // 有效的尺寸（props > ConfigProvider > 默认值）
  const effectiveSize = computed(() => {
    return getSize(props.size, configContext?.value.size)
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
   * 计算组件主题样式
   * 优先级: 组件自身 props > ConfigProvider componentTheme[组件名] > ConfigProvider 全局 themeVars
   */
  const { componentStyle: buttonStyle } = useLhComponentTheme('button', props, configContext)

  return {
    handleClick,
    buttonStyle,
    effectiveSize,
    configContext,
  }
}
