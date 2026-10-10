<template>
  <li
    :class="subMenuClasses"
    :style="subMenuStyle"
  >
    <!-- 标题（触发器） -->
    <div
      ref="titleRef"
      class="lh-sub-menu__title"
      role="menuitem"
      :aria-expanded="opened"
      :aria-haspopup="true"
      :aria-controls="panelId"
      :aria-disabled="props.disabled || undefined"
      :tabindex="props.disabled ? -1 : 0"
      @click="handleTitleClick"
      @mouseenter="handleTitleMouseenter"
      @mouseleave="handleTitleMouseleave"
      @keydown="handleTitleKeydown"
    >
      <slot name="title">{{ props.title }}</slot>
      <span
        class="lh-sub-menu__arrow"
        aria-hidden="true"
      >▾</span>
    </div>

    <!-- 飞出面板（水平 / 折叠模式） -->
    <teleport to="body">
      <transition name="lh-sub-menu-fade">
        <ul
          v-if="isPopper && opened"
          :id="panelId"
          ref="popperRef"
          class="lh-sub-menu__popper"
          role="menu"
          :style="panelStyle"
          @mouseenter="handlePanelMouseenter"
          @mouseleave="handlePanelMouseleave"
        >
          <slot />
        </ul>
      </transition>
    </teleport>

    <!-- 内联展开（垂直非折叠模式） -->
    <div
      v-if="!isPopper"
      :id="panelId"
      class="lh-sub-menu__inline"
      role="menu"
      :aria-hidden="!opened"
    >
      <div class="lh-sub-menu__inline-content">
        <slot />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, provide, ref } from 'vue'
import { getSubMenuClassNames } from '@lh-ui/share/core/menu'
import { LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import { useLhPopper, useLhZIndex } from '~/composables'
import { generateId } from '@lh-ui/share/utils'
import { LH_MENU_KEY } from './types'
import type { LhSubMenuProps } from './types'

defineOptions({ name: 'LhSubMenu' })

const props = withDefaults(defineProps<LhSubMenuProps>(), {
  title: undefined,
  disabled: false,
  sx: undefined,
})

const emit = defineEmits<{
  select: [index: string, indexPath: string[]]
}>()

const context = inject(LH_MENU_KEY, null)

const panelId = `lh-sub-menu-panel-${generateId('sm')}`

const isPopper = computed(() => context?.isPopperMode() ?? false)
const opened = computed(() => (context ? context.isOpen(props.index) : false))

const titleRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)

const { zIndex } = useLhZIndex()
const { popperStyle } = useLhPopper({
  triggerRef: titleRef,
  popperRef,
  visible: opened,
  // 顶层子菜单从触发器下方展开；嵌套层级从右侧展开
  placement: computed(() =>
    (context?.depth() ?? 0) > 0 ? 'right-start' : 'bottom-start',
  ),
})

// 子菜单自身提供给后代的深度 +1
const childDepth = (context?.depth() ?? 0) + 1

provide(LH_MENU_KEY, {
  mode: context?.mode ?? computed(() => 'vertical'),
  collapse: context?.collapse ?? computed(() => false),
  activeKey: context?.activeKey ?? ref(''),
  openeds: context?.openeds ?? ref([]),
  isPopperMode: () => context?.isPopperMode() ?? false,
  handleSelect: (key, path) => {
    emit('select', key, [props.index, ...path])
    context?.handleSelect(key, [props.index, ...path])
  },
  handleToggleOpen: (key) => context?.handleToggleOpen(key),
  isOpen: (key) => (context ? context.isOpen(key) : false),
  isActive: (key) => (context ? context.isActive(key) : false),
  depth: () => childDepth,
})

function handleTitleClick(): void {
  if (props.disabled) return
  context?.handleToggleOpen(props.index)
}

function handleTitleMouseenter(): void {
  if (props.disabled || !isPopper.value) return
  context?.handleToggleOpen(props.index)
}

function handleTitleMouseleave(): void {
  // 飞出模式由面板的 mouseleave 收起；此处不主动收起避免焦点误关
}

function handlePanelMouseenter(): void {
  // 保持打开
}

function handlePanelMouseleave(): void {
  if (props.disabled || !isPopper.value) return
  if (opened.value) context?.handleToggleOpen(props.index)
}

function handleTitleKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  switch (event.key) {
    case LH_KEYS.Enter:
    case LH_KEYS.Space:
    case LH_KEYS.ArrowRight: {
      event.preventDefault()
      if (!opened.value) context?.handleToggleOpen(props.index)
      focusFirstPanelItem()
      break
    }
    case LH_KEYS.ArrowLeft: {
      if (opened.value) {
        event.preventDefault()
        context?.handleToggleOpen(props.index)
      }
      break
    }
    case LH_KEYS.Escape: {
      if (opened.value) {
        event.preventDefault()
        context?.handleToggleOpen(props.index)
      }
      break
    }
  }
}

function focusFirstPanelItem(): void {
  const panel = isPopper.value ? popperRef.value : titleRef.value?.parentElement
  if (!panel) return
  const items = panel.querySelectorAll<HTMLElement>('[role="menuitem"]')
  const first = Array.from(items).find((el) => el.tabIndex !== -1)
  first?.focus()
}

const panelStyle = computed(() => ({
  ...popperStyle.value,
  zIndex: String(zIndex.value),
}))

const subMenuClasses = computed(() =>
  getSubMenuClassNames({
    active: context ? context.isActive(props.index) : false,
    disabled: !!props.disabled,
    opened: opened.value,
  }),
)

const subMenuStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
