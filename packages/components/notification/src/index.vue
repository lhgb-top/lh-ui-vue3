<template>
  <div
    :class="notificationClasses"
    :style="notificationStyle"
    :role="props.onClick ? 'button' : undefined"
    :tabindex="props.onClick ? 0 : undefined"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <LhIcon
      :name="iconName"
      class="lh-notification__icon"
    />
    <div class="lh-notification__body">
      <span class="lh-notification__title">{{ props.title }}</span>
      <p
        v-if="props.content"
        class="lh-notification__content"
      >
        {{ props.content }}
      </p>
    </div>
    <button
      v-if="props.showClose"
      type="button"
      class="lh-notification__close"
      :aria-label="props.closeLabel || t('notification.close', '关闭通知')"
      @click.stop="emit('close')"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        aria-hidden="true"
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
import { computed } from 'vue'
import { getNotificationClassNames, getNotificationIconName } from '@lh-ui/share/core/notification'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import LhIcon from '../../icon'
import type { LhNotificationProps } from './types'

defineOptions({ name: 'LhNotificationItem' })

const props = withDefaults(defineProps<LhNotificationProps>(), {
  type: 'info',
  content: undefined,
  showClose: true,
  closeLabel: undefined,
  onClick: undefined,
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

const notificationClasses = computed(() =>
  getNotificationClassNames({
    type: props.type,
    showClose: !!props.showClose,
    clickable: !!props.onClick,
  }),
)

const notificationStyle = computed(() => sxToStyle(props.sx ?? {}))

const iconName = computed(() => getNotificationIconName(props.type))

function handleClick(): void {
  props.onClick?.()
}
</script>
