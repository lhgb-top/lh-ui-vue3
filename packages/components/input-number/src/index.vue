<template>
  <div :class="wrapperClasses">
    <button
      v-if="props.controls"
      type="button"
      class="lh-input-number__decrease"
      :disabled="isDecreaseDisabled || props.disabled"
      @click="handleDecrement"
    >
      <span class="lh-input-number__icon">-</span>
    </button>
    <input
      :value="displayValue"
      :class="['lh-input-number__input', `lh-input-number--${props.size}`]"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :name="props.name"
      @change="handleInputChange"
      @keydown.up.prevent="handleDecrement"
      @keydown.down.prevent="handleIncrement"
    />
    <button
      v-if="props.controls"
      type="button"
      class="lh-input-number__increase"
      :disabled="isIncreaseDisabled || props.disabled"
      @click="handleIncrement"
    >
      <span class="lh-input-number__icon">+</span>
    </button>
  </div>
</template>

<script setup lang="ts" name="LhInputNumber">
import { computed } from 'vue'
import {
  clampValue,
  incrementValue,
  decrementValue,
  shouldDisableIncrement,
  shouldDisableDecrement,
  getDisplayValue,
} from '@lh-ui/core/input-number'
import type { LhInputNumberProps } from './types'

defineOptions({ name: 'LhInputNumber' })

const props = withDefaults(defineProps<LhInputNumberProps>(), {
  modelValue: null,
  min: -Infinity,
  max: Infinity,
  step: 1,
  stepStrictly: false,
  precision: undefined,
  disabled: false,
  size: 'medium',
  controls: true,
  placeholder: '',
  name: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  change: [value: number | null]
}>()

const state = computed(() => ({
  value: props.modelValue,
  min: props.stepStrictly ? clampValue(props.min, 0, props.step * 1000) : props.min,
  max: Math.max(props.min, props.max),
  step: Math.abs(props.step),
  disabled: props.disabled,
  size: props.size,
  controls: props.controls,
  precision: props.precision,
  placeholder: props.placeholder,
}))

const wrapperClasses = computed(() => [
  'lh-input-number',
  `lh-input-number--${props.size}`,
  { 'lh-input-number--disabled': props.disabled },
])

const isDecreaseDisabled = computed(() => shouldDisableDecrement(state.value))
const isIncreaseDisabled = computed(() => shouldDisableIncrement(state.value))

const displayValue = computed(() =>
  props.modelValue !== null ? String(props.modelValue) : ''
)

function handleIncrement() {
  if (isIncreaseDisabled.value || props.disabled) return
  const newVal = incrementValue(
    props.modelValue,
    props.step,
    state.value.min,
    state.value.max,
    props.precision
  )
  emit('update:modelValue', newVal)
  emit('change', newVal)
}

function handleDecrement() {
  if (isDecreaseDisabled.value || props.disabled) return
  const newVal = decrementValue(
    props.modelValue,
    props.step,
    state.value.min,
    state.value.max,
    props.precision
  )
  emit('update:modelValue', newVal)
  emit('change', newVal)
}

function handleInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  const raw = target.value.trim()
  if (raw === '') {
    emit('update:modelValue', null)
    emit('change', null)
    return
  }
  let num = Number(raw)
  if (Number.isNaN(num)) return
  if (props.precision !== undefined) {
    num = Number(num.toFixed(props.precision))
  }
  num = clampValue(num, state.value.min, state.value.max)
  if (props.stepStrictly) {
    const mod = (num - state.value.min) % props.step
    if (mod !== 0) {
      num += mod >= props.step / 2 ? props.step - mod : -mod
      num = clampValue(num, state.value.min, state.value.max)
    }
  }
  emit('update:modelValue', num)
  emit('change', num)
}
</script>