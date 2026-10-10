<template>
  <ol
    :class="timelineClasses"
    :style="timelineStyle"
  >
    <slot />
  </ol>
</template>

<script setup lang="ts">
import { computed, provide, reactive } from 'vue'
import { getTimelineClassNames } from '@lh-ui/share/core/timeline'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { LH_TIMELINE_CONTEXT_KEY } from './types'
import type { LhTimelineProps } from './types'

defineOptions({ name: 'LhTimeline' })

const props = withDefaults(defineProps<LhTimelineProps>(), {
  mode: 'left',
  sx: undefined,
})

const tokens = reactive<object[]>([])

provide(LH_TIMELINE_CONTEXT_KEY, {
  mode: computed(() => props.mode),
  tokens,
  register: (token) => tokens.push(token),
  unregister: (token) => {
    const index = tokens.indexOf(token)
    if (index !== -1) tokens.splice(index, 1)
  },
})

const timelineClasses = computed(() => getTimelineClassNames(props.mode))

const timelineStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
