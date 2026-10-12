import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { LhDialogProps } from './types'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import { useLhComponentTheme, useLhFocusTrap, useLhOverlayStack } from '~/composables'
import { isEscapeKey, sxToStyle } from '@lh-ui/share/core/shared'
import { canClose, getDialogStyle } from '@lh-ui/share/core/dialog/logic'

/**
 * Dialog Composable
 */
export function useLhDialog(
  props: LhDialogProps,
  emit: (event: string, ...args: any[]) => void
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
  let bodyOverflow = ''
  // 滚动锁状态跟踪：未锁过不得解锁，否则会把其他弹层的滚动锁一并解掉
  let scrollLocked = false

  // 组件主题
  const configContext = useLhConfigContext()
  const theme = useLhComponentTheme('dialog', props, configContext)
  // 焦点圈：打开时圈住对话框，关闭时归还焦点（与 Drawer / Popover 一致）
  const { trap, release } = useLhFocusTrap()
  // 弹层打开顺序栈：多弹层叠加时 Esc 只关栈顶（与 Drawer 共用同一套栈）
  const overlay = useLhOverlayStack()
  const componentStyle = computed(() => ({
    ...theme.componentStyle.value,
    ...sxToStyle(props.sx ?? {}),
  }))

  // 同步外部 modelValue（状态守卫防双发：遮罩/Esc 关闭 → update:modelValue 回流时
  // isVisible 已为 false，直接跳过，close/beforeClose/unlockScroll 不再跑第二遍）
  watch(() => props.modelValue, (val) => {
    if (val === undefined) return
    if (val && !isVisible.value) {
      isVisible.value = true
      open()
    } else if (!val && isVisible.value) {
      close()
    }
  })

  /**
   * 打开 Dialog
   */
  function open() {
    overlay.register()
    emit('open')
    lockScroll()
    nextTick(() => {
      // v-if 渲染后才能拿到对话框节点；不传 focusTarget，由焦点圈内部
      // 聚焦容器内首个可聚焦元素（默认是头部关闭按钮），与 Drawer 一致
      trap(dialogRef.value)
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
    overlay.unregister()
    emit('update:modelValue', false)
    emit('close')
    unlockScroll()
    // 解除焦点圈并归还焦点给打开前的触发元素（与 Drawer / Popover 一致）
    release()
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
    // 已关闭的实例不响应 Esc，也不得触发 unlockScroll（会解掉别的弹层的滚动锁）；
    // 多弹层叠加时只有栈顶响应（与 Drawer 同一打开顺序栈）
    if (!isVisible.value || !overlay.isTopmost()) return
    if (isEscapeKey(e) && canClose({ closeOnPressEscape: props.closeOnPressEscape }, 'escape')) {
      close()
    }
  }

  /**
   * 锁定 body 滚动
   */
  function lockScroll() {
    if (props.lockScroll !== false) {
      if (typeof document === 'undefined') return
      bodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      scrollLocked = true
    }
  }

  /**
   * 解锁 body 滚动
   */
  function unlockScroll() {
    if (props.lockScroll !== false && scrollLocked) {
      scrollLocked = false
      if (typeof document === 'undefined') return
      document.body.style.overflow = bodyOverflow || ''
    }
  }

  // 挂载键盘监听
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
    if (isVisible.value) {
      // 初始 modelValue=true：watch 不会触发，补上滚动锁与焦点圈（对齐 Drawer）
      lockScroll()
      overlay.register()
      nextTick(() => {
        trap(dialogRef.value)
      })
    }
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
    detachDragListeners()
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

  /** 拖拽监听成对清理：组件在拖拽中被卸载时由 onUnmounted 兜底移除 */
  function detachDragListeners() {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
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
    detachDragListeners()
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
    componentStyle,
    handleHeaderMousedown,
  }
}
