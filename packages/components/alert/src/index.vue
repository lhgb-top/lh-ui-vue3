<template>
  <div
    v-if="visible"
    :class="alertClasses"
    :style="alertStyle"
    :role="alertRole"
  >
    <LhIcon
      v-if="props.showIcon"
      :name="iconName"
      class="lh-alert__icon"
    />
    <div class="lh-alert__content">
      <span
        v-if="$slots.title || props.title"
        class="lh-alert__title"
      >
        <slot name="title">{{ props.title }}</slot>
      </span>
      <p class="lh-alert__description">
        <slot></slot>
      </p>
    </div>
    <button
      v-if="props.closable"
      type="button"
      class="lh-alert__close"
      :aria-label="props.closeLabel || t('alert.close', '关闭警告')"
      @click="handleClose"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
      >
        <path
          fill="currentColor"
          d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { getAlertClassNames, getAlertRole, getAlertIconName } from '@lh-ui/share/core/alert'

const slots = useSlots()
import { lhlocale } from '~/locale'
import LhIcon from '../../icon'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhAlertProps } from './types'

defineOptions({ name: 'LhAlert' })

const props = withDefaults(defineProps<LhAlertProps>(), {
  type: 'info',
  title: undefined,
  closable: false,
  showIcon: false,
  plain: false,
  closeLabel: undefined,
  sx: undefined,
})

const emit = defineEmits<{
  close: []
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const visible = ref(true)

const hasTitle = computed(() => !!props.title || !!slots.title)

const alertClasses = computed(() =>
  getAlertClassNames({
    type: props.type,
    closable: !!props.closable,
    showIcon: !!props.showIcon,
    plain: !!props.plain,
    withTitle: hasTitle.value,
  }),
)

// warning/danger 立即播报（role=alert），info/success 温和播报（role=status）
const alertRole = computed(() => getAlertRole(props.type))

const iconName = computed(() => getAlertIconName(props.type))

const alertStyle = computed(() => sxToStyle(props.sx ?? {}))

function handleClose() {
  visible.value = false
  emit('close')
}
</script>
