<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { useLhPresetTheme } from '~/composables'
import type { LhThemePresetName } from '@lh-ui/share/theme'

const { page } = useData()
const isEnglish = computed(() => page.value?.relativePath?.startsWith('en/') ?? false)

const { preset, setPreset, presets } = useLhPresetTheme({ storageKey: 'lh-docs-preset' })

const open = ref(false)
const rootRef = ref<HTMLElement>()

function toggle() {
  open.value = !open.value
}

function choose(name: LhThemePresetName) {
  setPreset(name)
  open.value = false
}

function labelOf(p: { label: string; labelEn: string }) {
  return isEnglish.value ? p.labelEn : p.label
}

// 点按组件外部收起下拉
function onDocumentClick(e: MouseEvent) {
  if (!rootRef.value || rootRef.value.contains(e.target as Node)) return
  open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})
</script>

<template>
  <div
    ref="rootRef"
    class="preset-switcher"
  >
    <button
      class="preset-switcher__btn"
      :title="isEnglish ? 'Theme preset' : '主题预设'"
      :aria-expanded="open"
      @click="toggle"
    >
      <span
        class="preset-switcher__dot"
        :style="{ backgroundColor: 'var(--lh-primary-color)' }"
      />
      <span class="preset-switcher__text">{{ labelOf(presets.find((p) => p.name === preset) ?? presets[0]) }}</span>
      <span class="preset-switcher__arrow">{{ open ? '▴' : '▾' }}</span>
    </button>

    <div
      v-if="open"
      class="preset-switcher__menu"
      role="listbox"
    >
      <button
        v-for="p in presets"
        :key="p.name"
        class="preset-switcher__item"
        :class="{ active: p.name === preset }"
        role="option"
        :aria-selected="p.name === preset"
        @click="choose(p.name)"
      >
        <span
          class="preset-switcher__swatch"
          :style="{ backgroundColor: p.vars['--lh-primary-color'] }"
        />
        <span class="preset-switcher__label">{{ labelOf(p) }}</span>
        <span
          v-if="p.name === preset"
          class="preset-switcher__check"
        >✓</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.preset-switcher {
  position: relative;
  display: flex;
  align-items: center;
}

.preset-switcher__btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-border, #e2e8f0);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-2, #666);
  font-size: 13px;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.15s;
}

.preset-switcher__btn:hover {
  color: var(--vp-c-brand, var(--lh-primary-color));
  border-color: var(--vp-c-brand, var(--lh-primary-color));
}

.preset-switcher__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.preset-switcher__arrow {
  font-size: 10px;
  opacity: 0.6;
}

.preset-switcher__menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 100;
  min-width: 168px;
  padding: 4px;
  border: 1px solid var(--vp-c-border, #e2e8f0);
  border-radius: 10px;
  background-color: var(--vp-c-bg, #fff);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.preset-switcher__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-1, #333);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}

.preset-switcher__item:hover {
  /* 中性悬停底色：暗色下由 --lh-hover-bg-color 翻转为白色低透明度 */
  background-color: var(--lh-hover-bg-color, var(--vp-c-bg-soft, #f5f5f5));
}

.preset-switcher__item.active {
  /* 选中项加主色底 + active 深色文字，避免原"仅颜色区分"在深主色预设下不可辨 */
  background: var(--lh-primary-color-bg);
  color: var(--lh-selected-color, var(--vp-c-brand, var(--lh-primary-color)));
  font-weight: 600;
}

.preset-switcher__swatch {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  flex: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.preset-switcher__label {
  flex: 1;
}

.preset-switcher__check {
  font-size: 12px;
}

.dark .preset-switcher__btn {
  border-color: var(--vp-c-border, #4a5568);
  color: var(--vp-c-text-2, #a0aec0);
}

.dark .preset-switcher__menu {
  background-color: var(--vp-c-bg, #1a1a2e);
  border-color: var(--vp-c-border, #4a5568);
}

/* 暗色悬停不再单独覆盖：--lh-hover-bg-color 已在暗色下翻转为白色低透明度 */

.dark .preset-switcher__dot,
.dark .preset-switcher__swatch {
  border-color: rgba(255, 255, 255, 0.25);
}

/* 移动端抽屉中使用时撑满宽度 */
.VPNavScreen .preset-switcher {
  width: 100%;
  margin: 8px 0;
}

.VPNavScreen .preset-switcher__btn {
  width: 100%;
  justify-content: flex-start;
}

.VPNavScreen .preset-switcher__menu {
  position: static;
  width: 100%;
  box-shadow: none;
}
</style>
