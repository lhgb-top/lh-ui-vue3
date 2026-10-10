<template>
  <div
    ref="sliderRef"
    :class="wrapperClasses"
    :aria-invalid="!!formItem?.errorMessage || undefined"
    :style="sxStyle"
  >
    <div v-if="marksList.length" class="lh-slider__marks">
      <span
        v-for="mark in marksList"
        :key="mark.value"
        class="lh-slider__mark"
        :style="{ left: getMarkPosition(mark.value) + '%' }"
      >
        {{ mark.label }}
      </span>
    </div>
    <div class="lh-slider__track">
      <div
        class="lh-slider__bar"
        :style="barStyle"
      />
      <div
        class="lh-slider__button-wrapper"
        role="slider"
        :tabindex="props.disabled ? -1 : 0"
        aria-orientation="horizontal"
        :aria-label="thumbAriaLabel(0)"
        :aria-valuenow="thumbValue(0)"
        :aria-valuemin="props.min"
        :aria-valuemax="props.max"
        :aria-valuetext="`${thumbValue(0)}`"
        :aria-disabled="props.disabled ? 'true' : 'false'"
        :style="button1Style"
        @mousedown="onDragStart($event, 0)"
        @touchstart.prevent="onDragStart($event, 0)"
        @keydown="onButtonKeydown($event, 0)"
      >
        <div class="lh-slider__button" />
      </div>
      <div
        v-if="props.range"
        class="lh-slider__button-wrapper"
        role="slider"
        :tabindex="props.disabled ? -1 : 0"
        aria-orientation="horizontal"
        :aria-label="thumbAriaLabel(1)"
        :aria-valuenow="thumbValue(1)"
        :aria-valuemin="props.min"
        :aria-valuemax="props.max"
        :aria-valuetext="`${thumbValue(1)}`"
        :aria-disabled="props.disabled ? 'true' : 'false'"
        :style="button2Style"
        @mousedown="onDragStart($event, 1)"
        @touchstart.prevent="onDragStart($event, 1)"
        @keydown="onButtonKeydown($event, 1)"
      >
        <div class="lh-slider__button" />
      </div>
    </div>
    <div v-if="props.showInput" class="lh-slider__input">
      <span class="lh-slider__input-text">{{ displayValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { sxToStyle, getNextRangeValue } from '@lh-ui/share/core/shared'
import {
  clampValue,
  snapToStep,
  getPositionFromValue,
  getSliderClassNames,
  buildMarksList,
} from '@lh-ui/share/core/slider'
import { lhlocale } from '~/locale'
import type { LhSliderProps } from './types'
import { LH_FORM_ITEM_CONTEXT_KEY } from '~/components/form/src/types'

defineOptions({ name: 'LhSlider' })

const props = withDefaults(defineProps<LhSliderProps>(), {
  modelValue: null,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  range: false,
  showInput: false,
  size: 'medium',
  marks: undefined,
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

const emit = defineEmits<{
  'update:modelValue': [value: number | [number, number]]
  change: [value: number | [number, number]]
}>()

const sliderRef = ref<HTMLElement>()
const formItem = inject(LH_FORM_ITEM_CONTEXT_KEY, null)
const dragging = ref(false)
const dragIndex = ref(0)
const localValue = ref<number | [number, number]>(
  props.modelValue !== null && props.modelValue !== undefined
    ? (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue, props.modelValue])
    : (props.range ? [props.min, (props.min + props.max) / 2] : [props.min, props.min])
)

// Initialize local value on mount if modelValue is null
onMounted(() => {
  if (props.modelValue === null || props.modelValue === undefined) {
    if (props.range) {
      localValue.value = [props.min, (props.min + props.max) / 2]
    } else {
      localValue.value = [props.min, props.min]
    }
  }
})

const marksList = computed(() => buildMarksList(props.marks))

const displayValue = computed(() => {
  const val = getCurrentValue()
  if (props.range) return `[${val[0]}, ${val[1]}]`
  return (val as number).toString()
})

const wrapperClasses = computed(() => {
  const state = {
    value: localValue.value,
    min: props.min,
    max: props.max,
    step: props.step,
    disabled: props.disabled,
    range: props.range,
    showInput: props.showInput,
    size: props.size,
    marks: props.marks,
  }
  return getSliderClassNames(state)
})

function getCurrentValue(): number | [number, number] {
  if (props.range) {
    return localValue.value as [number, number]
  }
  return localValue.value[0] as number
}

const barStyle = computed(() => {
  const v1 = localValue.value[0]
  const v2 = localValue.value[1]
  const left = getPositionFromValue(Math.min(v1, v2), props.min, props.max) * 100
  const right = 100 - getPositionFromValue(Math.max(v1, v2), props.min, props.max) * 100
  return {
    left: left + '%',
    width: (100 - left - right) + '%',
  }
})

const button1Style = computed(() => {
  const pct = getPositionFromValue(localValue.value[0], props.min, props.max) * 100
  return { left: pct + '%' }
})

const button2Style = computed(() => {
  const pct = getPositionFromValue(localValue.value[1], props.min, props.max) * 100
  return { left: pct + '%' }
})

function getMarkPosition(value: number): number {
  return getPositionFromValue(value, props.min, props.max) * 100
}

function emitValue(): void {
  const val = getCurrentValue()
  emit('update:modelValue', val)
  emit('change', val)
}

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

/** thumb 的可达名称：range 模式区分起始/结束两端 */
function thumbAriaLabel(index: number): string {
  if (props.range) {
    return index === 0
      ? t('slider.thumbStart', '起始滑块')
      : t('slider.thumbEnd', '结束滑块')
  }
  return t('slider.thumb', '滑块')
}

/** thumb 的当前数值（aria-valuenow） */
function thumbValue(index: number): number {
  return (localValue.value as [number, number])[index]
}

/**
 * thumb 的键盘导航（WAI-ARIA slider 模式）
 *
 * 方向键按 step 增减、PageUp/Down 大步进、Home/End 直达极值。
 * range 模式下键盘**不交换两端**（与拖拽的交换语义不同），而是把本端
 * 钳在其活动范围内，保证「焦点所在的 thumb」与「被修改的值」始终一致——
 * 键盘用户连续按键时不会出现焦点与值错位。
 */
function onButtonKeydown(event: KeyboardEvent, index: number): void {
  if (props.disabled) return

  const current = (localValue.value as [number, number])[index]
  const next = getNextRangeValue(current, event.key, {
    min: props.min,
    max: props.max,
    step: props.step,
  })
  // 非导航键（Tab 等）原样返回，不拦截默认行为
  if (next === current) return

  event.preventDefault()

  const pair: [number, number] = [
    (localValue.value as [number, number])[0],
    (localValue.value as [number, number])[1],
  ]
  if (props.range) {
    // range：钳在本端活动范围内，不越过另一端
    pair[index] =
      index === 0 ? clampValue(next, props.min, pair[1]) : clampValue(next, pair[0], props.max)
  } else {
    pair[index] = next
  }
  localValue.value = pair
  emitValue()
}

function onDragStart(e: MouseEvent | TouchEvent, index: number): void {
  if (props.disabled) return
  dragging.value = true
  dragIndex.value = index

  const moveHandler = (ev: MouseEvent | TouchEvent) => onDragMove(ev)
  const upHandler = () => {
    dragging.value = false
    emitValue()
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('touchend', upHandler)
  }
  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseup', upHandler)
  document.addEventListener('touchmove', moveHandler)
  document.addEventListener('touchend', upHandler)
}

function onDragMove(e: MouseEvent | TouchEvent): void {
  if (!dragging.value || !sliderRef.value) return
  const track = sliderRef.value.querySelector('.lh-slider__track') as HTMLElement
  if (!track) return

  const rect = track.getBoundingClientRect()
  let x: number
  if ('touches' in e) {
    x = e.touches[0].clientX
  } else {
    x = (e as MouseEvent).clientX
  }
  const ratio = clampValue((x - rect.left) / rect.width, 0, 1)
  const newValue = clampValue(
    Math.round(ratio * (props.max - props.min) / props.step) * props.step + props.min,
    props.min,
    props.max
  )
  const snapped = snapToStep(newValue, props.min, props.step)

  if (dragIndex.value === 0) {
    if (props.range && snapped > localValue.value[1]) {
      localValue.value = [localValue.value[1], localValue.value[0]]
    } else {
      localValue.value = [...localValue.value]
      localValue.value[0] = snapped
    }
  } else {
    if (props.range && snapped < localValue.value[0]) {
      localValue.value = [localValue.value[1], localValue.value[0]]
    } else {
      localValue.value = [...localValue.value]
      localValue.value[1] = snapped
    }
  }
}

onBeforeUnmount(() => {
  dragging.value = false
})
</script>