<template>
  <li
    :class="itemClasses"
    :style="itemStyle"
    role="menuitem"
    :tabindex="props.disabled ? -1 : 0"
    :aria-disabled="props.disabled || undefined"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { getMenuItemClassNames } from '@lh-ui/share/core/menu'
import { isActivationKey, sxToStyle } from '@lh-ui/share/core/shared'
import { LH_MENU_KEY } from './types'
import type { LhMenuItemProps } from './types'

defineOptions({ name: 'LhMenuItem' })

const props = withDefaults(defineProps<LhMenuItemProps>(), {
  disabled: false,
  sx: undefined,
})

const emit = defineEmits<{
  click: [index: string]
}>()

const context = inject(LH_MENU_KEY, null)

const itemClasses = computed(() =>
  getMenuItemClassNames({
    active: context ? context.isActive(props.index) : false,
    disabled: !!props.disabled,
  }),
)

const itemStyle = computed(() => sxToStyle(props.sx ?? {}))

function handleClick(): void {
  if (props.disabled) return
  emit('click', props.index)
  context?.handleSelect(props.index, [props.index])
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  if (isActivationKey(event)) {
    event.preventDefault()
    handleClick()
  }
}
</script>
