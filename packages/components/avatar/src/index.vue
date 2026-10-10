<template>
  <span
    :class="avatarClasses"
    :style="avatarStyle"
    :role="avatarRole"
    :aria-label="avatarRole ? props.alt : undefined"
  >
    <img
      v-if="isImageSource(props.src) && !loadError"
      :src="props.src"
      :alt="props.alt || props.text || 'avatar'"
      :style="{ objectFit: props.fit }"
      class="lh-avatar__img"
      @error="handleError"
    />
    <LhIcon
      v-else-if="props.icon"
      :name="props.icon"
      class="lh-avatar__icon"
      aria-hidden="true"
    />
    <span
      v-else-if="avatarText"
      class="lh-avatar__text"
    >
      {{ avatarText }}
    </span>
    <slot v-else></slot>
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'LhAvatar' })

import { computed, ref } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { getAvatarClassNames, getAvatarText, isImageSource } from '@lh-ui/share/core/avatar'
import LhIcon from '../../icon'
import type { LhAvatarProps } from './types'

const props = withDefaults(defineProps<LhAvatarProps>(), {
  src: undefined,
  alt: undefined,
  icon: undefined,
  text: undefined,
  shape: 'circle',
  size: 'medium',
  fit: 'cover',
  sx: undefined,
})

const emit = defineEmits<{
  error: [e: Event]
}>()

const loadError = ref(false)

const avatarClasses = computed(() =>
  getAvatarClassNames({
    size: props.size,
    shape: props.shape,
  })
)

const avatarText = computed(() => getAvatarText(props.text ?? ''))

const avatarStyle = computed(() => sxToStyle(props.sx ?? {}))

// 图片分支由 <img alt> 自身命名；图标/文字分支由 alt 提供无障碍名称
const avatarRole = computed(() =>
  isImageSource(props.src) && !loadError.value ? undefined : 'img',
)

function handleError(e: Event) {
  loadError.value = true
  emit('error', e)
}
</script>
