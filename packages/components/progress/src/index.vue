<template>
  <div :class="progressClasses">
    <!-- 线形进度条 -->
    <template v-if="props.type === 'line'">
      <div
        class="lh-progress__bar"
        :style="{ height: `${props.strokeWidth}px` }"
      >
        <div
          class="lh-progress__bar-inner"
          :style="barStyle"
        ></div>
      </div>
      <div
        v-if="props.showText"
        class="lh-progress__text"
      >
        <slot
          name="text"
          :percentage="clamped"
        >
          {{ text }}
        </slot>
      </div>
    </template>

    <!-- 圆形进度环 -->
    <template v-else>
      <div
        class="lh-progress__circle"
        :style="{ width: `${props.width}px`, height: `${props.width}px` }"
      >
        <svg viewBox="0 0 100 100">
          <circle
            class="lh-progress__circle-track"
            cx="50"
            cy="50"
            :r="circleRadius"
            fill="none"
            :stroke-width="relativeStroke"
          />
          <circle
            class="lh-progress__circle-value"
            cx="50"
            cy="50"
            :r="circleRadius"
            fill="none"
            :stroke-width="relativeStroke"
            :stroke="trackColor"
            :stroke-dasharray="dasharray"
            stroke-linecap="round"
            :style="circleTransform"
          />
        </svg>
        <div
          v-if="props.showText"
          class="lh-progress__text lh-progress__circle-text"
        >
          <slot
            name="text"
            :percentage="clamped"
          >
            {{ text }}
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LhProgress' })

import { computed } from 'vue'
import {
  clampPercent,
  resolveStatus,
  getProgressClassNames,
  getProgressColor,
  formatPercentText,
} from '@lh-ui/core/progress'
import type { LhProgressProps } from './types'

const props = withDefaults(defineProps<LhProgressProps>(), {
  percentage: 0,
  type: 'line',
  status: 'normal',
  color: undefined,
  strokeWidth: 6,
  width: 126,
  showText: true,
  format: undefined,
})

const clamped = computed(() => clampPercent(props.percentage))

const status = computed(() => resolveStatus(clamped.value, props.status))

const trackColor = computed(() => getProgressColor(status.value, props.color, clamped.value))

const text = computed(() =>
  props.format ? props.format(clamped.value) : formatPercentText(clamped.value)
)

const progressClasses = computed(() =>
  getProgressClassNames({
    type: props.type,
    status: status.value,
    showText: props.showText,
    strokeWidth: props.strokeWidth,
    width: props.width,
  })
)

const barStyle = computed(() => ({
  width: `${clamped.value}%`,
  backgroundColor: trackColor.value,
}))

// SVG viewBox 为 100x100，描边宽度按画布等比缩放
const relativeStroke = computed(() => {
  const ratio = props.strokeWidth / props.width
  return Number((ratio * 100).toFixed(2))
})

const circleRadius = computed(() => 50 - relativeStroke.value / 2)

const dasharray = computed(() => {
  const circumference = 2 * Math.PI * circleRadius.value
  return `${(clamped.value / 100) * circumference} ${circumference}`
})

const circleTransform = computed(() => ({
  transform: 'rotate(-90deg)',
  transformOrigin: 'center',
}))
</script>
