<template>
  <nav
    class="lh-pagination"
    :class="[
      `lh-pagination--${simple ? 'simple' : 'full'}`,
      { 'lh-pagination--disabled': disabled },
    ]"
    :style="rootStyle"
    aria-label="pagination"
  >
    <span
      v-if="showTotal"
      class="lh-pagination__total"
    >{{ totalText }}</span>

    <button
      type="button"
      class="lh-pagination__btn lh-pagination__btn--prev"
      :disabled="disabled || innerCurrent <= 1"
      :aria-label="prevLabel"
      @click="go(innerCurrent - 1)"
    >
      <span aria-hidden="true">‹</span>
    </button>

    <template v-if="!simple">
      <ul class="lh-pagination__pages">
        <li
          v-for="(item, index) in range"
          :key="index"
          class="lh-pagination__cell"
        >
          <button
            v-if="item.type === 'page'"
            type="button"
            class="lh-pagination__btn lh-pagination__page"
            :class="{ 'lh-pagination__page--active': item.page === innerCurrent }"
            :disabled="disabled"
            :aria-label="pageLabel(item.page)"
            :aria-current="item.page === innerCurrent ? 'page' : undefined"
            @click="go(item.page)"
          >{{ item.page }}</button>
          <span
            v-else
            class="lh-pagination__ellipsis"
            aria-hidden="true"
          >•••</span>
        </li>
      </ul>
    </template>

    <span
      v-else
      class="lh-pagination__simple-text"
    >{{ innerCurrent }} / {{ pageCount }}</span>

    <button
      type="button"
      class="lh-pagination__btn lh-pagination__btn--next"
      :disabled="disabled || innerCurrent >= pageCount"
      :aria-label="nextLabel"
      @click="go(innerCurrent + 1)"
    >
      <span aria-hidden="true">›</span>
    </button>

    <label
      v-if="showSizeChanger"
      class="lh-pagination__size"
    >
      <span class="lh-pagination__size-label">{{ sizeChangerLabel }}</span>
      <select
        v-model.number="innerPageSize"
        class="lh-pagination__size-select"
        :disabled="disabled"
        :aria-label="sizeChangerLabel"
        @change="handleSizeChange"
      >
        <option
          v-for="size in pageSizes"
          :key="size"
          :value="size"
        >{{ sizeText(size) }}</option>
      </select>
    </label>

    <span
      v-if="showJumper"
      class="lh-pagination__jumper"
    >
      <label
        class="lh-pagination__jumper-label"
        :for="jumperId"
      >{{ gotoLabel }}</label>
      <input
        :id="jumperId"
        v-model.number="jumpPage"
        type="number"
        min="1"
        :max="pageCount"
        class="lh-pagination__jumper-input"
        :disabled="disabled"
        @keydown.enter="handleJump"
        @blur="handleJump"
      >
      <span
        v-if="pageSuffixText"
        class="lh-pagination__jumper-suffix"
      >{{ pageSuffixText }}</span>
    </span>
  </nav>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import {
  clampPage,
  formatMessage,
  getPaginationRange,
  getPageCount,
} from '@lh-ui/share/core/pagination'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import { generateId } from '@lh-ui/share/utils'
import type { LhPaginationProps } from './types'

defineOptions({ name: 'LhPagination' })

const props = withDefaults(defineProps<LhPaginationProps>(), {
  pageSize: 10,
  current: undefined,
  pageSizes: () => [10, 20, 30, 40],
  showTotal: false,
  showSizeChanger: false,
  showJumper: false,
  simple: false,
  disabled: false,
  sx: undefined,
})

const emit = defineEmits<{
  'update:current': [page: number]
  'update:pageSize': [size: number]
  change: [page: number]
  'size-change': [size: number]
}>()

const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

// 受控/非受控双模式：传入 current/pageSize 即受控同步，内部值驱动渲染
const innerCurrent = ref(clampPage(props.current ?? 1, getPageCount(props.total, props.pageSize)))
const innerPageSize = ref(props.pageSize)

const pageCount = computed(() => getPageCount(props.total, innerPageSize.value))

watch(
  () => props.current,
  (val) => {
    if (val !== undefined) innerCurrent.value = clampPage(val, pageCount.value)
  },
)
watch(
  () => props.pageSize,
  (val) => {
    if (val !== undefined) innerPageSize.value = val
  },
)
watch(pageCount, (count) => {
  if (innerCurrent.value > count) go(count)
})

const range = computed(() =>
  getPaginationRange({ current: innerCurrent.value, pageCount: pageCount.value }),
)

function go(page: number) {
  const target = clampPage(page, pageCount.value)
  if (props.disabled || target === innerCurrent.value) return
  innerCurrent.value = target
  emit('update:current', target)
  emit('change', target)
}

function handleSizeChange() {
  emit('update:pageSize', innerPageSize.value)
  emit('size-change', innerPageSize.value)
  // 条数变化后当前页可能越界，钳制并通知
  const target = clampPage(innerCurrent.value, pageCount.value)
  if (target !== innerCurrent.value) go(target)
}

const jumpPage = ref<number | null>(null)
const jumperId = generateId('lh-pagination-jumper')

function handleJump() {
  if (jumpPage.value === null || Number.isNaN(jumpPage.value)) return
  go(jumpPage.value)
  jumpPage.value = null
}

const totalText = computed(() =>
  formatMessage(t('pagination.total', 'Total {total} items'), { total: props.total }),
)
const prevLabel = computed(() => t('pagination.prev', 'Previous page'))
const nextLabel = computed(() => t('pagination.next', 'Next page'))
const gotoLabel = computed(() => t('pagination.goto', 'Go to'))
const pageSuffixText = computed(() => t('pagination.pageSuffix', ''))
const sizeChangerLabel = computed(() => t('pagination.sizeChangerLabel', 'Items per page'))

function pageLabel(page: number) {
  return formatMessage(t('pagination.page', 'Page {page}'), { page })
}

function sizeText(size: number) {
  return formatMessage(t('pagination.sizeChanger', '{size} / page'), { size })
}

const rootStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
