<template>
  <span
    :class="tagClasses"
    @click="handleClick"
  >
    <span class="lh-tag__text">
      <slot></slot>
    </span>
    <button
      v-if="props.closable"
      class="lh-tag__close"
      :disabled="props.disabled"
      @click.stop="handleClose"
    >
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
      >
        <path
          fill="currentColor"
          d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z"
        />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'LhTag' })

import { computed } from 'vue'
import { getTagClassNames } from '@lh-ui/core/tag'
import type { LhTagProps } from './types'

const props = withDefaults(defineProps<LhTagProps>(), {
  type: 'default',
  size: 'medium',
  closable: false,
  disabled: false,
  round: false,
  hit: false,
  onClose: undefined,
})

const emit = defineEmits<{
  click: [e: MouseEvent]
  close: [e: Event]
}>()

const tagClasses = computed(() =>
  getTagClassNames({
    type: props.type,
    size: props.size,
    closable: props.closable,
    disabled: props.disabled,
    round: props.round,
    hit: props.hit,
  })
)

function handleClick(e: MouseEvent) {
  emit('click', e)
}

function handleClose(e: Event) {
  if (props.disabled) return
  props.onClose?.(e)
  emit('close', e)
}
</script>