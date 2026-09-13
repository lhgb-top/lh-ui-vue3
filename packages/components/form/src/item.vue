<template>
  <div
    class="lh-form-item"
    :class="{
      'lh-form-item--error': errorMessage,
      'lh-form-item--top': form?.labelPosition === 'top',
    }"
    @focusout="handleFocusout"
  >
    <label
      v-if="props.label"
      class="lh-form-item__label"
      :style="labelStyle"
    >
      <span v-if="props.required" class="lh-form-item__required">*</span>
      {{ props.label }}
    </label>
    <div class="lh-form-item__content">
      <slot></slot>
      <span v-if="errorMessage" class="lh-form-item__error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { getFormFieldValue, validateFormField } from '@lh-ui/core/form'
import type { LhFormItemProps } from './types'
import { LH_FORM_CONTEXT_KEY } from './types'

const props = withDefaults(defineProps<LhFormItemProps>(), {
  prop: undefined,
  label: undefined,
  required: false,
  rules: undefined,
})

defineOptions({ name: 'LhFormItem' })

const form = inject(LH_FORM_CONTEXT_KEY, null)
const errorMessage = ref('')
let unregisterField: (() => void) | undefined

const rules = computed(() => {
  const formRules = props.prop ? form?.rules?.[props.prop] || [] : []
  if (props.rules) return props.required ? [{ required: true }, ...props.rules] : props.rules
  return props.required ? [{ required: true }, ...formRules] : formRules
})

const labelStyle = computed(() => {
  if (!form?.labelWidth || form.labelPosition === 'top') return undefined
  const width = typeof form.labelWidth === 'number' ? `${form.labelWidth}px` : form.labelWidth
  return { width }
})

async function validate() {
  if (!props.prop || !form) return true
  const message = validateFormField(getFormFieldValue(form.model, props.prop), rules.value, form.model)
  errorMessage.value = message || ''
  return !message
}

onMounted(() => {
  if (props.prop && form) {
    unregisterField = form.registerField(props.prop, validate)
  }
})

onUnmounted(() => {
  unregisterField?.()
})

function handleFocusout() {
  void validate()
}

defineExpose({ validate, errorMessage })
</script>
