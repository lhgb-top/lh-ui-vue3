import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { LhPopconfirmProps } from './types'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import {
  useLhComponentTheme,
  useLhFocusTrap,
  useLhPopper,
  useLhTrigger,
  useLhZIndex,
  useLhClickOutside,
} from '~/composables'
import { generateId } from '@lh-ui/share/utils'
import { lhlocale } from '~/locale'
import {
  DEFAULT_POPCONFIRM_PLACEMENT,
  DEFAULT_POPCONFIRM_TYPE,
  getPopconfirmClass,
  getPopconfirmIconName,
  getDefaultDelay,
} from '@lh-ui/share/core/popconfirm/logic'
import { isEscapeKey, sxToStyle } from '@lh-ui/share/core/shared'

/**
 * Popconfirm Composable
 */
export function useLhPopconfirm(
  props: LhPopconfirmProps,
  emit: (event: string, ...args: any[]) => void
) {
  const configContext = useLhConfigContext()
  const { componentStyle } = useLhComponentTheme('popconfirm', props, configContext)
  const { zIndex } = useLhZIndex()

  const popconfirmId = generateId('lh-popconfirm')
  const titleId = generateId('lh-popconfirm-title')
  const triggerRef = ref<HTMLElement | null>(null)
  const popperRef = ref<HTMLElement | null>(null)
  const confirmRef = ref<HTMLElement | null>(null)
  const isVisible = ref(props.visible ?? false)

  // 响应式国际化：读取 version 建立依赖，切换语言时文案重算
  const t = (path: string, fallback?: string) => {
    void lhlocale.version.value
    return lhlocale.t(path, fallback)
  }

  const isControlled = computed(() => props.trigger === 'manual' && props.visible !== undefined)
  const confirmType = computed(() => props.type ?? DEFAULT_POPCONFIRM_TYPE)

  const { popperStyle, actualPlacement, updatePosition } = useLhPopper({
    triggerRef,
    popperRef,
    visible: isVisible,
    placement: computed(() => props.placement ?? DEFAULT_POPCONFIRM_PLACEMENT),
    // 触发器滚出视口时必须收起：fixed 弹层不会随触发器离开，会悬浮在页面内容之上。
    // 受控模式同样收起，hide() 会抛出 update:visible 让外部状态保持同步。
    onScrollOut: () => {
      hide()
    },
  })

  const {
    show,
    hide,
    toggle,
    onTriggerMouseenter,
    onTriggerMouseleave,
    onTriggerClick,
    onTriggerFocusin,
    onTriggerFocusout,
  } = useLhTrigger({
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

  function onPopperMouseenter() {
    if (props.trigger === 'hover') show()
  }

  function onPopperMouseleave() {
    if (props.trigger === 'hover') hide()
  }

  const { trap, release } = useLhFocusTrap()

  watch(isVisible, (visible) => {
    if (visible) {
      // 打开时焦点落「确定」，Tab 在两按钮间循环，关闭后归还
      nextTick(() => trap(popperRef.value, confirmRef.value))
    } else {
      release()
    }
  })

  useLhClickOutside(
    () => [triggerRef.value, popperRef.value],
    () => {
      if (isVisible.value && !isControlled.value) hide()
    }
  )

  function onKeydown(event: KeyboardEvent) {
    if (!isVisible.value || isControlled.value) return
    // Esc = 取消（对齐 APG alertdialog：Escape 关闭并视为否定）
    if (isEscapeKey(event)) handleCancel()
  }

  function handleConfirm() {
    emit('confirm')
    hide()
  }

  function handleCancel() {
    emit('cancel')
    hide()
  }

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

  const popperClass = computed(() =>
    getPopconfirmClass({
      type: confirmType.value,
      placement: actualPlacement.value,
      popperClass: props.popperClass,
    })
  )

  const mergedPopperStyle = computed(() => ({
    ...popperStyle.value,
    ...componentStyle.value,
    zIndex: zIndex.value,
  }))

  const triggerStyle = computed(() => sxToStyle(props.sx ?? {}))

  const iconName = computed(() => getPopconfirmIconName(confirmType.value))

  const confirmLabel = computed(() => props.confirmText || t('popconfirm.confirm', '确定'))
  const cancelLabel = computed(() => props.cancelText || t('popconfirm.cancel', '取消'))

  return {
    popconfirmId,
    titleId,
    triggerRef,
    popperRef,
    confirmRef,
    isVisible,
    popperClass,
    mergedPopperStyle,
    triggerStyle,
    iconName,
    confirmLabel,
    cancelLabel,
    show,
    hide,
    toggle,
    handleConfirm,
    handleCancel,
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
