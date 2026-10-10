<template>
  <div
    :class="messageClasses"
    :style="messageStyle"
    :role="role"
    :aria-live="live"
  >
    <LhSpinner
      v-if="props.type === 'loading'"
      size="small"
      class="lh-message__icon"
    />
    <LhIcon
      v-else-if="iconName"
      :name="iconName"
      class="lh-message__icon"
    />
    <span class="lh-message__content">{{ props.content }}</span>
    <button
      v-if="props.showClose"
      type="button"
      class="lh-message__close"
      :aria-label="props.closeLabel || t('message.close', '关闭提示')"
      @click="emit('close')"
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
import { getMessageClassNames, getMessageIconName, getMessageRole } from '@lh-ui/share/core/message'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import LhIcon from '../../icon'
import LhSpinner from '../../spinner'
import type { LhMessageProps } from './types'

defineOptions({ name: 'LhMessageItem' })

const props = withDefaults(defineProps<LhMessageProps>(), {
  type: 'info',
  showClose: false,
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

const messageClasses = computed(() =>
  getMessageClassNames({ type: props.type, showClose: !!props.showClose }),
)

const messageStyle = computed(() => sxToStyle(props.sx ?? {}))

const role = computed(() => getMessageRole(props.type))

// role=status/alert 本身携带 live region 语义，aria-live 显式补齐提示行为
const live = computed(() => (role.value === 'alert' ? 'assertive' : 'polite'))

const iconName = computed(() => getMessageIconName(props.type))
</script>
