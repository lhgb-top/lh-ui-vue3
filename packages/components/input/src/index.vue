<template>
  <div
    :class="[
      'lh-input__wrapper',
      {
        'lh-input__wrapper--disabled': props.disabled,
        'lh-input__wrapper--focused': isFocused,
        'lh-input__wrapper--has-label': props.label,
        'lh-input__wrapper--has-value': inputValue,
      },
    ]"
  :style="componentStyle">
    <!-- Label -->
    <label
      v-if="props.label"
      :class="['lh-input__label', { 'lh-input__label--float': isFocused || inputValue }]"
    >
      {{ props.label }}
    </label>

    <!-- Textarea -->
    <template v-if="isTextarea">
      <div :class="['lh-input', 'lh-input--textarea', `lh-input--${props.size}`, { 'lh-input--disabled': props.disabled }]">
        <textarea
          :class="'lh-input__inner'"
          :style="nativeElStyle"
          :value="inputValue"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :aria-invalid="ariaInvalid"
          :placeholder="placeholderText"
          :maxlength="props.maxlength"
          :minlength="props.minlength"
          :data-autosize="props.autosize"
          :rows="props.rows"
          :name="props.name"
          :tabindex="props.tabindex"
          :form="props.form"
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
      <div
        :class="[
          'lh-input',
          `lh-input--${props.size}`,
          {
            'lh-input--prefix': props.prefixIcon,
            'lh-input--suffix': props.suffixIcon || props.clearable,
            'lh-input--disabled': props.disabled,
          },
        ]"
      >
        <span v-if="props.prefixIcon" class="lh-input__prefix">
          <slot name="prefix">
            <LhIcon :name="props.prefixIcon" />
          </slot>
        </span>
        <input
          :class="'lh-input__inner'"
          :type="props.nativeType ?? props.type"
          :style="nativeElStyle"
          :value="inputValue"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :aria-invalid="ariaInvalid"
          :placeholder="placeholderText"
          :maxlength="props.maxlength"
          :minlength="props.minlength"
          :autofocus="props.autofocus"
          :autocomplete="props.autocomplete"
          :name="props.name"
          :tabindex="props.tabindex"
          :form="props.form"
          @input="onInput"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeyDown"
        />
        <span v-if="props.suffixIcon || props.clearable" class="lh-input__suffix">
          <slot name="suffix">
            <LhIcon
              v-if="props.suffixIcon"
              :name="props.suffixIcon"
            />
            <svg
              v-if="props.clearable && inputValue"
              class="lh-input__suffix-icon lh-input__clear"
              viewBox="0 0 24 24"
              fill="currentColor"
              @click.stop="onClear"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
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
import { computed, watch } from 'vue'
import { useLhInput } from './index'
import type { LhInputProps } from './types'
import LhIcon from '../../icon'
import { lhlocale } from '~/locale'

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
  themeVars: undefined,
  bgPattern: undefined,
  sx: undefined,
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

const { inputValue, componentStyle, isTextarea, isFocused, ariaInvalid, showsWordLimit, wordCount, handleInput, handleClear } = useLhInput(props)

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

// placeholder 未传时用语言包兜底；有 label 时占位与浮动标签冲突，保持空
const placeholderText = computed(() =>
  props.label ? '' : props.placeholder || t('input.placeholder', '请输入'),
)

// 原生元素样式：resize 控制拉伸方向（默认 vertical 与样式表现则一致），inputStyle 透传且可覆盖
const nativeElStyle = computed(() => ({
  resize: props.resize,
  ...(props.inputStyle ?? {}),
}))

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