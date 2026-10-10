<template>
  <div
    :class="segmentedClasses"
    :style="segmentedStyle"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <button
      v-for="(option, index) in normalized"
      :key="String(option.value)"
      type="button"
      class="lh-segmented__option"
      :class="{ 'lh-segmented__option--checked': option.value === value }"
      role="radio"
      :aria-checked="option.value === value"
      :disabled="props.disabled || option.disabled || undefined"
      :tabindex="tabStops[index] ? 0 : -1"
      @click="select(option)"
    >{{ option.label }}</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  getSegmentedClassNames,
  moveSegmentedIndex,
  normalizeSegmentedOptions,
} from '@lh-ui/share/core/segmented'
import { LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import type { LhSegmentedProps, LhSegmentedNormalized } from './types'

defineOptions({ name: 'LhSegmented' })

const props = withDefaults(defineProps<LhSegmentedProps>(), {
  modelValue: undefined,
  disabled: false,
  block: false,
  sx: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: LhSegmentedProps['modelValue']]
  change: [value: LhSegmentedProps['modelValue']]
}>()

const normalized = computed(() => normalizeSegmentedOptions(props.options))

const value = computed(() => props.modelValue)

/** roving tabindex：选中项（无选中时第一项）持有焦点位 */
const checkedIndex = computed(() => {
  const index = normalized.value.findIndex((option) => option.value === value.value)
  return index === -1 ? -1 : index
})

const tabStops = computed(() => {
  const stops = normalized.value.map(() => false)
  if (stops.length === 0) return stops
  const active = checkedIndex.value === -1 ? firstEnabledIndex.value : checkedIndex.value
  if (active !== -1) stops[active] = true
  return stops
})

const firstEnabledIndex = computed(() =>
  normalized.value.findIndex((option) => !option.disabled),
)

function select(option: LhSegmentedNormalized): void {
  if (props.disabled || option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  const directions: Record<string, 1 | -1> = {
    [LH_KEYS.ArrowRight]: 1,
    [LH_KEYS.ArrowDown]: 1,
    [LH_KEYS.ArrowLeft]: -1,
    [LH_KEYS.ArrowUp]: -1,
  }
  const direction = directions[event.key]
  if (!direction) return
  event.preventDefault()
  const current = checkedIndex.value === -1 ? firstEnabledIndex.value : checkedIndex.value
  const next = moveSegmentedIndex(normalized.value, current, direction)
  const option = normalized.value[next]
  if (option && !option.disabled) select(option)
}

const segmentedClasses = computed(() =>
  getSegmentedClassNames({ disabled: !!props.disabled, block: !!props.block }),
)

const segmentedStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
