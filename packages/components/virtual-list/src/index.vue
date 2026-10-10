<template>
  <div
    ref="rootRef"
    :class="listClasses"
    :style="listStyle"
    @scroll="onScroll"
  >
    <div
      class="lh-virtual-list__phantom"
      :style="{ height: `${totalHeight}px` }"
    >
      <div
        class="lh-virtual-list__window"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <div
          v-for="index in visibleIndexes"
          :key="index"
          class="lh-virtual-list__item"
          :style="itemStyle(index)"
        >
          <slot
            :item="props.data[index]"
            :index="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  buildVirtualItems,
  computeVirtualRange,
  findVirtualRange,
  getVirtualListClassNames,
  LH_VIRTUAL_OVERSCAN,
} from '@lh-ui/share/core/virtual-list'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhVirtualListProps } from './types'

defineOptions({ name: 'LhVirtualList' })

const props = withDefaults(defineProps<LhVirtualListProps>(), {
  itemHeight: undefined,
  itemSize: undefined,
  overscan: LH_VIRTUAL_OVERSCAN,
  sx: undefined,
})

const rootRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const viewportHeight = ref(0)

/** 动态高度模式：按 itemSize 预计算偏移 */
const dynamicItems = computed(() => {
  if (!props.itemSize) return null
  const sizes = props.data.map((_, index) => props.itemSize?.(index) ?? 0)
  return buildVirtualItems(props.data.length, sizes)
})

const range = computed(() => {
  if (dynamicItems.value) {
    return findVirtualRange(dynamicItems.value.items, scrollTop.value, viewportHeight.value, props.overscan)
  }
  return computeVirtualRange(
    scrollTop.value,
    viewportHeight.value,
    props.itemHeight ?? 40,
    props.data.length,
    props.overscan,
  )
})

const totalHeight = computed(() => range.value.totalHeight)
const offsetY = computed(() => range.value.offsetY)

const visibleIndexes = computed(() =>
  Array.from({ length: Math.max(0, range.value.end - range.value.start) }, (_, i) => range.value.start + i),
)

function itemStyle(index: number): Record<string, string> {
  if (!dynamicItems.value) {
    return props.itemHeight ? { height: `${props.itemHeight}px` } : {}
  }
  const item = dynamicItems.value.items[index]
  return item ? { height: `${item.size}px` } : {}
}

function onScroll(event: Event): void {
  scrollTop.value = (event.target as HTMLElement).scrollTop
}

let resizeObserver: ResizeObserver | null = null

function measure(): void {
  if (rootRef.value) viewportHeight.value = rootRef.value.clientHeight
}

onMounted(() => {
  measure()
  if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(rootRef.value)
  }
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  window.removeEventListener('resize', measure)
})

const listClasses = computed(() => getVirtualListClassNames())

const listStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  overflow: 'auto',
  ...sxToStyle(props.sx ?? {}),
}))
</script>
