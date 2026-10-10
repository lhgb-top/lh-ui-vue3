<template>
  <div
    :class="switchClasses"
    role="switch"
    :aria-checked="state.checked"
    :aria-disabled="state.disabled"
    :aria-invalid="!!formItem?.errorMessage || undefined"
    tabindex="0"
    :style="sxStyle"
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

import { computed, inject } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { getSwitchClassNames, getSwitchLabel } from '@lh-ui/share/core/switch'
import type { LhSwitchProps } from './types'
import { LH_FORM_ITEM_CONTEXT_KEY } from '~/components/form/src/types'

const props = withDefaults(defineProps<LhSwitchProps>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  name: '',
  size: 'medium',
  activeText: '',
  inactiveText: '',
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

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

const formItem = inject(LH_FORM_ITEM_CONTEXT_KEY, null)

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