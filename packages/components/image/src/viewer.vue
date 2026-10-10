<template>
  <teleport to="body">
    <div
      ref="viewerRef"
      class="lh-image-viewer"
      role="dialog"
      aria-modal="true"
      :aria-label="t('image.preview', '预览图片')"
      tabindex="-1"
      @keydown="handleKeydown"
    >
      <div class="lh-image-viewer__canvas">
        <img
          :src="images[index]"
          class="lh-image-viewer__img"
          :alt="images[index]"
          :style="imageStyle"
        >
      </div>
      <div class="lh-image-viewer__toolbar">
        <button
          type="button"
          class="lh-image-viewer__tool"
          :aria-label="t('image.zoomOut', '缩小')"
          @click="zoom(-1)"
        >−</button>
        <button
          type="button"
          class="lh-image-viewer__tool"
          :aria-label="t('image.zoomIn', '放大')"
          @click="zoom(1)"
        >＋</button>
        <button
          type="button"
          class="lh-image-viewer__tool"
          :aria-label="t('image.rotate', '旋转')"
          @click="rotate"
        >⟳</button>
      </div>
      <button
        v-if="images.length > 1"
        type="button"
        class="lh-image-viewer__nav lh-image-viewer__nav--prev"
        :aria-label="t('image.prev', '上一张')"
        @click="go(-1)"
      >‹</button>
      <button
        v-if="images.length > 1"
        type="button"
        class="lh-image-viewer__nav lh-image-viewer__nav--next"
        :aria-label="t('image.next', '下一张')"
        @click="go(1)"
      >›</button>
      <button
        type="button"
        class="lh-image-viewer__close"
        :aria-label="t('dialog.close', '关闭')"
        @click="emit('close')"
      >✕</button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getViewerImageStyle, stepRotate, stepViewerIndex, stepZoom } from '@lh-ui/share/core/image'
import { useLhFocusTrap } from '~/composables'
import { lhlocale } from '~/locale'
import { LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import type { LhImageViewerProps } from './types'

defineOptions({ name: 'LhImageViewer' })

const props = withDefaults(defineProps<LhImageViewerProps>(), {
  initialIndex: 0,
  sx: undefined,
})

const emit = defineEmits<{
  close: []
  switch: [index: number]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const viewerRef = ref<HTMLElement>()
const zoomLevel = ref(1)
const rotateDeg = ref(0)
const index = ref(props.initialIndex)

const { trap, release } = useLhFocusTrap()

onMounted(() => {
  viewerRef.value?.focus({ preventScroll: true })
  trap(viewerRef.value)
})

onBeforeUnmount(() => {
  release()
})

const imageStyle = computed(() => ({
  ...getViewerImageStyle({ zoom: zoomLevel.value, rotate: rotateDeg.value, index: index.value, total: props.images.length }),
  ...sxToStyle(props.sx ?? {}),
}))

function zoom(direction: 1 | -1): void {
  zoomLevel.value = stepZoom(zoomLevel.value, direction)
}

function rotate(): void {
  rotateDeg.value = stepRotate(rotateDeg.value)
}

function go(delta: number): void {
  index.value = stepViewerIndex(index.value, props.images.length, delta)
  emit('switch', index.value)
}

function handleKeydown(event: KeyboardEvent): void {
  const actions: Record<string, () => void> = {
    [LH_KEYS.Escape]: () => emit('close'),
    [LH_KEYS.ArrowRight]: () => go(1),
    [LH_KEYS.ArrowLeft]: () => go(-1),
  }
  const action = actions[event.key]
  if (action) {
    event.preventDefault()
    action()
  }
}
</script>
