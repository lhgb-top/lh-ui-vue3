<template>
  <div
    ref="pickerRef"
    :class="pickerClasses"
    :aria-invalid="!!formItem?.errorMessage || undefined"
    :style="sxStyle"
  >
    <div
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
        <span class="lh-time-picker__value">
          {{ formatDisplay }}
        </span>
      </template>
      <input
        v-else
        :placeholder="displayPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        tabindex="-1"
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
          role="dialog"
          aria-modal="false"
          :aria-label="t('timepicker.panelLabel', '选择时间')"
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
                  <span class="lh-time-picker-panel__column-title">{{ t('timepicker.hour', '时') }}</span>
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
                  role="listbox"
                  :aria-label="t('timepicker.hourLabel', '小时')"
                  :aria-activedescendant="hourActiveId"
                  tabindex="0"
                  @wheel.prevent="onWheel($event, 'hour')"
                  @keydown="onColumnKeydown($event, 'hour')"
                >
                  <div
                    v-for="opt in hoursOption"
                    :id="`${panelId}-hour-${opt.value}`"
                    :key="opt.value"
                    class="lh-time-picker-panel__column-item"
                    :class="{
                      'lh-time-picker-panel__column-item--active': hour === opt.value,
                      'lh-time-picker-panel__column-item--disabled': opt.isDisabled,
                    }"
                    role="option"
                    :aria-selected="hour === opt.value ? 'true' : 'false'"
                    :aria-disabled="opt.isDisabled ? 'true' : 'false'"
                    @click="handleSelect('hour', opt.value)"
                  >
                    {{ opt.text }}
                  </div>
                </div>
              </div>

              <!-- 分钟列 -->
              <div
                ref="minuteListRef"
                :class="[
                  'lh-time-picker-panel__column',
                  { 'lh-time-picker-panel__column--selecting': selecting === 'minute' },
                ]"
                @mouseenter="selecting = 'minute'"
                @mouseleave="selecting = null"
              >
                <div class="lh-time-picker-panel__column-header">
                  <span class="lh-time-picker-panel__column-title">{{ t('timepicker.minute', '分') }}</span>
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
                  role="listbox"
                  :aria-label="t('timepicker.minuteLabel', '分钟')"
                  :aria-activedescendant="minuteActiveId"
                  tabindex="0"
                  @wheel.prevent="onWheel($event, 'minute')"
                  @keydown="onColumnKeydown($event, 'minute')"
                >
                  <div
                    v-for="opt in minutesOption"
                    :id="`${panelId}-minute-${opt.value}`"
                    :key="opt.value"
                    class="lh-time-picker-panel__column-item"
                    :class="{
                      'lh-time-picker-panel__column-item--active': minute === opt.value,
                      'lh-time-picker-panel__column-item--disabled': opt.isDisabled,
                    }"
                    role="option"
                    :aria-selected="minute === opt.value ? 'true' : 'false'"
                    :aria-disabled="opt.isDisabled ? 'true' : 'false'"
                    @click="handleSelect('minute', opt.value)"
                  >
                    {{ opt.text }}
                  </div>
                </div>
              </div>

              <!-- 秒列 -->
              <div
                v-if="showSecond"
                ref="secondListRef"
                :class="[
                  'lh-time-picker-panel__column',
                  { 'lh-time-picker-panel__column--selecting': selecting === 'second' },
                ]"
                @mouseenter="selecting = 'second'"
                @mouseleave="selecting = null"
              >
                <div class="lh-time-picker-panel__column-header">
                  <span class="lh-time-picker-panel__column-title">{{ t('timepicker.second', '秒') }}</span>
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
                  role="listbox"
                  :aria-label="t('timepicker.secondLabel', '秒')"
                  :aria-activedescendant="secondActiveId"
                  tabindex="0"
                  @wheel.prevent="onWheel($event, 'second')"
                  @keydown="onColumnKeydown($event, 'second')"
                >
                  <div
                    v-for="opt in secondsOption"
                    :id="`${panelId}-second-${opt.value}`"
                    :key="opt.value"
                    class="lh-time-picker-panel__column-item"
                    :class="{
                      'lh-time-picker-panel__column-item--active': second === opt.value,
                      'lh-time-picker-panel__column-item--disabled': opt.isDisabled,
                    }"
                    role="option"
                    :aria-selected="second === opt.value ? 'true' : 'false'"
                    :aria-disabled="opt.isDisabled ? 'true' : 'false'"
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
import { ref, computed, inject, watch, onMounted, onUnmounted, nextTick, StyleValue, Ref } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import {
  LH_KEYS,
  isActivationKey,
  isEscapeKey,
} from '@lh-ui/share/core/shared'
import LhIcon from '../../icon'
import LhButton from '../../button'
import { lhlocale } from '~/locale'
import { LH_FORM_ITEM_CONTEXT_KEY } from '~/components/form/src/types'
import {
  generateTimeColumn,
  formatTime,
  extractTime,
  createDateTime,
  isValidTime,
  getHourRange,
  filterTimeColumnByRange,
  wrapTimeValueInRange,
  clampTimeValue,
} from '@lh-ui/share/core/time-picker'
import { generateId } from '@lh-ui/share/utils'
import { useLhZIndex } from '~/composables'
import type { LhTimePickerProps } from './types'

defineOptions({ name: 'LhTimePicker' })

// 每实例唯一 ID：必须走 generateId——旧实现 let nextUid=0; nextUid++ 写在 setup 内，
// 每个实例独立执行，uid 恒为 1，多实例 panelId 全部撞名（aria-controls 与 closest 歧义）
// generateId 已带「lh-time-picker_」前缀，panelId 只需补「panel-」段，避免前缀重复
const uid = generateId('lh-time-picker')
const { zIndex } = useLhZIndex()

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
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
  change: [value: Date | null]
}>()

const internalVisible = ref(false)
const formItem = inject(LH_FORM_ITEM_CONTEXT_KEY, null)
const panelRef = ref<HTMLElement | null>(null)
const pickerRef = ref<HTMLElement | null>(null)
const hourListRef = ref<HTMLElement | null>(null)
const minuteListRef = ref<HTMLElement | null>(null)
const secondListRef = ref<HTMLElement | null>(null)
const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const selecting = ref<'hour' | 'minute' | 'second' | null>(null)
const panelPosition = ref({ top: 0, left: 0 })
const panelId = `lh-time-picker-panel-${uid.slice('lh-time-picker_'.length)}`
const teleportTarget = 'body'

const showSecond = computed(() => props.format.includes('ss'))

const displayPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  // 格式转义在组件层做（core 不放用户文案）：HH→时、mm→分、ss→秒
  return props.format
    .replace('HH', t('timepicker.hour', '时'))
    .replace('mm', t('timepicker.minute', '分'))
    .replace('ss', t('timepicker.second', '秒'))
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
  zIndex: zIndex.value,
}))

const formatDisplay = computed(() => {
  if (!props.modelValue) return ''
  return formatTime(hour.value, minute.value, second.value, props.format)
})

// 小时列有效范围：start/end 与 0~23 求交集（默认 0~24 为全量程，行为不变）
const hourRange = computed(() => getHourRange(props.start, props.end))

const hoursOption = computed(() =>
  filterTimeColumnByRange(
    generateTimeColumn('hour', props.stepHour),
    hourRange.value.start,
    hourRange.value.end
  ).map((c) => ({
    ...c,
    isSelected: c.value === hour.value,
  })),
)

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

// aria-activedescendant 指向各列当前激活项（listbox 焦点停在列上，由 AT 读出激活项）
const hourActiveId = computed(() => `${panelId}-hour-${hour.value}`)
const minuteActiveId = computed(() => `${panelId}-minute-${minute.value}`)
const secondActiveId = computed(() => `${panelId}-second-${second.value}`)

type TimeColumnType = 'hour' | 'minute' | 'second'

// 键盘可达的列顺序：不含秒时只有时分两列（与模板 v-if 同源）
const columnOrder = computed<TimeColumnType[]>(() =>
  props.format.includes('ss') ? ['hour', 'minute', 'second'] : ['hour', 'minute'],
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
  // 「现在」同样收敛到 start/end 范围内（默认全量程时保持原值）
  hour.value = clampTimeValue(now.getHours(), hourRange.value.start, hourRange.value.end)
  minute.value = now.getMinutes()
  second.value = now.getSeconds()
}

function confirmSelection(): void {
  if (!isValidTime(hour.value, minute.value, second.value)) return
  const newDate = createDateTime(props.modelValue, hour.value, minute.value, second.value)
  emit('update:modelValue', newDate)
  emit('change', newDate)
  closePanel()
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
    // 滚动后收拢回 start/end 范围（默认全量程时保持原回绕行为）
    hour.value = wrapTimeValueInRange(
      (hour.value + direction * props.stepHour + 24) % 24,
      hourRange.value.start,
      hourRange.value.end
    )
    scrollToActive(hourListRef, hour.value)
  } else if (type === 'minute') {
    minute.value = (minute.value + direction * props.stepMinute + 60) % 60
    scrollToActive(minuteListRef, minute.value)
  } else {
    second.value = (second.value + direction * props.stepSecond + 60) % 60
    scrollToActive(secondListRef, second.value)
  }
}

function scrollToActive(containerRef: Ref<HTMLElement | null>, _activeValue: number) {
  const el = containerRef.value?.querySelector('.lh-time-picker-panel__column-item--active')
  if (el) {
    el.scrollIntoView({ block: 'center' })
  }
}

function scrollColumn(type: TimeColumnType, direction: number): void {
  onWheel({ deltaY: direction * itemHeight, deltaX: 0 } as WheelEvent, type)
}

function focusColumn(type: TimeColumnType): void {
  const refs: Record<TimeColumnType, Ref<HTMLElement | null>> = {
    hour: hourListRef,
    minute: minuteListRef,
    second: secondListRef,
  }
  refs[type].value?.querySelector('.lh-time-picker-panel__column-body')?.focus()
}

function returnFocusToTrigger(): void {
  const trigger = pickerRef.value?.querySelector('.lh-time-picker__input') as HTMLElement | null
  trigger?.focus()
}

function closePanel(): void {
  internalVisible.value = false
  returnFocusToTrigger()
}

/**
 * 列键盘：复用 onWheel 步进（滚轮与方向键同一套数值逻辑）
 * - 上/下：按 step 增减时刻（onWheel 内含回绕与范围收敛）
 * - 左/右：在时分秒列之间跳焦
 * - Enter/Space：确认当前时刻并关闭（键盘用户无需再 Tab 到底部按钮）
 * - Escape：关闭并把焦点还给触发器
 */
function onColumnKeydown(event: KeyboardEvent, type: TimeColumnType): void {
  if (event.key === LH_KEYS.ArrowUp) {
    event.preventDefault()
    scrollColumn(type, -1)
  } else if (event.key === LH_KEYS.ArrowDown) {
    event.preventDefault()
    scrollColumn(type, 1)
  } else if (event.key === LH_KEYS.ArrowRight || event.key === LH_KEYS.ArrowLeft) {
    const order = columnOrder.value
    const idx = order.indexOf(type)
    const nextIdx = event.key === LH_KEYS.ArrowRight ? idx + 1 : idx - 1
    if (nextIdx >= 0 && nextIdx < order.length) {
      event.preventDefault()
      focusColumn(order[nextIdx]!)
    }
  } else if (isActivationKey(event)) {
    event.preventDefault()
    confirmSelection()
  } else if (isEscapeKey(event)) {
    event.preventDefault()
    closePanel()
  }
}

/**
 * 触发器键盘：Enter/Space/ArrowDown 开面板并把焦点放进第一列，
 * Escape 关面板（点击外部之外的纯键盘关闭路径）
 */
function onTriggerKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  if (isEscapeKey(event)) {
    if (internalVisible.value) {
      event.preventDefault()
      closePanel()
    }
  } else if (isActivationKey(event) || event.key === LH_KEYS.ArrowDown) {
    if (!internalVisible.value) {
      event.preventDefault()
      internalVisible.value = true
      nextTick(() => {
        updatePanelPosition()
        focusColumn('hour')
      })
    }
  }
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
      const time = extractTime(val)
      // 超出 start/end 范围的选中小时收敛回可选区间（默认全量程时保持原值）
      hour.value = clampTimeValue(time.hours, hourRange.value.start, hourRange.value.end)
      minute.value = time.minutes
      second.value = time.seconds
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
