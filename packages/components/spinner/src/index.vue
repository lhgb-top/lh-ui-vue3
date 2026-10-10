<template>
  <span
    :class="spinnerClasses"
    :style="{ width: `${diameter}px`, height: `${diameter}px`, color: props.color, ...sxStyle }"
    aria-hidden="true"
  >
    <svg
      class="lh-spinner__circle"
      viewBox="0 0 50 50"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        stroke-width="5"
        stroke-linecap="round"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSpinnerClassNames, LH_SPINNER_SIZE_PX } from '@lh-ui/share/core/spinner'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhSpinnerProps } from './types'

defineOptions({ name: 'LhSpinner' })

const props = withDefaults(defineProps<LhSpinnerProps>(), {
  size: 'medium',
  color: undefined,
  sx: undefined,
})

const spinnerClasses = computed(() => getSpinnerClassNames({ size: props.size }))

const diameter = computed(() => LH_SPINNER_SIZE_PX[props.size])

const sxStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
