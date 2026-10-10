<template>
  <aside class="lh-layout-aside" :style="asideStyle" :aria-label="props.ariaLabel">
    <slot />
  </aside>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { LH_LAYOUT_KEY } from './types'
import type { LhLayoutAsideProps } from './types'

defineOptions({ name: 'LhLayoutAside' })

const props = withDefaults(defineProps<LhLayoutAsideProps>(), {
  width: undefined,
  ariaLabel: undefined,
  sx: undefined,
})

const context = inject(LH_LAYOUT_KEY, null)
onMounted(() => context?.registerAside())
onUnmounted(() => context?.unregisterAside())

const asideStyle = computed(() => {
  const style: Record<string, string> = { ...sxToStyle(props.sx ?? {}) }
  if (props.width != null) style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  return style
})
</script>
