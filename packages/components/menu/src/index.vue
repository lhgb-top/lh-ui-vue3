<template>
  <ul
    ref="rootRef"
    :class="menuClasses"
    :style="menuStyle"
    :role="props.mode === 'horizontal' ? 'menubar' : 'menu'"
    @keydown="handleKeydown"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { getMenuClassNames, isMenuOpen, moveMenuFocus, toggleMenuOpen } from '@lh-ui/share/core/menu'
import { LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import { LH_MENU_KEY } from './types'
import type { LhMenuProps } from './types'

defineOptions({ name: 'LhMenu' })

const props = withDefaults(defineProps<LhMenuProps>(), {
  modelValue: undefined,
  mode: 'vertical',
  collapse: false,
  defaultOpeneds: () => [],
  openeds: undefined,
  uniqueOpened: false,
  sx: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:openeds': [value: string[]]
  select: [index: string, indexPath: string[]]
  open: [index: string, indexPath: string[]]
  close: [index: string, indexPath: string[]]
}>()

// 激活态：受控（传了 modelValue）走 props；未传时内部维护
const innerActiveKey = ref('')
const activeKey = computed(() => props.modelValue ?? innerActiveKey.value)

// 展开态：受控（传了 openeds）走 props；未传时内部维护（初值取 defaultOpeneds）
const innerOpeneds = ref<string[]>([...(props.defaultOpeneds ?? [])])
const openeds = computed(() => props.openeds ?? innerOpeneds.value)

const isPopperMode = () => props.mode === 'horizontal' || !!props.collapse

function handleSelect(key: string, indexPath: string[]): void {
  innerActiveKey.value = key
  emit('update:modelValue', key)
  emit('select', key, indexPath)
}

function handleToggleOpen(key: string): void {
  const next = toggleMenuOpen(openeds.value, key, !!props.uniqueOpened)
  innerOpeneds.value = next
  emit('update:openeds', next)
  const path = [key]
  if (next.includes(key)) emit('open', key, path)
  else emit('close', key, path)
}

function isOpen(key: string): boolean {
  return isMenuOpen(openeds.value, key)
}

function isActive(key: string): boolean {
  return activeKey.value === key
}

const depth = () => 0

// ============ 垂直内联模式的 ↑/↓ 跨边界遍历 ============
// 事件委托到根节点：可见项 = 叶子项 + 子菜单标题（DOM 序即视觉序），
// 遍历越过子菜单标题 ↔ 面板内项 ↔ 兄弟节点边界。跳过禁用项（tabindex -1）
// 与收起面板内的项（aria-hidden）。水平模式不走此逻辑（标题自身的 ←/→ 语义保留）。
const rootRef = ref<HTMLElement | null>(null)

function collectFocusable(): HTMLElement[] {
  const root = rootRef.value
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>('[role="menuitem"]')).filter((el) => {
    if (el.tabIndex === -1) return false
    return el.closest('[aria-hidden="true"]') == null
  })
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.mode !== 'vertical') return
  const target = event.target as HTMLElement | null
  const key = event.key
  let direction: 1 | -1 | null = null
  if (key === LH_KEYS.ArrowDown) direction = 1
  else if (key === LH_KEYS.ArrowUp) direction = -1

  if (direction != null) {
    const items = collectFocusable()
    const next = moveMenuFocus(items, target, direction)
    if (next) {
      event.preventDefault()
      next.focus()
    }
    return
  }

  if (key === LH_KEYS.Home || key === LH_KEYS.End) {
    const items = collectFocusable()
    if (items.length === 0) return
    event.preventDefault()
    ;(key === LH_KEYS.Home ? items[0] : items[items.length - 1]).focus()
  }
}

provide(LH_MENU_KEY, {
  mode: computed(() => props.mode),
  collapse: computed(() => props.collapse),
  activeKey,
  openeds,
  isPopperMode,
  handleSelect,
  handleToggleOpen,
  isOpen,
  isActive,
  depth,
})

const menuClasses = computed(() =>
  getMenuClassNames({ mode: props.mode, collapse: !!props.collapse }),
)

const menuStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
