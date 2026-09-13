<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="demo-block">
    <div v-if="title" class="demo-block__header">
      <span class="demo-block__title">{{ title }}</span>
    </div>
    <div class="demo-block__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  border: 1px solid var(--vp-c-border, #e2e8f0);
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
}

.demo-block__header {
  padding: 8px 16px;
  background-color: var(--vp-c-bg-soft, #f8fafc);
  border-bottom: 1px solid var(--vp-c-border, #e2e8f0);
}

.demo-block__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1, #1a1a1a);
}

.demo-block__content {
  padding: 24px 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
