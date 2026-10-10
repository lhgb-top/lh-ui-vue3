<template>
  <div
    class="lh-skeleton-item"
    :class="[`lh-skeleton-item--${props.variant}`, { 'lh-skeleton-item--animated': props.animated }]"
    :style="itemStyle"
    aria-hidden="true"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhSkeletonItemProps } from './types'

defineOptions({ name: 'LhSkeletonItem' })

const props = withDefaults(defineProps<LhSkeletonItemProps>(), {
  variant: 'text',
  animated: true,
  sx: undefined,
})

const itemStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
