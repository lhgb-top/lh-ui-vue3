<template>
  <Teleport :to="teleportTarget">
    <Transition name="lh-drawer-fade">
      <div
        v-if="isVisible"
        :id="drawerId"
        :class="drawerClass"
        :style="rootStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="hasTitle ? titleId : undefined"
        :aria-label="hasTitle ? undefined : defaultTitle"
      >
        <div class="lh-drawer__mask" aria-hidden="true" @click="handleMaskClick"></div>
        <div
          ref="panelRef"
          :class="panelClass"
          :style="panelStyle"
        >
          <div v-if="hasHeader" class="lh-drawer__header">
            <div :id="titleId" class="lh-drawer__title">
              <slot name="header">{{ title }}</slot>
            </div>
            <button
              v-if="showClose"
              type="button"
              class="lh-drawer__close"
              :aria-label="closeLabel"
              @click="close"
            >
              <LhIcon name="close" aria-hidden="true" />
            </button>
          </div>
          <div class="lh-drawer__body">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="lh-drawer__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { LhDrawerProps } from './types'
import { useLhDrawer } from './index'
import LhIcon from '../../icon'

defineOptions({ name: 'LhDrawer' })

const props = withDefaults(defineProps<LhDrawerProps>(), {
  direction: 'right',
  size: '30%',
  maskClosable: true,
  showClose: true,
  teleportTarget: 'body',
  lockScroll: true,
  closeOnEsc: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

const slots = useSlots()
const hasHeader = computed(() => !!slots.header || !!props.title || props.showClose)
const hasTitle = computed(() => !!slots.header || !!props.title)

const {
  drawerId,
  titleId,
  panelRef,
  isVisible,
  drawerClass,
  panelStyle,
  rootStyle,
  closeLabel,
  defaultTitle,
  open,
  close,
  handleMaskClick,
} = useLhDrawer(props, emit as (event: string, ...args: any[]) => void)

const panelClass = computed(() => [
  'lh-drawer__panel',
  `lh-drawer__panel--${props.direction ?? 'right'}`,
])

defineExpose({ isVisible, open, close })
</script>
