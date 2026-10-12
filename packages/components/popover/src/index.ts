import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Slots } from 'vue'
import type { LhPopoverProps } from './types'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import {
  useLhComponentTheme,
  useLhFocusTrap,
  useLhOverlayStack,
  useLhPopper,
  useLhTrigger,
  useLhZIndex,
} from '~/composables'
import { useLhClickOutside } from '~/composables'
import { generateId } from '@lh-ui/share/utils'
import {
  LH_POPOVER_PLACEMENT_DEFAULT,
  getPopoverClass,
  getPopoverWidthStyle,
  getDefaultDelay,
} from '@lh-ui/share/core/popover/logic'
import { isEscapeKey, sxToStyle } from '@lh-ui/share/core/shared'

/**
 * Popover Composable
 */
export function useLhPopover(props: LhPopoverProps, emit: (event: string, ...args: any[]) => void, slots: Slots) {
  const configContext = useLhConfigContext()
  const { componentStyle } = useLhComponentTheme('popover', props, configContext)
  const { zIndex } = useLhZIndex()

  const popoverId = generateId('lh-popover')
  const titleId = generateId('lh-popover-title')
  const triggerRef = ref<HTMLElement | null>(null)
  const popperRef = ref<HTMLElement | null>(null)
  const isVisible = ref(props.visible ?? false)

  // 外部控制模式（trigger 为 manual 且外部传入 visible）
  const isControlled = computed(() => props.trigger === 'manual' && props.visible !== undefined)

  const placement = computed(() => props.placement ?? LH_POPOVER_PLACEMENT_DEFAULT)

  const { popperStyle, actualPlacement, updatePosition } = useLhPopper({
    triggerRef,
    popperRef,
    visible: isVisible,
    placement,
    // 触发器滚出视口时必须收起：弹出层是 fixed 定位，触发器离开后它仍会以高 z-index
    // 悬浮在页面内容之上。受控模式下同样收起，hide() 会抛出 update:visible 让外部状态同步。
    onScrollOut: () => {
      hide()
    },
  })

  const { show, hide, toggle, onTriggerMouseenter, onTriggerMouseleave, onTriggerClick, onTriggerFocusin, onTriggerFocusout } =
    useLhTrigger({
      trigger: computed(() => props.trigger ?? 'click'),
      visible: isVisible,
      disabled: computed(() => props.disabled),
      isControlled,
      delay: computed(() => getDefaultDelay(props.showAfter, props.hideAfter)),
      onShow: () => {
        emit('show')
        emit('update:visible', true)
      },
      onHide: () => {
        emit('hide')
        emit('update:visible', false)
      },
    })

  /**
   * 弹出层内的悬停联动：hover 模式下指针移进弹出层不触发隐藏
   */
  function onPopperMouseenter() {
    if (props.trigger === 'hover') show()
  }

  function onPopperMouseleave() {
    if (props.trigger === 'hover') hide()
  }

  /**
   * 点击触发时把焦点圈进弹出层，关闭时归还
   */
  const { trap, release } = useLhFocusTrap()
  const isModal = computed(() => props.trigger === 'click')
  // 弹层打开顺序栈：多弹层叠加时 Esc 只关栈顶（与 Dialog / Drawer 共用）
  const overlay = useLhOverlayStack()

  watch(isVisible, (visible) => {
    if (visible) {
      overlay.register()
      nextTick(() => {
        if (isModal.value) trap(popperRef.value)
      })
    } else {
      overlay.unregister()
      release()
    }
  })

  /**
   * 点击外部关闭（受控模式交由外部决定）
   */
  useLhClickOutside(
    () => [triggerRef.value, popperRef.value],
    () => {
      if (isVisible.value && !isControlled.value) hide()
    }
  )

  /**
   * ESC 关闭
   */
  function onKeydown(event: KeyboardEvent) {
    if (!overlay.isTopmost()) return
    if (isEscapeKey(event) && isVisible.value && !isControlled.value) hide()
  }

  // 同步外部 visible
  watch(
    () => props.visible,
    (val) => {
      if (val !== undefined && val !== isVisible.value) isVisible.value = val
    }
  )

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
    release()
  })

  const hasTitle = computed(() => !!props.title || !!slots.title)

  const popperClass = computed(() =>
    getPopoverClass({
      placement: actualPlacement.value,
      arrow: props.arrow,
      popperClass: props.popperClass,
    })
  )

  const mergedPopperStyle = computed(() => ({
    ...popperStyle.value,
    ...componentStyle.value,
    ...getPopoverWidthStyle(props.width),
    zIndex: zIndex.value,
  }))

  /**
   * 触发器根元素样式（sx 作用于触发器，弹出层已 teleport）
   */
  const triggerStyle = computed(() => sxToStyle(props.sx ?? {}))

  return {
    popoverId,
    titleId,
    triggerRef,
    popperRef,
    isVisible,
    isModal,
    hasTitle,
    popperClass,
    mergedPopperStyle,
    triggerStyle,
    show,
    hide,
    toggle,
    onTriggerMouseenter,
    onTriggerMouseleave,
    onTriggerClick,
    onTriggerFocusin,
    onTriggerFocusout,
    onPopperMouseenter,
    onPopperMouseleave,
    updatePosition,
  }
}
