<template>
  <div
    :class="rowClasses"
    :style="rowStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getGridRowClassNames } from '@lh-ui/share/core/grid'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhRowProps } from './types'

defineOptions({ name: 'LhRow' })

const props = withDefaults(defineProps<LhRowProps>(), {
  justify: 'start',
  align: 'top',
  gutter: 0,
  wrap: true,
  sx: undefined,
})

const rowClasses = computed(() =>
  getGridRowClassNames({ justify: props.justify, align: props.align, wrap: props.wrap }),
)

const rowStyle = computed(() => {
  const style: Record<string, string> = { ...sxToStyle(props.sx ?? {}) }
  // gutter 用负外边距抵消子列内边距（横向）/ 行间距（纵向）
  if (props.gutter) {
    const gutter = typeof props.gutter === 'number' ? props.gutter : props.gutter[0]
    style.marginInline = `-${gutter / 2}px`
  }
  return style
})
</script>
