<template>
  <div
    ref="placeholderRef"
    class="lh-affix-placeholder"
    :style="placeholderStyle"
  >
    <div
      :class="affixClasses"
      :style="affixStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getAffixClassNames, getAffixFixedStyle, isAffixFixed } from '@lh-ui/share/core/affix'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhAffixProps } from './types'

defineOptions({ name: 'LhAffix' })

const props = withDefaults(defineProps<LhAffixProps>(), {
  offsetTop: 0,
  offsetBottom: 0,
  target: undefined,
  sx: undefined,
})

const emit = defineEmits<{
  change: [fixed: boolean]
}>()

const placeholderRef = ref<HTMLElement>()
const fixed = ref(false)

const offsetTop = computed(() => props.offsetTop ?? 0)
const offsetBottom = computed(() => props.offsetBottom ?? 0)
const zIndex = computed(() => `var(--lh-affix-z-index, 900)`)

function resolveTarget(): HTMLElement | null {
  if (!props.target) return null
  if (typeof props.target === 'string') {
    return document.querySelector<HTMLElement>(props.target)
  }
  return props.target
}

function updateFixed(): void {
  const el = placeholderRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const next = isAffixFixed(
    { top: rect.top, bottom: rect.bottom },
    offsetTop.value,
    offsetBottom.value,
    window.innerHeight,
  )
  if (next !== fixed.value) {
    fixed.value = next
    emit('change', next)
  }
}

let observer: IntersectionObserver | null = null
let scrollTarget: HTMLElement | null = null

onMounted(() => {
  const el = placeholderRef.value
  if (!el) return
  // IntersectionObserver 检测占位越界；jsdom 等无 IO 环境回退 scroll 监听
  if (typeof IntersectionObserver === 'function') {
    observer = new IntersectionObserver(() => updateFixed(), { threshold: 0 })
    observer.observe(el)
  }
  scrollTarget = resolveTarget()
  const listenerTarget: HTMLElement | Window = scrollTarget ?? window
  listenerTarget.addEventListener('scroll', updateFixed, { passive: true })
  window.addEventListener('resize', updateFixed)
  updateFixed()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  const listenerTarget: HTMLElement | Window | null = scrollTarget ?? window
  listenerTarget?.removeEventListener('scroll', updateFixed)
  window.removeEventListener('resize', updateFixed)
})

const affixClasses = computed(() => getAffixClassNames({ fixed: fixed.value }))

const affixStyle = computed(() => {
  if (!fixed.value) return sxToStyle(props.sx ?? {})
  return {
    ...getAffixFixedStyle(offsetTop.value, offsetBottom.value),
    zIndex: zIndex.value,
    width: placeholderRef.value ? `${placeholderRef.value.offsetWidth}px` : 'auto',
    ...sxToStyle(props.sx ?? {}),
  }
})

const placeholderStyle = computed(() =>
  fixed.value ? { height: `${placeholderRef.value?.offsetHeight ?? 0}px` } : undefined,
)
</script>
