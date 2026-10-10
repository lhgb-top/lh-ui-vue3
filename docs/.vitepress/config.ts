import { defineConfig, loadEnv } from 'vitepress'
import { resolve } from 'node:path'
import {
  THEME_PRESETS,
  buildPresetStyleText,
  PRESET_THEME_STYLE_ID,
} from '@lh-ui/share/theme'

// 部署 base：单一数据源 / deployment base — single source of truth.
//
// 显式 loadEnv 是必需的：Vite 内置的 env 加载发生在用户 config 求值之后，
// 直接读 process.env.DOCS_BASE 在生产构建时拿不到 .env.production 的值
// （行内环境变量虽然生效，但在 Windows Git Bash 中会被 MSYS 做路径转换）。
// 部署路径改 docs/.env.production，临时覆盖仍可用行内变量。
//
// Explicit loadEnv is required: Vite loads env *after* evaluating the user
// config, so process.env.DOCS_BASE would miss .env.production values at build
// time (and inline vars get path-mangled by MSYS on Windows Git Bash).
// Change docs/.env.production to redeploy; inline vars still override.
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const env = loadEnv(mode, resolve(__dirname, '..'), 'DOCS_')

const base = env.DOCS_BASE || '/'
const hostname = (env.DOCS_HOSTNAME || 'https://www.lhgb.top').replace(/\/$/, '')

// 站点规范 URL：站点首页完整地址（含 base 前缀，若有）
const siteUrl = hostname + base

// 防闪烁：构建期把「预设名 → 样式文本」序列化为 JSON，供 head 同步脚本读取。
// 与 usePresetTheme 共用同一个 <style id="lh-preset-theme"> 元素（同一机制、同一特异性），
// 不能写 documentElement 内联 style——内联特异性 1,0,0,0 恒压样式表，
// 会导致运行时切换预设只改了样式表、页面仍读旧内联值（必须刷新才生效），
// 且会压过 var-dark.scss 的整段暗色变量。
const PRESET_STYLE_JSON = JSON.stringify(
  Object.fromEntries(THEME_PRESETS.map((p) => [p.name, buildPresetStyleText(p.vars)])),
)

const PRESET_FOUC_SCRIPT = `
(function () {
  try {
    var presets = ${PRESET_STYLE_JSON}
    var saved = localStorage.getItem('lh-docs-preset')
    var text = saved && presets[saved] ? presets[saved] : presets['cerblue']
    var styleEl = document.getElementById('${PRESET_THEME_STYLE_ID}')
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = '${PRESET_THEME_STYLE_ID}'
    }
    styleEl.textContent = text
    document.head.appendChild(styleEl)
  } catch (e) { /* SSR 或 localStorage 不可用时静默失败 */ }
})()
`.trim()

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  // 部署到子路径时通过 docs/.env.production 的 DOCS_BASE 配置，如 /lhui/plus/
  // 首尾必须带斜杠；根路径部署时留空即可
  base,
  sitemap: {
    hostname: siteUrl,
  },
  head: [
    // 中文 meta
    ['meta', { name: 'description', content: '企业级 Vue 3 国风组件库，以国风之美，筑代码之基。融合传统水墨丹青美学与现代工程实践。' }],
    ['meta', { name: 'keywords', content: 'Vue3,Vue,Component,UI,lh-ui,国风,组件库,水墨,Chinese,Design' }],
    // Open Graph
    ['meta', { property: 'og:title', content: 'lh-ui-plus - 企业级 Vue 3 国风组件库' }],
    ['meta', { property: 'og:description', content: '以国风之美，筑代码之基。融合传统水墨丹青美学与现代工程实践。' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: siteUrl }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'lh-ui-plus - Enterprise Vue 3 Component Library' }],
    ['meta', { name: 'twitter:description', content: 'Enterprise-grade Vue 3 UI component library with Chinese traditional aesthetics.' }],
    // JSON-LD structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'lh-ui-plus',
      description: '企业级 Vue 3 国风组件库',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      programmingLanguage: 'TypeScript',
      url: siteUrl,
      author: { '@type': 'Organization', name: 'lhgb.top' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
    })],
    // 主题预设防闪烁：在页面首次绘制前同步应用用户上次选择的预设变量
    ['script', {}, PRESET_FOUC_SCRIPT],
  ],
  vite: {
    css: {
      preprocessorOptions: {
        // 项目 SCSS 全部使用 @use 现代语法，切换到 modern API 以消除
        // Dart Sass legacy-js-api 弃用警告（Dart Sass 2.0 将移除 legacy API）
        scss: {
          api: 'modern',
          // 组件 scss 源在 @lh-ui/share 包内，其 @use 为 bare specifier 时走 node_modules 解析
          loadPaths: [resolve(__dirname, '../../node_modules')],
        },
      },
    },
    resolve: {
      alias: {
        // 与 tsconfig.json compilerOptions.paths 保持一致
        '~': resolve(__dirname, '../../packages'),
        '@': resolve(__dirname, '../../src'),
        '@lh-ui/vue3': resolve(__dirname, '../../src/index.ts'),
        types: resolve(__dirname, '../../types'),
      },
    },
    optimizeDeps: {
      include: ['vue'],
    },
    server: {
      host: '0.0.0.0',
    },
  },

  locales: {
    root: {
      lang: 'zh-CN',
      label: '中文',
      title: 'lh-ui-plus',
      description: '企业级 Vue 3 国风组件库',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
          { text: '组件', link: '/components/button', activeMatch: '/components/' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: '指南',
              items: [
                { text: '安装', link: '/guide/installation' },
                { text: '快速开始', link: '/guide/getting-started' },
                { text: '主题定制', link: '/guide/theme-customization' },
                { text: '预设主题', link: '/guide/themes' },
                { text: '花纹背景系统', link: '/guide/theme-patterns' },
                { text: '国际化', link: '/guide/i18n' },
              ],
            },
            {
              text: '更多',
              items: [
                { text: '设计理念', link: '/guide/design-philosophy' },
                { text: '组件库对比', link: '/guide/comparison' },
                { text: '迁移指南', link: '/guide/migration' },
                { text: '无障碍访问', link: '/guide/accessibility' },
                { text: '常见问题', link: '/guide/faq' },
                { text: '贡献指南', link: '/guide/contributing' },
                { text: '发布指南', link: '/guide/publishing' },
                { text: '更新日志', link: '/guide/changelog' },
              ],
            },
          ],
          '/components/': [
            {
              text: '基础组件',
              items: [
                { text: 'Button 按钮', link: '/components/button' },
                { text: 'Icon 图标', link: '/components/icon' },
              ],
            },
            {
              text: '表单组件',
              items: [
                { text: 'Input 输入框', link: '/components/input' },
                { text: 'InputNumber 计数器', link: '/components/input-number' },
                { text: 'Select 选择器', link: '/components/select' },
                { text: 'Checkbox 复选框', link: '/components/checkbox' },
                { text: 'Radio 单选框', link: '/components/radio' },
                { text: 'Switch 开关', link: '/components/switch' },
                { text: 'Slider 滑块', link: '/components/slider' },
                { text: 'DatePicker 日期选择器', link: '/components/date-picker' },
                { text: 'TimePicker 时间选择器', link: '/components/time-picker' },
                { text: 'Cascader 级联选择器', link: '/components/cascader' },
                { text: 'Form 表单', link: '/components/form' },
              ],
            },
            {
              text: '数据展示',
              items: [
                { text: 'Tag 标签', link: '/components/tag' },
                { text: 'Badge 徽标', link: '/components/badge' },
                { text: 'Avatar 头像', link: '/components/avatar' },
                { text: 'Progress 进度条', link: '/components/progress' },
                { text: 'Statistic 统计数值', link: '/components/statistic' },
                { text: 'Descriptions 描述列表', link: '/components/descriptions' },
              ],
            },
            {
              text: '反馈组件',
              items: [
                { text: 'Dialog 对话框', link: '/components/dialog' },
                { text: 'Tooltip 提示', link: '/components/tooltip' },
                { text: 'Popover 弹出框', link: '/components/popover' },
                { text: 'Popconfirm 气泡确认', link: '/components/popconfirm' },
                { text: 'Drawer 抽屉', link: '/components/drawer' },
                { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
                { text: 'Alert 警告提示', link: '/components/alert' },
                { text: 'Empty 空状态', link: '/components/empty' },
                { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
                { text: 'Message 全局轻提示', link: '/components/message' },
                { text: 'Notification 通知', link: '/components/notification' },
                { text: 'Loading 加载', link: '/components/loading' },
                { text: 'Spinner 旋转图形', link: '/components/spinner' },
                { text: 'Timeline 时间线', link: '/components/timeline' },
                { text: 'Collapse 折叠面板', link: '/components/collapse' },
                { text: 'Rate 评分', link: '/components/rate' },
                { text: 'Segmented 分段选择器', link: '/components/segmented' },
                { text: 'Calendar 日历面板', link: '/components/calendar' },
                { text: 'Affix 固钉', link: '/components/affix' },
                { text: 'BackTop 返回顶部', link: '/components/backtop' },
                { text: 'Image 图片', link: '/components/image' },
                { text: 'Menu 导航菜单', link: '/components/menu' },
                { text: 'Table 表格', link: '/components/table' },
                { text: 'Layout 布局容器', link: '/components/layout' },
                { text: 'Grid 栅格', link: '/components/grid' },
                { text: 'Tree 树形控件', link: '/components/tree' },
                { text: 'TreeSelect 树选择', link: '/components/tree-select' },
                { text: 'Transfer 穿梭框', link: '/components/transfer' },
                { text: 'Upload 上传', link: '/components/upload' },
                { text: 'Anchor 锚点', link: '/components/anchor' },
                { text: 'VirtualList 虚拟列表', link: '/components/virtual-list' },
              ],
            },
            {
              text: '布局组件',
              items: [
                { text: 'Divider 分割线', link: '/components/divider' },
                { text: 'Space 间距', link: '/components/space' },
                { text: 'Card 卡片', link: '/components/card' },
              ],
            },
            {
              text: '导航组件',
              items: [
                { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
                { text: 'Pagination 分页', link: '/components/pagination' },
                { text: 'Tabs 标签页', link: '/components/tabs' },
                { text: 'Steps 步骤条', link: '/components/steps' },
              ],
            },
            {
              text: '配置组件',
              items: [{ text: 'ConfigProvider 配置', link: '/components/config-provider' }],
            },
          ],
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/lhgb-top/lh-ui-plus' }],
        footer: {
          message: '以国风之美，筑代码之基',
          copyright: 'Copyright © 2026 lhgb.top',
        },
      },
    },
    en: {
      lang: 'en-US',
      label: 'English',
      title: 'lh-ui-plus',
      description: 'Enterprise-grade Vue 3 Component Library',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/installation', activeMatch: '/en/guide/' },
          { text: 'Components', link: '/en/components/button', activeMatch: '/en/components/' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Installation', link: '/en/guide/installation' },
                { text: 'Getting Started', link: '/en/guide/getting-started' },
                { text: 'Theme Customization', link: '/en/guide/theme-customization' },
                { text: 'Theme Presets', link: '/en/guide/themes' },
                { text: 'Pattern Background', link: '/en/guide/theme-patterns' },
                { text: 'Internationalization', link: '/en/guide/i18n' },
              ],
            },
            {
              text: 'More',
              items: [
                { text: 'Design Philosophy', link: '/en/guide/design-philosophy' },
                { text: 'Comparison', link: '/en/guide/comparison' },
                { text: 'Migration Guide', link: '/en/guide/migration' },
                { text: 'Accessibility', link: '/en/guide/accessibility' },
                { text: 'FAQ', link: '/en/guide/faq' },
                { text: 'Contributing', link: '/en/guide/contributing' },
                { text: 'Publishing', link: '/en/guide/publishing' },
                { text: 'Changelog', link: '/en/guide/changelog' },
              ],
            },
          ],
          '/en/components/': [
            {
              text: 'Basic',
              items: [
                { text: 'Button', link: '/en/components/button' },
                { text: 'Icon', link: '/en/components/icon' },
              ],
            },
            {
              text: 'Form',
              items: [
                { text: 'Input', link: '/en/components/input' },
                { text: 'InputNumber', link: '/en/components/input-number' },
                { text: 'Select', link: '/en/components/select' },
                { text: 'Checkbox', link: '/en/components/checkbox' },
                { text: 'Radio', link: '/en/components/radio' },
                { text: 'Switch', link: '/en/components/switch' },
                { text: 'Slider', link: '/en/components/slider' },
                { text: 'DatePicker', link: '/en/components/date-picker' },
                { text: 'TimePicker', link: '/en/components/time-picker' },
                { text: 'Cascader', link: '/en/components/cascader' },
                { text: 'Form', link: '/en/components/form' },
              ],
            },
            {
              text: 'Data Display',
              items: [
                { text: 'Tag', link: '/en/components/tag' },
                { text: 'Badge', link: '/en/components/badge' },
                { text: 'Avatar', link: '/en/components/avatar' },
                { text: 'Progress', link: '/en/components/progress' },
                { text: 'Statistic', link: '/en/components/statistic' },
                { text: 'Descriptions', link: '/en/components/descriptions' },
              ],
            },
            {
              text: 'Feedback',
              items: [
                { text: 'Dialog', link: '/en/components/dialog' },
                { text: 'Tooltip', link: '/en/components/tooltip' },
                { text: 'Popover', link: '/en/components/popover' },
                { text: 'Popconfirm', link: '/en/components/popconfirm' },
                { text: 'Drawer', link: '/en/components/drawer' },
                { text: 'Dropdown', link: '/en/components/dropdown' },
                { text: 'Alert', link: '/en/components/alert' },
                { text: 'Empty', link: '/en/components/empty' },
                { text: 'Skeleton', link: '/en/components/skeleton' },
                { text: 'Message', link: '/en/components/message' },
                { text: 'Notification', link: '/en/components/notification' },
                { text: 'Loading', link: '/en/components/loading' },
                { text: 'Spinner', link: '/en/components/spinner' },
                { text: 'Timeline', link: '/en/components/timeline' },
                { text: 'Collapse', link: '/en/components/collapse' },
                { text: 'Rate', link: '/en/components/rate' },
                { text: 'Segmented', link: '/en/components/segmented' },
                { text: 'Calendar', link: '/en/components/calendar' },
                { text: 'Affix', link: '/en/components/affix' },
                { text: 'BackTop', link: '/en/components/backtop' },
                { text: 'Image', link: '/en/components/image' },
                { text: 'Menu', link: '/en/components/menu' },
                { text: 'Table', link: '/en/components/table' },
                { text: 'Layout', link: '/en/components/layout' },
                { text: 'Grid', link: '/en/components/grid' },
                { text: 'Tree', link: '/en/components/tree' },
                { text: 'TreeSelect', link: '/en/components/tree-select' },
                { text: 'Transfer', link: '/en/components/transfer' },
                { text: 'Upload', link: '/en/components/upload' },
                { text: 'Anchor', link: '/en/components/anchor' },
                { text: 'VirtualList', link: '/en/components/virtual-list' },
              ],
            },
            {
              text: 'Layout',
              items: [
                { text: 'Divider', link: '/en/components/divider' },
                { text: 'Space', link: '/en/components/space' },
                { text: 'Card', link: '/en/components/card' },
              ],
            },
            {
              text: 'Navigation',
              items: [
                { text: 'Breadcrumb', link: '/en/components/breadcrumb' },
                { text: 'Pagination', link: '/en/components/pagination' },
                { text: 'Tabs', link: '/en/components/tabs' },
                { text: 'Steps', link: '/en/components/steps' },
              ],
            },
            {
              text: 'Configuration',
              items: [{ text: 'ConfigProvider', link: '/en/components/config-provider' }],
            },
          ],
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/lhgb-top/lh-ui-plus' }],
        footer: {
          message: 'Beauty of tradition, foundation of code',
          copyright: 'Copyright © 2026 lhgb.top',
        },
      },
    },
  },
})
