<template>
  <label
    class="lh-radio"
    :class="[
      `lh-radio--${effectiveSize}`,
      {
        'lh-radio--checked': isChecked,
        'lh-radio--disabled': isDisabled,
      },
    ]"
  >
    <input
      class="lh-radio__input"
      type="radio"
      :name="group?.name || props.name"
      :value="props.value"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="handleChange"
    />
    <span class="lh-radio__box" aria-hidden="true"></span>
    <span v-if="props.label || $slots.default" class="lh-radio__label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { LhRadioProps } from './types'
import { LH_RADIO_GROUP_KEY } from './types'

defineOptions({ name: 'LhRadio' })

const props = withDefaults(defineProps<LhRadioProps>(), {
  modelValue: undefined,
  value: undefined,
  label: undefined,
  disabled: false,
  name: undefined,
  size: 'medium',
})

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
  change: [value: unknown]
}>()

const group = inject(LH_RADIO_GROUP_KEY, null)
const isInGroup = Boolean(group && props.value !== undefined)
const effectiveSize = computed(() => group?.size || props.size)
const isDisabled = computed(() => Boolean(props.disabled || group?.disabled))
const isChecked = computed(() => {
  if (isInGroup && group) return Object.is(group.modelValue.value, props.value)
  return Object.is(props.modelValue, props.value)
})

function handleChange() {
  if (isDisabled.value) return
  if (isInGroup && group) {
    group.onChange(props.value)
    return
  }
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>