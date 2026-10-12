<template>
  <div
    ref="pickerRef"
    class="lh-date-picker"
    :class="pickerClasses"
    :aria-invalid="!!formItem?.errorMessage || undefined"
    :style="sxStyle"
  >
    <div
      class="lh-date-picker__input"
      :class="inputClasses"
      role="combobox"
      :tabindex="disabled ? -1 : 0"
      :aria-expanded="internalVisible ? 'true' : 'false'"
      :aria-controls="panelId"
      aria-haspopup="dialog"
      :aria-placeholder="displayPlaceholder"
      @click="handleClick"
      @keydown="onTriggerKeydown"
    >
      <template v-if="modelValue">
        <span
          v-if="Array.isArray(modelValue)"
          class="lh-date-picker__value"
        >
          {{ formatDisplay(modelValue[0]) }}
          <span class="lh-date-picker__separator">{{ rangeSeparator }}</span>
          {{ formatDisplay(modelValue[1]) }}
        </span>
        <span
          v-else
          class="lh-date-picker__value"
        >
          {{ formatDisplay(modelValue as Date) }}
        </span>
      </template>
      <input
        v-else
        :placeholder="displayPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        tabindex="-1"
        class="lh-date-picker__input-inner"
      />
      <LhIcon
        v-if="clearable && modelValue"
        name="close"
        size="small"
        class="lh-date-picker__clear"
        @click.stop="handleClear"
      />
      <LhIcon
        name="date"
        size="small"
        class="lh-date-picker__icon"
      />
    </div>

    <Teleport
      :to="teleportTarget"
      :disabled="false"
    >
      <Transition
        name="lh-fade-in"
        @after-leave="onPanelClosed"
      >
        <div
          v-if="internalVisible"
          :id="panelId"
          ref="panelRef"
          :class="panelClasses"
          :style="panelStyle"
          class="lh-date-picker__panel"
          role="dialog"
          aria-modal="false"
          :aria-label="t('datepicker.panelLabel', '选择日期')"
        >
          <div class="lh-date-picker-panel">
            <!-- 工具栏 -->
            <div class="lh-date-picker-panel__header">
              <div class="lh-date-picker-panel__title">
                <button
                  :disabled="disabled"
                  class="lh-date-picker-panel__btn"
                  :aria-label="t('datepicker.prevMonth', '上一月')"
                  @click="prevUnit"
                >
                  <LhIcon
                    name="arrow-left"
                    size="small"
                  />
                </button>
                <button
                  :id="`${panelId}-title`"
                  class="lh-date-picker-panel__title-text"
                  @click="toggleView"
                >
                  <template v-if="viewMode === 'date'">
                    {{ currentYear }}{{ yearLabel }} {{ currentMonth + 1 }}{{ monthLabel }}
                  </template>
                  <template v-else-if="viewMode === 'month'">
                    {{ currentYear }}{{ yearLabel }}
                  </template>
                  <template v-else>
                    {{ decadeLabel }}
                  </template>
                </button>
                <button
                  :disabled="disabled"
                  class="lh-date-picker-panel__btn"
                  :aria-label="t('datepicker.nextMonth', '下一月')"
                  @click="nextUnit"
                >
                  <LhIcon
                    name="arrow-right"
                    size="small"
                  />
                </button>
              </div>
            </div>

            <!-- 日历视图（表头 + 主体） -->
            <template v-if="viewMode === 'date'">
              <!-- 日历表头 -->
              <div
                class="lh-date-picker-panel__weekdays"
                role="row"
              >
                <span
                  v-for="day in weekDays"
                  :key="day"
                  class="lh-date-picker-panel__weekday"
                  role="columnheader"
                  aria-hidden="true"
                >
                  {{ day }}
                </span>
              </div>

              <!-- 日历主体 -->
              <div class="lh-date-picker-panel__body">
                <div
                  class="lh-date-picker-panel__days"
                  role="grid"
                  data-day-grid
                  :aria-labelledby="`${panelId}-title`"
                >
                  <template
                    v-for="(row, rowIndex) in calendarRows"
                    :key="`row-${rowIndex}`"
                  >
                    <div
                      role="row"
                      style="display: contents"
                    >
                      <div
                        v-for="(day, colIndex) in row"
                        :key="day.date.getTime()"
                        class="lh-date-picker-panel__day"
                        role="gridcell"
                        :tabindex="dayTabIndex(rowIndex * 7 + colIndex)"
                        :aria-label="dayAriaLabel(day)"
                        :aria-selected="isSelected(day.date) ? 'true' : 'false'"
                        :aria-current="day.isToday ? 'date' : undefined"
                        :aria-disabled="isDayDisabled(day.date) ? 'true' : 'false'"
                        :class="[
                          {
                            'lh-date-picker-panel--disabled': isDayDisabled(day.date),
                            'lh-date-picker-panel--other': !day.isCurrentMonth,
                            'lh-date-picker-panel--today': day.isToday,
                            'lh-date-picker-panel--selected': isSelected(day.date),
                          },
                          dayCustomClass(day.date),
                        ]"
                        @click="handleDayClick(day)"
                        @keydown="onDayKeydown($event, rowIndex * 7 + colIndex)"
                      >
                        {{ day.day }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>

            <!-- 月份视图 -->
            <div
              v-else-if="viewMode === 'month'"
              class="lh-date-picker-panel__body"
            >
              <div
                class="lh-date-picker-panel__month-grid"
                role="grid"
                :aria-labelledby="`${panelId}-title`"
              >
                <template
                  v-for="(row, rowIndex) in monthRows"
                  :key="`mrow-${rowIndex}`"
                >
                  <div
                    role="row"
                    style="display: contents"
                  >
                    <div
                      v-for="(m, colIndex) in row"
                      :key="m.month"
                      class="lh-date-picker-panel__month-cell"
                      role="gridcell"
                      :tabindex="monthTabIndex(rowIndex * 3 + colIndex)"
                      :aria-selected="m.isSelected ? 'true' : 'false'"
                      :class="{ 'lh-date-picker-panel--selected': m.isSelected }"
                      @click="handleMonthClick(m)"
                      @keydown="onMonthKeydown($event, rowIndex * 3 + colIndex)"
                    >
                      {{ monthName(m.month) }}
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- 年份视图 -->
            <div
              v-else
              class="lh-date-picker-panel__body"
            >
              <div
                class="lh-date-picker-panel__year-grid"
                role="grid"
                :aria-labelledby="`${panelId}-title`"
              >
                <template
                  v-for="(row, rowIndex) in yearRows"
                  :key="`yrow-${rowIndex}`"
                >
                  <div
                    role="row"
                    style="display: contents"
                  >
                    <div
                      v-for="(y, colIndex) in row"
                      :key="y.year"
                      class="lh-date-picker-panel__year-cell"
                      role="gridcell"
                      :tabindex="yearTabIndex(rowIndex * 4 + colIndex)"
                      :aria-selected="y.isSelected ? 'true' : 'false'"
                      :class="{ 'lh-date-picker-panel--selected': y.isSelected }"
                      @click="handleYearClick(y)"
                      @keydown="onYearKeydown($event, rowIndex * 4 + colIndex)"
                    >
                      {{ y.year }}
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- 底部快捷操作（仅日期模式：月份/年份模式下点击即选中） -->
            <div
              v-if="props.mode === 'date' || props.mode === 'datetime'"
              class="lh-date-picker-panel__footer"
            >
              <LhButton
                size="small"
                @click="selectToday"
              >
                {{ t('datepicker.today') }}
              </LhButton>
              <LhButton
                size="small"
                type="primary"
                @click="confirmSelection"
              >
                {{ t('datepicker.confirm') }}
              </LhButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject, watch, onMounted, onUnmounted, nextTick, StyleValue } from 'vue'
import {
  sxToStyle,
  getNextGridCell,
  isActivationKey,
  isArrowKey,
  isEscapeKey,
  isHomeOrEndKey,
  LH_KEYS,
} from '@lh-ui/share/core/shared'
import LhIcon from '../../icon'
import LhButton from '../../button'
import { lhlocale } from '~/locale'
import { LH_FORM_ITEM_CONTEXT_KEY } from '~/components/form/src/types'
import {
  generateCalendarDays,
  generateMonths,
  generateYears,
  isSameDay,
  formatDate,
  isDateDisabled,
} from '@lh-ui/share/core/date-picker'
import { generateId } from '@lh-ui/share/utils'
import { useLhZIndex } from '~/composables'
import type { LhDatePickerProps } from './types'

defineOptions({ name: 'LhDatePicker' })

// 每实例唯一 ID：必须走 generateId——旧实现 let nextUid=0; nextUid++ 写在 setup 内，
// 每个实例独立执行，uid 恒为 1，多实例 panelId 全部撞名（aria-controls 与 getElementById 歧义）
const uid = generateId('lh-date-picker')
const { zIndex } = useLhZIndex()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const props = withDefaults(defineProps<LhDatePickerProps>(), {
  modelValue: null,
  mode: 'date',
  size: 'medium',
  disabled: false,
  clearable: true,
  placeholder: '',
  format: 'yyyy-MM-dd',
  readonly: true,
  rangeSeparator: '~',
  cellClassName: undefined,
  popperClass: undefined,
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

const emit = defineEmits<{
  'update:modelValue': [value: Date | [Date, Date] | null]
  change: [value: Date | [Date, Date] | null]
}>()

// Local state
const internalVisible = ref(false)
const formItem = inject(LH_FORM_ITEM_CONTEXT_KEY, null)
const panelRef = ref<HTMLElement | null>(null)
const pickerRef = ref<HTMLElement | null>(null)
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const today = ref(new Date())
// 表头星期文案来自语言包 datepicker.weeks（sun→sat），切换语言即时生效
const weekDays = computed(() => [
  t('datepicker.weeks.sun', '日'),
  t('datepicker.weeks.mon', '一'),
  t('datepicker.weeks.tue', '二'),
  t('datepicker.weeks.wed', '三'),
  t('datepicker.weeks.thu', '四'),
  t('datepicker.weeks.fri', '五'),
  t('datepicker.weeks.sat', '六'),
])
const tempSelection = ref<Date | null>(null)

// 面板视图：日期日历 ⇄ 月份网格 ⇄ 年份网格（点标题逐级下钻）
type PanelView = 'date' | 'month' | 'year'
const viewMode = ref<PanelView>('date')

const yearLabel = computed(() => t('datepicker.year', '年'))
const monthLabel = computed(() => t('datepicker.month', '月'))

// 月份格文案消费 datepicker.month1~12 死键（en: Jan…Dec）
const monthName = (month: number) => t(`datepicker.month${month + 1}`, `${month + 1}月`)

const monthCells = computed(() =>
  generateMonths(currentYear.value, props.mode === 'month' ? tempSelection.value : null),
)

// 年份网格以 12 年为一个十年段（generateYears 固定产出 12 项）
const decadeStart = computed(() => Math.floor(currentYear.value / 12) * 12)
const decadeLabel = computed(() => `${decadeStart.value} - ${decadeStart.value + 11}`)
const yearCells = computed(() =>
  generateYears(decadeStart.value, props.mode === 'year' ? tempSelection.value : null),
)

// Panel position state
const panelPosition = ref({ top: 0, left: 0 })

const panelId = `lh-date-picker-panel-${uid}`

const teleportTarget = 'body'

const displayPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  // 格式转义在组件层做（core 不放用户文案）：yyyy→年、MM→月、dd→日
  return props.format
    .replace('yyyy', t('datepicker.year', '年'))
    .replace('MM', t('datepicker.month', '月'))
    .replace('dd', '日')
})

const pickerClasses = computed(() => [
  `lh-date-picker--${props.size}`,
  { 'lh-date-picker--disabled': props.disabled },
  { 'lh-date-picker--visible': internalVisible.value },
])

const inputClasses = computed(() => [
  'lh-date-picker__input',
  { 'lh-date-picker__input--disabled': props.disabled },
])

const panelClasses = computed(() => {
  if (props.popperClass) {
    return { [props.popperClass as string]: true }
  } else {
    return undefined
  }
})

// Panel style for dynamic positioning
const panelStyle = computed<StyleValue>(() => ({
  position: 'fixed',
  top: `${panelPosition.value.top}px`,
  left: `${panelPosition.value.left}px`,
  zIndex: zIndex.value,
}))

const calendarDays = computed(() =>
  generateCalendarDays(
    currentYear.value,
    currentMonth.value,
    tempSelection.value,
    null,
    null,
    today.value,
  ),
)

/** 日历按 7 列分行（供模板渲染 role="row"） */
const calendarRows = computed(() => {
  const rows: (typeof calendarDays.value[number])[][] = []
  for (let i = 0; i < calendarDays.value.length; i += 7) {
    rows.push(calendarDays.value.slice(i, i + 7))
  }
  return rows
})

/** 月份网格按 3 列分行（面板样式为 repeat(3, 1fr)） */
const monthRows = computed(() => {
  const rows: (typeof monthCells.value[number])[][] = []
  for (let i = 0; i < monthCells.value.length; i += 3) {
    rows.push(monthCells.value.slice(i, i + 3))
  }
  return rows
})

/** 年份网格按 4 列分行（面板样式为 repeat(4, 1fr)） */
const yearRows = computed(() => {
  const rows: (typeof yearCells.value[number])[][] = []
  for (let i = 0; i < yearCells.value.length; i += 4) {
    rows.push(yearCells.value.slice(i, i + 4))
  }
  return rows
})

/** 网格焦点锚点：选中日优先，否则今天，否则首格（均跳过禁用） */
const anchorDayIndex = computed(() => {
  const days = calendarDays.value
  const selected = days.findIndex((d) => d.isSelected && !isDayDisabled(d.date))
  if (selected >= 0) return selected
  const todayIdx = days.findIndex((d) => d.isToday && !isDayDisabled(d.date))
  if (todayIdx >= 0) return todayIdx
  return 0
})

/** roving tabindex 的当前聚焦格下标（-1 时回退到锚点） */
const focusDayIndex = ref(-1)
const focusMonthIndex = ref(-1)
const focusYearIndex = ref(-1)

/** 翻月后由 watcher 兑现的「进入侧落点」描述（读新网格的 total） */
let pendingGridFocus: null | ((total: number) => number) = null

/** 网格实际落点：显式聚焦优先，否则回退锚点 */
const gridFocusIndex = computed(() =>
  focusDayIndex.value === -1 ? anchorDayIndex.value : focusDayIndex.value,
)

/** 月份网格落点：选中月优先，否则首格 */
const monthFocusIndex = computed(() => {
  if (focusMonthIndex.value !== -1) return focusMonthIndex.value
  const idx = monthCells.value.findIndex((m) => m.isSelected)
  return idx >= 0 ? idx : 0
})

/** 年份网格落点：选中年优先，否则首格 */
const yearFocusIndex = computed(() => {
  if (focusYearIndex.value !== -1) return focusYearIndex.value
  const idx = yearCells.value.findIndex((y) => y.isSelected)
  return idx >= 0 ? idx : 0
})

/** 日期格的 tabindex：仅聚焦格为 0，其余 -1（roving tabindex） */
function dayTabIndex(index: number): number {
  return index === gridFocusIndex.value ? 0 : -1
}

function monthTabIndex(index: number): number {
  return index === monthFocusIndex.value ? 0 : -1
}

function yearTabIndex(index: number): number {
  return index === yearFocusIndex.value ? 0 : -1
}

/** 日期格的语义文案：读屏播报完整日期（含星期），表头另有列头 */
function dayAriaLabel(day: { date: Date; day: number }): string {
  const date = day.date
  const week = t(
    `datepicker.weeks.${['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][date.getDay()]}`,
    '',
  )
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  return `${y}年${m}月${day.day}日${week ? ` ${week}` : ''}`
}

/** 焦点落点不可达（被禁用）时向下一格找最近的可聚焦格 */
function resolveGridFocus(total: number): number {
  const raw = pendingGridFocus ? pendingGridFocus(total) : gridFocusIndex.value
  pendingGridFocus = null
  if (raw < 0 || raw >= total) return 0
  if (!isDayDisabled(calendarDays.value[raw].date)) return raw
  const next = calendarDays.value.findIndex((d, i) => i >= raw && !isDayDisabled(d.date))
  return next >= 0 ? next : 0
}

/** 把焦点移到当前网格的 tabindex=0 格（翻月 / 移动 / 切视图后调用） */
function focusGridCell(): void {
  nextTick(() => {
    panelRef.value?.querySelector<HTMLElement>('[role="grid"] [tabindex="0"]')?.focus()
  })
}

/** 面板关闭后把焦点归还触发器（键盘提交 / Escape 关闭时避免焦点丢失） */
function returnFocusToTrigger(): void {
  nextTick(() => {
    pickerRef.value?.querySelector<HTMLElement>('.lh-date-picker__input')?.focus()
  })
}

/** 翻月后兑现「进入侧落点」并聚焦 */
watch(calendarDays, () => {
  if (pendingGridFocus) {
    focusDayIndex.value = resolveGridFocus(calendarDays.value.length)
    pendingGridFocus = null
    focusGridCell()
  }
})

/** 日期格键盘导航：方向键移动（含翻月）/ Enter / Space 选中 / Escape 关闭 */
function onDayKeydown(event: KeyboardEvent, index: number): void {
  if (props.disabled) return
  const key = event.key
  const days = calendarDays.value

  if (isEscapeKey(event)) {
    event.preventDefault()
    internalVisible.value = false
    returnFocusToTrigger()
    return
  }
  if (isActivationKey(event)) {
    event.preventDefault()
    handleDayClick(days[index])
    return
  }
  if (key === LH_KEYS.PageUp || key === LH_KEYS.PageDown) {
    event.preventDefault()
    // 翻月后保持列位置（落在同列的某一行）
    pendingGridFocus = () => Math.min(index % 7, days.length - 1)
    if (key === LH_KEYS.PageUp) prevUnit()
    else nextUnit()
    return
  }
  if (!isArrowKey(event) && !isHomeOrEndKey(event)) return

  const total = days.length
  const next = getNextGridCell(index, key, { cols: 7, total })
  if (next !== null) {
    event.preventDefault()
    focusDayIndex.value = next
    focusGridCell()
    return
  }
  // 只处理横向溢出翻月（纵向越过最后一行时，聚焦锚点会自然落到末行）
  if (key === LH_KEYS.ArrowRight) {
    event.preventDefault()
    pendingGridFocus = () => 0
    nextUnit()
  } else if (key === LH_KEYS.ArrowLeft) {
    event.preventDefault()
    pendingGridFocus = (t2) => t2 - 1
    prevUnit()
  }
  focusGridCell()
}

/** 月份 / 年份网格键盘导航：方向键移动 + Enter / Space 选中 + Escape 关闭 */
function onCellKeydown(
  event: KeyboardEvent,
  index: number,
  total: number,
  cols: number,
  onActivate: () => void,
): void {
  if (props.disabled) return
  const key = event.key

  if (isEscapeKey(event)) {
    event.preventDefault()
    internalVisible.value = false
    returnFocusToTrigger()
    return
  }
  if (isActivationKey(event)) {
    event.preventDefault()
    onActivate()
    return
  }
  if (!isArrowKey(event) && !isHomeOrEndKey(event)) return

  const next = getNextGridCell(index, key, { cols, total, loop: true })
  if (next !== null) {
    event.preventDefault()
    if (viewMode.value === 'month') focusMonthIndex.value = next
    else focusYearIndex.value = next
  }
}

function onMonthKeydown(event: KeyboardEvent, index: number): void {
  onCellKeydown(
    event,
    index,
    monthCells.value.length,
    3,
    () => handleMonthClick(monthCells.value[index]),
  )
}

function onYearKeydown(event: KeyboardEvent, index: number): void {
  onCellKeydown(
    event,
    index,
    yearCells.value.length,
    4,
    () => handleYearClick(yearCells.value[index]),
  )
}

/**
 * 触发器键盘行为：Enter / Space / 方向键打开面板，Escape 关闭
 *
 * 触发器本身是可聚焦的容器（tabindex=0），不走原生 button 是因为内部还要放输入框
 */
function onTriggerKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  if (isEscapeKey(event)) {
    if (internalVisible.value) event.preventDefault()
    internalVisible.value = false
    return
  }
  if (isActivationKey(event) || isArrowKey(event) || isHomeOrEndKey(event)) {
    event.preventDefault()
    handleClick()
  }
}

function formatDisplay(date: Date): string {
  // 月份/年份模式的展示不走日期 format，直接用语言包的年/月文案
  if (props.mode === 'month') return `${date.getFullYear()}${yearLabel.value} ${date.getMonth() + 1}${monthLabel.value}`
  if (props.mode === 'year') return `${date.getFullYear()}${yearLabel.value}`
  return formatDate(date, props.format)
}

function isSelected(date: Date): boolean {
  if (!tempSelection.value) return false
  return isSameDay(date, tempSelection.value)
}

function isDayDisabled(date: Date): boolean {
  return isDateDisabled(date, null, null, null)
}

// cellClassName：给日期单元格追加自定义类，回调返回空值时安全跳过
function dayCustomClass(date: Date): string | undefined {
  return props.cellClassName?.(date) || undefined
}

function updatePanelPosition() {
  if (!pickerRef.value) return
  const rect = pickerRef.value.getBoundingClientRect()
  panelPosition.value = {
    top: rect.bottom + 8,
    left: rect.left,
  }
}

function handleClick() {
  if (props.disabled) return
  internalVisible.value = true
  const hasValue = props.modelValue instanceof Date
  tempSelection.value = hasValue ? props.modelValue : null
  // 每次打开都锚定到选中值（无值则今天），避免停留在上次浏览的月份
  const anchor = hasValue ? props.modelValue : new Date()
  currentYear.value = anchor.getFullYear()
  currentMonth.value = anchor.getMonth()
  // 月份/年份模式打开时直接落在对应网格
  viewMode.value = props.mode === 'month' ? 'month' : props.mode === 'year' ? 'year' : 'date'
  // 打开时重置显式聚焦，让落点回退到锚点（选中日 / 今天）
  focusDayIndex.value = -1
  focusMonthIndex.value = -1
  focusYearIndex.value = -1
  nextTick(() => {
    updatePanelPosition()
    // 弹层打开后把焦点送进网格（WAI-ARIA 弹层模式：弹层内应有一个初始焦点）
    if (viewMode.value === 'date') focusGridCell()
  })
}

function handleClear(e: Event) {
  e.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
  tempSelection.value = null
  internalVisible.value = false
}

function handleDayClick(day: { date: Date; isCurrentMonth?: boolean }) {
  if (isDayDisabled(day.date)) return
  tempSelection.value = day.date
  // 点击相邻月份的填充格时，面板跟随跳到该月
  if (!day.isCurrentMonth) {
    currentYear.value = day.date.getFullYear()
    currentMonth.value = day.date.getMonth()
  }
}

function selectToday() {
  const now = new Date()
  tempSelection.value = now
  // 面板跟随跳到今天所在的年月，并从月份/年份视图回到日历视图
  currentYear.value = now.getFullYear()
  currentMonth.value = now.getMonth()
  viewMode.value = 'date'
  // 重置显式聚焦，让锚点重新落在今天
  focusDayIndex.value = -1
  focusGridCell()
}

function confirmSelection() {
  // datetime / range 模式尚未实现时间选择与区间选择 UI（产品决策项，见台账 P-08）：
  // 外部已传入区间值（数组）时不得用单个 Date 覆盖——此前会静默丢失区间数据
  if (Array.isArray(props.modelValue)) {
    internalVisible.value = false
    returnFocusToTrigger()
    return
  }
  const val = tempSelection.value
  emit('update:modelValue', val)
  emit('change', val)
  internalVisible.value = false
  returnFocusToTrigger()
}

function prevUnit() {
  if (viewMode.value === 'year') {
    currentYear.value -= 12
  } else if (viewMode.value === 'month') {
    currentYear.value--
  } else {
    currentMonth.value--
    if (currentMonth.value < 0) {
      currentMonth.value = 11
      currentYear.value--
    }
  }
}

function nextUnit() {
  if (viewMode.value === 'year') {
    currentYear.value += 12
  } else if (viewMode.value === 'month') {
    currentYear.value++
  } else {
    currentMonth.value++
    if (currentMonth.value > 11) {
      currentMonth.value = 0
      currentYear.value++
    }
  }
}

function toggleView() {
  // 逐级下钻：日期 → 月份 → 年份；年份视图点标题回月份
  if (viewMode.value === 'date') viewMode.value = 'month'
  else if (viewMode.value === 'month') viewMode.value = 'year'
  else viewMode.value = 'month'
}

function handleMonthClick(m: { month: number }) {
  if (props.disabled) return
  // 月份模式：点击即选中并关闭；日期模式：仅切换到该月的日历
  if (props.mode === 'month') {
    const val = new Date(currentYear.value, m.month, 1)
    tempSelection.value = val
    emit('update:modelValue', val)
    emit('change', val)
    internalVisible.value = false
    returnFocusToTrigger()
    return
  }
  currentMonth.value = m.month
  viewMode.value = 'date'
  // 切到日历视图后把焦点送进日期网格
  focusDayIndex.value = -1
  focusGridCell()
}

function handleYearClick(y: { year: number }) {
  if (props.disabled) return
  // 年份模式：点击即选中并关闭；其余：仅切换到该年的月份网格
  if (props.mode === 'year') {
    const val = new Date(y.year, 0, 1)
    tempSelection.value = val
    emit('update:modelValue', val)
    emit('change', val)
    internalVisible.value = false
    returnFocusToTrigger()
    return
  }
  currentYear.value = y.year
  viewMode.value = 'month'
  // 切到月份视图后把焦点送进月份网格
  focusMonthIndex.value = -1
  focusGridCell()
}

function onPanelClosed() {
  internalVisible.value = false
}

// Click outside to close panel - use unique id to only close own panel
function handleClickOutside(e: MouseEvent) {
  if (!internalVisible.value) return
  const target = e.target as HTMLElement
  const panelEl = document.getElementById(panelId)
  if (panelEl && panelEl.contains(target)) return
  if (target.closest('.lh-date-picker')) return
  internalVisible.value = false
}

// When panel opens, recalculate position
watch(internalVisible, (val) => {
  if (val) {
    nextTick(() => {
      updatePanelPosition()
    })
  }
})

// Sync view when modelValue changes
watch(
  () => props.modelValue,
  (val) => {
    if (val instanceof Date) {
      currentYear.value = val.getFullYear()
      currentMonth.value = val.getMonth()
    }
  },
  { immediate: true },
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updatePanelPosition)
  window.addEventListener('scroll', updatePanelPosition, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updatePanelPosition)
  window.removeEventListener('scroll', updatePanelPosition, true)
})
</script>
