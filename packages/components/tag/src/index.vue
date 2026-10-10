<template>
  <span
    :class="tagClasses"
    :style="sxStyle"
    :role="clickable() ? 'button' : undefined"
    :tabindex="clickable() ? 0 : undefined"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span class="lh-tag__text">
      <slot></slot>
    </span>
    <button
      v-if="props.closable"
      class="lh-tag__close"
      :disabled="props.disabled"
      :aria-label="t('tag.close')"
      @click.stop="handleClose"
    >
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z"
        />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: 'LhTag' })

import { computed, getCurrentInstance } from 'vue'
import { sxToStyle, isActivationKey } from '@lh-ui/share/core/shared'
import { getTagClassNames } from '@lh-ui/share/core/tag'
import { lhlocale } from '~/locale'
import type { LhTagProps } from './types'

const props = withDefaults(defineProps<LhTagProps>(), {
  type: 'default',
  size: 'medium',
  closable: false,
  disabled: false,
  round: false,
  hit: false,
  onClose: undefined,
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

const emit = defineEmits<{
  click: [e: Event]
  close: [e: Event]
}>()

/**
 * 可点击判定：父级绑定了 click 监听且未禁用。
 * Vue3 中已声明 emit 的监听会从 attrs 中剔除，且 computed 缓存对动态新增的
 * vnode.props 键不敏感，故改为渲染期直接读当前 vnode 的 props 求值。
 */
const instance = getCurrentInstance()
function clickable(): boolean {
  const onClick = (instance?.vnode.props as Record<string, unknown> | undefined)?.onClick
  return !!onClick && !props.disabled
}

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const tagClasses = computed(() =>
  getTagClassNames({
    type: props.type,
    size: props.size,
    closable: props.closable,
    disabled: props.disabled,
    round: props.round,
    hit: props.hit,
  })
)

function handleClick(e: MouseEvent) {
  emit('click', e)
}

/**
 * 键盘激活：Enter / Space 等效点击（仅 click 监听存在时生效）
 */
function handleKeydown(e: KeyboardEvent) {
  if (!clickable() || !isActivationKey(e)) return
  e.preventDefault()
  emit('click', e)
}

function handleClose(e: Event) {
  if (props.disabled) return
  props.onClose?.(e)
  emit('close', e)
}
</script>