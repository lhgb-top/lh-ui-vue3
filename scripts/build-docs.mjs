/**
 * 文档站后构建处理
 *
 * VitePress 会在构建末尾生成 sitemap.xml，但 public/robots.txt 是静态文件，
 * 其中写死的 Sitemap 地址无法跟随 DOCS_BASE / DOCS_HOSTNAME。本脚本按部署
 * 配置重写该地址，保证子路径部署下搜索引擎能抓到正确的 sitemap。
 *
 * 与 config.ts 同口径：Vite 内置 env 加载发生在构建管线内部，本脚本以独立
 * node 进程运行，必须自己 loadEnv 才能读到 docs/.env.production 的值。
 * 注意：本脚本经 `pnpm docs:build` 以独立 node 进程运行，vitepress build 内部
 * 设置的 NODE_ENV 不会继承进来，默认按生产环境读取 .env.production。
 * 本脚本在 vitepress build **之前**运行（见 package.json 的 docs:build）：
 * 先重写源文件 docs/public/robots.txt，VitePress 才会把更新后的内容拷进 dist。
 * 放在构建之后会导致 dist 里的副本仍是重写前的旧内容。
 *
 * robots.txt 位于 docs/public/（VitePress 1.x 的 publicDir 是 <srcDir>/public，
 * 不是 .vitepress/public——旧位置的文件不会进 dist）。
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// 仅在显式指定 development/test 时才走非生产配置；默认按生产环境（脚本只在
// 生产构建链路中被调用）。
const mode = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
  ? process.env.NODE_ENV
  : 'production'

const env = loadEnv(
  mode,
  resolve(root, 'docs'),
  'DOCS_',
)
const hostname = (env.DOCS_HOSTNAME || 'https://www.lhgb.top').replace(/\/$/, '')
const base = env.DOCS_BASE || '/'
const siteUrl = hostname + base

const robotsPath = resolve(root, 'docs/public/robots.txt')

if (existsSync(robotsPath)) {
  const original = readFileSync(robotsPath, 'utf8')
  // 替换 Sitemap 行；若原文件没有则追加
  const line = `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml`
  const next = /Sitemap:/.test(original)
    ? original.replace(/^Sitemap:.*$/m, line)
    : `${original.trimEnd()}\n${line}\n`
  writeFileSync(robotsPath, next)
  console.log(`[build-docs] robots.txt sitemap -> ${line}`)
} else {
  console.warn('[build-docs] robots.txt not found, skipping')
}
