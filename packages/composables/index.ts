/**
 * @lh-ui/vue3 Shared Composables
 *
 * 跨组件共享的通用逻辑
 */

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  watch,
  type Ref,
} from 'vue'
import { toCssVarName, stripCssVarName } from '@lh-ui/share/utils/css-var'
import {
  LH_THEME_PRESETS,
  getThemeVars,
  buildPresetStyleText,
  LH_PRESET_THEME_STYLE_ID,
} from '@lh-ui/share/theme'
import { LH_GRID_BREAKPOINTS, resolveBreakpoint } from '@lh-ui/share/core/grid'
import type { LhGridBreakpoint } from '@lh-ui/share/core/grid'
import type { LhThemePresetName } from '@lh-ui/share/theme'

/**
 * useLhZIndex - 递增的 z-index 管理
 */
let _zIndexCounter = 2000
export function useLhZIndex() {
  const zIndex = ref(++_zIndexCounter)

  function nextZIndex() {
    return ++_zIndexCounter
  }

  return { zIndex, nextZIndex }
}

/**
 * useLhOverlayStack - 弹层打开顺序栈
 *
 * 模块级栈记录当前打开的弹层（dialog / drawer 等）：多弹层叠加时 Esc 只关栈顶，
 * 避免一次按键把底下所有弹层一起带走。每个实例 open 时 register、关闭时 unregister，
 * 组件卸载时自动出栈兜底。与 useLhZIndex 的递增体系配套。
 */
const _overlayStack: symbol[] = []
export function useLhOverlayStack() {
  const id = Symbol('lh-overlay')

  function register() {
    _overlayStack.push(id)
  }

  function unregister() {
    const index = _overlayStack.lastIndexOf(id)
    if (index >= 0) _overlayStack.splice(index, 1)
  }

  /** 本实例是否处于栈顶（只有栈顶响应 Esc） */
  function isTopmost() {
    return _overlayStack[_overlayStack.length - 1] === id
  }

  onBeforeUnmount(unregister)

  return { register, unregister, isTopmost }
}

/**
 * useLhBreakpoint - 全局共享的响应式断点
 *
 * 模块级单例：所有消费方订阅同一份断点状态与同一个 matchMedia 监听，
 * 视口跨档时全站联动。阈值取 core/grid 的 LH_GRID_BREAKPOINTS（Tailwind 风格）。
 * SSR / 无 matchMedia 环境安全降级为 xs。
 */
let _breakpointRef: Ref<LhGridBreakpoint> | null = null

function initBreakpoint(): Ref<LhGridBreakpoint> {
  const bp = ref<LhGridBreakpoint>('xs')
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return bp

  const recompute = () => {
    bp.value = resolveBreakpoint(window.innerWidth)
  }
  recompute()

  // 每个断点阈值各挂一个 matchMedia（跨档与直接缩放都可靠），回调里统一重算。
  // 单例与页面同生命周期，监听器无需逐个摘除
  for (const key of Object.keys(LH_GRID_BREAKPOINTS) as LhGridBreakpoint[]) {
    const threshold = LH_GRID_BREAKPOINTS[key]
    if (threshold <= 0) continue
    const mql = window.matchMedia(`(min-width: ${threshold}px)`)
    const handler = () => recompute()
    if (typeof mql.addEventListener === 'function') mql.addEventListener('change', handler)
    else mql.addListener(handler)
  }

  return bp
}

export function useLhBreakpoint() {
  if (!_breakpointRef) _breakpointRef = initBreakpoint()
  return { breakpoint: _breakpointRef }
}

/**
 * useLhComponentTheme - 组件主题层级覆盖
 *
 * 优先级：组件自身 props > ConfigProvider componentTheme[组件名] > ConfigProvider 全局 themeVars
 * patternComponents 白名单控制全局 themeVars 中的 bg-pattern 是否生效
 */
import type { LhThemeableComponent } from '~/components/config-provider/src/types'
import type { LhConfigContextRef } from '~/components/config-provider/src/index'

export function useLhComponentTheme(
  componentName: LhThemeableComponent,
  props: { themeVars?: Record<string, string>; bgPattern?: string },
  configContext: LhConfigContextRef | null
) {
  const componentStyle = computed(() => {
    const result: Record<string, string> = {}
    // ConfigProvider 注入的是 computed 引用，读取 .value 建立响应式依赖
    const ctx = configContext?.value

    // 检查组件是否在 patternComponents 白名单中
    const isPatternAllowed =
      !ctx?.patternComponents || ctx.patternComponents.includes(componentName)

    // 1. 全局 themeVars（仅 bg-pattern 受白名单控制）
    if (ctx?.themeVars) {
      for (const [key, value] of Object.entries(ctx.themeVars)) {
        if (key === 'bg-pattern' && !isPatternAllowed) continue
        result[toCssVarName(key)] = value
      }
    }

    // 2. componentTheme[组件名]（覆盖全局，仅 bg-pattern 受白名单控制）
    const componentTheme = ctx?.componentTheme?.[componentName]
    if (componentTheme) {
      for (const [key, value] of Object.entries(componentTheme)) {
        if (key === 'bg-pattern' && !isPatternAllowed) continue
        result[toCssVarName(key)] = value
      }
    }

    // 3. 组件自身 themeVars（最高优先级，不受白名单限制）
    if (props.themeVars) {
      for (const [key, value] of Object.entries(props.themeVars)) {
        result[toCssVarName(key)] = value
      }
    }

    // 4. 组件自身 bgPattern（最高优先级，不受白名单限制）
    if (props.bgPattern) {
      result['--lh-bg-pattern'] = props.bgPattern
    }

    return result
  })

  return { componentStyle }
}

/**
 * LhThemeType - 主题类型
 */
export type LhThemeType = 'light' | 'dark'

/**
 * useLhTheme - 运行时主题切换
 *
 * 通过设置 document.documentElement 的 data-theme 属性与 class 来切换明暗主题。
 * 主题状态会持久化到 localStorage。
 *
 * @param options.initialTheme 初始主题（默认从 localStorage 读取，fallback 为 'light'）
 * @param options.storageKey localStorage 存储 key
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useLhTheme } from '@lh-ui/vue3'
 *
 * const { theme, toggleTheme, setTheme } = useLhTheme()
 * </script>
 *
 * <template>
 *   <LhButton @click="toggleTheme">
 *     {{ theme === 'dark' ? '切换明色' : '切换暗色' }}
 *   </LhButton>
 * </template>
 * ```
 */
export function useLhTheme(options?: {
  initialTheme?: LhThemeType
  storageKey?: string
}) {
  const storageKey = options?.storageKey ?? 'lh-ui-theme'

  const initTheme = (): LhThemeType => {
    if (options?.initialTheme) return options.initialTheme
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === 'dark' || stored === 'light') return stored
    }
    catch { /* localStorage may be unavailable in SSR environments */ }
    return 'light'
  }

  const theme = ref<LhThemeType>(initTheme())

  const applyTheme = (t: LhThemeType) => {
    const root = document.documentElement
    if (t === 'dark') {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
    }
    else {
      root.removeAttribute('data-theme')
      root.classList.remove('dark')
    }
    try { localStorage.setItem(storageKey, t) }
    catch { /* localStorage may be unavailable in SSR environments */ }
  }

  // 初始化时应用主题
  applyTheme(theme.value)

  /** 设置主题 */
  const setTheme = (t: LhThemeType) => {
    theme.value = t
    applyTheme(t)
  }

  /** 切换明暗主题 */
  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}

/**
 * useLhPresetTheme - 预设主题切换
 *
 * 与 `useLhTheme`（明暗模式）互补：`useLhTheme` 切 `data-theme` 暗色变量，
 * 本 composable 把预设色板变量写到 `:root`，换的是 `--lh-*` 配色。
 *
 * 两种消费方式：
 * - 默认把预设 vars 写入 `<style id="lh-preset-theme">`（`:root` 级），全局生效；
 *   优先级低于 ConfigProvider 的局部 themeVars，与现有优先级链一致。
 *   不用 documentElement 内联 style 是因为内联优先级高于一切样式表，
 *   会压过 var-dark.scss 的整段暗色变量，导致暗色模式下配色失真；
 *   <style> 元素里的暗色块则可与主题暗色规则正常共存、按特异性取胜。
 *   docs 的 FOUC 防闪烁脚本必须用同一机制（同一 id 的 `<style>` 元素），
 *   否则内联样式会压过本 composable 的样式表，切换预设时页面不刷新就不生效。
 *   每次应用都把元素挪到 head 末尾：开发模式下组件样式由 Vite 在运行时注入，
 *   注入位置可能晚于本元素，同等特异性下后注入者胜出。
 * - 返回的 `themeVars` 已按 ConfigProvider 约定去掉 `--lh-` 前缀，
 *   需要局部作用域时传给 `<LhConfigProvider :theme-vars="themeVars">`。
 *
 * 预设选择持久化到 localStorage（key 可自定义，仅在 `applyToRoot: true` 时写入），SSR 安全。
 *
 * @example
 * ```ts
 * const { preset, setPreset, presets, themeVars } = useLhPresetTheme()
 * setPreset('songhua')
 * ```
 */
export function useLhPresetTheme(options?: {
  initialPreset?: LhThemePresetName
  storageKey?: string
  /** 是否把变量写到 :root，默认 true。设为 false 可只取 themeVars 自己接管应用 */
  applyToRoot?: boolean
}) {
  const storageKey = options?.storageKey ?? 'lh-ui-preset'
  const applyToRoot = options?.applyToRoot ?? true

  const initPreset = (): LhThemePresetName => {
    if (options?.initialPreset) return options.initialPreset
    try {
      const stored = localStorage.getItem(storageKey)
      const matched = stored ? LH_THEME_PRESETS.find((p) => p.name === stored) : undefined
      if (matched) return matched.name
    }
    catch { /* localStorage may be unavailable in SSR environments */ }
    return LH_THEME_PRESETS[0].name
  }

  const preset = ref<LhThemePresetName>(initPreset())

  const applyPreset = (name: LhThemePresetName) => {
    const vars = getThemeVars(name)
    if (!vars) return
    // applyToRoot: false 时不写 :root 也不持久化 —— 该模式只负责产出 themeVars，
    // 作用域与持久化都应由调用方自己接管，避免污染全局 key
    if (!applyToRoot) return
    if (typeof document !== 'undefined') {
      let styleEl = document.getElementById(LH_PRESET_THEME_STYLE_ID) as HTMLStyleElement | null
      if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.id = LH_PRESET_THEME_STYLE_ID
      }
      styleEl.textContent = buildPresetStyleText(vars)
      // 始终挪到 head 末尾：开发模式下组件样式由 Vite 在运行时注入，
      // 注入位置可能晚于本元素，同等特异性（都是 :root）下后注入者胜出，
      // 不挪动会导致预设被默认色覆盖；此操作对已位于末尾的元素是幂等的
      document.head.appendChild(styleEl)
    }
    try { localStorage.setItem(storageKey, name) }
    catch { /* localStorage may be unavailable in SSR environments */ }
  }

  // 初始化时应用主题
  applyPreset(preset.value)

  /** 设置预设主题 */
  const setPreset = (name: LhThemePresetName) => {
    preset.value = name
    applyPreset(name)
  }

  /** ConfigProvider 兼容的 themeVars（键已去掉 --lh- 前缀） */
  const themeVars = computed(() => {
    const vars = getThemeVars(preset.value) ?? {}
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(vars)) {
      result[stripCssVarName(key)] = value
    }
    return result
  })

  return { preset, setPreset, presets: LH_THEME_PRESETS, themeVars }
}

// ============================================================================
// 弹层基建（Wave C）：供 Tooltip / Popover / Popconfirm / Drawer / Dropdown 共用
// ============================================================================

import {
  computePosition,
  getWindowViewport,
  isOutsideViewport,
  type LhPlacement,
} from '@lh-ui/share/core/shared/popper'
import {
  focusFirst,
  saveActiveElement,
  restoreActiveElement,
  setInertOutside,
  supportsInert,
  trapTabKey,
} from '@lh-ui/share/core/shared/focus-trap'

/** useLhPopper 入参 */
export interface UseLhPopperOptions {
  /** 触发器元素引用 */
  triggerRef: Ref<HTMLElement | null>
  /** 弹出层元素引用 */
  popperRef: Ref<HTMLElement | null>
  /** 弹出层是否可见（可见时才计算与监听重定位） */
  visible: Ref<boolean>
  /** 期望方位（可传响应式引用） */
  placement: LhPlacement | Ref<LhPlacement>
  /** 与触发器的间距，默认 8 */
  gap?: number
  /** 视口安全边距，默认 8 */
  padding?: number
  /** 主轴溢出翻转，默认开启 */
  flip?: boolean
  /** 交叉轴溢出夹回，默认开启 */
  shift?: boolean
  /**
   * 滚动/调整窗口导致触发器完全离开视口时的回调。
   *
   * 弹出层是 fixed 定位且跟随触发器重算位置；触发器滚出视口后，它会被
   * 钳在视口边缘并浮在页面内容之上（观感上「层级太高」）。组件层据此
   * 自行决定是否关闭（hover 类提示应关闭，受控弹层可忽略）。
   */
  onScrollOut?: () => void
}

/**
 * useLhPopper - 弹出层定位
 *
 * 把 core 的纯函数几何计算接到响应式引用上：可见时计算 fixed 定位，
 * 并在窗口 resize、滚动、触发器或弹出层尺寸变化时重定位。
 */
export function useLhPopper(options: UseLhPopperOptions) {
  const popperStyle = ref<Record<string, string>>({})
  const actualPlacement = ref<LhPlacement>(unref(options.placement))

  function updatePosition() {
    const trigger = options.triggerRef.value
    const popper = options.popperRef.value
    if (!trigger || !popper || !options.visible.value) return

    const { top, left, placement, arrowOffset } = computePosition(
      trigger.getBoundingClientRect(),
      // 弹出层取布局尺寸而非 getBoundingClientRect：进出过渡带 transform: scale(0.96)，
      // 变形中的视口尺寸是缩放后的，按它算出的位置在过渡结束后会 stale（差约 4%）
      {
        top: 0,
        left: 0,
        width: popper.offsetWidth,
        height: popper.offsetHeight,
        right: popper.offsetWidth,
        bottom: popper.offsetHeight,
      },
      getWindowViewport(),
      {
        placement: unref(options.placement),
        gap: options.gap ?? 8,
        padding: options.padding ?? 8,
        flip: options.flip ?? true,
        shift: options.shift ?? true,
      }
    )

    popperStyle.value = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      // 箭头通过 CSS 变量传给 SCSS，未定位时回退到 50% 居中
      '--lh-arrow-offset': `${arrowOffset}px`,
    }
    actualPlacement.value = placement
  }

  /** 滚动 / 窗口变化时重定位，触发器整体离开视口则通知组件层关闭 */
  function onScrollOrResize() {
    if (!options.visible.value) return
    const trigger = options.triggerRef.value
    if (trigger && isOutsideViewport(trigger.getBoundingClientRect(), getWindowViewport())) {
      options.onScrollOut?.()
      return
    }
    updatePosition()
  }

  let resizeObserver: ResizeObserver | null = null

  watch(
    () => options.visible.value,
    (visible) => {
      if (visible) {
        nextTick(() => {
          updatePosition()
          // 弹出层每次出现都重新挂观测，消失时取下，避免持有已卸载的节点
          if (resizeObserver && options.popperRef.value) {
            resizeObserver.observe(options.popperRef.value)
          }
        })
      } else {
        if (resizeObserver && options.popperRef.value) {
          resizeObserver.unobserve(options.popperRef.value)
        }
        popperStyle.value = {}
        actualPlacement.value = unref(options.placement)
      }
    }
  )

  watch(
    () => unref(options.placement),
    () => {
      if (options.visible.value) nextTick(updatePosition)
    }
  )

  onMounted(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', onScrollOrResize)
    window.addEventListener('scroll', onScrollOrResize, true)
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (options.visible.value) updatePosition()
      })
      if (options.triggerRef.value) resizeObserver.observe(options.triggerRef.value)
    }
  })

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', onScrollOrResize)
    window.removeEventListener('scroll', onScrollOrResize, true)
    resizeObserver?.disconnect()
    resizeObserver = null
  })

  return { popperStyle, actualPlacement, updatePosition }
}

/** useLhClickOutside 入参 */
export interface UseLhClickOutsideOptions {
  /** 监听的事件类型：mousedown 在点击处理器之前触发，适合即时收起 */
  eventType?: 'mousedown' | 'click'
}

/**
 * useLhClickOutside - 点击外部判定
 *
 * 统一替换各组件手写的 document 监听：传入需要「算作内部」的元素引用，
 * 点击落在它们之外时触发回调。
 */
export function useLhClickOutside(
  getEls: () => (HTMLElement | null | undefined)[],
  handler: (event: MouseEvent) => void,
  options: UseLhClickOutsideOptions = {}
) {
  const eventType = options.eventType ?? 'mousedown'

  function listener(event: MouseEvent) {
    const target = event.target as Node | null
    if (!target) return
    const els = getEls().filter((el): el is HTMLElement => !!el)
    if (els.some((el) => el.contains(target))) return
    handler(event)
  }

  onMounted(() => {
    if (typeof document === 'undefined') return
    document.addEventListener(eventType, listener)
  })

  onBeforeUnmount(() => {
    if (typeof document === 'undefined') return
    document.removeEventListener(eventType, listener)
  })

  return { listener }
}

/** useLhFocusTrap 入参 */
export interface UseLhFocusTrapOptions {
  /** 是否用 inert 锁住容器以外的内容（不支持 inert 的环境自动回退纯焦点圈） */
  inertOutside?: boolean
}

/**
 * useLhFocusTrap - 焦点圈
 *
 * trap(el) 后：记录先前焦点、把焦点移入容器、Tab 键在容器内循环；
 * release() 时归还焦点。组件卸载时自动释放。
 */
export function useLhFocusTrap(options: UseLhFocusTrapOptions = {}) {
  const trapped = ref<HTMLElement | null>(null)
  let savedActive: HTMLElement | null = null
  let locked: HTMLElement[] = []

  function onKeydown(event: KeyboardEvent) {
    if (!trapped.value) return
    trapTabKey(trapped.value, event)
  }

  /** 圈住指定元素并把焦点移入 */
  function trap(el: HTMLElement | null, focusTarget?: HTMLElement | null): void {
    if (trapped.value) release(false)
    if (!el) return
    trapped.value = el
    savedActive = saveActiveElement()

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', onKeydown)
    }

    if (options.inertOutside && supportsInert()) {
      locked = setInertOutside(el, true, locked)
    }

    if (focusTarget) {
      // 弹层此时尚未落位（同 tick 内才写入定位样式），不阻止滚动会把页面拽到
      // teleport 临时挂载点（body 末尾）
      focusTarget.focus({ preventScroll: true })
    } else {
      nextTick(() => focusFirst(el))
    }
  }

  /** 释放焦点圈并归还焦点 */
  function release(returnFocus = true): void {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', onKeydown)
    }
    if (locked.length) {
      locked = setInertOutside(trapped.value as HTMLElement, false, locked)
    }
    if (returnFocus) restoreActiveElement(savedActive)
    savedActive = null
    trapped.value = null
  }

  onBeforeUnmount(() => release(false))

  return { trapped, trap, release }
}

/** 触发方式 */
export type LhTriggerType = 'hover' | 'click' | 'focus' | 'manual' | 'contextmenu'

/** useLhTrigger 入参 */
export interface UseLhTriggerOptions {
  /** 触发方式（可传响应式引用） */
  trigger: LhTriggerType | Ref<LhTriggerType>
  /** 可见状态（由组件持有，composable 只负责改它） */
  visible: Ref<boolean>
  /** 是否禁用 */
  disabled?: Ref<boolean | undefined>
  /** 受控模式：为真时 hover/click/focus 都不再直接改 visible */
  isControlled?: Ref<boolean | undefined>
  /** 显隐延迟 */
  delay?: { show: number; hide: number } | Ref<{ show: number; hide: number }>
  /** visible 变为 true 时触发 */
  onShow?: () => void
  /** visible 变为 false 时触发 */
  onHide?: () => void
}

/**
 * useLhTrigger - 统一的显隐触发逻辑
 *
 * 把 hover / click / focus / manual 四种模式、显隐延迟双 timer、
 * 受控模式判定收敛到一处，组件模板只需绑定返回的事件处理器。
 */
export function useLhTrigger(options: UseLhTriggerOptions) {
  let showTimer: ReturnType<typeof setTimeout> | null = null
  let hideTimer: ReturnType<typeof setTimeout> | null = null

  const trigger = computed(() => unref(options.trigger))
  const delay = computed(() =>
    unref(options.delay ?? { show: 0, hide: 0 })
  )
  // 延迟只用于防误触的 hover/focus；click 与 manual 立即响应
  const useDelay = computed(() => trigger.value === 'hover' || trigger.value === 'focus')
  const disabled = computed(() => options.disabled?.value === true)
  const isControlled = computed(() => options.isControlled?.value === true)

  function clearTimers() {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
  }

  function setVisible(value: boolean) {
    if (options.visible.value === value) return
    options.visible.value = value
    if (value) options.onShow?.()
    else options.onHide?.()
  }

  /** 显示（禁用时不变更状态；受控模式下编程式调用仍生效，交由外部 watch 决定） */
  function show() {
    if (disabled.value) return
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    const showDelay = useDelay.value ? delay.value.show : 0
    if (showDelay > 0) {
      showTimer = setTimeout(() => {
        setVisible(true)
        showTimer = null
      }, showDelay)
    } else {
      setVisible(true)
    }
  }

  /** 隐藏 */
  function hide() {
    if (disabled.value) return
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    const hideDelay = useDelay.value ? delay.value.hide : 0
    if (hideDelay > 0) {
      hideTimer = setTimeout(() => {
        setVisible(false)
        hideTimer = null
      }, hideDelay)
    } else {
      setVisible(false)
    }
  }

  function toggle() {
    if (options.visible.value) hide()
    else show()
  }

  // —— 模板事件处理器，按 trigger 取舍；受控模式下全部不响应（由外部控制显隐） ——

  function onTriggerMouseenter() {
    if (isControlled.value || trigger.value !== 'hover') return
    show()
  }

  function onTriggerMouseleave() {
    if (isControlled.value || trigger.value !== 'hover') return
    hide()
  }

  function onTriggerClick() {
    if (isControlled.value || trigger.value !== 'click') return
    toggle()
  }

  function onTriggerFocusin() {
    // hover 模式下键盘焦点进入同样展示（无障碍）；click 模式不响应焦点
    if (isControlled.value || (trigger.value !== 'focus' && trigger.value !== 'hover')) return
    show()
  }

  function onTriggerFocusout() {
    if (isControlled.value || (trigger.value !== 'focus' && trigger.value !== 'hover')) return
    hide()
  }

  onBeforeUnmount(clearTimers)

  return {
    show,
    hide,
    toggle,
    onTriggerMouseenter,
    onTriggerMouseleave,
    onTriggerClick,
    onTriggerFocusin,
    onTriggerFocusout,
  }
}

// ============================================================================
// 滚动停止事件（scrollend）：原生事件优先，旧浏览器退回 scroll + 防抖
// ============================================================================

import { LH_BACKTOP_SCROLLEND_DELAY, supportsScrollEnd } from '@lh-ui/share/core/backtop'

/** useLhScrollEnd 入参 */
export interface UseLhScrollEndOptions {
  /** 不支持原生 scrollend 时的防抖静止阈值 ms，默认 150 */
  delay?: number
}

/**
 * useLhScrollEnd - 滚动停止回调
 *
 * 支持原生 scrollend 的环境直接挂原生事件（浏览器自己判断静止）；
 * 不支持的环境退回 scroll 事件 + 固定阈值防抖。组件卸载时全部清理。
 */
export function useLhScrollEnd(
  getTarget: () => HTMLElement | Window | null,
  handler: () => void,
  options: UseLhScrollEndOptions = {},
) {
  let timer: ReturnType<typeof setTimeout> | null = null
  const delay = options.delay ?? LH_BACKTOP_SCROLLEND_DELAY
  // 挂载时的目标必须留档：卸载时重新调用 getTarget() 若返回不同目标
  // （元素被替换），原目标上的监听器会泄漏
  let attachedTarget: HTMLElement | Window | null = null

  function debounced(): void {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      handler()
    }, delay)
  }

  function clear(): void {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  onMounted(() => {
    const target = getTarget()
    if (!target) return
    attachedTarget = target
    if (supportsScrollEnd(target)) {
      target.addEventListener('scrollend', handler, { passive: true })
    } else {
      target.addEventListener('scroll', debounced, { passive: true })
    }
  })

  onBeforeUnmount(() => {
    const target = attachedTarget
    if (target) {
      if (supportsScrollEnd(target)) target.removeEventListener('scrollend', handler)
      else target.removeEventListener('scroll', debounced)
      attachedTarget = null
    }
    clear()
  })

  return { clear }
}
