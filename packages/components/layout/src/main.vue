<template>
  <main class="lh-layout-main" :style="mainStyle">
    <slot />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhLayoutSectionProps } from './types'

defineOptions({ name: 'LhLayoutMain' })

const props = withDefaults(defineProps<LhLayoutSectionProps>(), { sx: undefined })
const mainStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
