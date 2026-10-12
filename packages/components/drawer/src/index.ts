import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { LhDrawerProps } from './types'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import { useLhComponentTheme, useLhFocusTrap, useLhOverlayStack, useLhZIndex } from '~/composables'
import { generateId } from '@lh-ui/share/utils'
import { lhlocale } from '~/locale'
import {
  LH_DRAWER_DIRECTION_DEFAULT,
  LH_DRAWER_SIZE_DEFAULT,
  getDrawerClass,
  getDrawerPanelStyle,
} from '@lh-ui/share/core/drawer/logic'
import { isEscapeKey, sxToStyle } from '@lh-ui/share/core/shared'

/**
 * Drawer Composable
 */
export function useLhDrawer(
  props: LhDrawerProps,
  emit: (event: string, ...args: any[]) => void
) {
  const configContext = useLhConfigContext()
  const { componentStyle } = useLhComponentTheme('drawer', props, configContext)
  const { zIndex } = useLhZIndex()

  const drawerId = generateId('lh-drawer')
  const titleId = generateId('lh-drawer-title')
  const panelRef = ref<HTMLElement | null>(null)
  const isVisible = ref(props.modelValue ?? false)

  // 响应式国际化
  const t = (path: string, fallback?: string) => {
    void lhlocale.version.value
    return lhlocale.t(path, fallback)
  }

  const direction = computed(() => props.direction ?? LH_DRAWER_DIRECTION_DEFAULT)

  const { trap, release } = useLhFocusTrap()
  // 弹层打开顺序栈：多弹层叠加时 Esc 只关栈顶（与 Dialog 共用同一套栈）
  const overlay = useLhOverlayStack()

  let bodyOverflow = ''

  function lockScroll() {
    if (props.lockScroll === false) return
    if (typeof document === 'undefined') return
    bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  function unlockScroll() {
    if (props.lockScroll === false) return
    if (typeof document === 'undefined') return
    document.body.style.overflow = bodyOverflow || ''
  }

  /**
   * 打开
   */
  function open() {
    isVisible.value = true
    overlay.register()
    emit('update:modelValue', true)
    emit('open')
    lockScroll()
    nextTick(() => trap(panelRef.value))
  }

  /**
   * 关闭
   */
  function close() {
    isVisible.value = false
    overlay.unregister()
    emit('update:modelValue', false)
    emit('close')
    unlockScroll()
    release()
  }

  function handleMaskClick() {
    if (props.maskClosable !== false) close()
  }

  /**
   * Esc 关闭
   */
  function onKeydown(event: KeyboardEvent) {
    // 已关闭不响应；多弹层叠加时只有栈顶响应
    if (!isVisible.value || !overlay.isTopmost()) return
    if (isEscapeKey(event) && props.closeOnEsc !== false) {
      close()
    }
  }

  // 同步外部 modelValue
  watch(
    () => props.modelValue,
    (val) => {
      if (val === undefined) return
      if (val && !isVisible.value) open()
      else if (!val && isVisible.value) close()
    }
  )

  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', onKeydown)
    }
    if (isVisible.value) {
      // 初始即打开：补上打开栈登记、滚动锁定与焦点圈
      overlay.register()
      lockScroll()
      nextTick(() => trap(panelRef.value))
    }
  })

  onUnmounted(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', onKeydown)
    }
    unlockScroll()
    release()
  })

  const drawerClass = computed(() =>
    getDrawerClass({ direction: direction.value })
  )

  const panelStyle = computed(() => ({
    ...componentStyle.value,
    ...getDrawerPanelStyle(direction.value, props.size ?? LH_DRAWER_SIZE_DEFAULT),
    ...sxToStyle(props.sx ?? {}),
  }))

  const rootStyle = computed(() => ({ zIndex: zIndex.value }))

  const closeLabel = computed(() => t('drawer.close', '关闭抽屉'))
  const defaultTitle = computed(() => t('drawer.title', '抽屉'))

  return {
    drawerId,
    titleId,
    panelRef,
    isVisible,
    drawerClass,
    panelStyle,
    rootStyle,
    closeLabel,
    defaultTitle,
    open,
    close,
    handleMaskClick,
  }
}
