<template>
  <li
    v-if="ownIndex >= 0"
    :class="itemClasses"
    :aria-current="status === 'process' ? 'step' : undefined"
  >
    <component
      :is="isButton ? 'button' : 'span'"
      class="lh-steps__head"
      v-bind="headAttrs"
    >
      <span
        class="lh-steps__icon"
        aria-hidden="true"
      >
        <slot name="icon">
          <LhIcon
            v-if="icon"
            :name="icon"
          />
          <span v-else>{{ iconChar }}</span>
        </slot>
      </span>
    </component>
    <div class="lh-steps__main">
      <div class="lh-steps__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="description || $slots.description"
        class="lh-steps__description"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed, inject, onUnmounted } from 'vue'
import { getStepClassNames, getStepStatus } from '@lh-ui/share/core/steps'
import { lhlocale } from '~/locale'
import LhIcon from '../../icon'
import { LH_STEPS_KEY } from './types'
import type { LhStepProps } from './types'

defineOptions({ name: 'LhStep' })

withDefaults(defineProps<LhStepProps>(), {
  title: '',
  description: '',
  icon: undefined,
})

const context = inject(LH_STEPS_KEY, null)

const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

// setup 阶段注册 token，顺序即渲染顺序；卸载时注销
const token = Symbol('step')
if (context) {
  context.itemTokens.value.push(token)
  onUnmounted(() => {
    context.itemTokens.value = context.itemTokens.value.filter((item) => item !== token)
  })
}

const ownIndex = computed(() =>
  context ? context.itemTokens.value.indexOf(token) : -1,
)

const status = computed(() =>
  getStepStatus({
    index: ownIndex.value,
    current: context?.current.value ?? 0,
    forced: context?.forcedStatus.value,
  }),
)

const clickable = computed(() => !!context?.clickable.value)
// 当前步骤与历史步骤可点击导航；等待中的后续步骤不引导跳转
const isButton = computed(() => clickable.value && status.value !== 'wait')

// 折行时本项若为行末项，隐藏指向行尾空白的连接线
const isLineLast = computed(() =>
  context ? context.lineLastIndices.value.includes(ownIndex.value) : false,
)

// 「末项」语义由连接线样式的 :last-child 承担，不再输出 JS 类：子项分批注册时
// 基于总数的 isLast 会让每一项在首屏（含 SSR/SSG）都被误判为末项
const itemClasses = computed(() =>
  getStepClassNames({
    status: status.value,
    clickable: isButton.value,
    lineLast: isLineLast.value,
  }),
)

const iconChar = computed(() => {
  if (status.value === 'finish') return '✓'
  if (status.value === 'error') return '✕'
  return ownIndex.value + 1
})

const headAttrs = computed(() => {
  if (!isButton.value) return {}
  return {
    type: 'button',
    'aria-label': stepLabel.value,
    onClick: () => context?.select(ownIndex.value),
  }
})

const stepLabel = computed(() => {
  if (status.value === 'finish') return t('steps.finish', 'Completed')
  if (status.value === 'error') return t('steps.error', 'Error')
  return t('steps.step', 'Step {index}').replace('{index}', String(ownIndex.value + 1))
})
</script>
