<template>
  <div
    ref="triggerRef"
    class="lh-popconfirm"
    :style="triggerStyle"
    :aria-expanded="isVisible ? 'true' : 'false'"
    aria-haspopup="dialog"
    @mouseenter="onTriggerMouseenter"
    @mouseleave="onTriggerMouseleave"
    @click="onTriggerClick"
    @focusin="onTriggerFocusin"
    @focusout="onTriggerFocusout"
  >
    <slot></slot>
    <Teleport :to="teleportTarget">
      <Transition name="lh-popconfirm-fade">
        <div
          v-if="isVisible"
          :id="popconfirmId"
          ref="popperRef"
          :class="popperClass"
          :style="mergedPopperStyle"
          role="alertdialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          @mouseenter="onPopperMouseenter"
          @mouseleave="onPopperMouseleave"
        >
          <div class="lh-popconfirm__main">
            <LhIcon
              v-if="showIcon"
              :name="iconName"
              class="lh-popconfirm__icon"
              aria-hidden="true"
            />
            <div :id="titleId" class="lh-popconfirm__title">
              <slot name="content">{{ title }}</slot>
            </div>
          </div>
          <div class="lh-popconfirm__actions">
            <LhButton size="small" @click="handleCancel">
              {{ cancelLabel }}
            </LhButton>
            <LhButton
              :ref="setConfirmRef"
              size="small"
              :type="confirmButtonType"
              @click="handleConfirm"
            >
              {{ confirmLabel }}
            </LhButton>
          </div>
          <div class="lh-popconfirm__arrow"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { LhPopconfirmProps } from './types'
import { useLhPopconfirm } from './index'
import LhIcon from '../../icon'
import LhButton from '../../button'

defineOptions({ name: 'LhPopconfirm' })

const props = withDefaults(defineProps<LhPopconfirmProps>(), {
  type: 'warning',
  placement: 'top',
  trigger: 'click',
  confirmButtonType: 'primary',
  showIcon: true,
  teleportTarget: 'body',
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: []
  cancel: []
  show: []
  hide: []
}>()

const {
  popconfirmId,
  titleId,
  triggerRef,
  popperRef,
  confirmRef,
  isVisible,
  popperClass,
  mergedPopperStyle,
  triggerStyle,
  iconName,
  confirmLabel,
  cancelLabel,
  show,
  hide,
  toggle,
  handleConfirm,
  handleCancel,
  onTriggerMouseenter,
  onTriggerMouseleave,
  onTriggerClick,
  onTriggerFocusin,
  onTriggerFocusout,
  onPopperMouseenter,
  onPopperMouseleave,
} = useLhPopconfirm(props, emit as (event: string, ...args: any[]) => void)

// LhButton 暴露的是组件实例，取 $el 才是真实按钮元素
function setConfirmRef(el: Element | ComponentPublicInstance | null) {
  confirmRef.value = (el as ComponentPublicInstance | null)?.$el ?? (el as HTMLElement | null)
}

defineExpose({ isVisible, show, hide, toggle })
</script>
