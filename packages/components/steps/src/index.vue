<template>
  <ol
    ref="rootRef"
    :class="rootClasses"
    :style="rootStyle"
    role="list"
  >
    <slot></slot>
  </ol>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { getStepsClassNames, getStepsLineLastIndices } from '@lh-ui/share/core/steps'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import { useLhComponentTheme } from '~/composables'
import { LH_STEPS_KEY } from './types'
import type { LhStepsProps } from './types'

defineOptions({ name: 'LhSteps' })

const props = withDefaults(defineProps<LhStepsProps>(), {
  current: 0,
  direction: 'horizontal',
  clickable: false,
  status: undefined,
  themeVars: undefined,
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

const rootRef = ref<HTMLOListElement>()
// 横向定宽折行时，每行最后一项的索引（纵向布局无折行，恒为空）
const lineLastIndices = ref<number[]>([])

function measureLineLast() {
  const root = rootRef.value
  if (!root || props.direction !== 'horizontal') {
    lineLastIndices.value = []
    return
  }
  // DOM 顺序即 itemTokens 顺序，与各步骤的 ownIndex 一一对应
  const offsetTops = Array.from(root.children).map((el) => (el as HTMLElement).offsetTop)
  lineLastIndices.value = getStepsLineLastIndices(offsetTops)
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  measureLineLast()
  // 容器宽度变化会改变折行位置（ResizeObserver 在 jsdom 等环境不存在，守卫掉）
  if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
    resizeObserver = new ResizeObserver(() => measureLineLast())
    resizeObserver.observe(rootRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

// 步骤增删、方向切换后 DOM 已更新再重算折行位置
watch(
  () => [props.direction, itemTokens.value] as const,
  () => {
    void nextTick().then(measureLineLast)
  },
)

provide(LH_STEPS_KEY, {
  itemTokens,
  current: computed(() => props.current ?? 0),
  clickable: computed(() => props.clickable),
  forcedStatus: computed(() => props.status),
  lineLastIndices,
  select,
})

const rootClasses = computed(() => getStepsClassNames(props.direction))

// 主题变量（如 --lh-steps-item-basis）以内联 style 下发，优先级高于组件 scss 内的默认声明；
// 优先级：组件 themeVars > ConfigProvider componentTheme.steps > ConfigProvider 全局 themeVars > sx
const { componentStyle } = useLhComponentTheme('steps', props, useLhConfigContext())
const rootStyle = computed(() => ({
  ...componentStyle.value,
  ...sxToStyle(props.sx ?? {}),
}))
</script>
