<template>
  <li
    ref="rootRef"
    :class="itemClass"
    role="menuitem"
    :tabindex="disabled ? -1 : (active ? 0 : -1)"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import type { LhDropdownItemProps, LhDropdownItemRecord } from './types'
import { LH_DROPDOWN_KEY } from './types'
import { getDropdownItemClass } from '@lh-ui/share/core/dropdown/logic'

defineOptions({ name: 'LhDropdownItem' })

const props = defineProps<LhDropdownItemProps>()

const emit = defineEmits<{
  click: [command: string | number | undefined]
}>()

const rootRef = ref<HTMLElement | null>(null)
const ctx = inject(LH_DROPDOWN_KEY, null)

const record: LhDropdownItemRecord = {
  get el() {
    return rootRef.value as HTMLElement
  },
  command: props.command,
  disabled: props.disabled,
  divided: props.divided,
}

const index = computed(() => (ctx ? ctx.items.value.indexOf(record) : -1))
const active = computed(() => index.value !== -1 && index.value === ctx?.activeIndex.value)

onMounted(() => {
  ctx?.registerItem(record)
})

onBeforeUnmount(() => {
  ctx?.unregisterItem(record)
})

const itemClass = computed(() =>
  getDropdownItemClass({ disabled: props.disabled, divided: props.divided })
)

function handleClick() {
  if (props.disabled) return
  emit('click', props.command)
  ctx?.onItemClick(props.command)
}
</script>
