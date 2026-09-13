import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import type { LhTooltipProps } from './types'
import { generateId } from '~/utils/index'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import { useLhComponentTheme } from '~/utils/composables'
import { getPopperClass, getPopperStyle, getDefaultDelay } from '@lh-ui/core/tooltip/logic'

/**
 * Tooltip Composable
 */
export function useLhTooltip(props: LhTooltipProps) {
  const configContext = useLhConfigContext()
  const { componentStyle } = useLhComponentTheme('tooltip', props, configContext)
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
  
  // 延迟（使用 core 纯函数）
  const delay = computed(() => getDefaultDelay(props.showAfter ?? props.openDelay, props.hideAfter ?? props.closeDelay))

  /**
   * 显示 Tooltip
   */
  function show() {
    if (props.disabled) return
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    if (delay.value.show > 0) {
      showTimer = setTimeout(() => {
        isVisible.value = true
        nextTick(() => updatePosition())
        showTimer = null
      }, delay.value.show)
    } else {
      isVisible.value = true
      nextTick(() => updatePosition())
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
    if (delay.value.hide > 0) {
      hideTimer = setTimeout(() => {
        isVisible.value = false
        hideTimer = null
      }, delay.value.hide)
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
      const gap = 8

      // 解析方向和对齐方式
      const [dir, align] = placement.includes('-') ? placement.split('-') as [string, string] : [placement, 'center']

      let top = 0
      let left = 0

      // 垂直位置
      if (dir === 'top') {
        top = triggerRect.top - tooltipRect.height - gap
      } else if (dir === 'bottom') {
        top = triggerRect.bottom + gap
      } else {
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        if (align === 'start') {
          top = triggerRect.top
        } else if (align === 'end') {
          top = triggerRect.bottom - tooltipRect.height
        }
      }

      // 水平位置
      if (dir === 'left') {
        left = triggerRect.left - tooltipRect.width - gap
      } else if (dir === 'right') {
        left = triggerRect.right + gap
      } else {
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        if (align === 'start') {
          left = triggerRect.left
        } else if (align === 'end') {
          left = triggerRect.right - tooltipRect.width
        }
      }

      // 使用 fixed 定位，不需要 scroll 偏移
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
    const cls = getPopperClass({
      effect: props.effect || 'dark',
      placement: props.placement || 'top',
    })
    if (props.type) {
      cls.push(`lh-tooltip__popper--${props.type}`)
    }
    return cls
  })

  const popperStyle = computed(() => {
    const style = getPopperStyle({
      maxWidth: props.maxWidth,
    })
    // 优先使用 bgColor，其次 type，最后 fallback 给 effect
    const bg = props.bgColor || (props.type ? `var(--lh-${props.type}-color, var(--lh-primary-color))` : undefined)
    if (bg) {
      style['--lh-tooltip-bg'] = bg
      style['--lh-tooltip-text'] = '#fff'
      // 箭头颜色同步
      style['--lh-tooltip-arrow-color'] = bg
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
    componentStyle,
    trigger,
  }
}
