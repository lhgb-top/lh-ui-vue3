<template>
  <li
    class="lh-menu-item-group"
    :style="groupStyle"
    role="presentation"
  >
    <div class="lh-menu-item-group__title">
      <slot name="title">{{ props.title }}</slot>
    </div>
    <ul
      class="lh-menu-item-group__list"
      role="group"
    >
      <slot />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhMenuItemGroupProps } from './types'

defineOptions({ name: 'LhMenuItemGroup' })

const props = withDefaults(defineProps<LhMenuItemGroupProps>(), {
  title: undefined,
  sx: undefined,
})

const groupStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
