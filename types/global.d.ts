// types/global.d.ts
// 全局类型声明
// Vue组件扩展
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 全局CSS变量类型
declare interface CSSVariable {
  [key: string]: string
}

// 组件库配置类型
declare interface LhUIConfig {
  prefix?: string
  theme?: Record<string, string>
  locale?: string
}

// 安装选项类型
declare interface InstallOptions {
  prefix?: string
  theme?: Record<string, string>
  locale?: string
  components?: any[]
}