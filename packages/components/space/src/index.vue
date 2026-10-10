<template>
  <div
    :class="spaceClasses"
    :style="spaceStyle"
    role="presentation"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSpaceClassNames, resolveSpaceGaps } from '@lh-ui/share/core/space'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhSpaceProps } from './types'

defineOptions({ name: 'LhSpace' })

const props = withDefaults(defineProps<LhSpaceProps>(), {
  direction: 'horizontal',
  size: 'medium',
  wrap: true,
  alignment: 'start',
  sx: undefined,
})

const spaceClasses = computed(() =>
  getSpaceClassNames({
    direction: props.direction,
    wrap: props.direction === 'horizontal' && props.wrap,
    size: typeof props.size === 'string' ? props.size : 'custom',
  }),
)

// 间距交给原生 CSS gap（flex/grid 原生能力），无 JS 测量；
// sx 展开在最后，消费者可覆盖对齐与间距
const spaceStyle = computed(() => {
  const { columnGap, rowGap } = resolveSpaceGaps(props.size)
  return {
    columnGap,
    rowGap,
    alignItems: props.alignment,
    ...sxToStyle(props.sx ?? {}),
  }
})
</script>
