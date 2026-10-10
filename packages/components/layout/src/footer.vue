<template>
  <footer class="lh-layout-footer" :style="footerStyle">
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhLayoutSectionProps } from './types'

defineOptions({ name: 'LhLayoutFooter' })

const props = withDefaults(defineProps<LhLayoutSectionProps>(), { sx: undefined })
const footerStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
