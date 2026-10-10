<template>
  <ol
    :class="rootClasses"
    :style="rootStyle"
    role="list"
  >
    <slot></slot>
  </ol>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { getStepsClassNames } from '@lh-ui/share/core/steps'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { LH_STEPS_KEY } from './types'
import type { LhStepsProps } from './types'

defineOptions({ name: 'LhSteps' })

const props = withDefaults(defineProps<LhStepsProps>(), {
  current: 0,
  direction: 'horizontal',
  clickable: false,
  status: undefined,
  sx: undefined,
})

const emit = defineEmits<{
  'update:current': [index: number]
  change: [index: number]
}>()

// 子项在各自 setup 阶段注册 token，顺序即渲染顺序；
// 序号/总数在注册完成的同一微任务批次内收敛，不会产生可见闪烁
const itemTokens = ref<symbol[]>([])

function select(index: number) {
  if (!props.clickable || index === props.current) return
  emit('update:current', index)
  emit('change', index)
}

provide(LH_STEPS_KEY, {
  itemTokens,
  current: computed(() => props.current ?? 0),
  clickable: computed(() => props.clickable),
  forcedStatus: computed(() => props.status),
  select,
})

const rootClasses = computed(() => getStepsClassNames(props.direction))
const rootStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
