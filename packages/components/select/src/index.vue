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
    :style="sxStyle"
  >
    <div
      class="lh-select__trigger"
      role="combobox"
      tabindex="0"
      :name="props.name"
      :aria-label="props.ariaLabel"
      :aria-disabled="props.disabled"
      :aria-expanded="isOpen"
      :aria-invalid="!!formItem?.errorMessage || undefined"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span class="lh-select__value" :class="{ 'lh-select__value--placeholder': !selectedOption }">
        {{ selectedOption?.label || props.placeholder || t('select.placeholder', '请选择') }}
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

    <Teleport :to="teleportTarget" :disabled="!shouldTeleport">
      <div
        v-if="isOpen"
        ref="dropdownRef"
        class="lh-select__dropdown"
        :class="{ 'lh-select__dropdown--teleported': shouldTeleport }"
        :style="dropdownStyle"
        role="listbox"
        :aria-activedescendant="highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined"
      >
        <button
          v-for="(option, index) in props.options"
          :key="option.value"
          :id="`${listboxId}-option-${index}`"
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
        <span v-if="!props.options?.length" class="lh-select__empty">
          <slot name="empty">{{ t('select.noData', '暂无数据') }}</slot>
        </span>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, ref, type StyleValue } from 'vue'
import { isEscapeKey, LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import { findSelectOption, getNextEnabledIndex } from '@lh-ui/share/core/select'
import { generateId } from '@lh-ui/share/utils'
import { useLhZIndex } from '~/composables'
import type { LhSelectOption, LhSelectProps } from './types'
import { lhlocale } from '~/locale'
import { LH_FORM_ITEM_CONTEXT_KEY } from '~/components/form/src/types'

defineOptions({ name: 'LhSelect' })

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const props = withDefaults(defineProps<LhSelectProps>(), {
  modelValue: undefined,
  options: () => [],
  placeholder: '',
  disabled: false,
  clearable: false,
  size: 'medium',
  name: undefined,
  ariaLabel: undefined,
  popperContainer: 'body',
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
  change: [value: unknown, option: LhSelectOption | undefined]
  clear: []
}>()

const rootRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const formItem = inject(LH_FORM_ITEM_CONTEXT_KEY, null)
const isOpen = ref(false)
const highlightedIndex = ref(-1)
const selectedOption = computed(() => findSelectOption(props.options, props.modelValue))
// 弹层走全局递增 z-index 体系；listbox id 供 aria-activedescendant 关联键盘高亮项
const { zIndex } = useLhZIndex()
const listboxId = generateId('lh-select-listbox')

const shouldTeleport = computed(() => !!props.popperContainer)

const teleportTarget = computed(() => {
  if (typeof document === 'undefined' || !props.popperContainer) return 'body'
  if (props.popperContainer === 'body') return document.body
  if (typeof props.popperContainer === 'string') return document.querySelector(props.popperContainer) || document.body
  return props.popperContainer
})

const dropdownStyle = computed<StyleValue>(() => {
  // 依赖 isOpen：弹层 v-if 卸载后 computed 会缓存，重开时必须强制重算，
  // 否则沿用上一次打开时的矩形，移动触发器（无滚动的布局变化）后错位
  if (!isOpen.value || !shouldTeleport.value || !rootRef.value) return {}
  const rect = rootRef.value.getBoundingClientRect()
  return {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: zIndex.value,
  }
})

function updatePosition() {
  const forceRect = rootRef.value?.getBoundingClientRect()
  if (forceRect && dropdownRef.value && shouldTeleport.value) {
    dropdownRef.value.style.top = `${forceRect.bottom + 4}px`
    dropdownRef.value.style.left = `${forceRect.left}px`
    dropdownRef.value.style.width = `${forceRect.width}px`
  }
}

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
  if (event.key === LH_KEYS.ArrowDown || event.key === LH_KEYS.ArrowUp) {
    event.preventDefault()
    if (!isOpen.value) open()
    else highlightedIndex.value = getNextEnabledIndex(
      props.options,
      highlightedIndex.value,
      event.key === LH_KEYS.ArrowDown ? 1 : -1,
    )
    return
  }

  if (event.key === LH_KEYS.Enter && isOpen.value && highlightedIndex.value >= 0) {
    event.preventDefault()
    const option = props.options[highlightedIndex.value]
    if (option) selectOption(option)
  }

  if (isEscapeKey(event)) close()
}

function handleDocumentClick(event: MouseEvent) {
  const dropdown = dropdownRef.value
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    if (!dropdown || !dropdown.contains(event.target as Node)) close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  if (shouldTeleport.value) {
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
  }
})
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})

defineExpose({ open, close, toggle, clear, isOpen })
</script>
