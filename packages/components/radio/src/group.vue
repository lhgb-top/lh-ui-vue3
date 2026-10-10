<template>
  <div
    class="lh-radio-group"
    :class="`lh-radio-group--${props.size}`"
    role="radiogroup"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import type { LhRadioGroupProps } from './types'
import { LH_RADIO_GROUP_KEY } from './types'

defineOptions({ name: 'LhRadioGroup' })

const props = withDefaults(defineProps<LhRadioGroupProps>(), {
  modelValue: undefined,
  disabled: false,
  name: undefined,
  size: 'medium',
})

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
  change: [value: unknown]
}>()

function onChange(value: unknown) {
  emit('update:modelValue', value)
  emit('change', value)
}

provide(LH_RADIO_GROUP_KEY, {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  name: computed(() => props.name),
  size: computed(() => props.size),
  onChange,
})
</script>