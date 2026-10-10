<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import ApiStyleToggle from './ApiStyleToggle.vue'

const { page } = useData()

const isComponentDoc = computed(() => {
  const path = page.value?.relativePath || ''
  return path.startsWith('components/') || path.startsWith('en/components/')
})
</script>

<template>
  <ApiStyleToggle v-if="isComponentDoc" />
  <slot />
</template>
