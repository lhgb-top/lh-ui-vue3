<template>
  <span
    :class="['lh-icon', props.name ? `lh-icon--${props.name}` : '']"
    :style="mergedStyle"
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
import { getIconSvg, getIconSize } from '@lh-ui/core/icon'
import { useLhIcon } from './index'
import type { LhIconProps } from './types'

defineOptions({
  name: 'LhIcon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LhIconProps>(), {
  name: undefined,
  size: undefined,
  color: undefined,
  themeVars: undefined,
  bgPattern: undefined,
})

const { svgPath, iconStyle, iconSize, componentStyle } = useLhIcon(props)

const mergedStyle = computed(() => ({
  ...iconStyle.value,
  ...componentStyle.value,
}))
</script>
