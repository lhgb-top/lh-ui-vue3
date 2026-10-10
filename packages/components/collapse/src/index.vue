<template>
  <div
    :class="collapseClasses"
    :style="collapseStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { normalizeActiveKeys, toggleCollapseKey } from '@lh-ui/share/core/collapse'
import type { LhCollapseKey } from '@lh-ui/share/core/collapse'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { LH_COLLAPSE_CONTEXT_KEY } from './types'
import type { LhCollapseProps } from './types'

defineOptions({ name: 'LhCollapse' })

const props = withDefaults(defineProps<LhCollapseProps>(), {
  modelValue: undefined,
  accordion: false,
  sx: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: LhCollapseProps['modelValue']]
  change: [value: LhCollapseProps['modelValue']]
}>()

const activeKeys = ref<LhCollapseKey[]>(normalizeActiveKeys(props.modelValue))

function toggle(key: LhCollapseKey): void {
  if (props.modelValue !== undefined) {
    // 受控：仅抛出，内部不落值
    emit('update:modelValue', toggleCollapseKey(normalizeActiveKeys(props.modelValue), key, props.accordion))
    return
  }
  activeKeys.value = toggleCollapseKey(activeKeys.value, key, props.accordion)
  emit('change', props.accordion ? (activeKeys.value[0] ?? undefined) : [...activeKeys.value])
}

provide(LH_COLLAPSE_CONTEXT_KEY, {
  activeKeys,
  accordion: computed(() => props.accordion),
  toggle,
})

const collapseClasses = computed(() => {
  const classes = ['lh-collapse']
  if (props.accordion) classes.push('lh-collapse--accordion')
  return classes
})

const collapseStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
