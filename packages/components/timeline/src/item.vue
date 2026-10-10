<template>
  <li
    :class="itemClasses"
    :style="itemStyle"
  >
    <div class="lh-timeline__dot-wrap">
      <span
        class="lh-timeline__dot"
        aria-hidden="true"
      >
        <slot name="dot" />
      </span>
    </div>
    <div class="lh-timeline__body">
      <span
        v-if="props.timestamp || $slots.timestamp"
        class="lh-timeline__timestamp"
      >
        <slot name="timestamp">{{ props.timestamp }}</slot>
      </span>
      <div class="lh-timeline__content">
        <slot />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, ref } from 'vue'
import { getTimelineItemClassNames, getTimelineSide } from '@lh-ui/share/core/timeline'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { LH_TIMELINE_CONTEXT_KEY } from './types'
import type { LhTimelineItemProps } from './types'

defineOptions({ name: 'LhTimelineItem' })

const props = withDefaults(defineProps<LhTimelineItemProps>(), {
  timestamp: undefined,
  type: undefined,
  hollow: false,
  sx: undefined,
})

const context = inject(LH_TIMELINE_CONTEXT_KEY, null)
// 脱离 LhTimeline 单用兜底：按 left 模式、视为唯一节点渲染
const token = ref({})
context?.register(token.value)
onUnmounted(() => context?.unregister(token.value))

const index = computed(() => (context ? context.tokens.indexOf(token.value) : 0))
const isLast = computed(() => (context ? index.value === context.tokens.length - 1 : true))
const side = computed(() =>
  context?.mode.value === 'alternate' ? getTimelineSide(index.value) : 'left',
)

const itemClasses = computed(() =>
  getTimelineItemClassNames({
    type: props.type,
    hollow: !!props.hollow,
    side: side.value,
    isLast: isLast.value,
  }),
)

const itemStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
