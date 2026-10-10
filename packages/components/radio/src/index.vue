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
    :style="sxStyle"
  >
    <input
      class="lh-radio__input"
      type="radio"
      :name="group?.name.value || props.name"
      :value="props.value"
      :checked="isChecked"
      :disabled="isDisabled"
      :aria-invalid="!!formItem?.errorMessage || undefined"
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
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhRadioProps } from './types'
import { LH_RADIO_GROUP_KEY } from './types'
import { LH_FORM_ITEM_CONTEXT_KEY } from '~/components/form/src/types'

defineOptions({ name: 'LhRadio' })

const props = withDefaults(defineProps<LhRadioProps>(), {
  modelValue: undefined,
  value: undefined,
  label: undefined,
  disabled: false,
  name: undefined,
  size: 'medium',
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
  change: [value: unknown]
}>()

const group = inject(LH_RADIO_GROUP_KEY, null)
const formItem = inject(LH_FORM_ITEM_CONTEXT_KEY, null)
const isInGroup = Boolean(group && props.value !== undefined)
const effectiveSize = computed(() => group?.size.value || props.size)
const isDisabled = computed(() => Boolean(props.disabled || group?.disabled.value))
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