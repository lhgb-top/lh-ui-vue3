import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { LhDialogProps } from './types'

/**
 * Dialog Composable
 */
export function useLhDialog(
  props: LhDialogProps,
  emit: (event: 'update:modelValue' | 'open' | 'close' | 'opened' | 'closed', ...args: any[]) => void
) {
  const dialogRef = ref<HTMLElement | null>(null)
  const isVisible = ref(props.modelValue ?? false)
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
    if (props.closeOnClickModal !== false) {
      close()
    }
  }

  /**
   * 键盘 ESC 关闭
   */
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.closeOnPressEscape !== false) {
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
   * Dialog 样式
   */
  const dialogStyle = computed(() => {
    const style: Record<string, string> = {}
    if (props.width) {
      style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    }
    if (props.top) {
      style.marginTop = props.top
    }
    if (props.zIndex) {
      style.zIndex = String(props.zIndex)
    }
    return style
  })

  return {
    dialogRef,
    isVisible,
    open,
    close,
    handleModalClick,
    handleKeyDown,
    dialogStyle,
  }
}
