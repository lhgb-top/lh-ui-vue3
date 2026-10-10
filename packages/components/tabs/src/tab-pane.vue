<template>
  <div
    v-show="isActive"
    :id="`${idPrefix}-panel-${name}`"
    role="tabpanel"
    :aria-labelledby="`${idPrefix}-tab-${name}`"
    tabindex="0"
    class="lh-tab-pane"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { LH_TABS_KEY } from './types'
import type { LhTabPaneProps } from './types'

defineOptions({ name: 'LhTabPane' })

const props = withDefaults(defineProps<LhTabPaneProps>(), {
  label: '',
  disabled: false,
})

const context = inject(LH_TABS_KEY, null)

const isActive = computed(() => (context ? context.activeName.value === props.name : false))
const idPrefix = computed(() => (context ? context.idPrefix : 'lh-tabs'))
</script>
