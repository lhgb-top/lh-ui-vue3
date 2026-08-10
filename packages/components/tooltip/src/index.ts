import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { LhTooltipProps } from './types'
import { generateId } from '~/utils/index'

/**
 * Tooltip Composable
 */
export function useLhTooltip(props: LhTooltipProps) {
  const tooltipId = generateId('lh-tooltip')
  const isVisible = ref(false)
  const tooltipRef = ref<HTMLElement | null>(null)
  const triggerRef = ref<HTMLElement | null>(null)
  let showTimer: ReturnType<typeof setTimeout> | null = null
  let hideTimer: ReturnType<typeof setTimeout> | null = null

  // 外部控制模式
  const isControlled = computed(() => props.manual && props.visible !== undefined)
  
  // 获取触发方式
  const trigger = computed(() => props.trigger || 'hover')
  
  // 展示延迟
  const showAfter = computed(() => props.showAfter ?? props.openDelay ?? 0)
  
  // 隐藏延迟
  const hideAfter = computed(() => props.hideAfter ?? props.closeDelay ?? 0)

  /**
   * 显示 Tooltip
   */
  function show() {
    if (props.disabled) return
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    if (showAfter.value > 0) {
      showTimer = setTimeout(() => {
        isVisible.value = true
        updatePosition()
        showTimer = null
      }, showAfter.value)
    } else {
      isVisible.value = true
      updatePosition()
    }
  }

  /**
   * 隐藏 Tooltip
   */
  function hide() {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    if (hideAfter.value > 0) {
      hideTimer = setTimeout(() => {
        isVisible.value = false
        hideTimer = null
      }, hideAfter.value)
    } else {
      isVisible.value = false
    }
  }

  /**
   * 切换可见性
   */
  function toggle() {
    if (isVisible.value) {
      hide()
    } else {
      show()
    }
  }

  /**
   * 更新 Tooltip 位置
   */
  function updatePosition() {
    if (!tooltipRef.value || !triggerRef.value) return

    try {
      const triggerRect = triggerRef.value.getBoundingClientRect()
      const tooltipRect = tooltipRef.value.getBoundingClientRect()
      const placement = props.placement || 'top'
      
      let top = 0
      let left = 0
      const gap = 8

      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - gap
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case 'bottom':
          top = triggerRect.bottom + gap
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.left - tooltipRect.width - gap
          break
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.right + gap
          break
        default:
          top = triggerRect.top - tooltipRect.height - gap
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      }

      // 加上滚动偏移
      top += window.scrollY
      left += window.scrollX

      tooltipRef.value.style.top = `${Math.max(0, top)}px`
      tooltipRef.value.style.left = `${Math.max(0, left)}px`
    } catch {
      // 忽略位置计算错误
    }
  }

  // 同步外部 visible
  watch(() => props.visible, (val) => {
    if (isControlled.value) {
      isVisible.value = val ?? false
    }
  })

  // 监听窗口变化
  onMounted(() => {
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
  })

  onUnmounted(() => {
    if (showTimer) clearTimeout(showTimer)
    if (hideTimer) clearTimeout(hideTimer)
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
  })

  const popperClass = computed(() => {
    return [
      'lh-tooltip__popper',
      `lh-tooltip__popper--${props.effect || 'dark'}`,
      props.placement ? `lh-tooltip__popper--${props.placement}` : '',
    ]
  })

  const popperStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.maxWidth) {
      style.maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
    }
    return style
  })

  return {
    tooltipId,
    isVisible,
    tooltipRef,
    triggerRef,
    show,
    hide,
    toggle,
    updatePosition,
    popperClass,
    popperStyle,
    trigger,
  }
}
