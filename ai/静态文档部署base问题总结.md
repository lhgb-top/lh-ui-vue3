# 静态文档站子路径部署（base）问题总结

> 2026-10-08 排查并修复 lh-ui-plus / lh-ui-vue2 两站部署到 `/lhui/{库名}/` 后资源全站 404 的问题。
> 本文记录根因、VitePress base 机制的完整边界、两站的具体修复，以及后续 react / uniapp 站上线前的排查清单。

## 一、现象

lh-ui-plus 文档站部署到 `https://www.lhgb.top/lhui/plus/` 后，页面打开是空的，浏览器控制台大量 404：
所有 `/assets/*.js` / `*.css` / `*.woff2` 都 404，请求路径是主机根 `/assets/...` 而非 `/lhui/plus/assets/...`。

## 二、根因（三个独立的问题）

### 问题 1：构建产物本身没有 base 前缀（主因）

检查当时已部署的 `docs/.vitepress/dist/index.html`：

```bash
grep -o 'src="/[^"]*"' dist/index.html   # → src="/assets/app.COERwcZ8.js"
grep -c "lhui" dist/index.html           # → 0
```

所有资源都是 `/assets/...`（根绝对路径），说明这次构建用的是 `base: '/'`。
VitePress 把 `base` 直接拼进所有 chunk 的发布路径，**base 不对 = 全站资源地址全错**，这不是运行时问题。

### 问题 2：`process.env` 直读拿不到 .env 的值

原 config 的写法：

```ts
base: process.env.DOCS_BASE || '/'
```

Vite 内置的 env 加载发生在**用户 config 求值之后**，所以生产构建时 `process.env.DOCS_BASE` 拿不到
`.env.production` 里的值，只剩行内环境变量这一条路。而在 Windows Git Bash 里，行内写法

```bash
DOCS_BASE=/lhui/plus/ pnpm docs:build
```

会被 MSYS 做路径转换，`/lhui/plus/` 变成本地绝对路径（`C:/Program Files/Git/lhui/plus` 之类），
base 就彻底错乱。这两个因素叠加，导致 base 极易在构建时丢失。

**正确写法**（照搬前端工作区 `packages/vitepress-blog` 的模式）：config 里显式 `loadEnv`。

```ts
import { defineConfig, loadEnv } from 'vitepress'
import { resolve } from 'node:path'

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const env = loadEnv(mode, resolve(__dirname, '..'), 'DOCS_')
const base = env.DOCS_BASE || '/'
```

`vitepress build` 在加载 config 之前就把 `process.env.NODE_ENV` 设成 `'production'`
（`vitepress/dist/node/chunk-*.js` 里 `build()` 函数第一行），所以 mode 判断可靠。
`loadEnv` 由 `vitepress` re-export（`export { loadEnv } from 'vite'`），第三个参数是变量前缀。
Vite 的 `loadEnv` 会把**匹配前缀的行内 process.env 也合并进来**，所以「行内变量临时覆盖」的能力不丢。

### 问题 3：publicDir 位置错误（plus 站特有）

VitePress 1.x 的 publicDir 是 `<srcDir>/public`（源码：`path.resolve(config.srcDir, "public")`），
**不是** `.vitepress/public`（那是 0.x 的约定）。

plus 站一直把 `robots.txt` 放在 `docs/.vitepress/public/`，构建后 dist 根目录**从来没有** `robots.txt`
（旧 dist 里有 `vp-icons.css` 却没有 `robots.txt` 就是证据）——sitemap 行重写了但文件没进 dist，
robots.txt 实际上从未被部署。我第一轮修复时把 `logo.svg` 也放进了这个错误目录。

vue2 站一开始就用对了（`docs/public/`），dist 根目录能看到 `logo.svg` / `robots.txt` / `demos/`。

## 三、VitePress base 机制边界（哪些自动、哪些要手动）

部署到子路径时，`base` 只对**经过 VitePress 管线的路径**生效。逐项结论（已在 vitepress 1.6.4 源码核实）：

| 场景 | 是否自动补 base | 说明 |
| --- | --- | --- |
| JS / CSS chunk、字体等构建产物 | ✅ 自动 | 直接从 `base` 派生发布路径 |
| `themeConfig` nav / sidebar 链接 | ✅ 自动 | 经 `VPLink` → `normalizeLink` → `withBase` |
| frontmatter hero `image.src` | ✅ 自动 | `VPImage` 内部调用 `withBase` |
| markdown 里 `[文本](/path)` 链接 | ✅ 自动 | `linkPlugin` 源码：`hrefAttr[1]` 以 `/` 开头时拼 base |
| 主题组件里 `useData()` 派生的路径 | ✅ 自动 | 走的也是上面的管线 |
| **markdown / 组件里写进 prop 的图片地址** | ❌ 需手动 `withBase` | 字符串原样渲染成 `<img src>`，如 `<LhEmpty image="/logo.png" />` |
| **`window.location` 跳转** | ❌ 需手动 `withBase` | 浏览器 API，不经 VitePress 管线 |
| **`config.head` 里的条目** | ❌ 需写完整路径 | head 在 SSR 阶段拼接，绕过 `withBase`，要手拼 `${base}xxx` |
| **构建期后处理脚本读 base** | ❌ 需自己 `loadEnv` | 脚本在 Vite 管线外运行，拿不到 env |

一句话记忆：**VitePress 渲染出来的路径都有 base，你自己在字符串里写的路径都没有。**

## 四、两站的具体修复内容

### lh-ui-plus（`/lhui/plus/`）

1. `docs/.vitepress/config.ts`：改用 `loadEnv(mode, resolve(__dirname, '..'), 'DOCS_')` 派生
   `base` / `hostname` / `siteUrl`；删掉所有 `process.env.DOCS_*` 直读。
2. 新增 `docs/.env.production`（`DOCS_BASE=/lhui/plus/` + `DOCS_HOSTNAME=https://www.lhgb.top`）
   与 `docs/.env.development`（`DOCS_BASE=/`）。
3. `.gitignore` 加 `!.env.production` / `!.env.development` 例外（原规则忽略所有 `.env.*`）。
4. `scripts/build-docs.mjs`：robots.txt 的 sitemap 重写同样改用 `loadEnv`（否则回退默认域名）。
   这里有两个独立的坑（都在实际构建时暴露）：
   - **NODE_ENV 不继承**：脚本经 `pnpm docs:build` 以独立 node 进程运行，`vitepress build`
     内部设置的 `NODE_ENV=production` 不会带进来，`process.env.NODE_ENV` 在脚本里是 `undefined`，
     会误读 `.env.development`。所以脚本的 mode 判断要**默认按生产**：
     ```js
     const mode = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
       ? process.env.NODE_ENV
       : 'production'
     ```
   - **执行时序**：原 `docs:build` 是 `vitepress build docs && node scripts/build-docs.mjs`，
     脚本在构建**之后**重写源文件 `docs/public/robots.txt`，但那份文件已经被 vitepress 拷进 dist 了，
     重写结果永远到不了 dist（症状：日志打印了正确的 sitemap，dist 里却是旧值）。
     已改为 `node scripts/build-docs.mjs && vitepress build docs`——脚本只讀寫源文件、
     不依赖 dist 产物，放前面安全。
5. **publicDir 修正**：`logo.svg` 与 `robots.txt` 从 `docs/.vitepress/public/` 移到 `docs/public/`，
   `build-docs.mjs` 的 `robotsPath` 同步改路径，删除错误的 `.vitepress/public/` 目录。
6. `withBase` 修复两处演示图片（base 不自动覆盖的场景）：
   - `docs/components/empty.md` + `docs/en/components/empty.md`：`<LhEmpty image="/logo.png" />`
     是活演示，改 `:image="logoSrc"`（`withBase('/logo.svg')`）；原引用的 `/logo.png` 根本不存在，
     新增 `docs/public/logo.svg`（靛蓝 `#2B4C7C` 印章风 + 朱砂点缀）。
   - `docs/components/avatar.md` + `docs/en/components/avatar.md`：「图片加载失败」演示的
     `src="/broken-avatar.png"` 改 `:src="brokenAvatarSrc"`。这是**故意失败**的演示，
     base 感知后请求站内不存在的 `/lhui/plus/broken-avatar.png`（干净 404 触发 error 事件），
     而不是命中主机根路径上门户站的 `try_files` 兜底页（返回 200 HTML，行为更脏）。
   - 四个文件的 `<script setup>` 都按仓库约定放在文件**末尾**（`<!-- lh-types:end -->` 之后），
     并与 en avatar 已有的 `onError` 块合并——一个 markdown 里两个 `<script setup>` 会导致 SFC 编译错误。
7. `docs/guide/contributing.md` + `docs/en/guide/contributing.md`：「文档站部署」一节改为
   「改 `docs/.env.production`，直接 `pnpm docs:build`」，并解释 loadEnv 时序与 MSYS 坑。

### lh-ui-vue2（`/lhui/vue2/`）

1. `docs/.vitepress/config.ts`：同样改用 `loadEnv`；默认 base 从 `/vue2/` 改为 `/`
   （原默认值与 nginx 的 `/lhui/vue2/` 不一致）。
2. 新增 `docs/.env.production`（`DOCS_BASE=/lhui/vue2/`）与 `docs/.env.development`（`DOCS_BASE=/`）。
3. vue2 的 `.gitignore` 没有 `.env.*` 规则，无需加例外。
4. **vue2 站不需要动演示部分**——它的 live demo 是 iframe 方案（VitePress 是 Vue3，无法直接渲染 Vue2 SFC）：
   - `DemoBlock.vue` 的 iframe src 已用 `withBase('/demos/${name}.html')`
   - `scripts/copy-demo.mjs` 已把 demo html 内部资源重写成相对路径 `./assets/`（平铺后与 assets 同级）
   - `index.md` hero 图片 `/logo.svg` 经 VPImage 自动补 base
   - `docs/public/` 位置本来就对，robots.txt 无 Sitemap 行，不需要后处理脚本

## 五、部署架构（供对照）

生产由单台 Nginx 按路径分流（详见前端工作区 `docs/nginx-proxy.conf`）：

```
/lhui/plus/  → alias /home/webuser/nginx/lh-ui/plus/     （lh-ui-plus 构建产物）
/lhui/vue2/  → alias /home/webuser/nginx/lh-ui/vue2/     （lh-ui-vue2 构建产物）
```

统一约定 `/lhui/{库名}/`：各组件库文档站是**独立项目**，以 `DOCS_BASE=/lhui/{库名}/` 构建后
整目录上传到对应 alias 目录。后续 react / uniapp 站照此扩展 location。

注意：`try_files $uri $uri/ /lhui/plus/index.html;` 的 fallback 路径**必须带 base 前缀**
（alias 下 fallback 相对于 alias 根），否则刷新深链路会 404。

## 六、上线前排查清单（给后续 react / uniapp 站）

构建前：

- [ ] `docs/.vitepress/config.ts` 用 `loadEnv` 而非 `process.env` 直读
- [ ] `docs/.env.production` 的 `DOCS_BASE` 与 nginx location 前缀一致（首尾带斜杠）
- [ ] public 文件放在 `docs/public/`，**不是** `docs/.vitepress/public/`
- [ ] 若 `.gitignore` 有 `.env.*` 规则，加 `!.env.production` / `!.env.development` 例外
- [ ] 后处理脚本（robots / sitemap 重写等）自己 `loadEnv`，与 config 同口径
- [ ] 后处理脚本若默认按生产环境，mode 判断要兜底（独立 node 进程拿不到 vitepress 的 NODE_ENV）
- [ ] 后处理脚本放在 `docs:build` 里 **vitepress build 之前**（改的是源文件，要在拷贝前生效）

检查源码：

- [ ] grep `src="/` / `href="/` / `url(/` —— 排查 markdown、组件、CSS 里的根绝对路径
- [ ] grep `window.location` —— 跳转目标是否需要 `withBase`
- [ ] grep `config.head` 条目 —— 是否引用了站内资源（head 绕过 withBase，要手拼 `${base}`）
- [ ] iframe / 沙箱方案 —— iframe src 走 `withBase`，内部页面资源用相对路径

构建后验证：

- [ ] `grep -c <base 关键字> dist/index.html` 应 > 0
- [ ] dist 根目录有 `robots.txt`（若 public 里放了的话）
- [ ] 抽查页面的 `<img src>` 是否带 base 前缀
- [ ] `pnpm docs:preview` 走一遍深链路 + 刷新，确认 `try_files` fallback 正确

## 七、验证方式与本次实际结果

```bash
# lh-ui-plus
cd lh-ui-plus
pnpm docs:build
grep -c "lhui" docs/.vitepress/dist/index.html                 # → 12 ✅
ls docs/.vitepress/dist/robots.txt docs/.vitepress/dist/logo.svg  # 都存在 ✅
grep -o 'src="[^"]*logo[^"]*"' docs/.vitepress/dist/components/empty.html  # → /lhui/plus/logo.svg ✅
cat docs/.vitepress/dist/robots.txt                             # Sitemap: https://www.lhgb.top/lhui/plus/sitemap.xml ✅

# lh-ui-vue2
cd lh-ui-vue2
pnpm build:demo   # demo 沙箱构建 + 拷入 docs/public/demos（iframe 内容）
pnpm docs:build
grep -c "lhui" docs/.vitepress/dist/index.html                 # → 10 ✅
```

### vue2 站 iframe 演示的验证技巧

vue2 的 live demo 包在 `<ClientOnly>` 里（SSR 阶段不渲染，避免 isDark hydration mismatch
导致 iframe 二次加载），所以**静态 HTML 里 grep 不到 iframe**。正确的验证方式是查
`__VP_SITE_DATA__` 里烘焙的 base——`withBase()` 运行时读的就是它：

```bash
grep -o 'base.\{0,20\}' docs/.vitepress/dist/index.html   # → base\":\"/lhui/vue2/\", ✅
ls docs/.vitepress/dist/demos/ | wc -l                    # → 59（demos 已进 dist）✅
grep -o 'src="[^"]*"' docs/.vitepress/dist/demos/button.html | head -3
# → ./assets/demo-es6THxlK.js 等，均为相对路径（copy-demo.mjs 重写，不受 base 影响）✅
```

一句话：**SSR 产物查 HTML，客户端渲染的组件查 `__VP_SITE_DATA__` 的 base。**

> 说明：本次两站的构建与验证已实际执行（用户授权当日可跑构建），上述数字为真实输出。
