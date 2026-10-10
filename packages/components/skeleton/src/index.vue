<template>
  <div
    v-if="props.loading"
    :class="skeletonClasses"
    :style="skeletonStyle"
    :aria-busy="true"
    aria-live="polite"
  >
    <LhSkeletonItem
      v-if="props.avatar"
      variant="circle"
      :animated="props.animated"
      class="lh-skeleton__avatar"
    />
    <div class="lh-skeleton__content">
      <LhSkeletonItem
        v-for="(width, i) in rowWidths"
        :key="i"
        variant="text"
        :animated="props.animated"
        :style="{ width }"
      />
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSkeletonClassNames, getSkeletonRowWidths } from '@lh-ui/share/core/skeleton'
import { sxToStyle } from '@lh-ui/share/core/shared'
import LhSkeletonItem from './skeleton-item.vue'
import type { LhSkeletonProps } from './types'

defineOptions({ name: 'LhSkeleton' })

const props = withDefaults(defineProps<LhSkeletonProps>(), {
  loading: true,
  rows: 3,
  avatar: false,
  animated: true,
  sx: undefined,
})

const skeletonClasses = computed(() =>
  getSkeletonClassNames({
    animated: !!props.animated,
    avatar: !!props.avatar,
  }),
)

const rowWidths = computed(() => getSkeletonRowWidths(props.rows ?? 3))

const skeletonStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
