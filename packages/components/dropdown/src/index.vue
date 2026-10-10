<template>
  <div
    ref="triggerRef"
    class="lh-dropdown"
    :style="triggerStyle"
    :aria-expanded="isVisible ? 'true' : 'false'"
    aria-haspopup="menu"
    @mouseenter="onTriggerMouseenter"
    @mouseleave="onTriggerMouseleave"
    @click="onTriggerClick"
    @contextmenu="onTriggerContextmenu"
  >
    <slot></slot>
    <Teleport :to="teleportTarget">
      <Transition name="lh-dropdown-fade">
        <ul
          v-if="isVisible"
          :id="dropdownId"
          ref="popperRef"
          :class="menuClass"
          :style="mergedMenuStyle"
          role="menu"
          @mouseenter="onMenuMouseenter"
          @mouseleave="onMenuMouseleave"
          @keydown="onMenuKeydown"
        >
          <slot name="dropdown"></slot>
        </ul>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type { LhDropdownProps } from './types'
import { useLhDropdown } from './index'
import { LH_DROPDOWN_KEY } from './types'

defineOptions({ name: 'LhDropdown' })

const props = withDefaults(defineProps<LhDropdownProps>(), {
  trigger: 'click',
  placement: 'bottom-start',
  hideOnClick: true,
  teleportTarget: 'body',
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  command: [command: string | number | undefined]
  'visible-change': [value: boolean]
}>()

const {
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
} = useLhDropdown(props, emit as (event: string, ...args: any[]) => void)

provide(LH_DROPDOWN_KEY, context)

defineExpose({ isVisible, show, hide, toggle })
</script>
