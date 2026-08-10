<template>
  <div
    :ref="triggerRef"
    class="lh-tooltip"
    @mouseenter="trigger === 'hover' && show()"
    @mouseleave="trigger === 'hover' && hide()"
    @click="trigger === 'click' && toggle()"
    @focusin="trigger === 'focus' && show()"
    @focusout="trigger === 'focus' && hide()"
  >
    <slot></slot>

    <Teleport to="body">
      <Transition name="lh-tooltip-fade">
        <div
          v-if="isVisible"
          :ref="tooltipRef"
          :id="tooltipId"
          :class="popperClass"
          :style="popperStyle"
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
  showAfter: 200,
  hideAfter: 0,
  openDelay: undefined,
  closeDelay: undefined,
  effect: 'dark',
  maxWidth: '200px',
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
  trigger,
} = useLhTooltip(props)

defineExpose({
  show,
  hide,
  toggle,
  isVisible,
})
</script>
