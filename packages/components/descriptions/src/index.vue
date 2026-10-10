<template>
  <div
    :class="descriptionsClasses"
    :style="sxStyle"
  >
    <div
      v-if="props.title || $slots.title"
      class="lh-descriptions__header"
    >
      <slot name="title">{{ props.title }}</slot>
    </div>
    <div class="lh-descriptions__body">
      <dl
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="lh-descriptions__row"
        :style="{ display: 'flex' }"
      >
        <template v-for="(cell, cellIndex) in row.cells" :key="`${rowIndex}-${cellIndex}`">
          <dt
            class="lh-descriptions__label"
            :style="{ flex: `0 0 ${labelBasis}%` }"
          >
            {{ cell.item.label }}
          </dt>
          <dd
            class="lh-descriptions__content"
            :style="{ flex: `0 0 ${contentBasis(cell.span)}%` }"
          >
            <slot
              :item="cell.item"
              :name="`item-${cellIndex}`"
            >
              {{ cell.item.value }}
            </slot>
          </dd>
        </template>
        <div
          v-if="row.filler > 0"
          class="lh-descriptions__filler"
          :style="{ flex: `0 0 ${contentBasis(row.filler)}%` }"
          aria-hidden="true"
        ></div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LhDescriptions' })

import { computed } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { getDescriptionsClassNames, buildDescriptionRows } from '@lh-ui/share/core/descriptions'
import type { LhDescriptionsProps } from './types'

const props = withDefaults(defineProps<LhDescriptionsProps>(), {
  title: undefined,
  column: 3,
  border: false,
  items: () => [],
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

const rows = computed(() => buildDescriptionRows(props.items, props.column))

const descriptionsClasses = computed(() =>
  getDescriptionsClassNames({
    column: props.column,
    border: props.border,
  })
)

// label 与 content 各占单元格宽度的一半
function labelBasis(): number {
  return 100 / (props.column * 2)
}

function contentBasis(span: number): number {
  return (span * 100) / props.column - labelBasis()
}
</script>
