<template>
  <div
    ref="rootRef"
    :class="calendarClasses"
    :style="calendarStyle"
  >
    <!-- input 模式：点击输入框展开 / 收起面板 -->
    <input
      v-if="isInputMode"
      type="text"
      readonly
      class="lh-calendar__input"
      :value="inputText"
      :placeholder="props.placeholder || t('select.placeholder', '请选择')"
      role="combobox"
      :aria-expanded="panelOpen"
      :aria-haspopup="'grid'"
      @click="panelOpen = !panelOpen"
    >

    <div
      v-show="!isInputMode || panelOpen"
      class="lh-calendar__panels"
    >
      <span class="lh-calendar__nav-row">
        <button
          type="button"
          class="lh-calendar__nav"
          :aria-label="t('datepicker.prevMonth', '上一月')"
          @click="shiftMonth(-1)"
        >‹</button>
        <button
          type="button"
          class="lh-calendar__nav"
          :aria-label="t('datepicker.nextMonth', '下一月')"
          @click="shiftMonth(1)"
        >›</button>
      </span>

      <div
        v-for="panel in panelMonths"
        :key="`${panel.year}-${panel.month}`"
        class="lh-calendar__panel"
      >
        <div class="lh-calendar__header">
          <slot
            name="header"
            :year="panel.year"
            :month="panel.month"
          >
            <span class="lh-calendar__title">{{ panelTitle(panel) }}</span>
          </slot>
        </div>
        <div
          class="lh-calendar__grid"
          role="grid"
          @keydown="handleKeydown"
        >
          <div
            class="lh-calendar__row"
            role="row"
          >
            <span
              v-for="week in weekLabels"
              :key="week.key"
              role="columnheader"
              class="lh-calendar__weekday"
            >{{ week.label }}</span>
          </div>
          <div
            v-for="(row, rowIndex) in panel.rows"
            :key="rowIndex"
            class="lh-calendar__row"
            role="row"
          >
            <button
              v-for="day in row"
              :key="day.date.getTime()"
              type="button"
              class="lh-calendar__cell"
              :class="{
                'lh-calendar__cell--outside': !day.isCurrentMonth,
                'lh-calendar__cell--today': day.isToday,
                'lh-calendar__cell--selected': isSelected(day.date),
                'lh-calendar__cell--in-range': isWithinSpan(day.date),
              }"
              role="gridcell"
              :aria-current="day.isToday ? 'date' : undefined"
              :aria-selected="isSelected(day.date)"
              :aria-label="cellAria(day.date)"
              :disabled="isDisabled(day.date) || undefined"
              :tabindex="isFocusTarget(day.date) ? 0 : -1"
              @click="select(day.date)"
            >
              <slot
                name="cell"
                :date="day.date"
              >{{ day.day }}</slot>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  clampDateToRange,
  generateCalendarDays,
  getCalendarClassNames,
  isCalendarDateDisabled,
  isCalendarInSpan,
  shiftCalendarDate,
  shiftCalendarMonth,
  toggleCalendarDate,
  normalizeCalendarSpan,
} from '@lh-ui/share/core/calendar'
import { LH_KEYS, sxToStyle, formatMessage } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import type { LhCalendarProps } from './types'

defineOptions({ name: 'LhCalendar' })

const props = withDefaults(defineProps<LhCalendarProps>(), {
  modelValue: undefined,
  selection: 'single',
  range: undefined,
  mode: 'panel',
  panels: 1,
  placeholder: undefined,
  closeOnSelect: true,
  sx: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: LhCalendarProps['modelValue']]
  change: [value: LhCalendarProps['modelValue']]
  select: [value: Date]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const rootRef = ref<HTMLElement>()
const panelOpen = ref(false)
const isInputMode = computed(() => props.mode === 'input')

const today = new Date()
const cursor = ref({
  year: today.getFullYear(),
  month: today.getMonth(),
})

// ---------- 选中态（受控 / 内部双模） ----------

const innerDates = ref<Date[]>([])
/** range 模式的待完成起点（第一次点击后第二次前） */
const rangeAnchor = ref<Date | null>(null)

const controlled = computed(() => props.modelValue !== undefined)

function toDates(value: LhCalendarProps['modelValue']): Date[] {
  if (value === undefined) return []
  if (Array.isArray(value)) return [...value]
  return [value]
}

const selectedDates = computed<Date[]>(() => {
  if (controlled.value) return toDates(props.modelValue)
  return innerDates.value
})

const isSelected = (date: Date) => selectedDates.value.some((d) => isSameDate(d, date))

/** 一段时间模式下完整起止之间的日期（不含两端，两端走 --selected） */
const isWithinSpan = (date: Date): boolean => {
  if (props.selection !== 'range' || selectedDates.value.length !== 2) return false
  const [start, end] = selectedDates.value
  return isCalendarInSpan(date, start, end) && !isSameDate(date, start) && !isSameDate(date, end)
}

// ---------- 交互 ----------

function select(date: Date): void {
  if (isDisabled(date)) return
  focusDate.value = date
  let value: LhCalendarProps['modelValue']

  if (props.selection === 'range') {
    if (!rangeAnchor.value) {
      rangeAnchor.value = date
      innerDates.value = [date]
      value = [date, date]
    } else {
      const span = normalizeCalendarSpan(rangeAnchor.value, date)
      rangeAnchor.value = null
      innerDates.value = [...span]
      value = span
    }
  } else if (props.selection === 'multiple') {
    innerDates.value = toggleCalendarDate(innerDates.value, date)
    value = [...innerDates.value]
  } else {
    innerDates.value = [date]
    value = date
  }

  emit('select', date)
  emit('update:modelValue', value)
  emit('change', value)
  if (shouldCloseOnSelect()) panelOpen.value = false
}

function shouldCloseOnSelect(): boolean {
  if (!isInputMode.value || props.closeOnSelect === false) return false
  if (props.selection === 'range') return rangeAnchor.value === null
  return props.selection === 'single'
}

function isSameDate(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isDisabled(date: Date): boolean {
  return isCalendarDateDisabled(date, props.range)
}

// ---------- 面板 ----------

const weekLabels = [
  { key: 'sun', label: t('datepicker.weeks.sun', '日') },
  { key: 'mon', label: t('datepicker.weeks.mon', '一') },
  { key: 'tue', label: t('datepicker.weeks.tue', '二') },
  { key: 'wed', label: t('datepicker.weeks.wed', '三') },
  { key: 'thu', label: t('datepicker.weeks.thu', '四') },
  { key: 'fri', label: t('datepicker.weeks.fri', '五') },
  { key: 'sat', label: t('datepicker.weeks.sat', '六') },
]

const panelCount = computed(() => Math.max(1, Math.floor(props.panels ?? 1)))

const panelMonths = computed(() =>
  Array.from({ length: panelCount.value }, (_, i) => {
    const shifted = shiftCalendarMonth(cursor.value.year, cursor.value.month, i)
    const days = generateCalendarDays(
      shifted.year, shifted.month, selectedDates.value[0] ?? null, null, null, today,
    )
    const rows: (typeof days)[] = []
    for (let r = 0; r < days.length; r += 7) rows.push(days.slice(r, r + 7))
    return { ...shifted, rows }
  }),
)

// 标题格式按语言包走（zh「2026年10月」/ en「October 2026」）：
// 月名复用 month1~12，顺序与连接符由 panelTitle 模板决定
const panelTitle = (panel: { year: number; month: number }) =>
  formatMessage(t('datepicker.panelTitle', '{year}年{month}'), {
    year: panel.year,
    month: t(`datepicker.month${panel.month + 1}`, String(panel.month + 1)),
  })

/** 焦点目标：受控的单个日期（未传或数组形态时以今天兜底）；键盘导航以此为基准移动 */
const focusDate = ref<Date>(props.modelValue instanceof Date ? props.modelValue : today)
const isFocusTarget = (date: Date) => isSameDate(date, focusDate.value)

function shiftMonth(delta: number): void {
  cursor.value = shiftCalendarMonth(cursor.value.year, cursor.value.month, delta)
}

function moveFocus(days: number): void {
  const next = clampDateToRange(shiftCalendarDate(focusDate.value, days), props.range)
  focusDate.value = next
  const inPanels = panelMonths.value.some(
    (p) => p.year === next.getFullYear() && p.month === next.getMonth(),
  )
  if (!inPanels) cursor.value = { year: next.getFullYear(), month: next.getMonth() }
}

function handleKeydown(event: KeyboardEvent): void {
  const moves: Record<string, () => void> = {
    [LH_KEYS.ArrowRight]: () => moveFocus(1),
    [LH_KEYS.ArrowLeft]: () => moveFocus(-1),
    [LH_KEYS.ArrowDown]: () => moveFocus(7),
    [LH_KEYS.ArrowUp]: () => moveFocus(-7),
    [LH_KEYS.Home]: () => moveFocus(-6),
    [LH_KEYS.End]: () => moveFocus(6),
    [LH_KEYS.PageUp]: () => shiftMonth(-1),
    [LH_KEYS.PageDown]: () => shiftMonth(1),
  }
  const move = moves[event.key]
  if (!move) return
  event.preventDefault()
  move()
  const target = clampDateToRange(focusDate.value, props.range)
  if (!isDisabled(target)) select(target)
}

const cellAria = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const inputText = computed(() => {
  const dates = selectedDates.value
  if (dates.length === 0) return ''
  if (props.selection === 'range' && dates.length === 2) {
    return `${formatDate(dates[0])} ~ ${formatDate(dates[1])}`
  }
  return formatDate(dates[0])
})

const calendarClasses = computed(() => {
  const classes = getCalendarClassNames()
  if (isInputMode.value) classes.push('lh-calendar--input')
  if (panelOpen.value) classes.push('lh-calendar--open')
  return classes
})

const calendarStyle = computed(() => sxToStyle(props.sx ?? {}))

// input 模式：点击组件外部收起面板
function onDocMousedown(event: MouseEvent): void {
  if (!panelOpen.value) return
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) panelOpen.value = false
}

onMounted(() => {
  if (isInputMode.value) document.addEventListener('mousedown', onDocMousedown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocMousedown)
})
</script>
