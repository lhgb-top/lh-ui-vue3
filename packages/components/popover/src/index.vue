<template>
  <div
    ref="triggerRef"
    class="lh-popover"
    :style="triggerStyle"
    :aria-expanded="isVisible ? 'true' : 'false'"
    :aria-haspopup="isModal ? 'dialog' : undefined"
    @mouseenter="onTriggerMouseenter"
    @mouseleave="onTriggerMouseleave"
    @click="onTriggerClick"
    @focusin="onTriggerFocusin"
    @focusout="onTriggerFocusout"
  >
    <slot></slot>
    <Teleport :to="teleportTarget">
      <Transition name="lh-popover-fade">
        <div
          v-if="isVisible"
          :id="popoverId"
          ref="popperRef"
          :class="popperClass"
          :style="mergedPopperStyle"
          role="dialog"
          :aria-modal="isModal ? 'true' : undefined"
          :aria-labelledby="hasTitle ? titleId : undefined"
          @mouseenter="onPopperMouseenter"
          @mouseleave="onPopperMouseleave"
        >
          <div v-if="hasTitle" :id="titleId" class="lh-popover__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="lh-popover__content">
            <slot name="content"></slot>
          </div>
          <div v-if="arrow !== false" class="lh-popover__arrow"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { LhPopoverProps } from './types'
import { useLhPopover } from './index'

defineOptions({ name: 'LhPopover' })

const props = withDefaults(defineProps<LhPopoverProps>(), {
  placement: 'top',
  trigger: 'click',
  arrow: true,
  teleportTarget: 'body',
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  show: []
  hide: []
}>()

const slots = defineSlots<{
  default(): any
  title(): any
  content(): any
}>()

const {
  popoverId,
  titleId,
  triggerRef,
  popperRef,
  isVisible,
  isModal,
  hasTitle,
  popperClass,
  mergedPopperStyle,
  triggerStyle,
  show,
  hide,
  toggle,
  onTriggerMouseenter,
  onTriggerMouseleave,
  onTriggerClick,
  onTriggerFocusin,
  onTriggerFocusout,
  onPopperMouseenter,
  onPopperMouseleave,
} = useLhPopover(props, emit as (event: string, ...args: any[]) => void, slots)

defineExpose({ isVisible, show, hide, toggle })
</script>
