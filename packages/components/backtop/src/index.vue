<template>
  <transition name="lh-backtop-fade">
    <button
      v-if="visible"
      type="button"
      :class="backTopClasses"
      :style="backTopStyle"
      :aria-label="t('backtop.label', '返回顶部')"
      @click="handleClick"
    >
      <slot>
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 5l7 7-1.4 1.4L13 8.8V19h-2V8.8l-4.6 4.6L5 12z"
          />
        </svg>
      </slot>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  backToTop,
  getBackTopClassNames,
  getScrollTop,
  isBackTopVisible,
  resolveScrollTarget,
} from '@lh-ui/share/core/backtop'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { useLhScrollEnd } from '~/composables'
import { lhlocale } from '~/locale'
import type { LhBackTopProps } from './types'

defineOptions({ name: 'LhBackTop' })

const props = withDefaults(defineProps<LhBackTopProps>(), {
  target: undefined,
  visibilityHeight: 200, // 与 core 的 LH_BACKTOP_VISIBILITY_HEIGHT_DEFAULT 保持一致
  right: 40,
  bottom: 40,
  smooth: true,
  sx: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  scrollend: [scrollTop: number]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const visible = ref(false)
// setup 阶段解析滚动目标（SSR 无 window 时不解析），
// 保证 scrollend composable 挂载时 getTarget 已有值
let scrollTarget: HTMLElement | Window | null = null
if (typeof window !== 'undefined') {
  scrollTarget = resolveScrollTarget(props.target)
}

function handleScroll(): void {
  if (!scrollTarget) return
  visible.value = isBackTopVisible(getScrollTop(scrollTarget), props.visibilityHeight)
}

/** 滚动停止：携带当前滚动距离抛出（锚点联动 / 数据懒加载等场景消费） */
function handleScrollEnd(): void {
  if (!scrollTarget) return
  emit('scrollend', getScrollTop(scrollTarget))
}

// 滚动停止事件：原生 scrollend 优先，旧浏览器退回 scroll + 防抖
useLhScrollEnd(
  () => scrollTarget,
  handleScrollEnd,
)

function handleClick(event: MouseEvent): void {
  emit('click', event)
  if (scrollTarget) backToTop(scrollTarget, props.smooth !== false)
}

onMounted(() => {
  const listenerTarget: HTMLElement | Window | null = scrollTarget
  if (!listenerTarget) return
  listenerTarget.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  const listenerTarget: HTMLElement | Window | null = scrollTarget
  listenerTarget?.removeEventListener('scroll', handleScroll)
})

const backTopClasses = computed(() => getBackTopClassNames({ visible: visible.value }))

const backTopStyle = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
  ...sxToStyle(props.sx ?? {}),
}))
</script>
