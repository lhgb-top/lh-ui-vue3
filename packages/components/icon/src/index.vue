<template>
  <span
    :class="['lh-icon', props.name ? `lh-icon--${props.name}` : '']"
    :style="iconStyle"
    v-bind="$attrs"
  >
    <svg
      v-if="svgPath"
      viewBox="0 0 24 24"
      :width="iconSize"
      :height="iconSize"
      fill="currentColor"
    >
      <path :d="svgPath" />
    </svg>
    <slot v-else></slot>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { getIconSvg, getIconStyle, getIconSize } from '@lh-ui/core/icon'
import type { LhIconProps } from './types'

defineOptions({
  name: 'LhIcon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LhIconProps>(), {
  name: undefined,
  size: undefined,
  color: undefined,
})

const svgPath = computed(() => getIconSvg(props.name))
const iconStyle = computed(() => getIconStyle({ size: props.size, color: props.color }))
const iconSize = computed(() => getIconSize(props.size))
</script>
