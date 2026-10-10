<template>
  <div
    ref="rootRef"
    class="lh-tree-select"
    :class="{ 'lh-tree-select--open': isOpen, 'lh-tree-select--disabled': props.disabled }"
    :style="rootStyle"
  >
    <button
      ref="triggerRef"
      type="button"
      class="lh-tree-select__trigger"
      :disabled="props.disabled || undefined"
      :aria-expanded="isOpen"
      aria-haspopup="tree"
      :aria-label="t('treeSelect.triggerLabel', '树选择')"
      @click="toggleOpen"
      @keydown="handleTriggerKeydown"
    >
      <span
        v-if="displayText"
        class="lh-tree-select__value"
      >{{ displayText }}</span>
      <span
        v-else
        class="lh-tree-select__placeholder"
      >{{ props.placeholder || t('select.placeholder', '请选择') }}</span>
      <span
        class="lh-tree-select__arrow"
        :class="{ 'lh-tree-select__arrow--open': isOpen }"
        aria-hidden="true"
      >▾</span>
    </button>

    <teleport
      to="body"
      :disabled="!props.teleported"
    >
      <div
        v-if="isOpen"
        ref="panelRef"
        class="lh-tree-select__panel"
        :style="panelStyle"
        role="listbox"
        :aria-multiselectable="props.multiple || undefined"
      >
        <LhTree
          :data="props.data"
          :show-checkbox="props.multiple"
          :expanded-keys="expandedKeys"
          :selected-keys="selectedKeys"
          @update:expanded-keys="onExpandedChange"
          @update:selected-keys="onSelectedChange"
          @update:checked-keys="onCheckedChange"
        />
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { isEscapeKey, sxToStyle } from '@lh-ui/share/core/shared'
import { useLhClickOutside, useLhPopper, useLhZIndex } from '~/composables'
import { findTreeNode } from '@lh-ui/share/core/tree'
import { lhlocale } from '~/locale'
import LhTree from '~/components/tree/src/index.vue'
import type { LhTreeSelectProps } from './types'

defineOptions({ name: 'LhTreeSelect' })

const props = withDefaults(defineProps<LhTreeSelectProps>(), {
  multiple: false,
  disabled: false,
  placeholder: undefined,
  teleported: true,
  sx: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | undefined]
  change: [value: string | string[] | undefined]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const { zIndex } = useLhZIndex()
const { popperStyle } = useLhPopper({
  triggerRef,
  popperRef: panelRef,
  visible: isOpen,
  placement: 'bottom-start',
})

const expandedKeys = ref<string[]>([])
const selectedKeys = computed<string[]>(() => {
  if (props.modelValue == null) return []
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

const displayText = computed(() => {
  const keys = selectedKeys.value
  if (keys.length === 0) return ''
  const labels = keys
    .map((key) => findTreeNode(props.data, key)?.label)
    .filter((label): label is string => !!label)
  return labels.join('、')
})

function toggleOpen(): void {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function close(): void {
  isOpen.value = false
}

function onSelectedChange(keys: string[]): void {
  if (props.multiple) return
  const value = keys.length > 0 ? keys[keys.length - 1] : undefined
  emit('update:modelValue', value)
  emit('change', value)
  close()
}

function onCheckedChange(keys: string[]): void {
  if (!props.multiple) return
  emit('update:modelValue', keys)
  emit('change', keys)
}

function onExpandedChange(keys: string[]): void {
  expandedKeys.value = keys
}

function handleTriggerKeydown(event: KeyboardEvent): void {
  if (isEscapeKey(event) && isOpen.value) {
    event.preventDefault()
    close()
  }
}

function focusTrigger(): void {
  const el = rootRef.value?.querySelector<HTMLElement>('.lh-tree-select__trigger')
  el?.focus()
}

useLhClickOutside(
  () => [rootRef.value, panelRef.value],
  () => {
    if (isOpen.value) close()
  },
)

watch(isOpen, (value) => {
  if (!value) focusTrigger()
})

onMounted(() => {
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentKeydown)
})

function onDocumentKeydown(event: KeyboardEvent): void {
  if (isEscapeKey(event) && isOpen.value) close()
}

const rootStyle = computed(() => sxToStyle(props.sx ?? {}))

const panelStyle = computed(() => ({
  ...popperStyle.value,
  zIndex: String(zIndex.value),
}))
</script>
