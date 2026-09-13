<template>
  <div
    ref="rootRef"
    class="lh-select"
    :class="[
      `lh-select--${props.size}`,
      {
        'lh-select--open': isOpen,
        'lh-select--disabled': props.disabled,
      },
    ]"
  >
    <div
      class="lh-select__trigger"
      role="combobox"
      tabindex="0"
      :name="props.name"
      :aria-label="props.ariaLabel"
      :aria-disabled="props.disabled"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span class="lh-select__value" :class="{ 'lh-select__value--placeholder': !selectedOption }">
        {{ selectedOption?.label || props.placeholder }}
      </span>
      <span class="lh-select__actions">
        <button
          v-if="props.clearable && selectedOption"
          class="lh-select__clear"
          type="button"
          aria-label="Clear selection"
          @click.stop="clear"
        >
          ×
        </button>
        <span class="lh-select__arrow" aria-hidden="true">⌄</span>
      </span>
    </div>

    <div v-if="isOpen" class="lh-select__dropdown" role="listbox">
      <button
        v-for="(option, index) in props.options"
        :key="index"
        class="lh-select__option"
        :class="{
          'lh-select__option--selected': isSelected(option),
          'lh-select__option--highlighted': highlightedIndex === index,
          'lh-select__option--disabled': option.disabled,
        }"
        type="button"
        role="option"
        :aria-selected="isSelected(option)"
        :disabled="option.disabled"
        @mouseenter="highlightedIndex = index"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </button>
      <span v-if="!props.options?.length" class="lh-select__empty">No options</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { findSelectOption, getNextEnabledIndex } from '@lh-ui/core/select'
import type { LhSelectOption, LhSelectProps } from './types'

defineOptions({ name: 'LhSelect' })

const props = withDefaults(defineProps<LhSelectProps>(), {
  modelValue: undefined,
  options: () => [],
  placeholder: 'Please select',
  disabled: false,
  clearable: false,
  size: 'medium',
  name: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
  change: [value: unknown, option: LhSelectOption | undefined]
  clear: []
}>()

const rootRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const highlightedIndex = ref(-1)
const selectedOption = computed(() => findSelectOption(props.options, props.modelValue))

function isSelected(option: LhSelectOption) {
  return Object.is(option.value, props.modelValue)
}

function open() {
  if (props.disabled) return
  isOpen.value = true
  const selectedIndex = props.options.findIndex(isSelected)
  highlightedIndex.value = selectedIndex >= 0 ? selectedIndex : getNextEnabledIndex(props.options, -1, 1)
}

function close() {
  isOpen.value = false
}

function toggle() {
  if (isOpen.value) close()
  else open()
}

function selectOption(option: LhSelectOption) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value, option)
  close()
}

function clear() {
  emit('update:modelValue', undefined)
  emit('change', undefined, undefined)
  emit('clear')
  close()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) open()
    else highlightedIndex.value = getNextEnabledIndex(
      props.options,
      highlightedIndex.value,
      event.key === 'ArrowDown' ? 1 : -1,
    )
    return
  }

  if (event.key === 'Enter' && isOpen.value && highlightedIndex.value >= 0) {
    event.preventDefault()
    const option = props.options[highlightedIndex.value]
    if (option) selectOption(option)
  }

  if (event.key === 'Escape') close()
}

function handleDocumentClick(event: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) close()
}

onMounted(() => document.addEventListener('click', handleDocumentClick))
onUnmounted(() => document.removeEventListener('click', handleDocumentClick))

defineExpose({ open, close, toggle, clear, isOpen })
</script>
