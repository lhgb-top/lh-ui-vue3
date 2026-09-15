<template>
  <div
    ref="pickerRef"
    class="lh-date-picker"
    :class="pickerClasses"
  >
    <div
      class="lh-date-picker__input"
      :class="inputClasses"
      @click="handleClick"
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
        :readonly="true"
        :disabled="disabled"
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
        >
          <div class="lh-date-picker-panel">
            <!-- 工具栏 -->
            <div class="lh-date-picker-panel__header">
              <div class="lh-date-picker-panel__title">
                <button
                  :disabled="disabled"
                  class="lh-date-picker-panel__btn"
                  @click="prevUnit"
                >
                  <LhIcon
                    name="arrow-left"
                    size="small"
                  />
                </button>
                <button
                  class="lh-date-picker-panel__title-text"
                  @click="toggleView"
                >
                  {{ currentYear }}-{{ String(currentMonth + 1).padStart(2, '0') }}
                </button>
                <button
                  :disabled="disabled"
                  class="lh-date-picker-panel__btn"
                  @click="nextUnit"
                >
                  <LhIcon
                    name="arrow-right"
                    size="small"
                  />
                </button>
              </div>
            </div>

            <!-- 日历表头 -->
            <div class="lh-date-picker-panel__weekdays">
              <span
                v-for="day in weekDays"
                :key="day"
                class="lh-date-picker-panel__weekday"
              >
                {{ day }}
              </span>
            </div>

            <!-- 日历主体 -->
            <div class="lh-date-picker-panel__body">
              <div class="lh-date-picker-panel__days">
                <div
                  v-for="day in calendarDays"
                  :key="day.date.getTime()"
                  class="lh-date-picker-panel__day"
                  :class="{
                    'lh-date-picker-panel--disabled': isDayDisabled(day.date),
                    'lh-date-picker-panel--other': !day.isCurrentMonth,
                    'lh-date-picker-panel--today': day.isToday,
                    'lh-date-picker-panel--selected': isSelected(day.date),
                  }"
                  @click="handleDayClick(day)"
                >
                  {{ day.day }}
                </div>
              </div>
            </div>

            <!-- 底部快捷操作 -->
            <div class="lh-date-picker-panel__footer">
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick, StyleValue } from 'vue'
import LhIcon from '../../icon'
import LhButton from '../../button'
import { lhlocale } from '~/locales'
import {
  generateCalendarDays,
  isSameDay,
  formatDate,
  isDateDisabled,
  getDefaultDatePickerPlaceholder,
} from '@lh-ui/core/date-picker'
import type { LhDatePickerProps } from './types'

defineOptions({ name: 'LhDatePicker' })

// Unique ID for each instance
let nextUid: number = 0
nextUid++
const uid = nextUid

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
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | [Date, Date] | null]
  change: [value: Date | [Date, Date] | null]
}>()

// Local state
const internalVisible = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const pickerRef = ref<HTMLElement | null>(null)
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth())
const today = ref(new Date())
const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const tempSelection = ref<Date | null>(null)

// Panel position state
const panelPosition = ref({ top: 0, left: 0 })

const panelId = `lh-date-picker-panel-${uid}`

const teleportTarget = 'body'

const displayPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  return getDefaultDatePickerPlaceholder(props.format)
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
  zIndex: 3000 + uid,
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

function formatDisplay(date: Date): string {
  return formatDate(date, props.format)
}

function isSelected(date: Date): boolean {
  if (!tempSelection.value) return false
  return isSameDay(date, tempSelection.value)
}

function isDayDisabled(date: Date): boolean {
  return isDateDisabled(date, null, null, null)
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
  tempSelection.value = props.modelValue instanceof Date ? props.modelValue : null
  nextTick(() => {
    updatePanelPosition()
  })
}

function handleClear(e: Event) {
  e.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
  tempSelection.value = null
  internalVisible.value = false
}

function handleDayClick(day: { date: Date }) {
  if (isDayDisabled(day.date)) return
  tempSelection.value = day.date
}

function selectToday() {
  tempSelection.value = new Date()
}

function confirmSelection() {
  const val = tempSelection.value
  emit('update:modelValue', val)
  emit('change', val)
  internalVisible.value = false
}

function prevUnit() {
  currentMonth.value--
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value--
  }
}

function nextUnit() {
  currentMonth.value++
  if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value++
  }
}

function toggleView() {
  // 切换年份选择视图（简化版）
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
