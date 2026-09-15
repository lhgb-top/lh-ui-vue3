<template>
  <span
    :class="avatarClasses"
    :style="avatarStyle"
  >
    <img
      v-if="isImageSource(props.src) && !loadError"
      :src="props.src"
      :alt="props.alt || props.text || 'avatar'"
      :style="{ objectFit: props.fit }"
      class="lh-avatar__img"
      @error="handleError"
    />
    <i
      v-else-if="props.icon"
      :class="props.icon"
      class="lh-avatar__icon"
    ></i>
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
import { getAvatarClassNames, getAvatarText, isImageSource } from '@lh-ui/core/avatar'
import type { LhAvatarProps } from './types'

const props = withDefaults(defineProps<LhAvatarProps>(), {
  src: undefined,
  alt: undefined,
  icon: undefined,
  text: undefined,
  shape: 'circle',
  size: 'medium',
  fit: 'cover',
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

const avatarStyle = computed(() => ({}))

function handleError(e: Event) {
  loadError.value = true
  emit('error', e)
}
</script>
