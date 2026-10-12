<template>
  <div
    ref="rootRef"
    :class="tableClasses"
    :style="rootStyle"
    role="grid"
    :aria-rowcount="props.data.length"
    :aria-colcount="leafColumns.length"
  >
    <div
      ref="headerRef"
      class="lh-table__header"
      role="rowgroup"
      :style="headerStyle"
      @scroll="onHeaderScroll"
    >
      <div
        v-for="(row, rowIndex) in headerRows"
        :key="rowIndex"
        class="lh-table__header-row"
        role="row"
      >
        <div
          v-for="cell in row"
          :key="cell.column.prop"
          role="columnheader"
          :class="headerCellClasses(cell)"
          :style="headerCellStyle(cell)"
          :aria-sort="ariaSort(cell.column)"
          :aria-colspan="cell.colspan > 1 ? cell.colspan : undefined"
          :aria-rowspan="cell.rowspan > 1 ? cell.rowspan : undefined"
        >
          <button
            v-if="cell.column.sortable"
            type="button"
            class="lh-table__sort-trigger"
            @click="toggleSort(cell.column)"
          >
            <span>{{ cell.column.label }}</span>
            <span
              class="lh-table__sort-icon"
              :class="{ 'lh-table__sort-icon--active': sortProp === cell.column.prop && sortOrder }"
              aria-hidden="true"
            >{{ sortIcon(cell.column) }}</span>
          </button>
          <span v-else>{{ cell.column.label }}</span>

          <!-- 筛选触发器（仅叶子列） -->
          <button
            v-if="cell.isLeaf && cell.column.filters?.length"
            ref="filterTriggerRefs"
            type="button"
            class="lh-table__filter-trigger"
            :aria-haspopup="true"
            :aria-expanded="openFilterProp === cell.column.prop"
            :aria-label="t('table.filterTitle', '筛选')"
            @click="toggleFilter(cell.column, $event)"
          >
            <span
              class="lh-table__filter-icon"
              :class="{ 'lh-table__filter-icon--active': isColumnFiltered(cell.column.prop) }"
              aria-hidden="true"
            >⏚</span>
          </button>

          <!-- 列宽拖拽手柄（仅叶子列） -->
          <div
            v-if="cell.isLeaf && isResizable(cell.column)"
            class="lh-table__resize-handle"
            role="separator"
            aria-orientation="vertical"
            :aria-label="t('table.resizeLabel', '调整列宽')"
            tabindex="0"
            @mousedown="onResizeStart($event, cell.column)"
            @keydown="onResizeKeydown($event, cell.column)"
          ></div>
        </div>
      </div>
    </div>

    <!-- 筛选面板（飞出） -->
    <teleport to="body">
      <transition name="lh-table__filter-fade">
        <div
          v-if="filterPanelColumn"
          ref="filterPanelRef"
          class="lh-table__filter-panel"
          role="group"
          :aria-label="t('table.filterTitle', '筛选')"
          :style="filterPanelStyle"
        >
          <div class="lh-table__filter-list">
            <label
              v-for="option in filterPanelColumn.filters"
              :key="String(option.value)"
              class="lh-table__filter-option"
            >
              <input
                v-if="filterPanelColumn.filterMultiple !== false"
                type="checkbox"
                :checked="draftValues.includes(option.value)"
                :value="option.value"
                @change="toggleDraftValue(option.value)"
              />
              <input
                v-else
                type="radio"
                :checked="draftValues.includes(option.value)"
                :value="option.value"
                @change="setDraftValue(option.value)"
              />
              <span>{{ option.text }}</span>
            </label>
          </div>
          <div class="lh-table__filter-actions">
            <button
              type="button"
              class="lh-table__filter-btn"
              @click="resetFilter"
            >{{ t('table.filterReset', '重置') }}</button>
            <button
              type="button"
              class="lh-table__filter-btn lh-table__filter-btn--primary"
              @click="confirmFilter"
            >{{ t('table.filterConfirm', '确定') }}</button>
          </div>
        </div>
      </transition>
    </teleport>

    <div
      ref="bodyRef"
      class="lh-table__body"
      :style="bodyStyle"
      @scroll="onScroll"
    >
      <div
        v-if="props.data.length === 0"
        class="lh-table__empty"
      >
        <slot name="empty">{{ t('table.empty', '暂无数据') }}</slot>
      </div>

      <div
        v-else
        ref="phantomRef"
        class="lh-table__phantom"
        :style="{ height: `${totalHeight}px` }"
      >
        <div
          class="lh-table__window"
          :style="windowStyle"
        >
          <div
            v-for="(row, i) in visibleRows"
            :key="rowKeyOf(row, range.start + i)"
            class="lh-table__row"
            role="row"
            :style="{ ...gridRowStyle, ...rowStyle }"
            tabindex="0"
            @click="emit('rowClick', row, range.start + i)"
            @keydown.enter.prevent="emit('rowClick', row, range.start + i)"
            @keydown.space.prevent="emit('rowClick', row, range.start + i)"
          >
            <div
              v-for="(column, colIndex) in leafColumns"
              :key="column.prop"
              role="gridcell"
              :class="bodyCellClasses(colIndex)"
              :style="cellStyle(colIndex)"
            >
              <slot
                :name="column.slot"
                :row="row"
                :column="column"
                :index="range.start + i"
                :value="row[column.prop]"
              >{{ getCellValue(row, column) }}</slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  buildHeaderCells,
  clampColumnWidth,
  computeVisibleRange,
  cycleSortOrder,
  filterTableRows,
  flattenLeafColumns,
  getCellValue,
  getGridTemplate,
  getHeaderStickyOffsets,
  getStickyOffsets,
  getTableCellClassNames,
  getTableClassNames,
  LH_TABLE_ROW_HEIGHT,
  sortTableRows,
} from '@lh-ui/share/core/table'
import { LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import { useLhClickOutside, useLhPopper, useLhZIndex } from '~/composables'
import { lhlocale } from '~/locale'
import type { LhTableColumn, LhTableRow, LhTableSortOrder } from '@lh-ui/share/core/table'
import type { LhTableProps } from './types'

defineOptions({ name: 'LhTable' })

const props = withDefaults(defineProps<LhTableProps>(), {
  height: undefined,
  rowHeight: LH_TABLE_ROW_HEIGHT,
  stripe: false,
  border: false,
  size: 'default',
  rowKey: 'id',
  defaultSortProp: undefined,
  defaultSortOrder: undefined,
  sorter: undefined,
  resizable: false,
  defaultFilteredValues: () => ({}),
  filteredValues: undefined,
  sx: undefined,
})

const emit = defineEmits<{
  sortChange: [payload: { prop: string; order: LhTableSortOrder | undefined }]
  rowClick: [row: LhTableRow, index: number]
  filterChange: [payload: { prop: string; values: (string | number)[] }]
  'update:filteredValues': [values: Record<string, (string | number)[]>]
  columnResize: [payload: { prop: string; width: number }]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

/** ============ 列结构（多级表头） ============ */
const headerCells = computed(() => buildHeaderCells(props.columns))
const leafColumns = computed(() => flattenLeafColumns(props.columns))

/** 表头按层级分行渲染（平铺配置只有一行） */
const headerRows = computed(() => {
  const rows: (typeof headerCells.value)[] = []
  for (const cell of headerCells.value) {
    ;(rows[cell.level] ??= []).push(cell)
  }
  return rows
})

const headerDepth = computed(() => headerRows.value.length)

/** ============ 排序 ============ */
const sortProp = ref<string | undefined>(props.defaultSortProp)
const sortOrder = ref<LhTableSortOrder | undefined>(props.defaultSortOrder)

function toggleSort(column: LhTableColumn): void {
  if (!column.sortable) return
  // 切换排序列时从无到有；同列按 asc → desc → 无循环
  const nextOrder = sortProp.value === column.prop ? cycleSortOrder(sortOrder.value) : 'asc'
  sortProp.value = nextOrder ? column.prop : undefined
  sortOrder.value = nextOrder
  emit('sortChange', { prop: column.prop, order: nextOrder })
}

function ariaSort(column: LhTableColumn): 'ascending' | 'descending' | 'none' | undefined {
  if (!column.sortable) return undefined
  if (sortProp.value !== column.prop || !sortOrder.value) return 'none'
  return sortOrder.value === 'asc' ? 'ascending' : 'descending'
}

function sortIcon(column: LhTableColumn): string {
  if (sortProp.value !== column.prop || !sortOrder.value) return '↕'
  return sortOrder.value === 'asc' ? '↑' : '↓'
}

/** ============ 筛选 ============ */
const innerFiltered = ref<Record<string, (string | number)[]>>({
  ...props.defaultFilteredValues,
})
const filteredValues = computed(() => props.filteredValues ?? innerFiltered.value)

function isColumnFiltered(prop: string): boolean {
  return (filteredValues.value[prop] ?? []).length > 0
}

/** 参与过滤的列与其选中值 */
const activeFilters = computed(() =>
  leafColumns.value
    .filter((column) => column.filters?.length)
    .map((column) => ({ column, values: filteredValues.value[column.prop] ?? [] })),
)

const openFilterProp = ref<string | null>(null)
const draftValues = ref<(string | number)[]>([])
const filterTriggerRefs = ref<HTMLElement[]>([])
const filterPanelRef = ref<HTMLElement | null>(null)
const { zIndex } = useLhZIndex()

const filterPanelColumn = computed(() =>
  openFilterProp.value ? leafColumns.value.find((c) => c.prop === openFilterProp.value) ?? null : null,
)

function toggleFilter(column: LhTableColumn, event: MouseEvent): void {
  if (openFilterProp.value === column.prop) {
    closeFilter()
    return
  }
  // 打开新面板前克隆当前选中态为草稿，确定才写回
  openFilterProp.value = column.prop
  draftValues.value = [...(filteredValues.value[column.prop] ?? [])]
  filterTriggerEl.value = event.currentTarget as HTMLElement
}

function closeFilter(): void {
  openFilterProp.value = null
  draftValues.value = []
}

function toggleDraftValue(value: string | number): void {
  const i = draftValues.value.indexOf(value)
  if (i === -1) draftValues.value = [...draftValues.value, value]
  else draftValues.value = draftValues.value.filter((v) => v !== value)
}

function setDraftValue(value: string | number): void {
  draftValues.value = [value]
}

function commitFilter(prop: string, values: (string | number)[]): void {
  innerFiltered.value = { ...filteredValues.value, [prop]: values }
  emit('update:filteredValues', innerFiltered.value)
  emit('filterChange', { prop, values })
}

function confirmFilter(): void {
  const prop = openFilterProp.value
  if (!prop) return
  commitFilter(prop, [...draftValues.value])
  closeFilter()
}

function resetFilter(): void {
  const prop = openFilterProp.value
  if (!prop) return
  draftValues.value = []
  commitFilter(prop, [])
  closeFilter()
}

/** 面板定位：复用飞出层能力（triggerEl 必须是 ref，computed 对普通变量不响应） */
const filterTriggerEl = ref<HTMLElement | null>(null)
const { popperStyle: filterPanelPosition } = useLhPopper({
  triggerRef: filterTriggerEl,
  popperRef: filterPanelRef,
  visible: computed(() => openFilterProp.value !== null),
  placement: 'bottom-start',
})

const filterPanelStyle = computed(() => ({
  ...filterPanelPosition.value,
  zIndex: String(zIndex.value),
}))

useLhClickOutside(() => [filterPanelRef.value, ...filterTriggerRefs.value], () => {
  if (openFilterProp.value) closeFilter()
})

/** ============ 列宽拖拽 ============ */
/** 列宽覆盖（拖拽/键盘调整后按 prop 记录，不改动使用方传入的 columns） */
const widthOverrides = ref<Record<string, number>>({})

function isResizable(column: LhTableColumn): boolean {
  return !!props.resizable && column.resizable !== false && typeof column.width === 'number'
}

/** 合并覆盖宽度后的叶子列（供网格模板与 sticky 偏移消费） */
const resolvedLeafColumns = computed(() =>
  leafColumns.value.map((column) => {
    const override = widthOverrides.value[column.prop]
    return override != null ? { ...column, width: override } : column
  }),
)

const stickyOffsets = computed(() => getStickyOffsets(resolvedLeafColumns.value))
const headerStickyOffsets = computed(() =>
  getHeaderStickyOffsets(resolvedLeafColumns.value, headerCells.value),
)
const gridTemplate = computed(() => getGridTemplate(resolvedLeafColumns.value))

let resizingProp: string | null = null
let resizeStartX = 0
let resizeStartWidth = 0

function onResizeStart(event: MouseEvent, column: LhTableColumn): void {
  if (!isResizable(column)) return
  event.preventDefault()
  resizingProp = column.prop
  resizeStartX = event.clientX
  resizeStartWidth = widthOverrides.value[column.prop] ?? (column.width as number)
  document.addEventListener('mousemove', onResizeMove)
  document.addEventListener('mouseup', onResizeEnd)
}

function onResizeMove(event: MouseEvent): void {
  if (!resizingProp) return
  const next = clampColumnWidth(resizeStartWidth + (event.clientX - resizeStartX))
  widthOverrides.value = { ...widthOverrides.value, [resizingProp]: next }
}

function onResizeEnd(): void {
  document.removeEventListener('mousemove', onResizeMove)
  document.removeEventListener('mouseup', onResizeEnd)
  if (resizingProp) {
    const prop = resizingProp
    resizingProp = null
    emit('columnResize', { prop, width: widthOverrides.value[prop] as number })
  }
}

function onResizeKeydown(event: KeyboardEvent, column: LhTableColumn): void {
  if (!isResizable(column)) return
  if (event.key !== LH_KEYS.ArrowLeft && event.key !== LH_KEYS.ArrowRight) return
  event.preventDefault()
  const step = (event.key === LH_KEYS.ArrowRight ? 1 : -1) * 10
  const current = widthOverrides.value[column.prop] ?? (column.width as number)
  widthOverrides.value = {
    ...widthOverrides.value,
    [column.prop]: clampColumnWidth(current + step),
  }
  emit('columnResize', { prop: column.prop, width: widthOverrides.value[column.prop] as number })
}

/** ============ 数据链：过滤 → 排序 → 虚拟切片 ============ */
const filteredRows = computed(() => filterTableRows(props.data, activeFilters.value))
const sortedRows = computed(() =>
  sortTableRows(filteredRows.value, sortProp.value ?? '', sortOrder.value, props.sorter),
)

/** ============ 虚拟滚动 ============ */
const isVirtual = computed(() => props.height != null)
const bodyRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const phantomRef = ref<HTMLElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const viewportHeight = ref(0)
const range = computed(() =>
  computeVisibleRange(scrollTop.value, viewportHeight.value, props.rowHeight, sortedRows.value.length),
)
const totalHeight = computed(() => range.value.totalHeight)
const visibleRows = computed(() =>
  isVirtual.value ? sortedRows.value.slice(range.value.start, range.value.end) : sortedRows.value,
)
const windowStyle = computed(() =>
  isVirtual.value ? { transform: `translateY(${range.value.offsetY}px)` } : undefined,
)
const rowStyle = computed(() =>
  isVirtual.value ? { height: `${props.rowHeight}px` } : undefined,
)

function onScroll(event: Event): void {
  const target = event.target as HTMLElement
  if (isVirtual.value) {
    scrollTop.value = target.scrollTop
  }
  // 横向滚动同步表头：表头/表体是两个独立的宽度体系，scrollLeft 不同步会列错位
  syncScrollLeft(target, headerRef.value)
}

/**
 * 表头↔表体横向滚动双向同步（header 的滚动条在 SCSS 里已隐藏，横向滚动只由表体承担）。
 * 同步标记防止两个 scroll 事件互相触发形成回环。
 */
let isSyncingScroll = false
function syncScrollLeft(source: HTMLElement | null, target: HTMLElement | null): void {
  if (!source || !target || isSyncingScroll) return
  isSyncingScroll = true
  target.scrollLeft = source.scrollLeft
  isSyncingScroll = false
}

function onHeaderScroll(event: Event): void {
  syncScrollLeft(event.target as HTMLElement, bodyRef.value)
}

let resizeObserver: ResizeObserver | null = null

function measure(): void {
  const el = bodyRef.value
  if (el) viewportHeight.value = el.clientHeight
}

/**
 * 表体的竖向滚动条会吃掉一段宽度（平台相关，Chrome 桌面约 15px）。表头与表体共用同一份
 * gridTemplate，但两端网格区域不同宽时 fr 列解析结果不同，列边界错位。给表头右侧补等宽
 * 内边距，让表头网格与表体内容区同宽（表头背景色自然铺满这段槽位）。
 */
function syncHeaderGutter(): void {
  const body = bodyRef.value
  const header = headerRef.value
  if (!body || !header) return
  const gutter = body.offsetWidth - body.clientWidth
  header.style.paddingRight = gutter > 0 ? `${gutter}px` : ''
}

onMounted(() => {
  measure()
  syncHeaderGutter()
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      measure()
      // 容器缩放 / max-height 切换（表体宽高变化）与数据增减（幻影高度变化导致
      // 竖向滚动条出现或消失）都要重算表头槽位
      syncHeaderGutter()
    })
    if (bodyRef.value) resizeObserver.observe(bodyRef.value)
    if (phantomRef.value) resizeObserver.observe(phantomRef.value)
  }
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  window.removeEventListener('resize', measure)
  document.removeEventListener('mousemove', onResizeMove)
  document.removeEventListener('mouseup', onResizeEnd)
})

/** ============ 样式与类名 ============ */
function rowKeyOf(row: LhTableRow, index: number): string | number {
  const key = row[props.rowKey]
  return key == null ? index : (key as string | number)
}

/** 表体单元格样式（含 sticky 偏移） */
function cellStyle(colIndex: number): Record<string, string> {
  const sticky = stickyOffsets.value[colIndex]
  const style: Record<string, string> = {}
  if (sticky.left != null) style.left = `${sticky.left}px`
  if (sticky.right != null) style.right = `${sticky.right}px`
  const align = resolvedLeafColumns.value[colIndex].align
  if (align) style.textAlign = align
  return style
}

/** 表头单元格样式：网格定位 + sticky 偏移 */
function headerCellStyle(cell: (typeof headerCells.value)[number]): Record<string, string> {
  const style: Record<string, string> = {
    gridColumn: `${cell.leafStart + 1} / span ${cell.colspan}`,
    gridRow: `${cell.level + 1} / span ${cell.rowspan}`,
  }
  const sticky = headerStickyOffsets.value[headerCells.value.indexOf(cell)]
  if (sticky?.left != null) style.left = `${sticky.left}px`
  if (sticky?.right != null) style.right = `${sticky.right}px`
  const align = cell.column.align
  if (align) style.textAlign = align
  return style
}

/** 行网格模板（表头与表体共用，保证列对齐） */
const gridRowStyle = computed(() => ({ gridTemplateColumns: gridTemplate.value }))

/** 表头容器同时定义列模板与行模板 */
const headerStyle = computed(() => ({
  gridTemplateColumns: gridTemplate.value,
  gridTemplateRows: `repeat(${headerDepth.value}, auto)`,
}))

function headerCellClasses(cell: (typeof headerCells.value)[number]): string[] {
  return getTableCellClassNames({
    align: cell.column.align ?? 'left',
    fixed: cell.column.fixed,
    lastFixedLeft: cell.isLeaf && isLastFixedLeft(cell.leafStart),
    firstFixedRight: cell.isLeaf && isFirstFixedRight(cell.leafStart),
    resizable: cell.isLeaf && isResizable(cell.column),
  })
}

function bodyCellClasses(colIndex: number): string[] {
  const column = resolvedLeafColumns.value[colIndex]
  return getTableCellClassNames({
    align: column.align ?? 'left',
    fixed: column.fixed,
    lastFixedLeft: isLastFixedLeft(colIndex),
    firstFixedRight: isFirstFixedRight(colIndex),
  })
}

function isLastFixedLeft(leafIndex: number): boolean {
  return resolvedLeafColumns.value[leafIndex + 1]?.fixed !== 'left'
}

function isFirstFixedRight(leafIndex: number): boolean {
  return resolvedLeafColumns.value[leafIndex - 1]?.fixed !== 'right'
}

const tableClasses = computed(() =>
  getTableClassNames({
    stripe: !!props.stripe,
    border: !!props.border,
    size: props.size,
    virtual: isVirtual.value,
  }),
)

const rootStyle = computed(() => sxToStyle(props.sx ?? {}))

/**
 * 尺寸归一化：纯数字（number 或 "200" 这类无单位数字串）补 px。
 * CSSOM 会静默丢弃无单位长度（el.style.maxHeight = "200" 不生效，style 属性保持为空），
 * 官方 demo 的 max-height="200" 曾因此完全失效。
 */
function normalizeSize(value: string | number | undefined): string | undefined {
  if (value == null) return undefined
  if (typeof value === 'number') return `${value}px`
  const trimmed = value.trim()
  return /^\d+(\.\d+)?$/.test(trimmed) ? `${trimmed}px` : value
}

const bodyStyle = computed(() => {
  if (props.height == null) {
    return props.maxHeight == null ? undefined : { maxHeight: normalizeSize(props.maxHeight) }
  }
  return { height: normalizeSize(props.height) }
})
</script>
