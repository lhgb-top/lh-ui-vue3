import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'lh-ui-plus',
  description: '企业级 Vue 3 国风组件库',
  lang: 'zh-CN',
  themeConfig: {
    logo: null,
    siteTitle: 'lh-ui-plus',
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
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Input 输入框', link: '/components/input' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Dialog 对话框', link: '/components/dialog' },
            { text: 'Tooltip 提示', link: '/components/tooltip' },
          ],
        },
        {
          text: '配置组件',
          items: [
            { text: 'ConfigProvider 配置', link: '/components/config-provider' },
          ],
        },
      ],
    },
    socialLinks: [],
    footer: {
      message: '以国风之美，筑代码之基',
      copyright: 'MIT Licensed',
    },
  },
})