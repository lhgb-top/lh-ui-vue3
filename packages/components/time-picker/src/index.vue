<template>
  <div
    ref="pickerRef"
    :class="pickerClasses"
  >
    <div
      :class="inputClasses"
      @click="handleClick"
    >
      <template v-if="modelValue">
        <span class="lh-time-picker__value">
          {{ formatDisplay }}
        </span>
      </template>
      <input
        v-else
        :placeholder="displayPlaceholder"
        :readonly="true"
        :disabled="disabled"
        class="lh-time-picker__input-inner"
      />
      <LhIcon
        v-if="clearable && modelValue"
        name="close"
        size="small"
        class="lh-time-picker__clear"
        @click.stop="handleClear"
      />
      <LhIcon
        name="date"
        size="small"
        class="lh-time-picker__icon"
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
          ref="panelRef"
          :style="panelStyle"
          :class="panelClasses"
          class="lh-time-picker__panel"
        >
          <div class="lh-time-picker-panel">
            <!-- 时间选择列 -->
            <div class="lh-time-picker-panel__columns">
              <!-- 小时列 -->
              <div
                ref="hourListRef"
                :class="[
                  'lh-time-picker-panel__column',
                  { 'lh-time-picker-panel__column--selecting': selecting === 'hour' },
                ]"
                @mouseenter="selecting = 'hour'"
                @mouseleave="selecting = null"
              >
                <div class="lh-time-picker-panel__column-header">
                  <span class="lh-time-picker-panel__column-title">时</span>
                  <template v-if="arrowControl">
                    <button
                      class="lh-time-picker-panel__arrow lh-time-picker-panel__arrow--up"
                      @click="scrollColumn('hour', -1)"
                    >
                      <LhIcon
                        name="arrow-up"
                        size="small"
                      />
                    </button>
                    <button
                      class="lh-time-picker-panel__arrow lh-time-picker-panel__arrow--down"
                      @click="scrollColumn('hour', 1)"
                    >
                      <LhIcon
                        name="arrow-down"
                        size="small"
                      />
                    </button>
                  </template>
                </div>
                <div
                  class="lh-time-picker-panel__column-body"
                  @wheel.prevent="onWheel($event, 'hour')"
                >
                  <div
                    v-for="opt in hoursOption"
                    :key="opt.value"
                    class="lh-time-picker-panel__column-item"
                    :class="{
                      'lh-time-picker-panel__column-item--active': hour === opt.value,
                      'lh-time-picker-panel__column-item--disabled': opt.isDisabled,
                    }"
                    @click="handleSelect('hour', opt.value)"
                  >
                    {{ opt.text }}
                  </div>
                </div>
              </div>

              <!-- 分钟列 -->
              <div
                :class="[
                  'lh-time-picker-panel__column',
                  { 'lh-time-picker-panel__column--selecting': selecting === 'minute' },
                ]"
                @mouseenter="selecting = 'minute'"
                @mouseleave="selecting = null"
              >
                <div class="lh-time-picker-panel__column-header">
                  <span class="lh-time-picker-panel__column-title">分</span>
                  <template v-if="arrowControl">
                    <button
                      class="lh-time-picker-panel__arrow lh-time-picker-panel__arrow--up"
                      @click="scrollColumn('minute', -1)"
                    >
                      <LhIcon
                        name="arrow-up"
                        size="small"
                      />
                    </button>
                    <button
                      class="lh-time-picker-panel__arrow lh-time-picker-panel__arrow--down"
                      @click="scrollColumn('minute', 1)"
                    >
                      <LhIcon
                        name="arrow-down"
                        size="small"
                      />
                    </button>
                  </template>
                </div>
                <div
                  class="lh-time-picker-panel__column-body"
                  @wheel.prevent="onWheel($event, 'minute')"
                >
                  <div
                    v-for="opt in minutesOption"
                    :key="opt.value"
                    class="lh-time-picker-panel__column-item"
                    :class="{
                      'lh-time-picker-panel__column-item--active': minute === opt.value,
                      'lh-time-picker-panel__column-item--disabled': opt.isDisabled,
                    }"
                    @click="handleSelect('minute', opt.value)"
                  >
                    {{ opt.text }}
                  </div>
                </div>
              </div>

              <!-- 秒列 -->
              <div
                v-if="showSecond"
                :class="[
                  'lh-time-picker-panel__column',
                  { 'lh-time-picker-panel__column--selecting': selecting === 'second' },
                ]"
                @mouseenter="selecting = 'second'"
                @mouseleave="selecting = null"
              >
                <div class="lh-time-picker-panel__column-header">
                  <span class="lh-time-picker-panel__column-title">秒</span>
                  <template v-if="arrowControl">
                    <button
                      class="lh-time-picker-panel__arrow lh-time-picker-panel__arrow--up"
                      @click="scrollColumn('second', -1)"
                    >
                      <LhIcon
                        name="arrow-up"
                        size="small"
                      />
                    </button>
                    <button
                      class="lh-time-picker-panel__arrow lh-time-picker-panel__arrow--down"
                      @click="scrollColumn('second', 1)"
                    >
                      <LhIcon
                        name="arrow-down"
                        size="small"
                      />
                    </button>
                  </template>
                </div>
                <div
                  class="lh-time-picker-panel__column-body"
                  @wheel.prevent="onWheel($event, 'second')"
                >
                  <div
                    v-for="opt in secondsOption"
                    :key="opt.value"
                    class="lh-time-picker-panel__column-item"
                    :class="{
                      'lh-time-picker-panel__column-item--active': second === opt.value,
                      'lh-time-picker-panel__column-item--disabled': opt.isDisabled,
                    }"
                    @click="handleSelect('second', opt.value)"
                  >
                    {{ opt.text }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 底部快捷操作 -->
            <div class="lh-time-picker-panel__footer">
              <LhButton
                size="small"
                @click="selectNow"
              >
                {{ t('timepicker.now') }}
              </LhButton>
              <LhButton
                size="small"
                type="primary"
                @click="confirmSelection"
              >
                {{ t('timepicker.confirm') }}
              </LhButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick, StyleValue, Ref } from 'vue'
import LhIcon from '../../icon'
import LhButton from '../../button'
import { lhlocale } from '~/locales'
import {
  generateTimeColumn,
  formatTime,
  extractTime,
  createDateTime,
  isValidTime,
  getDefaultTimePlaceholder,
} from '@lh-ui/core/time-picker'
import type { LhTimePickerProps } from './types'

defineOptions({ name: 'LhTimePicker' })

// Unique ID for each instance
let nextUid: number = 0
nextUid++
const uid = nextUid

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const props = withDefaults(defineProps<LhTimePickerProps>(), {
  modelValue: null,
  size: 'medium',
  disabled: false,
  clearable: true,
  placeholder: '',
  format: 'HH:mm:ss',
  readonly: true,
  arrowControl: false,
  start: 0,
  end: 24,
  stepHour: 1,
  stepMinute: 1,
  stepSecond: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
  change: [value: Date | null]
}>()

const internalVisible = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const pickerRef = ref<HTMLElement | null>(null)
const hourListRef = ref<HTMLElement | null>(null)
const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const selecting = ref<'hour' | 'minute' | 'second' | null>(null)
const panelPosition = ref({ top: 0, left: 0 })
const panelId = `lh-time-picker-panel-${uid}`
const teleportTarget = 'body'

const showSecond = computed(() => props.format.includes('ss'))

const displayPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  return getDefaultTimePlaceholder(props.format)
})

const pickerClasses = computed(() => [
  'lh-time-picker',
  `lh-time-picker--${props.size}`,
  { 'lh-time-picker--disabled': props.disabled },
  { 'lh-time-picker--visible': internalVisible.value },
])

const inputClasses = computed(() => [
  'lh-time-picker__input',
  { 'lh-time-picker__input--disabled': props.disabled },
])

const panelClasses = computed(() => ({
  [panelId]: true,
}))

const panelStyle = computed<StyleValue>(() => ({
  position: 'fixed',
  top: `${panelPosition.value.top}px`,
  left: `${panelPosition.value.left}px`,
  zIndex: 3000 + uid,
}))

const formatDisplay = computed(() => {
  if (!props.modelValue) return ''
  return formatTime(hour.value, minute.value, second.value, props.format)
})

const hoursOption = computed(() => {
  const cols = generateTimeColumn('hour', props.stepHour)
  return cols.map((c) => ({
    ...c,
    isSelected: c.value === hour.value,
  }))
})

const minutesOption = computed(() =>
  generateTimeColumn('minute', props.stepMinute).map((c) => ({
    ...c,
    isSelected: c.value === minute.value,
  })),
)

const secondsOption = computed(() =>
  generateTimeColumn('second', props.stepSecond).map((c) => ({
    ...c,
    isSelected: c.value === second.value,
  })),
)

function handleClick() {
  if (props.disabled) return
  internalVisible.value = true
  nextTick(() => {
    updatePanelPosition()
  })
}

function handleClear(e: Event) {
  e.stopPropagation()
  emit('update:modelValue', null)
  emit('change', null)
  internalVisible.value = false
}

function handleSelect(type: 'hour' | 'minute' | 'second', value: number): void {
  if (type === 'hour') hour.value = value
  else if (type === 'minute') minute.value = value
  else second.value = value
}

function selectNow(): void {
  const now = new Date()
  hour.value = now.getHours()
  minute.value = now.getMinutes()
  second.value = now.getSeconds()
}

function confirmSelection(): void {
  if (!isValidTime(hour.value, minute.value, second.value)) return
  const newDate = createDateTime(props.modelValue, hour.value, minute.value, second.value)
  emit('update:modelValue', newDate)
  emit('change', newDate)
  internalVisible.value = false
}

function updatePanelPosition(): void {
  if (!pickerRef.value) return
  const rect = pickerRef.value.getBoundingClientRect()
  panelPosition.value = {
    top: rect.bottom + 8,
    left: rect.left,
  }
}

const itemHeight = 32 // px per column item

function onWheel(e: WheelEvent, type: 'hour' | 'minute' | 'second'): void {
  const direction = e.deltaY > 0 ? 1 : -1
  if (type === 'hour') {
    hour.value = (hour.value + direction * props.stepHour + 24) % 24
    scrollToActive(hourListRef, hour.value)
  } else if (type === 'minute') {
    minute.value = (minute.value + direction * props.stepMinute + 60) % 60
    // 滚动分钟列
  } else {
    second.value = (second.value + direction * props.stepSecond + 60) % 60
    // 滚动秒列
  }
}

function scrollToActive(containerRef: Ref<HTMLElement | null>, _activeValue: number) {
  const el = containerRef.value?.querySelector('.lh-time-picker-panel__column-item--active')
  if (el) {
    el.scrollIntoView({ block: 'center' })
  }
}

function scrollColumn(type: 'hour' | 'minute' | 'second', direction: number): void {
  onWheel({ deltaY: direction * itemHeight, deltaX: 0 } as WheelEvent, type)
}

function onPanelClosed(): void {
  internalVisible.value = false
}

function handleClickOutside(e: MouseEvent): void {
  if (!internalVisible.value) return
  const target = e.target as HTMLElement
  if (target.closest(`#${panelId}`)) return
  if (target.closest('.lh-time-picker')) return
  internalVisible.value = false
}

watch(internalVisible, (val) => {
  if (val) {
    nextTick(() => {
      updatePanelPosition()
    })
  }
})

// Sync time from modelValue
watch(
  () => props.modelValue,
  (val) => {
    if (val instanceof Date && !isNaN(val.getTime())) {
      const t = extractTime(val)
      hour.value = t.hours
      minute.value = t.minutes
      second.value = t.seconds
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
