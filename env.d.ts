/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}

declare module '*.scss'
declare module '*.css'
// 根目录的构建/文档脚本（scripts/*.mjs）被各 config 以相对路径引入，.mjs 无类型声明，
// 补一条环境模块声明；仓内 .mjs 均为纯 JS 脚本，不存在带类型的 .mjs 导入
declare module '*.mjs'
// @lh-ui/share 的 ./styles/* 子路径经 exports 映射到 */index.scss，
// 部分编辑器 TS 上下文对这种无后缀的映射路径找不到类型声明，补一条环境模块声明
declare module '@lh-ui/share/styles/*'