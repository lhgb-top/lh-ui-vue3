<template>
  <nav
    :class="anchorClasses"
    :style="anchorStyle"
    :aria-label="t('anchor.label', '锚点导航')"
  >
    <ul class="lh-anchor__list">
      <li
        v-for="item in flatItems"
        :key="item.id"
        class="lh-anchor__item"
      >
        <a
          :href="`#${item.id}`"
          :class="linkClasses(item.id, item.level)"
          :aria-current="activeId === item.id ? 'location' : undefined"
          @click.prevent="handleLinkClick($event, item.id)"
        >{{ item.title }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  flattenAnchorItems,
  getAnchorClassNames,
  getAnchorLinkClassNames,
  resolveActiveAnchor,
} from '@lh-ui/share/core/anchor'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import type { LhAnchorProps } from './types'

defineOptions({ name: 'LhAnchor' })

const props = withDefaults(defineProps<LhAnchorProps>(), {
  target: undefined,
  offset: 0,
  direction: 'vertical',
  smooth: true,
  sx: undefined,
})

const emit = defineEmits<{
  change: [id: string]
  click: [event: MouseEvent, id: string]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const flatItems = computed(() => flattenAnchorItems(props.items))
const activeId = ref(flatItems.value[0]?.id ?? '')

function resolveScrollTarget(): HTMLElement | Window {
  if (!props.target) return window
  if (typeof props.target === 'string') {
    return document.querySelector<HTMLElement>(props.target) ?? window
  }
  return props.target
}

/** 各锚点相对滚动容器视口顶部的偏移（文档顺序） */
function measureOffsets(): { ids: string[]; offsets: number[] } {
  const ids: string[] = []
  const offsets: number[] = []
  for (const item of flatItems.value) {
    const el = document.getElementById(item.id)
    if (!el) continue
    ids.push(item.id)
    offsets.push(el.getBoundingClientRect().top)
  }
  return { ids, offsets }
}

function updateActive(): void {
  const { ids, offsets } = measureOffsets()
  if (ids.length === 0) return
  const threshold = props.offset
  const next = resolveActiveAnchor(ids, offsets, threshold)
  if (next && next !== activeId.value) {
    activeId.value = next
    emit('change', next)
  }
}

let scrollTarget: HTMLElement | Window | null = null

function onScroll(): void {
  updateActive()
}

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** 点击锚点项：先对外抛出 click（携带原生事件与目标 id），再执行既有滚动逻辑 */
function handleLinkClick(e: MouseEvent, id: string): void {
  emit('click', e, id)
  scrollToAnchor(id)
}

function scrollToAnchor(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  activeId.value = id
  emit('change', id)
  el.scrollIntoView({
    behavior: props.smooth && !prefersReducedMotion() ? 'smooth' : 'auto',
    block: 'start',
  })
}

onMounted(() => {
  scrollTarget = resolveScrollTarget()
  scrollTarget.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  updateActive()
})

onBeforeUnmount(() => {
  scrollTarget?.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

function linkClasses(id: string, level: number): string[] {
  return getAnchorLinkClassNames({ active: activeId.value === id, level })
}

const anchorClasses = computed(() => getAnchorClassNames({ direction: props.direction }))

const anchorStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
