<template>
  <div
    class="lh-statistic"
    :style="sxStyle"
  >
    <div
      v-if="props.title || $slots.title"
      class="lh-statistic__title"
    >
      <slot name="title">{{ props.title }}</slot>
    </div>
    <div class="lh-statistic__content">
      <span
        v-if="props.prefix || $slots.prefix"
        class="lh-statistic__prefix"
      >
        <slot name="prefix">{{ props.prefix }}</slot>
      </span>
      <span
        class="lh-statistic__value"
        aria-live="polite"
      >{{ displayValue }}</span>
      <span
        v-if="props.suffix || $slots.suffix"
        class="lh-statistic__suffix"
      >
        <slot name="suffix">{{ props.suffix }}</slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LhStatistic' })

import { computed } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { formatStatisticValue } from '@lh-ui/share/core/statistic'
import type { LhStatisticProps } from './types'

const props = withDefaults(defineProps<LhStatisticProps>(), {
  title: undefined,
  value: 0,
  precision: 0,
  separator: ',',
  prefix: undefined,
  suffix: undefined,
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

const displayValue = computed(() =>
  formatStatisticValue(props.value, {
    precision: props.precision,
    separator: props.separator,
  })
)
</script>
