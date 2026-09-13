<template>
  <div
    :class="switchClasses"
    role="switch"
    :aria-checked="state.checked"
    :aria-disabled="state.disabled"
    tabindex="0"
    @click="toggle"
    @keyup.enter.space="handleKeyup"
  >
    <span class="lh-switch__core">
      <span v-if="state.loading" class="lh-switch__loading" />
    </span>
    <span v-if="state.activeText || state.inactiveText" class="lh-switch__label">
      {{ switchLabel }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LhSwitch' })

import { computed } from 'vue'
import { getSwitchClassNames, getSwitchLabel } from '@lh-ui/core/switch'
import type { LhSwitchProps } from './types'

const props = withDefaults(defineProps<LhSwitchProps>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  name: '',
  size: 'medium',
  activeText: '',
  inactiveText: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const state = computed(() => ({
  checked: props.modelValue,
  disabled: props.disabled,
  loading: props.loading,
  name: props.name,
  size: props.size,
  activeText: props.activeText,
  inactiveText: props.inactiveText,
}))

const switchClasses = computed(() => getSwitchClassNames(state.value))
const switchLabel = computed(() => getSwitchLabel(state.value))

function toggle() {
  if (props.disabled || props.loading) return
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

function handleKeyup(e: KeyboardEvent) {
  e.preventDefault()
  toggle()
}
</script>