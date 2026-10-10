<template>
  <div
    v-if="props.readonly"
    :class="rateClasses"
    :style="rateStyle"
    role="img"
    :aria-label="ariaText"
  >
    <span
      v-for="i in props.max"
      :key="i"
      class="lh-rate__star lh-rate__star--static"
      :class="`lh-rate__star--${fillOf(i)}`"
      aria-hidden="true"
    >{{ props.character ?? '★' }}</span>
    <span
      v-if="props.showScore"
      class="lh-rate__score"
    >{{ scoreText }}</span>
  </div>

  <div
    v-else
    :class="rateClasses"
    :style="rateStyle"
    role="radiogroup"
    :aria-label="ariaText"
    @keydown="handleKeydown"
  >
    <button
      v-for="i in props.max"
      :key="i"
      type="button"
      class="lh-rate__star"
      :class="`lh-rate__star--${fillOf(i)}`"
      role="radio"
      :aria-checked="value === i"
      :aria-label="starAria(i)"
      :disabled="props.disabled || undefined"
      :tabindex="i === Math.ceil(value) || (value === 0 && i === 1) ? 0 : -1"
      @click="select(i, $event)"
    >{{ props.character ?? '★' }}</button>
    <span
      v-if="props.showScore"
      class="lh-rate__score"
    >{{ scoreText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  clampRate,
  getRateAriaText,
  getRateClassNames,
  getStarFill,
  stepRate,
} from '@lh-ui/share/core/rate'
import { LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import type { LhRateProps } from './types'

defineOptions({ name: 'LhRate' })

const props = withDefaults(defineProps<LhRateProps>(), {
  modelValue: 0,
  max: 5,
  allowHalf: false,
  readonly: false,
  disabled: false,
  character: undefined,
  showScore: false,
  scoreTemplate: undefined,
  sx: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const value = computed(() => clampRate(props.modelValue, props.max))

const ariaText = computed(() =>
  getRateAriaText(value.value, t('rate.stars', '{n} 星')),
)

const starAria = (i: number) => getRateAriaText(i, t('rate.stars', '{n} 星'))

const scoreText = computed(() =>
  getRateAriaText(value.value, props.scoreTemplate ?? t('rate.stars', '{n} 星')),
)

const fillOf = (i: number) => getStarFill(value.value, i, !!props.allowHalf)

function commit(next: number): void {
  const clamped = clampRate(next, props.max)
  if (clamped === value.value) return
  emit('update:modelValue', clamped)
  emit('change', clamped)
}

/** 点击第 i 颗星：半星模式下命中左半区取 i - 0.5 */
function select(i: number, event?: MouseEvent): void {
  if (props.disabled) return
  if (props.allowHalf && event) {
    const target = event.currentTarget as HTMLElement | null
    if (target && typeof event.offsetX === 'number' && event.offsetX < target.clientWidth / 2) {
      commit(i - 0.5)
      return
    }
  }
  commit(i)
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  const actions: Record<string, () => void> = {
    [LH_KEYS.ArrowRight]: () => commit(stepRate(value.value, 1, !!props.allowHalf, props.max)),
    [LH_KEYS.ArrowUp]: () => commit(stepRate(value.value, 1, !!props.allowHalf, props.max)),
    [LH_KEYS.ArrowLeft]: () => commit(stepRate(value.value, -1, !!props.allowHalf, props.max)),
    [LH_KEYS.ArrowDown]: () => commit(stepRate(value.value, -1, !!props.allowHalf, props.max)),
    [LH_KEYS.Home]: () => commit(0),
    [LH_KEYS.End]: () => commit(props.max),
  }
  const action = actions[event.key]
  if (action) {
    event.preventDefault()
    action()
  }
}

const rateClasses = computed(() =>
  getRateClassNames({
    max: props.max,
    value: value.value,
    allowHalf: !!props.allowHalf,
    readonly: !!props.readonly,
    disabled: !!props.disabled,
  }),
)

const rateStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
