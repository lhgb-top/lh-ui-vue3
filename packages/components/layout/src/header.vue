<template>
  <header class="lh-layout-header" :style="headerStyle">
    <slot />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhLayoutSectionProps } from './types'

defineOptions({ name: 'LhLayoutHeader' })

const props = withDefaults(defineProps<LhLayoutSectionProps>(), { sx: undefined })
const headerStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
