<template>
  <div
    :class="cardClasses"
    :style="cardStyle"
    :role="interactivity === 'interactive' ? 'button' : undefined"
    :tabindex="interactivity === 'interactive' ? 0 : undefined"
    :aria-busy="props.loading ? true : undefined"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- 封面 -->
    <div
      v-if="$slots.cover"
      class="lh-card__cover"
    >
      <slot name="cover"></slot>
    </div>

    <!-- 头部 -->
    <div
      v-if="$slots.header || props.title"
      class="lh-card__header"
    >
      <slot name="header">
        <span class="lh-card__title">{{ props.title }}</span>
      </slot>
      <span
        v-if="$slots.extra"
        class="lh-card__extra"
      >
        <slot name="extra"></slot>
      </span>
    </div>

    <!-- 主体 -->
    <div class="lh-card__body">
      <slot v-if="!props.loading"></slot>
      <div
        v-else
        class="lh-card__loading"
        aria-hidden="true"
      >
        <div class="lh-card__loading-line lh-card__loading-line--wide"></div>
        <div class="lh-card__loading-line"></div>
        <div class="lh-card__loading-line lh-card__loading-line--narrow"></div>
      </div>
    </div>

    <!-- 底部 -->
    <div
      v-if="$slots.footer"
      class="lh-card__footer"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLhCard } from './index'
import type { LhCardProps } from './types'

defineOptions({ name: 'LhCard' })

const props = withDefaults(defineProps<LhCardProps>(), {
  title: undefined,
  shadow: 'always',
  clickable: false,
  loading: false,
  themeVars: undefined,
  bgPattern: undefined,
  sx: undefined,
})

const emit = defineEmits<{
  click: [e: Event]
}>()

const { cardClasses, cardStyle, interactivity, onCardKeydown } = useLhCard(props)

function handleClick(e: MouseEvent) {
  if (interactivity.value !== 'interactive') return
  emit('click', e)
}

function handleKeydown(e: KeyboardEvent) {
  onCardKeydown(e, emit)
}
</script>
