<template>
  <div
    :class="itemClasses"
    :style="itemStyle"
  >
    <h3 class="lh-collapse__header-wrap">
      <button
        :id="headerId"
        type="button"
        class="lh-collapse__header"
        :aria-expanded="expanded"
        :aria-controls="contentId"
        :disabled="props.disabled || undefined"
        @click="handleToggle"
      >
        <slot name="title">{{ props.title }}</slot>
        <span
          class="lh-collapse__arrow"
          aria-hidden="true"
        >▾</span>
      </button>
    </h3>
    <div
      :id="contentId"
      class="lh-collapse__wrap"
      role="region"
      :aria-labelledby="headerId"
      :aria-hidden="!expanded"
    >
      <div class="lh-collapse__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, useId } from 'vue'
import { getCollapseItemClassNames } from '@lh-ui/share/core/collapse'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { LH_COLLAPSE_CONTEXT_KEY } from './types'
import type { LhCollapseItemProps } from './types'

defineOptions({ name: 'LhCollapseItem' })

const props = withDefaults(defineProps<LhCollapseItemProps>(), {
  title: undefined,
  disabled: false,
  sx: undefined,
})

const context = inject(LH_COLLAPSE_CONTEXT_KEY, null)
// 脱离 LhCollapse 单用兜底：视为始终收起
const expanded = computed(() => context?.activeKeys.value.includes(props.name) ?? false)

const headerId = useId()
const contentId = useId()

function handleToggle(): void {
  if (props.disabled) return
  context?.toggle(props.name)
}

const itemClasses = computed(() =>
  getCollapseItemClassNames({ active: expanded.value, disabled: !!props.disabled }),
)

const itemStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
