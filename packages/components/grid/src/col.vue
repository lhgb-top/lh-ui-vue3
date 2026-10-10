<template>
  <div
    :class="colClasses"
    :style="colStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getGridColClassNames, getColStyle, resolveResponsiveSize } from '@lh-ui/share/core/grid'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { useLhBreakpoint } from '~/composables'
import type { LhColProps } from './types'

defineOptions({ name: 'LhCol' })

const props = withDefaults(defineProps<LhColProps>(), {
  span: undefined,
  offset: undefined,
  push: undefined,
  pull: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  sizes: undefined,
  sx: undefined,
})

const { breakpoint } = useLhBreakpoint()

/** 当前断点下生效的尺寸：无任何响应式声明时回退到 span/offset/push/pull */
const size = computed(() => {
  const responsive = resolveResponsiveSize(
    {
      xs: props.xs,
      sm: props.sm,
      md: props.md,
      lg: props.lg,
      xl: props.xl,
      ...props.sizes,
    },
    breakpoint.value,
  )
  if (responsive != null) return responsive
  return {
    span: typeof props.span === 'number' ? props.span : undefined,
    offset: props.offset,
    push: props.push,
    pull: props.pull,
  }
})

const colClasses = computed(() => getGridColClassNames(size.value))

const colStyle = computed(() => ({ ...getColStyle(size.value), ...sxToStyle(props.sx ?? {}) }))
</script>
