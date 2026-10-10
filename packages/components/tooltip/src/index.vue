<template>
  <div
    ref="triggerRef"
    class="lh-tooltip"
    :style="triggerStyle"
    :aria-describedby="isVisible ? tooltipId : undefined"
    @mouseenter="onTriggerMouseenter"
    @mouseleave="onTriggerMouseleave"
    @click="onTriggerClick"
    @focusin="onTriggerFocusin"
    @focusout="onTriggerFocusout"
  >
    <slot></slot>

    <Teleport :to="teleportTarget">
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
  teleportTarget: 'body',
  themeVars: undefined,
  bgPattern: undefined,
  sx: undefined,
})

const {
  tooltipId,
  isVisible,
  tooltipRef,
  triggerRef,
  show,
  hide,
  toggle,
  onTriggerMouseenter,
  onTriggerMouseleave,
  onTriggerClick,
  onTriggerFocusin,
  onTriggerFocusout,
  popperClass,
  mergedPopperStyle,
  triggerStyle,
} = useLhTooltip(props)

defineExpose({
  show,
  hide,
  toggle,
  isVisible,
})
</script>
