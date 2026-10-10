<template>
  <section :class="layoutClasses" :style="layoutStyle">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { LH_LAYOUT_KEY } from './types'
import type { LhLayoutProps } from './types'

defineOptions({ name: 'LhLayout' })

const props = withDefaults(defineProps<LhLayoutProps>(), {
  direction: 'horizontal',
  sx: undefined,
})

const hasAside = ref(false)

provide(LH_LAYOUT_KEY, {
  registerAside: () => { hasAside.value = true },
  unregisterAside: () => { hasAside.value = false },
})

const layoutClasses = computed(() => {
  const vertical = props.direction === 'vertical' || hasAside.value
  return ['lh-layout', vertical ? 'lh-layout--vertical' : 'lh-layout--horizontal']
})

const layoutStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
