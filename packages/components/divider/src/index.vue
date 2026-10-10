<template>
  <div
    :class="dividerClasses"
    :style="dividerStyle"
    :role="role"
    :aria-orientation="ariaOrientation"
  >
    <span
      v-if="hasContent"
      class="lh-divider__label"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { getDividerClassNames, getDividerRole, needsAriaOrientation } from '@lh-ui/share/core/divider'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhDividerProps } from './types'

defineOptions({ name: 'LhDivider' })

const props = withDefaults(defineProps<LhDividerProps>(), {
  direction: 'horizontal',
  dashed: false,
  labelPosition: 'center',
  borderStyle: undefined,
  sx: undefined,
})

const slots = useSlots()

// 垂直方向不支持文案（各开源库通行约定）
const hasContent = computed(() => props.direction === 'horizontal' && !!slots.default)

const dividerClasses = computed(() =>
  getDividerClassNames({
    direction: props.direction,
    dashed: props.dashed,
    borderStyle: props.borderStyle,
    hasContent: hasContent.value,
    labelPosition: props.labelPosition,
  }),
)

const role = computed(() => getDividerRole(hasContent.value))

const ariaOrientation = computed(() =>
  needsAriaOrientation(props.direction, hasContent.value) ? 'vertical' : undefined,
)

const dividerStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
