<template>
  <i
    :class="['lh-icon', iconName]"
    :style="iconStyle"
    v-bind="$attrs"
  >
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { useLhIcon } from './index'
import type { LhIconProps } from './types'

defineOptions({
  name: 'LhIcon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LhIconProps>(), {
  name: undefined,
  size: undefined,
  color: undefined,
})

const { iconStyle, iconName } = useLhIcon(props)
</script>
