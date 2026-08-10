<template>
  <Teleport to="body">
    <Transition name="lh-dialog-fade">
      <div v-if="isVisible" class="lh-dialog__container">
        <div class="lh-dialog__overlay" @click="handleModalClick"></div>
        <div
          ref="dialogRef"
          :class="['lh-dialog__wrapper', `lh-dialog__wrapper--${props.position}`]"
          :style="dialogStyle"
        >
        <div
          :class="[
            'lh-dialog',
            { 'lh-dialog--fullscreen': props.fullscreen }
          ]"
          :style="[dialogContentStyle, dialogDragStyle]"
          role="dialog"
          aria-modal="true"
          :aria-label="props.title || 'dialog'"
        >
          <!-- Header -->
          <div
            ref="headerRef"
            :class="['lh-dialog__header', { 'lh-dialog__header--draggable': props.draggable }]"
            @mousedown="handleHeaderMousedown"
          >
            <slot name="header">
              <span class="lh-dialog__title">{{ props.title }}</span>
            </slot>
            <button
              v-if="props.showClose !== false"
              class="lh-dialog__close"
              aria-label="close"
              @click="close"
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z"/>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="lh-dialog__body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="lh-dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { useLhDialog } from './index'
import type { LhDialogProps } from './types'

defineOptions({
  name: 'LhDialog',
})

const props = withDefaults(defineProps<LhDialogProps>(), {
  modelValue: false,
  title: '',
  width: '480px',
  fullscreen: false,
  showClose: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  draggable: false,
  center: false,
  position: 'center',
  lockScroll: true,
  top: '15vh',
  zIndex: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  opened: []
  closed: []
}>()

const {
  dialogRef,
  headerRef,
  isVisible,
  close,
  handleModalClick,
  dialogStyle,
  dialogContentStyle,
  dialogDragStyle,
  handleHeaderMousedown,
} = useLhDialog(props, emit)

defineExpose({
  close,
  isVisible,
})
</script>
