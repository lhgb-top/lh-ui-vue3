<template>
  <span
    :class="imageClasses"
    :style="imageStyle"
  >
    <img
      v-if="!error"
      :src="props.src"
      :alt="props.alt"
      class="lh-image__inner"
      :class="`lh-image__inner--${props.fit}`"
      :loading="props.lazy ? 'lazy' : undefined"
      decoding="async"
      @load="handleLoad"
      @error="handleError"
      @click="openViewer"
    >
    <span
      v-else
      class="lh-image__error"
    >
      <slot name="error">{{ t('image.error', '加载失败') }}</slot>
    </span>
    <LhImageViewer
      v-if="viewerVisible"
      :images="previewList"
      :initial-index="0"
      @close="viewerVisible = false"
    />
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getImageClassNames, normalizePreviewList } from '@lh-ui/share/core/image'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import LhImageViewer from './viewer.vue'
import type { LhImageProps } from './types'

defineOptions({ name: 'LhImage' })

const props = withDefaults(defineProps<LhImageProps>(), {
  fit: 'cover',
  preview: false,
  previewSrcList: undefined,
  lazy: false,
  sx: undefined,
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const error = ref(false)
const viewerVisible = ref(false)

const previewList = computed(() => normalizePreviewList(props.src, props.previewSrcList))

function handleLoad(event: Event): void {
  error.value = false
  emit('load', event)
}

function handleError(event: Event): void {
  error.value = true
  emit('error', event)
}

function openViewer(): void {
  if (props.preview) viewerVisible.value = true
}

const imageClasses = computed(() =>
  getImageClassNames({ fit: props.fit, error: error.value, loaded: !error.value, preview: !!props.preview }),
)

const imageStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
