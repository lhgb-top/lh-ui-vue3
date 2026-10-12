<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { LhConfigProvider } from '~/components'
import { HOME_COMPONENT_COUNT, HOME_COMPONENT_GROUPS } from '../data/components'

// 中英文站点共用本组件，按页面语言渲染文案。
// 古典/意境词（水墨丹青、花纹名、主题名、靛蓝/竹影/朱砂）保留中文并附英文注释，不强行翻译。
const { lang } = useData()
const isEn = computed(() => lang.value === 'en-US')
const t = (zh: string, en: string) => (isEn.value ? en : zh)

const themeMode = ref<'light' | 'dark'>('light')
const animated = ref(false)

// 组件计数由分组数据派生（当前 58），增删组件只改数据源
const componentCount = HOME_COMPONENT_COUNT

// 英文站跳转带 /en/ 前缀
function componentLink(link: string): string {
  return withBase(isEn.value ? `/en${link}` : link)
}

onMounted(() => {
  setTimeout(() => {
    animated.value = true
  }, 200)
})
</script>

<template>
  <div
    class="lh-home"
    :class="{ dark: themeMode === 'dark' }"
  >
    <LhConfigProvider :class="{ dark: themeMode === 'dark' }">
      <!-- 数据统计 -->
      <div
        class="stats-banner fade-in-up"
        :class="{ visible: animated }"
      >
        <div class="stat-item">
          <div class="stat-number">{{ componentCount }}</div>
          <div class="stat-label">{{ t('组件', 'Components') }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">5</div>
          <div class="stat-label">{{ t('预设主题', 'Themes') }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">6</div>
          <div class="stat-label">{{ t('花纹背景', 'Patterns') }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">6+</div>
          <div class="stat-label">{{ t('语言支持', 'Languages') }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">178</div>
          <div class="stat-label">{{ t('CSS 变量', 'CSS Variables') }}</div>
        </div>
      </div>

      <!-- 快速开始 -->
      <div
        class="quick-start fade-in-up"
        :class="{ visible: animated }"
      >
        <h2>{{ t('快速开始', 'Quick Start') }}</h2>
        <div class="code-block">
          <div class="code-header">
            <span class="code-dot code-dot--red"></span>
            <span class="code-dot code-dot--yellow"></span>
            <span class="code-dot code-dot--green"></span>
          </div>
          <pre>
            <code>
              <span class="code-comment">{{ t('# 安装', '# Install') }}</span>
                npm install @lh-ui/vue3
              <span class="code-comment">{{ t('# 使用', '# Usage') }}</span>
              import { LhButton, LhInput } from '@lh-ui/vue3'
              import '@lh-ui/vue3/dist/index.css'
            </code>
          </pre>
        </div>
      </div>

      <!-- 特色展示网格 -->
      <div class="features-grid">
        <div
          class="feature-card fade-in-up"
          :class="{ visible: animated }"
        >
          <div class="feature-icon">🎨</div>
          <h3>{{ t('国风设计', 'Chinese Aesthetic Design') }}</h3>
          <!-- 水墨丹青为意境词，英文语境保留中文并附注释 -->
          <p>
            {{
              t(
                '源自传统水墨丹青，靛蓝为主、朱砂点缀、宣纸为底',
                '源自传统水墨丹青 — indigo primary, cinnabar accents, rice-paper base',
              )
            }}
          </p>
          <div class="feature-tags">
            <span class="feature-badge feature-badge--primary">
              {{ t('CSS 变量', 'CSS Variables') }}
            </span>
            <span class="feature-badge feature-badge--success">
              {{ t('暗色模式', 'Dark Mode') }}
            </span>
          </div>
        </div>

        <div
          class="feature-card fade-in-up"
          :class="{ visible: animated }"
        >
          <div class="feature-icon">🧩</div>
          <h3>{{ t('跨框架架构', 'Framework-agnostic Architecture') }}</h3>
          <p>
            {{
              t(
                '核心纯函数逻辑与框架解耦，Vue 3 / React / Vue 2 均可接入',
                'Framework-decoupled pure-function core — plug into Vue 3, React, or Vue 2',
              )
            }}
          </p>
          <div class="feature-tags">
            <span class="feature-badge feature-badge--primary">TypeScript</span>
            <span class="feature-badge feature-badge--success">Pure Logic</span>
          </div>
        </div>

        <div
          class="feature-card fade-in-up"
          :class="{ visible: animated }"
        >
          <div class="feature-icon">🌊</div>
          <h3>{{ t('花纹背景', 'Pattern Backgrounds') }}</h3>
          <!-- 柳叶/祥云等花纹名为意境词，保留中文并附英文对照 -->
          <p>
            {{
              t(
                '6种预设国风花纹：柳叶、祥云、波浪、雪花、梅花、竹节',
                'Six guofeng patterns — 柳叶 willow · 祥云 cloud · 波浪 wave · 雪花 snow · 梅花 plum · 竹节 bamboo',
              )
            }}
          </p>
          <div class="feature-tags">
            <span class="feature-badge feature-badge--primary">bg-pattern</span>
            <span class="feature-badge feature-badge--warning">
              {{ t('6种预设', '6 Presets') }}
            </span>
          </div>
        </div>

        <div
          class="feature-card fade-in-up"
          :class="{ visible: animated }"
        >
          <div class="feature-icon">🌍</div>
          <h3>{{ t('国际化', 'Internationalization') }}</h3>
          <p>
            {{
              t(
                '内置 ConfigProvider 配置体系，支持多语言统一管理',
                'Built-in ConfigProvider system for unified multi-language management',
              )
            }}
          </p>
          <div class="feature-tags">
            <span class="feature-badge feature-badge--primary">i18n</span>
            <span class="feature-badge feature-badge--success">
              {{ t('中英双语', 'Bilingual') }}
            </span>
          </div>
        </div>
      </div>

      <!-- 主题预览 Gallery -->
      <div
        class="theme-gallery fade-in-up"
        :class="{ visible: animated }"
      >
        <h2>{{ t('主题预览', 'Theme Presets') }}</h2>
        <div class="gallery-grid">
          <div class="gallery-card">
            <div
              class="gallery-swatch"
              style="background: linear-gradient(135deg, #2c5282, #3663a3)"
            >
              <span>青花瓷</span>
            </div>
            <p>Ceramic Blue</p>
          </div>
          <div class="gallery-card">
            <div
              class="gallery-swatch"
              style="background: linear-gradient(135deg, #38a169, #48bb78)"
            >
              <span>松花绿</span>
            </div>
            <p>Pine Green</p>
          </div>
          <div class="gallery-card">
            <div
              class="gallery-swatch"
              style="background: linear-gradient(135deg, #c53030, #e53e3e)"
            >
              <span>朱砂</span>
            </div>
            <p>Vermilion</p>
          </div>
          <div class="gallery-card">
            <div
              class="gallery-swatch"
              style="background: linear-gradient(135deg, #2d3748, #4a5568)"
            >
              <span>水墨</span>
            </div>
            <p>Ink Wash</p>
          </div>
          <div class="gallery-card">
            <div
              class="gallery-swatch"
              style="background: linear-gradient(135deg, #d69e2e, #ecc94b)"
            >
              <span>藤黄</span>
            </div>
            <p>Golden Autumn</p>
          </div>
        </div>
      </div>

      <!-- 组件总览（分组导航，计数与横幅同源） -->
      <div
        class="component-preview fade-in-up"
        :class="{ visible: animated }"
      >
        <h2>{{ t('组件总览', 'Component Overview') }}</h2>
        <div class="overview-groups">
          <div
            v-for="group in HOME_COMPONENT_GROUPS"
            :key="group.en"
            class="overview-group"
          >
            <div class="overview-group-title">
              {{ t(group.zh, group.en) }}
              <span class="overview-group-count">{{ group.items.length }}</span>
            </div>
            <div class="overview-chips">
              <a
                v-for="item in group.items"
                :key="item.name"
                class="ripple overview-chip"
                :href="componentLink(item.link)"
              >
                {{ item.name }}
                <span class="overview-chip-zh">{{ item.zh }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 宣纸底纹装饰 -->
      <div class="paper-texture"></div>
    </LhConfigProvider>
  </div>
</template>

<style scoped>
.lh-home {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0px;
}

.theme-toggle {
  position: sticky;
  top: var(--vp-nav-height);
  right: 20px;
  z-index: 100;
  display: flex;
  gap: 8px;
}

/* 数据统计横幅 */
.stats-banner {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 32px 16px;
  margin: 24px 0 40px;
  background: linear-gradient(135deg, rgba(44, 82, 130, 0.05), rgba(56, 161, 105, 0.05));
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  min-width: 80px;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--lh-docs-primary), var(--lh-docs-bamboo));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.stat-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* 快速开始代码块 */
.quick-start {
  margin: 40px 0;
  padding: 32px;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.quick-start h2 {
  margin: 0 0 20px 0;
  font-size: 24px;
  color: var(--lh-docs-primary);
  text-align: center;
}

.code-block {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a2e;
}

.code-header {
  display: flex;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
}

.code-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.code-dot--red {
  background: #ff5f56;
}

.code-dot--yellow {
  background: #ffbd2e;
}

.code-dot--green {
  background: #27ca40;
}

.code-block pre {
  margin: 0;
  padding: 16px;
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.code-comment {
  color: #718096;
}

/* 特色展示网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 40px 0;
}

.feature-card {
  padding: 24px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(44, 82, 130, 0.15);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--lh-docs-primary), var(--lh-docs-bamboo));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: var(--lh-docs-primary);
  font-family: var(--vp-font-family-base);
}

.feature-card p {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.feature-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 主题 Gallery */
.theme-gallery {
  margin: 60px 0;
  padding: 32px;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.theme-gallery h2 {
  margin: 0 0 24px 0;
  font-size: 24px;
  color: var(--lh-docs-primary);
  text-align: center;
  font-family: var(--vp-font-family-base);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.gallery-card {
  text-align: center;
}

.gallery-swatch {
  height: 80px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.gallery-swatch:hover {
  transform: scale(1.05);
}

.gallery-card p {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* 组件总览 */
.component-preview {
  margin-top: 60px;
  padding: 32px;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  background: linear-gradient(to bottom, var(--vp-c-bg-soft), var(--vp-c-bg));
}

.component-preview h2 {
  margin: 0 0 24px 0;
  font-size: 24px;
  color: var(--lh-docs-primary);
  font-family: var(--vp-font-family-base);
  text-align: center;
}

.overview-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  gap: 24px;
}

.overview-group-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--lh-docs-primary);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.overview-group-count {
  font-size: 12px;
  font-weight: 500;
  padding: 1px 8px;
  border-radius: 10px;
  background: var(--lh-docs-primary-light);
}

.overview-chips {
  display: grid;
  grid-template-columns: repeat(auto-fit, min(140px, 1fr));
  display: flex;
  flex-wrap: wrap;
  
  gap: 10px;
}

.overview-chip {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap:1rem;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  max-width:fit-content;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.overview-chip:hover {
  border-color: var(--lh-docs-primary);
  transform: translateY(-2px);
}

.overview-chip-zh {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

/* 涟漪效果 */
.ripple::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(44, 82, 130, 0.1) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0);
  transition:
    opacity 0.3s,
    transform 0.5s;
}

.ripple:hover::after {
  opacity: 1;
  transform: scale(2);
}

/* 宣纸纹理 */
.paper-texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* 淡入上移动画 */
.fade-in-up {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ink 水墨动画 */
.ink-animate {
  animation: inkFloat 8s ease-in-out infinite;
}

@keyframes inkFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(2deg);
  }
}

/* 特性标签样式 */
.feature-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.feature-badge--primary {
  background: var(--lh-docs-primary-light);
  color: var(--lh-docs-primary);
}

.feature-badge--success {
  background: rgba(56, 161, 105, 0.15);
  color: #38a169;
}

.feature-badge--warning {
  background: rgba(214, 158, 46, 0.15);
  color: #d69e2e;
}
</style>
