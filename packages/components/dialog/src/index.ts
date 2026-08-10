import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { LhDialogProps } from './types'
import { canClose, getDialogStyle } from '@lh-ui/core/dialog/logic'

/**
 * Dialog Composable
 */
export function useLhDialog(
  props: LhDialogProps,
  emit: (event: 'update:modelValue' | 'open' | 'close' | 'opened' | 'closed', ...args: any[]) => void
) {
  const dialogRef = ref<HTMLElement | null>(null)
  const isVisible = ref(props.modelValue ?? false)
  const headerRef = ref<HTMLElement | null>(null)
  const dragOffset = ref({ x: 0, y: 0 })
  let isDragging = false
  let startX = 0
  let startY = 0
  let initialX = 0
  let initialY = 0
  let scrollBarWidth = 0
  let bodyOverflow = ''

  // 同步外部 modelValue
  watch(() => props.modelValue, (val) => {
    if (val !== undefined) {
      isVisible.value = val
      if (val) {
        open()
      } else {
        close()
      }
    }
  })

  /**
   * 打开 Dialog
   */
  function open() {
    emit('open')
    lockScroll()
    nextTick(() => {
      emit('opened')
    })
  }

  /**
   * 关闭 Dialog
   */
  function close() {
    if (props.beforeClose) {
      props.beforeClose(() => {
        doClose()
      })
    } else {
      doClose()
    }
  }

  function doClose() {
    isVisible.value = false
    emit('update:modelValue', false)
    emit('close')
    unlockScroll()
    nextTick(() => {
      emit('closed')
    })
  }

  /**
   * 点击遮罩关闭
   */
  function handleModalClick() {
    if (canClose({ closeOnClickModal: props.closeOnClickModal }, 'modalClick')) {
      close()
    }
  }

  /**
   * 键盘 ESC 关闭
   */
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && canClose({ closeOnPressEscape: props.closeOnPressEscape }, 'escape')) {
      close()
    }
  }

  /**
   * 锁定 body 滚动
   */
  function lockScroll() {
    if (props.lockScroll !== false) {
      bodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
  }

  /**
   * 解锁 body 滚动
   */
  function unlockScroll() {
    if (props.lockScroll !== false) {
      document.body.style.overflow = bodyOverflow || ''
    }
  }

  // 挂载键盘监听
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
    unlockScroll()
  })

  /**
   * Dialog 遮罩/容器样式（用于 wrapper 元素）
   */
  const dialogStyle = computed(() => getDialogStyle({
    top: props.top,
    zIndex: props.zIndex,
    position: props.position,
  }))

  /**
   * Dialog 内容框样式（宽度 + 顶部间距）
   */
  const dialogContentStyle = computed(() => {
    const style: Record<string, string> = {}
    // 宽度
    if (props.width) {
      style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    }
    // 顶部间距（仅在 position 为 top 或未设置时）
    if (props.top && (props.position === 'top' || !props.position)) {
      style.marginTop = props.top
    }
    return style
  })

  /**
   * 拖拽功能
   */
  function handleHeaderMousedown(e: MouseEvent) {
    if (!props.draggable) return
    e.preventDefault()
    isDragging = true
    startX = e.clientX
    startY = e.clientY
    initialX = dragOffset.value.x
    initialY = dragOffset.value.y

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    let newX = initialX + dx
    let newY = initialY + dy
    
    // 边界约束：阻止 dialog 完全拖出视口
    const dialog = headerRef.value?.closest('.lh-dialog') as HTMLElement | null
    if (dialog) {
      const rect = dialog.getBoundingClientRect()
      
      // newVisualLeft = rect.left - dragOffset.x + newX
      // 约束：0 <= newVisualLeft <= window.innerWidth - rect.width
      newX = Math.max(
        -rect.left + dragOffset.value.x,
        Math.min(window.innerWidth - rect.left - rect.width + dragOffset.value.x, newX)
      )
      newY = Math.max(
        -rect.top + dragOffset.value.y,
        Math.min(window.innerHeight - rect.top - rect.height + dragOffset.value.y, newY)
      )
    }
    
    dragOffset.value = {
      x: newX,
      y: newY,
    }
  }

  function onMouseUp() {
    isDragging = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  /**
   * 拖拽样式
   */
  const dialogDragStyle = computed(() => {
    if (props.draggable && (dragOffset.value.x !== 0 || dragOffset.value.y !== 0)) {
      return {
        transform: `translate(${dragOffset.value.x}px, ${dragOffset.value.y}px)`,
      }
    }
    return {}
  })

  return {
    dialogRef,
    headerRef,
    isVisible,
    open,
    close,
    handleModalClick,
    handleKeyDown,
    dialogStyle,
    dialogContentStyle,
    dialogDragStyle,
    handleHeaderMousedown,
  }
}
