<template>
  <div :class="wrapperClasses" ref="sliderRef">
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
    <div class="lh-slider__track" :style="trackStyle">
      <div
        class="lh-slider__bar"
        :style="barStyle"
      />
      <div
        class="lh-slider__button-wrapper"
        :style="button1Style"
        @mousedown="onDragStart($event, 0)"
        @touchstart.prevent="onDragStart($event, 0)"
      >
        <div class="lh-slider__button" />
      </div>
      <div
        v-if="props.range"
        class="lh-slider__button-wrapper"
        :style="button2Style"
        @mousedown="onDragStart($event, 1)"
        @touchstart.prevent="onDragStart($event, 1)"
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  clampValue,
  snapToStep,
  getPositionFromValue,
  getSliderClassNames,
  buildMarksList,
} from '@lh-ui/core/slider'
import type { LhSliderProps } from './types'

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
})

const emit = defineEmits<{
  'update:modelValue': [value: number | [number, number]]
  change: [value: number | [number, number]]
}>()

const sliderRef = ref<HTMLElement>()
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

function getTrackWidth(): number {
  if (!sliderRef.value) return 0
  const track = sliderRef.value.querySelector('.lh-slider__track') as HTMLElement
  return track ? track.offsetWidth : 0
}

const trackStyle = computed(() => {
  const v1 = localValue.value[0]
  const v2 = localValue.value[1]
  const left = getPositionFromValue(Math.min(v1, v2), props.min, props.max) * 100
  const right = 100 - getPositionFromValue(Math.max(v1, v2), props.min, props.max) * 100
  return {
    paddingLeft: left + '%',
    paddingRight: right + '%',
  }
})

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