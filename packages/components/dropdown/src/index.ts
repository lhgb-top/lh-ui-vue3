import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { LhDropdownProps, LhDropdownContext, LhDropdownItemRecord } from './types'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import {
  useLhClickOutside,
  useLhComponentTheme,
  useLhOverlayStack,
  useLhPopper,
  useLhTrigger,
  useLhZIndex,
} from '~/composables'
import { generateId } from '@lh-ui/share/utils'
import {
  LH_DROPDOWN_PLACEMENT_DEFAULT,
  getDropdownClass,
  getDropdownMenuStyle,
} from '@lh-ui/share/core/dropdown/logic'
import { focusFirst, isEscapeKey, LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'

/**
 * Dropdown Composable
 *
 * 键盘行为对齐 WAI-ARIA APG menu pattern：
 * 方向键在菜单项间循环、Home/End 跳首尾、Enter/Space 触发、Esc 关闭并归还焦点。
 * 焦点落在真实的菜单项元素上（roving tabindex），禁用项保持可聚焦以进入无障碍树。
 */
export function useLhDropdown(
  props: LhDropdownProps,
  emit: (event: string, ...args: any[]) => void
) {
  const configContext = useLhConfigContext()
  const { componentStyle } = useLhComponentTheme('dropdown', props, configContext)
  const { zIndex } = useLhZIndex()

  const dropdownId = generateId('lh-dropdown')
  const triggerRef = ref<HTMLElement | null>(null)
  const popperRef = ref<HTMLElement | null>(null)
  const isVisible = ref(props.visible ?? false)

  const items = ref<LhDropdownItemRecord[]>([])
  const activeIndex = ref(-1)

  // 传入 visible 即视为受控：触发器与外部点击不再自行切换显隐。
  // 注意：Boolean 类型的 prop 未传递时会被 Vue 解析为 false 而非 undefined，
  // 不能用 props.visible !== undefined 判定，必须看父级是否真的写了这个 prop。
  const vm = getCurrentInstance()
  const isControlled = computed(() => !!vm?.vnode.props && 'visible' in vm.vnode.props)

  const placement = computed(() => props.placement ?? LH_DROPDOWN_PLACEMENT_DEFAULT)

  const { popperStyle, actualPlacement, updatePosition } = useLhPopper({
    triggerRef,
    popperRef,
    visible: isVisible,
    placement,
    // 触发器滚出视口时必须收起：fixed 菜单不会随触发器离开，会悬浮在页面内容之上。
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
  } = useLhTrigger({
    // contextmenu 由组件自身的 onTriggerContextmenu 处理；传给 useLhTrigger 后，
    // click/hover/focus 三类内建处理器都会因为 trigger 不匹配而保持静默
    trigger: computed(() => props.trigger ?? 'click'),
    visible: isVisible,
    disabled: computed(() => props.disabled),
    isControlled,
    delay: computed(() => ({ show: 200, hide: 100 })),
    onShow: () => {
      emit('visible-change', true)
      emit('update:visible', true)
    },
    onHide: () => {
      emit('visible-change', false)
      emit('update:visible', false)
      activeIndex.value = -1
    },
  })

  /**
   * 右键触发
   */
  function onTriggerContextmenu(event: MouseEvent) {
    if (props.trigger !== 'contextmenu') return
    event.preventDefault()
    show()
  }

  /**
   * 悬停在弹出层上时保持打开（hover 模式）
   */
  function onMenuMouseenter() {
    if (props.trigger === 'hover') show()
  }

  function onMenuMouseleave() {
    if (props.trigger === 'hover') hide()
  }

  useLhClickOutside(
    () => [triggerRef.value, popperRef.value],
    () => {
      if (isVisible.value && !isControlled.value) hide()
    }
  )

  /**
   * 归还焦点到触发器内的首个可聚焦元素
   */
  function returnFocus() {
    const trigger = triggerRef.value
    if (!trigger) return
    // 触发器根元素通常不是可聚焦区域，优先聚焦其内部的真实交互元素
    if (!focusFirst(trigger)) trigger.focus?.()
  }

  /**
   * Esc 关闭（焦点在触发器上时菜单自身的 keydown 收不到，补一层文档监听）
   */
  function onDocumentKeydown(event: KeyboardEvent) {
    if (!isEscapeKey(event) || !isVisible.value || isControlled.value) return
    // 多弹层叠加时只有栈顶响应（与 Dialog / Drawer / Popover 共用顺序栈）
    if (!overlay.isTopmost()) return
    hide()
    returnFocus()
  }

  onMounted(() => {
    document.addEventListener('keydown', onDocumentKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onDocumentKeydown)
  })

  function handleItemClick(command: string | number | undefined) {
    emit('command', command)
    if (props.hideOnClick !== false) hide()
  }

  /**
   * 菜单键盘导航（对齐 APG menu pattern）
   */
  function onMenuKeydown(event: KeyboardEvent) {
    const enabled = items.value.filter((item) => !item.disabled)
    if (enabled.length === 0) return

    const current = enabled.findIndex((item) => item.el === document.activeElement)

    switch (event.key) {
      case LH_KEYS.ArrowDown: {
        event.preventDefault()
        const next = current === -1 ? 0 : (current + 1) % enabled.length
        focusItem(enabled[next])
        break
      }
      case LH_KEYS.ArrowUp: {
        event.preventDefault()
        const prev = current === -1 ? enabled.length - 1 : (current - 1 + enabled.length) % enabled.length
        focusItem(enabled[prev])
        break
      }
      case LH_KEYS.Home: {
        event.preventDefault()
        focusItem(enabled[0])
        break
      }
      case LH_KEYS.End: {
        event.preventDefault()
        focusItem(enabled[enabled.length - 1])
        break
      }
      case LH_KEYS.Enter:
      case LH_KEYS.Space: {
        if (current === -1) return
        event.preventDefault()
        handleItemClick(enabled[current].command)
        break
      }
      case LH_KEYS.Escape: {
        event.preventDefault()
        hide()
        returnFocus()
        break
      }
    }
  }

  function focusItem(item: LhDropdownItemRecord) {
    item.el.focus()
    activeIndex.value = items.value.indexOf(item)
  }

  // 同步外部 visible
  watch(
    () => props.visible,
    (val) => {
      if (val !== undefined && val !== isVisible.value) isVisible.value = val
    }
  )

  // 弹层打开顺序栈：多弹层叠加时 Esc 只关栈顶（与 Dialog / Drawer / Popover 共用）
  const overlay = useLhOverlayStack()
  watch(isVisible, (visible) => {
    if (visible) overlay.register()
    else overlay.unregister()
  })

  const context: LhDropdownContext = {
    items,
    activeIndex,
    registerItem(item: LhDropdownItemRecord) {
      items.value.push(item)
    },
    unregisterItem(item: LhDropdownItemRecord) {
      const index = items.value.indexOf(item)
      if (index > -1) items.value.splice(index, 1)
      if (activeIndex.value >= items.value.length) activeIndex.value = -1
    },
    onItemClick: handleItemClick,
  }

  const menuClass = computed(() =>
    getDropdownClass({
      placement: actualPlacement.value,
      popperClass: props.popperClass,
    })
  )

  const mergedMenuStyle = computed(() => ({
    ...popperStyle.value,
    ...componentStyle.value,
    ...getDropdownMenuStyle(props.maxHeight),
    zIndex: zIndex.value,
  }))

  const triggerStyle = computed(() => sxToStyle(props.sx ?? {}))

  return {
    dropdownId,
    triggerRef,
    popperRef,
    isVisible,
    context,
    menuClass,
    mergedMenuStyle,
    triggerStyle,
    show,
    hide,
    toggle,
    onTriggerMouseenter,
    onTriggerMouseleave,
    onTriggerClick,
    onTriggerContextmenu,
    onMenuMouseenter,
    onMenuMouseleave,
    onMenuKeydown,
    updatePosition,
  }
}
