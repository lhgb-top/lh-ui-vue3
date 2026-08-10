<template>
  <div :class="[
    'lh-input__wrapper',
    {
      'lh-input__wrapper--disabled': props.disabled,
      'lh-input__wrapper--focused': isFocused,
    },
  ]">
    <!-- Textarea -->
    <template v-if="isTextarea">
      <div :class="['lh-input', 'lh-input--textarea', `lh-input--${props.size}`]">
        <textarea
          :class="'lh-input__inner'"
          :value="inputValue"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :placeholder="props.placeholder"
          :maxlength="props.maxlength"
          :minlength="props.minlength"
          :data-autosize="props.autosize"
          :rows="props.rows"
          :name="props.name"
          :tabindex="props.tabindex"
          @input="onInput"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeyDown"
        />
      </div>
      <span v-if="showsWordLimit" class="lh-input__count">
        {{ wordCount }}
      </span>
    </template>

    <!-- Input -->
    <template v-else>
      <div :class="[
        'lh-input',
        `lh-input--${props.size}`,
        {
          'lh-input--prefix': props.prefixIcon,
          'lh-input--suffix': props.suffixIcon || props.clearable,
        },
      ]">
        <span v-if="props.prefixIcon" class="lh-input__prefix">
          <slot name="prefix">
            <i :class="props.prefixIcon"></i>
          </slot>
        </span>
        <input
          :class="'lh-input__inner'"
          :type="props.type"
          :value="inputValue"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :placeholder="props.placeholder"
          :maxlength="props.maxlength"
          :minlength="props.minlength"
          :autofocus="props.autofocus"
          :autocomplete="props.autocomplete"
          :name="props.name"
          :tabindex="props.tabindex"
          @input="onInput"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeyDown"
        />
        <span v-if="props.suffixIcon || props.clearable" class="lh-input__suffix">
          <slot name="suffix">
            <i v-if="props.suffixIcon" :class="props.suffixIcon"></i>
            <i
              v-if="props.clearable && inputValue"
              class="lh-input__suffix-icon lh-icon-close"
              @click="onClear"
            ></i>
          </slot>
        </span>
      </div>
      <span v-if="showsWordLimit" class="lh-input__count">
        {{ wordCount }}
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useLhInput } from './index'
import type { LhInputProps } from './types'

defineOptions({
  name: 'LhInput',
})

const props = withDefaults(defineProps<LhInputProps>(), {
  type: 'text',
  size: 'medium',
  disabled: false,
  readonly: false,
  clearable: false,
  showWordLimit: false,
  autofocus: false,
  autosize: false,
  resize: 'vertical',
})

const emits = defineEmits<{
  'update:modelValue': [val: string]
  input: [val: string, e: Event]
  change: [val: string, e: Event]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
  clear: []
  keydown: [e: KeyboardEvent]
}>()

const { inputValue, isDisabled, isTextarea, isFocused, showsWordLimit, wordCount, handleInput, handleClear } = useLhInput(props)

// Sync external modelValue changes
watch(() => props.modelValue, (val) => {
  inputValue.value = val ?? ''
})

const onInput = (e: Event) => {
  handleInput(e)
  emits('update:modelValue', inputValue.value)
  emits('input', inputValue.value, e)
}

const onChange = (e: Event) => {
  emits('change', inputValue.value, e)
}

const onFocus = (e: FocusEvent) => {
  isFocused.value = true
  emits('focus', e)
}

const onBlur = (e: FocusEvent) => {
  isFocused.value = false
  emits('blur', e)
}

const onClear = (e: MouseEvent) => {
  handleClear(e)
  emits('update:modelValue', '')
  emits('clear')
}

const onKeyDown = (e: KeyboardEvent) => {
  emits('keydown', e)
}
</script>\n