<template>
  <div
    ref="triggerRef"
    class="lh-tooltip"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <slot></slot>

    <Teleport to="body">
      <Transition name="lh-tooltip-fade">
        <div
          v-if="isVisible"
          :id="tooltipId"
          ref="tooltipRef"
          :class="popperClass"
          :style="mergedPopperStyle"
          role="tooltip"
        >
          <span class="lh-tooltip__content">{{ content }}</span>
          <div class="lh-tooltip__arrow"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLhTooltip } from './index'
import type { LhTooltipProps } from './types'

defineOptions({
  name: 'LhTooltip',
})

const props = withDefaults(defineProps<LhTooltipProps>(), {
  content: '',
  placement: 'top',
  trigger: 'hover',
  disabled: false,
  manual: false,
  visible: undefined,
  showAfter: 0,
  hideAfter: 0,
  openDelay: undefined,
  closeDelay: undefined,
  effect: 'dark',
  maxWidth: '200px',
  themeVars: undefined,
  bgPattern: undefined,
})

const {
  tooltipId,
  isVisible,
  tooltipRef,
  triggerRef,
  show,
  hide,
  toggle,
  popperClass,
  popperStyle,
  componentStyle,
} = useLhTooltip(props)

const mergedPopperStyle = computed(() => ({
  ...popperStyle.value,
  ...componentStyle.value,
}))

defineExpose({
  show,
  hide,
  toggle,
  isVisible,
})
</script>
