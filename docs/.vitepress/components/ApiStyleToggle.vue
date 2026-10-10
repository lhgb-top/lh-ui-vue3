<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const STORAGE_KEY = 'lh-docs-api-style'
type ApiStyle = 'composition' | 'options'

const apiStyle = ref<ApiStyle>('composition')
const { page } = useData()

const isEnglish = computed(() => page.value?.relativePath?.startsWith('en/') ?? false)
const label = computed(() => (isEnglish.value ? 'API style: ' : 'API 风格：'))

function detectApiStyle(block: Element): 'composition' | 'options' | null {
  const text = block.textContent || ''
  // Shiki renders < as &, so match "script setup" without the < character
  if (text.includes('script setup')) {
    return 'composition'
  }
  if (text.includes('export default')) {
    return 'options'
  }
  return null
}

function applyStyle(style: ApiStyle) {
  const codeBlocks = document.querySelectorAll('.vp-doc div[class*="language-vue"]')
  codeBlocks.forEach((block: Element) => {
    const type = detectApiStyle(block)
    if (type === null) return
    const el = block as HTMLElement
    el.style.display = type === style ? '' : 'none'
  })
}

function init() {
  const saved = localStorage.getItem(STORAGE_KEY) as ApiStyle | null
  if (saved && ['composition', 'options'].includes(saved)) {
    apiStyle.value = saved
  }
  nextTick(() => applyStyle(apiStyle.value))
}

function toggle(type: ApiStyle) {
  apiStyle.value = type
  localStorage.setItem(STORAGE_KEY, type)
  applyStyle(type)
}

onMounted(init)
watch(apiStyle, (val) => applyStyle(val))
watch(
  () => page.value.relativePath,
  () => {
    nextTick(() => applyStyle(apiStyle.value))
  },
)
</script>

<template>
  <div class="api-style-toggle">
    <span class="api-style-toggle__label">{{ label }}</span>
    <button
      class="api-style-toggle__btn"
      title="Composition API"
      :class="{ active: apiStyle === 'composition' }"
      @click="toggle('composition')"
    >
      Composition
    </button>
    <button
      class="api-style-toggle__btn"
      title="Options API"
      :class="{ active: apiStyle === 'options' }"
      @click="toggle('options')"
    >
      Options
    </button>
  </div>
</template>

<style scoped>
.api-style-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
}

.api-style-toggle__label {
  font-size: 13px;
  line-height: 28px;
  color: var(--vp-c-text-2, #666);
}

.api-style-toggle__btn {
  padding: 4px 10px;
  border: 1px solid var(--vp-c-border, #e2e8f0);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2, #666);
  cursor: pointer;
  font-size: 13px;
  line-height: 1.4;
  transition: all 0.15s;
}

.api-style-toggle__btn:hover {
  color: var(--vp-c-brand, #2b4c7c);
  border-color: var(--vp-c-brand, #2b4c7c);
}

.api-style-toggle__btn.active {
  background: var(--vp-c-brand, #2b4c7c);
  border-color: var(--vp-c-brand, #2b4c7c);
  color: #fff;
}
</style>
