<template>
  <div
    class="lh-checkbox-group"
    :class="`lh-checkbox-group--${props.size}`"
    role="group"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import { toggleCheckboxValue } from '@lh-ui/core/checkbox'
import type { LhCheckboxGroupProps } from './types'
import { LH_CHECKBOX_GROUP_KEY } from './types'

defineOptions({ name: 'LhCheckboxGroup' })

const props = withDefaults(defineProps<LhCheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
  name: undefined,
  size: 'medium',
})

const emit = defineEmits<{
  'update:modelValue': [value: unknown[]]
  change: [value: unknown[]]
}>()

const values = ref([...props.modelValue])

watch(
  () => props.modelValue,
  (nextValue) => {
    values.value = [...nextValue]
  },
)

function toggle(value: unknown, checked: boolean) {
  const nextValues = toggleCheckboxValue(values.value, value, checked)
  values.value = nextValues
  emit('update:modelValue', nextValues)
  emit('change', nextValues)
}

provide(LH_CHECKBOX_GROUP_KEY, {
  values,
  disabled: props.disabled,
  name: props.name,
  size: props.size,
  toggle,
})
</script>
